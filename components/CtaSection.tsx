'use client';

import { useState, useEffect } from 'react';

const planLabels: Record<string, string> = {
  minimum: 'ミニマム',
  standard: 'スタンダード',
  fullcommit: 'フルコミット',
};

export default function CtaSection() {
  const [slots, setSlots] = useState<Record<string, number> | null>(null);

  useEffect(() => {
    fetch('/api/slots')
      .then(r => r.json())
      .then(setSlots)
      .catch(() => {});
  }, []);

  return (
    <section className="cta-section" id="cta" style={{ cursor: 'auto' }}>
      <div className="container animate-on-scroll scale-up">
        <h2>まずは15分の無料相談から</h2>
        <p>
          引地（Hikky）本人が直接お答えします。受験のお悩み、学習計画の相談、プランのご質問など、お気軽にどうぞ。<br />
          無理な勧誘は一切いたしません。
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '28px', marginTop: '8px' }}>
          <a
            href="https://qyzxk47dyy.jp.larksuite.com/scheduler/176525bd10e971ba"
            className="btn btn-white"
            style={{ cursor: 'pointer' }}
          >
            無料相談を予約する
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 12l4-4-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </a>

          {/* Slots - vertical layout */}
          {slots && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'rgba(255,255,255,0.5)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', animation: 'pulse-dot 2s infinite' }} />
                リアルタイム空き状況
              </div>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
                {Object.entries(slots).map(([key, val]) => (
                  <div
                    key={key}
                    style={{
                      padding: '8px 16px',
                      background: 'rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      border: '1px solid rgba(255,255,255,0.15)',
                      textAlign: 'center',
                      minWidth: '90px',
                    }}
                  >
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginBottom: '4px' }}>
                      {planLabels[key] || key}
                    </div>
                    <div style={{
                      fontSize: '15px',
                      fontWeight: 700,
                      color: val > 0 ? '#fff' : 'rgba(255,255,255,0.4)',
                    }}>
                      {val > 0 ? `残り${val}枠` : '要相談'}
                    </div>
                    {val === 0 && (
                      <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.55)', marginTop: '4px', letterSpacing: '0.2px', lineHeight: 1.5 }}>
                        ご決済順にご案内
                      </div>
                    )}
                    {val === 0 && (key === 'standard' || key === 'fullcommit') && (
                      <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.45)', marginTop: '2px', letterSpacing: '0.2px' }}>
                        次回開放：9月頃
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <p style={{
                fontSize: '11.5px',
                color: 'rgba(255,255,255,0.65)',
                lineHeight: 1.85,
                maxWidth: '600px',
                marginTop: '14px',
                textAlign: 'center',
              }}>
                ※「要相談」枠はご決済順にご案内をさせていただいております。<br />
                スタンダード／フルコミット次回開放は<strong style={{ color: '#fff' }}>9月頃</strong>を予定しております。<br />
                即時入会希望の場合は面談時にご相談ください。
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
