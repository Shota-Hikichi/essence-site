import styles from './approach.module.css';

const leftItems = [
  '全員同じカリキュラムを一律に提供',
  '教材・進度が決まっており柔軟性が低い',
  '生徒の性格や生活環境は考慮されにくい',
];

const rightItems = [
  { color: '#9A071A', text: '志望校と現状の差を逆算し、最短ルートを設計' },
  { color: '#C9A84C', text: '学習環境・本人の性格を加味した現実的な計画' },
  { color: '#0F9D6E', text: '「どうやったら距離を詰められるか」を一緒に考え続ける' },
];

export default function Approach() {
  return (
    <section className="animate-on-scroll" id="approach">
      <div className="approach-section-inner" style={{ background: 'linear-gradient(135deg,#3a4a4f 0%,#4a5a5f 50%,#3d4d52 100%)', color: '#fff' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p className="section-label" style={{ color: 'rgba(255,255,255,0.6)' }}>Our Approach</p>
          <h2 className="section-title" style={{ color: '#fff' }}>
            カリキュラムの押し付けではない、<br />逆算型パーソナルコーチング
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.65)', maxWidth: '640px', margin: '0 auto 56px', lineHeight: 1.9 }}>
            Essenceは決まったカリキュラムを全員に与える塾ではありません。<br />
            志望校と現状の差を逆算し、一人ひとりに合った「距離の詰め方」を一緒に考え続けます。
          </p>

          <div className={styles.grid}>
            {/* 一般的な塾 */}
            <div>
              <h3 className={styles.h3} style={{ textAlign: 'center', fontWeight: 700, marginBottom: '24px', color: 'rgba(255,255,255,0.85)' }}>
                一般的な塾・予備校
              </h3>
              <div className={styles.card} style={{ background: 'rgba(255,255,255,0.95)', borderRadius: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ background: '#E5E7EB', borderRadius: '10px', padding: '14px 28px', fontSize: '14px', fontWeight: 700, color: '#6B7280', width: '100%', textAlign: 'center', border: '1px solid #D4D4D8' }}>
                    固定カリキュラム
                  </div>
                  <svg width="24" height="40" viewBox="0 0 24 40" style={{ margin: '4px 0' }}>
                    <path d="M12 0v32M6 26l6 8 6-8" fill="none" stroke="#D4D4D8" strokeWidth="2" />
                  </svg>
                  <div className={styles.studentRow} style={{ gap: '12px', justifyContent: 'center', width: '100%' }}>
                    {['A', 'B', 'C'].map((letter) => (
                      <div key={letter} style={{ flex: 1, background: '#F3F4F6', borderRadius: '10px', padding: '16px 8px', textAlign: 'center', border: '1px solid #E5E7EB' }}>
                        <div style={{ width: '36px', height: '36px', background: '#D4D4D8', borderRadius: '50%', margin: '0 auto 8px' }} />
                        <span style={{ fontSize: '11px', color: '#9CA3AF' }}>生徒{letter}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
                    {leftItems.map(item => (
                      <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: '#9CA3AF' }}>
                        <span style={{ color: '#D4D4D8', flexShrink: 0 }}>&#10005;</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <p className={styles.descText} style={{ marginTop: '20px', fontSize: '14px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, textAlign: 'center' }}>
                決められたカリキュラムに生徒を当てはめるため、個々の弱点や志望校との距離に合った対策が取りにくい。
              </p>
            </div>

            {/* Essence */}
            <div>
              <h3 className={styles.h3} style={{ textAlign: 'center', fontWeight: 700, marginBottom: '24px', color: '#fff' }}>
                Essence のコーチング
              </h3>
              <div className={styles.card} style={{ background: 'linear-gradient(135deg,rgba(255,255,255,0.95),rgba(230,240,235,0.95))', borderRadius: '20px', border: '2px solid rgba(154,7,26,0.2)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ background: '#9A071A', borderRadius: '10px', padding: '14px 20px', fontSize: '14px', fontWeight: 700, color: '#fff', width: '100%', textAlign: 'center' }}>
                    コーチのヒアリングと逆算設計
                  </div>
                  <svg width="24" height="40" viewBox="0 0 24 40" style={{ margin: '4px 0' }}>
                    <path d="M12 0v32M6 26l6 8 6-8" fill="none" stroke="#9A071A" strokeWidth="2" />
                    <path d="M18 8l-6-8-6 8" fill="none" stroke="#9A071A" strokeWidth="1.5" strokeDasharray="3,3" />
                  </svg>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                    {rightItems.map((item) => (
                      <div key={item.text} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: '#2D2D3A', background: '#fff', border: `2px solid ${item.color}`, borderRadius: '10px', padding: '12px 16px' }}>
                        <span style={{ color: item.color, flexShrink: 0, marginTop: '2px' }}>&#10003;</span>
                        <span>{item.text}</span>
                      </div>
                    ))}
                  </div>
                  <svg width="24" height="32" viewBox="0 0 24 32" style={{ margin: '8px 0' }}>
                    <path d="M12 0v24M6 18l6 8 6-8" fill="none" stroke="#0F9D6E" strokeWidth="2" />
                  </svg>
                  <div style={{ background: '#0F9D6E', borderRadius: '10px', padding: '10px 24px', fontSize: '13px', fontWeight: 700, color: '#fff', textAlign: 'center', width: '100%' }}>
                    あなただけのロードマップ
                  </div>
                </div>
              </div>
              <p className={styles.descText} style={{ marginTop: '20px', fontSize: '14px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, textAlign: 'center' }}>
                志望校との距離を逆算し、本人の性格・生活リズム・得意不得意を加味して「どうすれば最短で合格に届くか」を一緒に考え続ける。だから一人ひとり計画が違います。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
