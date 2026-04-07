import Link from 'next/link';

export default function Plans() {
  return (
    <section className="plans" id="plans">
      <div className="container">
        <p className="section-label">Plans</p>
        <h2 className="section-title">あなたに合ったプランを</h2>
        <p className="section-subtitle" style={{ margin: '0 auto' }}>
          すべてのプランに無料相談が含まれます。まずはお気軽にご相談ください。
        </p>
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
              <li><span className="plan-check">&#10003;</span> 月1回の電話相談</li>
              <li><span className="plan-check">&#10003;</span> ロードマップ作成</li>
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
              <li><span className="plan-check">&#10003;</span> 月2回の電話相談</li>
              <li><span className="plan-check">&#10003;</span> ロードマップ作成</li>
              <li><span className="plan-check">&#10003;</span> 学習管理</li>
              <li><span className="plan-check">&#10003;</span> 小論文添削</li>
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
              <li><span className="plan-check">&#10003;</span> 電話相談無制限</li>
              <li><span className="plan-check">&#10003;</span> ロードマップ作成</li>
              <li><span className="plan-check">&#10003;</span> 学習管理</li>
              <li><span className="plan-check">&#10003;</span> 小論文添削（無制限）</li>
              <li><span className="plan-check">&#10003;</span> 月次進捗レポート</li>
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
