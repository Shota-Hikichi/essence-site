'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Link from 'next/link';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const plans = [
  { id: 'minimum', name: 'ミニマム', price: 29800, features: ['チャットサポート', '電話相談 週1回（30分/回）', '学習管理'] },
  { id: 'standard', name: 'スタンダード', price: 39800, popular: true, features: ['チャットサポート', '電話相談 週2回（1時間/回）', 'ロードマップ作成', '学習管理', '小論文添削', '月次進捗レポート'] },
  { id: 'fullcommit', name: 'フルコミット', price: 49800, features: ['チャットサポート', '電話相談 回数・時間無制限', 'ロードマップ作成', '学習管理', '小論文添削（無制限）', '週次進捗レポート'] },
];

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div style={{ paddingTop: '200px', textAlign: 'center' }}>読み込み中...</div>}>
      <CheckoutInner />
    </Suspense>
  );
}

function CheckoutInner() {
  const searchParams = useSearchParams();
  const initialPlan = searchParams.get('plan') || 'standard';
  const [selectedPlan, setSelectedPlan] = useState(initialPlan);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [step, setStep] = useState<'select' | 'payment'>('select');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const current = plans.find((p) => p.id === selectedPlan)!;

  const handleProceed = async () => {
    if (!name.trim()) {
      setError('お名前を入力してください');
      return;
    }
    if (!email || !email.includes('@')) {
      setError('メールアドレスを入力してください');
      return;
    }
    if (!phone.trim() || !/^[\d\-+() ]{8,}$/.test(phone.trim())) {
      setError('電話番号を正しい形式で入力してください');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId: selectedPlan, email, name, phone }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setClientSecret(data.clientSecret);
        setStep('payment');
      }
    } catch {
      setError('エラーが発生しました。もう一度お試しください。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ paddingTop: '120px', paddingBottom: '80px', background: '#F8F9FA', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '640px' }}>
        <Link href="/#plans" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: '#6B7280', marginBottom: '32px' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          プラン一覧に戻る
        </Link>

        {/* Step indicator */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '40px' }}>
          <div style={{ flex: 1, height: '3px', borderRadius: '2px', background: '#9A071A' }} />
          <div style={{ flex: 1, height: '3px', borderRadius: '2px', background: step === 'payment' ? '#9A071A' : '#E5E7EB' }} />
        </div>

        {step === 'select' ? (
          <>
            <h1 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: '28px', fontWeight: 600, marginBottom: '8px', color: '#2D2D3A' }}>
              プランを選択
            </h1>
            <p style={{ fontSize: '15px', color: '#6B7280', marginBottom: '32px' }}>
              入会金・退会金は一切かかりません。いつでも解約できます。
            </p>

            {/* Plan selection */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' }}>
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '18px 20px', background: '#fff',
                    border: selectedPlan === plan.id ? '2px solid #9A071A' : '1px solid #E5E7EB',
                    borderRadius: '12px', cursor: 'pointer', textAlign: 'left',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                      width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
                      border: selectedPlan === plan.id ? '6px solid #9A071A' : '2px solid #D4D4D8',
                    }} />
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '15px', fontWeight: 700, color: '#2D2D3A' }}>{plan.name}</span>
                        {plan.popular && <span style={{ fontSize: '10px', fontWeight: 700, color: '#fff', background: '#9A071A', padding: '2px 8px', borderRadius: '100px' }}>人気</span>}
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: '22px', color: '#2D2D3A' }}>
                      &yen;{plan.price.toLocaleString()}
                    </span>
                    <span style={{ fontSize: '12px', color: '#6B7280' }}>/月</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Name */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#2D2D3A', marginBottom: '8px' }}>
                お名前 <span style={{ color: '#9A071A', fontSize: '12px' }}>必須</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="山田 太郎"
                autoComplete="name"
                required
                style={{
                  width: '100%', padding: '14px 16px', fontSize: '15px',
                  border: '1px solid #E5E7EB', borderRadius: '8px', outline: 'none',
                  background: '#fff',
                }}
              />
            </div>

            {/* Email */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#2D2D3A', marginBottom: '8px' }}>
                メールアドレス <span style={{ color: '#9A071A', fontSize: '12px' }}>必須</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                autoComplete="email"
                required
                style={{
                  width: '100%', padding: '14px 16px', fontSize: '15px',
                  border: '1px solid #E5E7EB', borderRadius: '8px', outline: 'none',
                  background: '#fff',
                }}
              />
            </div>

            {/* Phone */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#2D2D3A', marginBottom: '8px' }}>
                電話番号 <span style={{ color: '#9A071A', fontSize: '12px' }}>必須</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="090-1234-5678"
                autoComplete="tel"
                required
                style={{
                  width: '100%', padding: '14px 16px', fontSize: '15px',
                  border: '1px solid #E5E7EB', borderRadius: '8px', outline: 'none',
                  background: '#fff',
                }}
              />
              <p style={{ fontSize: '12px', color: '#6B7280', marginTop: '6px', lineHeight: 1.6 }}>
                ご契約後の連絡・お問い合わせ対応に使用します。
              </p>
            </div>

            {/* Order summary */}
            <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', border: '1px solid #E5E7EB', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '14px', color: '#6B7280' }}>{current.name}プラン（月額）</span>
                <span style={{ fontSize: '14px', fontWeight: 600 }}>&yen;{current.price.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid #E5E7EB' }}>
                <span style={{ fontSize: '16px', fontWeight: 700 }}>お支払い額</span>
                <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: '24px', color: '#9A071A' }}>
                  &yen;{current.price.toLocaleString()}<span style={{ fontSize: '13px', color: '#6B7280' }}>/月</span>
                </span>
              </div>
            </div>

            {/* Auto-renewal notice */}
            <div style={{ background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: '12px', padding: '18px 20px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, marginTop: '2px' }}>
                  <circle cx="10" cy="10" r="8.25" stroke="#C2410C" strokeWidth="1.5" />
                  <path d="M10 6v4.5M10 13.5h.01" stroke="#C2410C" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
                <p style={{ fontSize: '13px', color: '#7C2D12', lineHeight: 1.85, margin: 0 }}>
                  <strong style={{ fontWeight: 700 }}>自動更新（継続課金）について</strong><br />
                  クレジットカードでお申込みいただくと、ご決済時に初回の月額料金（&yen;{current.price.toLocaleString()}）が課金されます。その後、<strong>ご決済日の翌日から起算して30日後に同額が自動的に継続課金されます</strong>（以後も30日ごとに自動更新）。解約をご希望の場合は、次回更新日の前日までにお手続きください。退会金はかかりません。
                </p>
              </div>
            </div>

            {error && <p style={{ color: '#e00', fontSize: '14px', marginBottom: '16px' }}>{error}</p>}

            <button
              onClick={handleProceed}
              disabled={loading}
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '18px', fontSize: '16px', opacity: loading ? 0.6 : 1 }}
            >
              {loading ? '処理中...' : 'お支払い情報の入力へ'}
            </button>

            <p style={{ fontSize: '12px', color: '#6B7280', marginTop: '16px', lineHeight: 1.8, textAlign: 'center' }}>
              お申込み前に必ず<Link href="/tokushoho" style={{ color: '#9A071A', textDecoration: 'underline' }}>特定商取引法に基づく表記</Link>をご確認ください。
            </p>
          </>
        ) : (
          <>
            <h1 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: '28px', fontWeight: 600, marginBottom: '8px', color: '#2D2D3A' }}>
              お支払い情報
            </h1>
            <p style={{ fontSize: '15px', color: '#6B7280', marginBottom: '32px' }}>
              {current.name}プラン &mdash; &yen;{current.price.toLocaleString()}/月
            </p>

            <Elements stripe={stripePromise} options={{ clientSecret, locale: 'ja', appearance: { theme: 'stripe', variables: { colorPrimary: '#9A071A', borderRadius: '8px' } } }}>
              <PaymentForm planName={current.name} />
            </Elements>

            <button
              onClick={() => setStep('select')}
              style={{ display: 'block', margin: '24px auto 0', background: 'none', border: 'none', color: '#6B7280', fontSize: '14px', cursor: 'pointer' }}
            >
              &larr; プラン選択に戻る
            </button>
          </>
        )}

        <p style={{ fontSize: '12px', color: '#9CA3AF', textAlign: 'center', marginTop: '24px', lineHeight: 1.8 }}>
          決済はStripeにより安全に処理されます。<br />
          いつでもキャンセル可能です。退会金はかかりません。
        </p>
      </div>
    </main>
  );
}

function PaymentForm({ planName }: { planName: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError('');

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message || 'エラーが発生しました');
      setLoading(false);
      return;
    }

    const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
      },
      redirect: 'if_required',
    });

    if (confirmError) {
      setError(confirmError.message || '決済に失敗しました');
      setLoading(false);
      return;
    }

    // Payment succeeded - send confirmation email
    if (paymentIntent && paymentIntent.status === 'succeeded') {
      try {
        await fetch('/api/checkout/confirm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ paymentIntentId: paymentIntent.id }),
        });
      } catch {
        // Email send failure is non-blocking
      }
      router.push('/checkout/success');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', border: '1px solid #E5E7EB', marginBottom: '24px' }}>
        <PaymentElement options={{ layout: 'tabs' }} />
      </div>

      {error && <p style={{ color: '#e00', fontSize: '14px', marginBottom: '16px' }}>{error}</p>}

      <p style={{ fontSize: '12.5px', color: '#6B7280', lineHeight: 1.85, marginBottom: '16px', textAlign: 'center' }}>
        「申し込む」を押すと、初回の月額料金が課金され、<strong style={{ color: '#7C2D12' }}>ご決済日の翌日から起算して30日後に同額が自動的に継続課金されます</strong>（30日ごとに自動更新）。
      </p>

      <button
        type="submit"
        disabled={!stripe || loading}
        className="btn btn-primary"
        style={{ width: '100%', justifyContent: 'center', padding: '18px', fontSize: '16px', opacity: loading ? 0.6 : 1 }}
      >
        {loading ? '処理中...' : `${planName}プランに申し込む`}
      </button>
    </form>
  );
}
