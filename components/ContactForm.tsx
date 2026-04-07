'use client';

import { useState, FormEvent } from 'react';

export default function ContactForm() {
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
          message: formData.get('message'),
        }),
      });
      if (res.ok) {
        setStatus('sent');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div style={{ textAlign: 'center', padding: '40px 0' }}>
        <p style={{ fontSize: '16px', color: 'var(--primary)', fontWeight: 600 }}>
          お問い合わせを送信しました。ありがとうございます。
        </p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">お名前</label>
        <input type="text" id="name" name="name" required />
      </div>
      <div>
        <label htmlFor="email">メールアドレス</label>
        <input type="email" id="email" name="email" required />
      </div>
      <div>
        <label htmlFor="message">メッセージ</label>
        <textarea id="message" name="message" required />
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        style={{ width: '100%', justifyContent: 'center' }}
        disabled={status === 'sending'}
      >
        {status === 'sending' ? '送信中...' : '送信する'}
      </button>
      {status === 'error' && (
        <p style={{ color: 'red', fontSize: '14px', marginTop: '12px', textAlign: 'center' }}>
          送信に失敗しました。もう一度お試しください。
        </p>
      )}
    </form>
  );
}
