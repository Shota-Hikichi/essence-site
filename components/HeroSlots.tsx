'use client';

import { useState, useEffect } from 'react';

const labels: Record<string, string> = {
  minimum: 'ミニマム',
  standard: 'スタンダード',
  fullcommit: 'フルコミット',
};

export default function HeroSlots() {
  const [slots, setSlots] = useState<Record<string, number> | null>(null);

  useEffect(() => {
    fetch('/api/slots')
      .then((r) => r.json())
      .then(setSlots)
      .catch(() => {});
  }, []);

  if (!slots) return null;

  return (
    <section
      style={{
        padding: '20px 0',
        background: '#fff',
        borderBottom: '1px solid #F3F0EA',
      }}
    >
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '11px',
            color: '#9CA3AF',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}
        >
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: '#10B981',
              boxShadow: '0 0 0 0 rgba(16,185,129,0.5)',
              animation: 'pulseGreen 2s infinite',
            }}
          />
          現在の空き状況
        </div>

        <div
          style={{
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {Object.entries(slots).map(([key, val]) => (
            <div
              key={key}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                background: '#FAFAF7',
                border: '1px solid #E5E7EB',
                borderRadius: '999px',
                fontSize: '12.5px',
                color: '#4B5563',
              }}
            >
              <span style={{ fontWeight: 600, color: '#2D2D3A' }}>{labels[key] || key}</span>
              <span
                style={{
                  fontWeight: 700,
                  color: val > 0 ? 'var(--primary)' : '#9CA3AF',
                }}
              >
                {val > 0 ? `残り${val}枠` : '要相談'}
              </span>
            </div>
          ))}
        </div>

        <p style={{ fontSize: '10.5px', color: '#9CA3AF', textAlign: 'center', lineHeight: 1.8, marginTop: '2px', maxWidth: '640px' }}>
          ※「要相談」枠はご決済順にご案内をさせていただいております。<br />
          スタンダード／フルコミット次回開放は9月頃を予定しております。<br />
          即時入会希望の場合は面談時にご相談ください。
        </p>
      </div>
      <style>{`
        @keyframes pulseGreen {
          0% { box-shadow: 0 0 0 0 rgba(16,185,129,0.5); }
          70% { box-shadow: 0 0 0 8px rgba(16,185,129,0); }
          100% { box-shadow: 0 0 0 0 rgba(16,185,129,0); }
        }
      `}</style>
    </section>
  );
}
