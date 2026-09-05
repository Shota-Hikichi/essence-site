import Link from 'next/link';

export default function Plans() {
  return (
    <section className="plans" id="plans">
      <div className="container">
        <p className="section-label">Plans</p>
        <h2 className="section-title">あなたに合ったプランを</h2>
        <p className="section-subtitle" style={{ margin: '0 auto' }}>
          すべてのプランで引地（Hikky）本人がマンツーマンで指導します。無料相談もお気軽にどうぞ。
        </p>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            margin: '16px auto 0',
            padding: '8px 20px',
            background: '#FEF3F3',
            border: '1px solid #F4C0C0',
            borderRadius: '999px',
            fontSize: '13px',
            color: '#9A071A',
            fontWeight: 600,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
          </svg>
          全プラン、引地本人によるマンツーマン指導
        </div>
        <div className="plans-grid">
          {/* Minimum */}
          <div className="plan-card animate-on-scroll stagger-1">
            <h3 className="plan-name">ミニマム</h3>
            <div className="plan-price">
              &yen;29,800<span>/月</span>
            </div>
            <p className="plan-period">税込</p>
            <ul className="plan-features">
              <li><span className="plan-check">&#10003;</span> チャットサポート</li>
              <li><span className="plan-check">&#10003;</span> 電話相談 週1回（30分/回）</li>
              <li><span className="plan-check">&#10003;</span> 学習管理</li>
            </ul>
            <Link href="/plan/minimum" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }}>
              詳細を見る
            </Link>
          </div>

          {/* Standard */}
          <div className="plan-card featured animate-on-scroll stagger-2">
            <span className="plan-badge">人気 No.1</span>
            <h3 className="plan-name">スタンダード</h3>
            <div className="plan-price">
              &yen;39,800<span>/月</span>
            </div>
            <p className="plan-period">税込</p>
            <ul className="plan-features">
              <li><span className="plan-check">&#10003;</span> チャットサポート</li>
              <li><span className="plan-check">&#10003;</span> 電話相談 週2回（1時間/回）</li>
              <li><span className="plan-check">&#10003;</span> ロードマップ作成</li>
              <li><span className="plan-check">&#10003;</span> 学習管理</li>
              <li><span className="plan-check">&#10003;</span> 小論文添削</li>
              <li><span className="plan-check">&#10003;</span> 月次進捗レポート</li>
            </ul>
            <Link href="/plan/standard" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              詳細を見る
            </Link>
          </div>

          {/* Full Commit */}
          <div className="plan-card animate-on-scroll stagger-3">
            <h3 className="plan-name">フルコミット</h3>
            <div className="plan-price">
              &yen;49,800<span>/月</span>
            </div>
            <p className="plan-period">税込</p>
            <ul className="plan-features">
              <li><span className="plan-check">&#10003;</span> チャットサポート</li>
              <li><span className="plan-check">&#10003;</span> 電話相談 回数・時間無制限</li>
              <li><span className="plan-check">&#10003;</span> ロードマップ作成</li>
              <li><span className="plan-check">&#10003;</span> 学習管理</li>
              <li><span className="plan-check">&#10003;</span> 小論文添削（無制限）</li>
              <li><span className="plan-check">&#10003;</span> 週次進捗レポート</li>
            </ul>
            <Link href="/plan/fullcommit" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }}>
              詳細を見る
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
