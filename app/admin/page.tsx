'use client';

import { useState, useEffect } from 'react';

const ADMIN_KEY = 'essence-admin-2024';

const planLabels: Record<string, string> = {
  minimum: 'ミニマム',
  standard: 'スタンダード',
  fullcommit: 'フルコミット',
};

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [slots, setSlots] = useState<Record<string, number>>({});
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const login = () => {
    if (password === ADMIN_KEY) {
      setAuthed(true);
      loadSlots();
    } else {
      setMessage('パスワードが違います');
    }
  };

  const loadSlots = async () => {
    const res = await fetch('/api/slots');
    const data = await res.json();
    setSlots(data);
  };

  const saveSlots = async () => {
    setSaving(true);
    setMessage('');
    try {
      const res = await fetch('/api/slots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${ADMIN_KEY}` },
        body: JSON.stringify(slots),
      });
      if (res.ok) {
        setMessage('保存しました');
      } else {
        setMessage('保存に失敗しました');
      }
    } catch {
      setMessage('エラーが発生しました');
    }
    setSaving(false);
  };

  if (!authed) {
    return (
      <main style={{ paddingTop: '200px', minHeight: '100vh', background: '#F8F9FA' }}>
        <div style={{ maxWidth: '360px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px', color: '#2D2D3A' }}>管理画面</h1>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && login()}
            placeholder="パスワード"
            style={{ width: '100%', padding: '14px 16px', fontSize: '15px', border: '1px solid #E5E7EB', borderRadius: '8px', marginBottom: '16px', outline: 'none' }}
          />
          <button onClick={login} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            ログイン
          </button>
          {message && <p style={{ color: '#e00', fontSize: '14px', marginTop: '12px' }}>{message}</p>}
        </div>
      </main>
    );
  }

  return (
    <main style={{ paddingTop: '120px', paddingBottom: '80px', minHeight: '100vh', background: '#F8F9FA' }}>
      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '0 24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px', color: '#2D2D3A' }}>管理画面</h1>
        <p style={{ fontSize: '15px', color: '#6B7280', marginBottom: '40px' }}>残枠数を変更してサイトにリアルタイム反映されます。</p>

        {/* Slots Management */}
        <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', border: '1px solid #E5E7EB', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '24px', color: '#2D2D3A' }}>残枠管理</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {Object.entries(slots).map(([key, val]) => (
              <div key={key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: '#F8F9FA', borderRadius: '8px' }}>
                <span style={{ fontSize: '15px', fontWeight: 600, color: '#2D2D3A' }}>{planLabels[key] || key}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <button
                    onClick={() => setSlots(s => ({ ...s, [key]: Math.max(0, (s[key] || 0) - 1) }))}
                    style={{ width: '36px', height: '36px', borderRadius: '8px', border: '1px solid #E5E7EB', background: '#fff', fontSize: '18px', cursor: 'pointer' }}
                  >
                    -
                  </button>
                  <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: '28px', minWidth: '40px', textAlign: 'center', color: val === 0 ? '#e00' : '#2D2D3A' }}>
                    {val}
                  </span>
                  <button
                    onClick={() => setSlots(s => ({ ...s, [key]: (s[key] || 0) + 1 }))}
                    style={{ width: '36px', height: '36px', borderRadius: '8px', border: '1px solid #E5E7EB', background: '#fff', fontSize: '18px', cursor: 'pointer' }}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={saveSlots}
            disabled={saving}
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center', marginTop: '24px', opacity: saving ? 0.6 : 1 }}
          >
            {saving ? '保存中...' : '残枠を保存'}
          </button>
          {message && <p style={{ textAlign: 'center', fontSize: '14px', color: message.includes('失敗') ? '#e00' : '#0F9D6E', marginTop: '12px' }}>{message}</p>}
        </div>

        <p style={{ fontSize: '12px', color: '#9CA3AF', textAlign: 'center' }}>
          ※ サーバーレス環境のため、デプロイ時に残枠数はデフォルト値にリセットされます。<br />
          永続化にはRedis（Vercel KV）の接続が必要です。
        </p>
      </div>
    </main>
  );
}
