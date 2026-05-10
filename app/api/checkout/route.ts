import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const planAmounts: Record<string, number> = {
  test: 50,
  minimum: 29800,
  standard: 39800,
  fullcommit: 49800,
};

const planNames: Record<string, string> = {
  test: 'テストプラン',
  minimum: 'ミニマムプラン',
  standard: 'スタンダードプラン',
  fullcommit: 'フルコミットプラン',
};

export async function POST(req: NextRequest) {
  try {
    const { planId, email, name, phone } = await req.json();

    const amount = planAmounts[planId];
    if (!amount) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'メールアドレスが正しくありません' }, { status: 400 });
    }
    if (!name || !name.trim()) {
      return NextResponse.json({ error: 'お名前を入力してください' }, { status: 400 });
    }
    if (!phone || !phone.trim()) {
      return NextResponse.json({ error: '電話番号を入力してください' }, { status: 400 });
    }

    // Create or retrieve customer
    let customer: Stripe.Customer;
    const existing = await stripe.customers.list({ email, limit: 1 });
    if (existing.data.length > 0) {
      customer = existing.data[0];
      // Update name/phone if changed
      await stripe.customers.update(customer.id, { name, phone });
    } else {
      customer = await stripe.customers.create({ email, name, phone });
    }

    // Find or create a recurring Price for this plan (30 days from day-after-payment = 31-day cycle)
    const lookupKey = `essence_${planId}_30day_v1`;
    let price: Stripe.Price | undefined;
    const existingPrices = await stripe.prices.list({ lookup_keys: [lookupKey], active: true, limit: 1 });
    if (existingPrices.data.length > 0) {
      price = existingPrices.data[0];
    } else {
      const product = await stripe.products.create({
        name: planNames[planId],
        metadata: { planId },
      });
      price = await stripe.prices.create({
        product: product.id,
        unit_amount: amount,
        currency: 'jpy',
        recurring: { interval: 'day', interval_count: 31 },
        lookup_key: lookupKey,
      });
    }

    // Create Subscription with default_incomplete so we can collect payment via PaymentElement.
    // First charge happens immediately on customer confirmation; auto-renewal occurs every 31 days
    // (= 30 days starting from the day after the payment date).
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: price.id }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.confirmation_secret', 'latest_invoice.payment_intent'],
      metadata: {
        planId,
        planName: planNames[planId],
        customerName: name,
        customerPhone: phone,
      },
    });

    // In Stripe API 2025-03-31+, subscriptions use confirmation_secret on the invoice.
    // Older API versions exposed payment_intent. Support both.
    const latestInvoice = subscription.latest_invoice as
      | (Stripe.Invoice & {
          payment_intent?: Stripe.PaymentIntent | string | null;
          confirmation_secret?: { client_secret: string; type: string } | null;
        })
      | null;

    let clientSecret: string | undefined;
    if (latestInvoice?.confirmation_secret?.client_secret) {
      clientSecret = latestInvoice.confirmation_secret.client_secret;
    } else if (
      latestInvoice?.payment_intent &&
      typeof latestInvoice.payment_intent !== 'string' &&
      latestInvoice.payment_intent.client_secret
    ) {
      clientSecret = latestInvoice.payment_intent.client_secret;
    }

    if (!clientSecret) {
      console.error('Subscription created but no client_secret returned', {
        subscriptionId: subscription.id,
        invoiceId: latestInvoice?.id,
        invoiceStatus: latestInvoice?.status,
      });
      throw new Error('Failed to create payment intent for subscription');
    }

    return NextResponse.json({
      clientSecret,
      subscriptionId: subscription.id,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Checkout error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
