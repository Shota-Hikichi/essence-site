'use client';

import { useEffect, useRef, useState } from 'react';

const rows = [
  { label: '入会金', e: '0円', a: '44,000円', b: '38,000円', c: '50,000円', highlight: true },
  { label: '月額料金', e: '29,800〜49,800円', a: '55,000〜90,000円', b: '43,000〜83,000円', c: '39,000〜100,000円+', highlight: true },
  { label: '退会金', e: '0円', a: 'なし〜あり', b: 'なし', c: 'なし', highlight: true },
  { label: 'その他の費用', e: '一切なし', a: '模試代など', b: 'システム利用料 2,970円/月', c: '学習サポート料 2,480円/月', highlight: true },
  { label: '形式', e: 'オンライン', a: '対面（全国展開）', b: 'オンライン', c: 'オンライン', highlight: false },
  { label: 'ロードマップ作成', e: 'あり', a: 'あり', b: 'あり', c: 'あり', highlight: false },
];

const badges = ['入会金 0円', '退会金 0円', '教材費・システム料 0円', '隠れた追加費用 一切なし'];

export default function PricingCompare() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      if (el.scrollLeft > 10) setShowHint(false);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="animate-on-scroll" id="pricing" style={{ padding: '100px 0', background: '#fff', borderTop: '1px solid #E5E7EB' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <p className="section-label" style={{ color: 'var(--primary)' }}>Pricing</p>
        <h2 className="section-title">他社と比べて、圧倒的にリーズナブル</h2>
        <p className="section-subtitle" style={{ margin: '0 auto 48px' }}>
          大手コーチング塾と同等以上のサポート内容を、入会金・退会金なしでご提供しています。
        </p>

        {/* Scroll hint */}
        <div className="pricing-table-container">
          <div
            ref={scrollRef}
            className="animate-on-scroll scale-up pricing-table-wrap"
            style={{ overflowX: 'auto', marginBottom: '32px', WebkitOverflowScrolling: 'touch', position: 'relative' }}
          >
            <table
              style={{
                minWidth: '700px',
                width: '100%',
                maxWidth: '960px',
                margin: '0 auto',
                borderCollapse: 'collapse',
                textAlign: 'center',
                fontSize: '14px',
              }}
            >
              <thead>
                <tr>
                  <th style={{ padding: '16px 12px', textAlign: 'left', fontSize: '13px', color: '#6B7280', borderBottom: '2px solid #E5E7EB', position: 'sticky', left: 0, background: '#fff', zIndex: 2 }}></th>
                  <th style={{ padding: '16px 20px', fontSize: '13px', color: '#fff', background: '#9A071A', borderBottom: '2px solid #9A071A', fontWeight: 700, borderRadius: '8px 8px 0 0' }}>Essence</th>
                  <th style={{ padding: '16px 12px', fontSize: '13px', color: '#6B7280', borderBottom: '2px solid #E5E7EB', fontWeight: 600 }}>大手個別指導塾 A</th>
                  <th style={{ padding: '16px 12px', fontSize: '13px', color: '#6B7280', borderBottom: '2px solid #E5E7EB', fontWeight: 600 }}>オンラインコーチング B</th>
                  <th style={{ padding: '16px 12px', fontSize: '13px', color: '#6B7280', borderBottom: '2px solid #E5E7EB', fontWeight: 600 }}>管理型オンライン塾 C</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label}>
                    <td style={{ padding: '14px 12px', textAlign: 'left', fontWeight: 600, color: '#2D2D3A', borderBottom: '1px solid #E5E7EB', position: 'sticky', left: 0, background: '#fff', zIndex: 2, whiteSpace: 'nowrap' }}>{row.label}</td>
                    <td style={{ padding: '14px 20px', color: row.highlight ? '#9A071A' : '#2D2D3A', fontWeight: row.highlight ? 700 : 400, borderBottom: '1px solid #E5E7EB', background: 'rgba(154,7,26,0.03)' }}>{row.e}</td>
                    <td style={{ padding: '14px 12px', color: '#6B7280', borderBottom: '1px solid #E5E7EB' }} dangerouslySetInnerHTML={{ __html: row.a.replace(' ', '<br>') }} />
                    <td style={{ padding: '14px 12px', color: '#6B7280', borderBottom: '1px solid #E5E7EB' }} dangerouslySetInnerHTML={{ __html: row.b.replace(' ', '<br>') }} />
                    <td style={{ padding: '14px 12px', color: '#6B7280', borderBottom: '1px solid #E5E7EB' }} dangerouslySetInnerHTML={{ __html: row.c.replace(' ', '<br>') }} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Scroll hint overlay */}
          <div className={`scroll-hint${showHint ? ' visible' : ''}`}>
            <div className="scroll-hint-arrow">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M8 4l6 6-6 6" stroke="#9A071A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="scroll-hint-text">スクロールで他社比較</span>
          </div>
        </div>

        <p style={{ fontSize: '12px', color: '#9CA3AF', marginBottom: '40px' }}>
          ※ 2025-2026年度の公開情報をもとに作成。料金は高3・浪人生の代表的なプランで比較。税込表示。
        </p>

        <div className="pricing-badges" style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' as const, marginBottom: '16px' }}>
          {badges.map((badge, i) => (
            <div
              key={badge}
              className={`animate-on-scroll stagger-${i + 1}`}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 28px', background: '#F8F9FA', border: '1px solid #E5E7EB', borderRadius: '12px' }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="9" stroke="#9A071A" strokeWidth="2" />
                <path d="M6 10l3 3 5-5" stroke="#9A071A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#2D2D3A' }}>{badge}</span>
            </div>
          ))}
        </div>
        <p style={{ fontSize: '15px', color: '#6B7280', lineHeight: 1.9, maxWidth: '640px', margin: '24px auto 0' }}>
          Essenceはお支払いいただく月額料金以外、一切の費用がかかりません。<br />
          いつでも退会でき、退会金もかかりません。安心してお試しください。
        </p>
      </div>
    </section>
  );
}
