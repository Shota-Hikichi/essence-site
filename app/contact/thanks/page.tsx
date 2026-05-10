import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'お問い合わせ完了 | Essence',
};

export default function ContactThanksPage() {
  return (
    <main style={{ paddingTop: '160px', paddingBottom: '120px', textAlign: 'center', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '560px' }}>
        <div style={{ width: '72px', height: '72px', background: '#0F9D6E', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h1 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: '28px', fontWeight: 600, color: '#2D2D3A', marginBottom: '16px' }}>
          お問い合わせありがとうございます
        </h1>
        <p style={{ fontSize: '16px', color: '#6B7280', lineHeight: 2, marginBottom: '40px' }}>
          内容を確認のうえ、24時間以内にご返信いたします。<br />
          しばらくお待ちください。
        </p>
        <Link href="/" className="btn btn-primary" style={{ display: 'inline-flex' }}>
          ホームに戻る
        </Link>
      </div>
    </main>
  );
}
