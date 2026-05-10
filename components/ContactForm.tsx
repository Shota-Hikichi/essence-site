'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function ContactForm() {
  const router = useRouter();
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    try {
      const formData = new FormData(e.currentTarget);
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          message: formData.get('message'),
        }),
      });
      if (res.ok) {
        router.push('/contact/thanks');
        return;
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <section id="contact" style={{ padding: '100px 0', background: '#fff', borderTop: '1px solid #E5E7EB' }}>
        <div className="container" style={{ maxWidth: '640px', textAlign: 'center' }}>
          <div style={{ width: '64px', height: '64px', background: '#0F9D6E', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
          </div>
          <h2 className="section-title">お問い合わせを受け付けました</h2>
          <p style={{ fontSize: '15px', color: '#6B7280', lineHeight: 1.9 }}>
            内容を確認のうえ、24時間以内にご返信いたします。<br />しばらくお待ちください。
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" style={{ padding: '100px 0', background: '#fff', borderTop: '1px solid #E5E7EB' }}>
      <div className="container" style={{ maxWidth: '640px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p className="section-label">Contact</p>
          <h2 className="section-title">お問い合わせ</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            ご質問・ご相談がございましたら、お気軽にお問い合わせください。
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#2D2D3A', marginBottom: '8px' }}>
              お名前 <span style={{ color: '#9A071A' }}>*</span>
            </label>
            <input
              type="text" name="name" required
              placeholder="山田 太郎"
              style={{ width: '100%', padding: '14px 16px', fontSize: '15px', border: '1px solid #E5E7EB', borderRadius: '8px', outline: 'none', background: '#F8F9FA' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#2D2D3A', marginBottom: '8px' }}>
              メールアドレス <span style={{ color: '#9A071A' }}>*</span>
            </label>
            <input
              type="email" name="email" required
              placeholder="your@email.com"
              style={{ width: '100%', padding: '14px 16px', fontSize: '15px', border: '1px solid #E5E7EB', borderRadius: '8px', outline: 'none', background: '#F8F9FA' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#2D2D3A', marginBottom: '8px' }}>
              電話番号
            </label>
            <input
              type="tel" name="phone"
              placeholder="090-1234-5678"
              style={{ width: '100%', padding: '14px 16px', fontSize: '15px', border: '1px solid #E5E7EB', borderRadius: '8px', outline: 'none', background: '#F8F9FA' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#2D2D3A', marginBottom: '8px' }}>
              お問い合わせ内容 <span style={{ color: '#9A071A' }}>*</span>
            </label>
            <textarea
              name="message" required rows={5}
              placeholder="ご質問やご相談内容をご記入ください"
              style={{ width: '100%', padding: '14px 16px', fontSize: '15px', border: '1px solid #E5E7EB', borderRadius: '8px', outline: 'none', background: '#F8F9FA', resize: 'vertical', fontFamily: 'inherit' }}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={status === 'sending'}
            style={{ width: '100%', justifyContent: 'center', padding: '18px', fontSize: '16px', marginTop: '8px', opacity: status === 'sending' ? 0.6 : 1 }}
          >
            {status === 'sending' ? '送信中...' : '送信する'}
          </button>
          {status === 'error' && (
            <p style={{ color: '#e00', fontSize: '14px', textAlign: 'center' }}>送信に失敗しました。もう一度お試しください。</p>
          )}
        </form>
      </div>
    </section>
  );
}
