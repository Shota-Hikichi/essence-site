import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { paymentIntentId } = await req.json();

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== 'succeeded') {
      return NextResponse.json({ error: 'Payment not completed' }, { status: 400 });
    }

    const planName = paymentIntent.metadata?.planName || 'プラン';
    const customerId = paymentIntent.customer as string;

    let email = '';
    if (customerId) {
      const customer = await stripe.customers.retrieve(customerId);
      if (customer && !customer.deleted) {
        email = customer.email || '';
      }
    }

    if (email) {
      // Send confirmation to customer
      await resend.emails.send({
        from: 'Essence <onboarding@resend.dev>',
        to: email,
        subject: `【Essence】${planName}のお申し込みありがとうございます`,
        html: `
          <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px;">
            <h1 style="font-size: 24px; color: #2D2D3A; margin-bottom: 24px;">お申し込みありがとうございます</h1>
            <p style="font-size: 16px; color: #6B7280; line-height: 1.8; margin-bottom: 24px;">
              ${planName}へのお申し込みを承りました。<br>
              担当コーチから24時間以内にご連絡いたします。
            </p>
            <div style="background: #F8F9FA; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
              <p style="font-size: 14px; color: #2D2D3A; margin: 0;"><strong>プラン:</strong> ${planName}</p>
              <p style="font-size: 14px; color: #2D2D3A; margin: 8px 0 0;"><strong>金額:</strong> &yen;${paymentIntent.amount.toLocaleString()}/月（税込）</p>
            </div>
            <p style="font-size: 14px; color: #9CA3AF; line-height: 1.8;">
              ご不明な点がございましたら、お気軽にお問い合わせください。<br>
              Essence コーチングチーム
            </p>
          </div>
        `,
      });

      // Notify admin
      await resend.emails.send({
        from: 'Essence System <onboarding@resend.dev>',
        to: 'frisk0709@gmail.com',
        subject: `【新規申込】${planName} - ${email}`,
        html: `<p>新規申込がありました。</p><ul><li>プラン: ${planName}</li><li>メール: ${email}</li><li>金額: &yen;${paymentIntent.amount.toLocaleString()}</li><li>Payment ID: ${paymentIntent.id}</li></ul>`,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Confirm error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
