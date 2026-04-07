import styles from './plan-responsive.module.css';

export default function PlanApproach() {
  return (
    <section style={{ padding: '80px 0', background: 'var(--white)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '3px',
              color: 'var(--primary)',
              textTransform: 'uppercase' as const,
            }}
          >
            Our Approach
          </span>
          <h2 className="section-title" style={{ marginTop: '12px' }}>
            Essenceのコーチングが<br />塾・予備校と異なる理由
          </h2>
        </div>
        <div className={styles.approachGrid}>
          {/* Traditional */}
          <div style={{ padding: '32px', border: '1px solid var(--border)', borderRadius: '16px', background: 'var(--light-bg)' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '16px', letterSpacing: '1px' }}>
              一般的な塾・予備校
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column' as const, gap: '14px' }}>
              {[
                '全員同じカリキュラムを一律に提供',
                '教材・進度が決まっており柔軟性が低い',
                '生徒の性格や生活環境は考慮されにくい',
              ].map((text) => (
                <li key={text} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                  <span style={{ color: '#D4D4D8', fontSize: '16px', flexShrink: 0 }}>&#10005;</span>
                  {text}
                </li>
              ))}
            </ul>
          </div>
          {/* Essence */}
          <div style={{ padding: '32px', border: '2px solid var(--primary)', borderRadius: '16px', background: 'var(--white)', position: 'relative' as const }}>
            <div
              style={{
                position: 'absolute' as const,
                top: '-12px',
                left: '20px',
                background: 'var(--primary)',
                color: '#fff',
                padding: '3px 14px',
                borderRadius: '100px',
                fontSize: '11px',
                fontWeight: 700,
              }}
            >
              Essenceの考え方
            </div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--primary)', marginBottom: '16px', letterSpacing: '1px' }}>
              逆算型パーソナルコーチング
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column' as const, gap: '14px' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: 'var(--text)' }}>
                <span style={{ color: 'var(--primary)', fontSize: '16px', flexShrink: 0 }}>&#10003;</span>
                志望校と現状の差を逆算し、最短ルートを設計
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: 'var(--text)' }}>
                <span style={{ color: 'var(--primary)', fontSize: '16px', flexShrink: 0 }}>&#10003;</span>
                学習環境・本人の性格を加味した現実的な計画
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: 'var(--text)' }}>
                <span style={{ color: 'var(--primary)', fontSize: '16px', flexShrink: 0 }}>&#10003;</span>
                「どうやったら距離を詰められるか」を一緒に考え続ける
              </li>
            </ul>
          </div>
        </div>
        <p style={{ textAlign: 'center', marginTop: '32px', fontSize: '15px', color: 'var(--text-secondary)', maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.9 }}>
          カリキュラムを押し付けるのではなく、あなたの志望校・現在地・性格・生活リズムのすべてを踏まえて「合格までの距離をどう詰めるか」を一緒に考え抜く。それがEssenceのコーチングです。
        </p>
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <a href="/#approach" style={{ fontSize: '14px', color: 'var(--primary)', fontWeight: 600 }}>
            詳しい比較を見る &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
