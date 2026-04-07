'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const plans = [
  {
    id: 'minimum',
    name: 'ミニマム',
    price: 29800,
    features: ['チャットサポート', '月1回の電話相談', '学習管理'],
  },
  {
    id: 'standard',
    name: 'スタンダード',
    price: 39800,
    popular: true,
    features: ['チャットサポート', '月2回の電話相談', 'ロードマップ作成', '学習管理', '小論文添削'],
  },
  {
    id: 'fullcommit',
    name: 'フルコミット',
    price: 49800,
    features: ['チャットサポート', '電話相談無制限', 'ロードマップ作成', '学習管理', '小論文添削（無制限）', '月次進捗レポート'],
  },
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
  const [loading, setLoading] = useState(false);

  const current = plans.find((p) => p.id === selectedPlan)!;

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId: selectedPlan }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('決済の準備中です。しばらくお待ちください。');
      }
    } catch {
      alert('エラーが発生しました。もう一度お試しください。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ paddingTop: '120px', paddingBottom: '80px', background: '#F8F9FA', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '640px' }}>
        <Link
          href="/#plans"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: '#6B7280', marginBottom: '32px' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          プラン一覧に戻る
        </Link>

        <h1 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: '28px', fontWeight: 600, marginBottom: '8px', color: '#2D2D3A' }}>
          プランを選択
        </h1>
        <p style={{ fontSize: '15px', color: '#6B7280', marginBottom: '40px' }}>
          入会金・退会金は一切かかりません。いつでも解約できます。
        </p>

        {/* Plan selection */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px' }}>
          {plans.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '20px 24px',
                background: selectedPlan === plan.id ? '#fff' : '#fff',
                border: selectedPlan === plan.id ? '2px solid #9A071A' : '1px solid #E5E7EB',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                textAlign: 'left',
                position: 'relative',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div
                  style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    border: selectedPlan === plan.id ? '6px solid #9A071A' : '2px solid #D4D4D8',
                    flexShrink: 0,
                    transition: 'all 0.2s',
                  }}
                />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '16px', fontWeight: 700, color: '#2D2D3A' }}>{plan.name}</span>
                    {plan.popular && (
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#fff', background: '#9A071A', padding: '2px 10px', borderRadius: '100px' }}>
                        人気
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize: '13px', color: '#6B7280' }}>
                    {plan.features.slice(0, 3).join(' / ')}
                  </span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: '24px', fontWeight: 400, color: '#2D2D3A' }}>
                  &yen;{plan.price.toLocaleString()}
                </span>
                <span style={{ fontSize: '13px', color: '#6B7280' }}>/月</span>
              </div>
            </button>
          ))}
        </div>

        {/* Order summary */}
        <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', border: '1px solid #E5E7EB', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#2D2D3A', marginBottom: '20px' }}>ご注文内容</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid #E5E7EB', marginBottom: '16px' }}>
            <span style={{ fontSize: '15px', color: '#2D2D3A' }}>{current.name}プラン（月額）</span>
            <span style={{ fontSize: '15px', fontWeight: 600, color: '#2D2D3A' }}>&yen;{current.price.toLocaleString()}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid #E5E7EB', marginBottom: '16px' }}>
            <span style={{ fontSize: '14px', color: '#6B7280' }}>入会金</span>
            <span style={{ fontSize: '14px', color: '#9A071A', fontWeight: 600 }}>0円</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '16px', fontWeight: 700, color: '#2D2D3A' }}>お支払い額</span>
            <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: '28px', fontWeight: 400, color: '#9A071A' }}>
              &yen;{current.price.toLocaleString()}<span style={{ fontSize: '14px', color: '#6B7280' }}>/月（税込）</span>
            </span>
          </div>
        </div>

        {/* Features included */}
        <div style={{ background: '#fff', borderRadius: '16px', padding: '24px 32px', border: '1px solid #E5E7EB', marginBottom: '32px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#6B7280', marginBottom: '12px' }}>含まれるサポート</h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {current.features.map((f) => (
              <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#2D2D3A' }}>
                <span style={{ color: '#9A071A', flexShrink: 0 }}>&#10003;</span>
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Checkout button */}
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="btn btn-primary"
          style={{
            width: '100%',
            justifyContent: 'center',
            padding: '18px 36px',
            fontSize: '16px',
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? '処理中...' : `${current.name}プランに申し込む`}
        </button>

        <p style={{ fontSize: '12px', color: '#9CA3AF', textAlign: 'center', marginTop: '16px', lineHeight: 1.8 }}>
          お申し込み後、Stripeの安全な決済画面に移動します。<br />
          いつでもキャンセル可能です。退会金はかかりません。
        </p>
      </div>
    </main>
  );
}
