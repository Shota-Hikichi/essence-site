export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-animate-text delay-1">
            <span>本質</span>を見極め、<br />
            最短ルートで志望校へ。
          </h1>
          <p className="hero-description hero-animate-text delay-2">
            決まったカリキュラムを押し付けるのではなく、<br />
            あなたの現在地と志望校の距離を逆算して、<br />
            合格点突破に必要なことだけを設計する本質コーチング
          </p>
          <div className="hero-badges hero-animate-text delay-3">
            <div className="hero-badge-row">
              <div className="hero-badge">
                <div className="hero-badge-number">
                  76<span style={{ fontSize: '28px' }}>%</span>
                </div>
                <div className="hero-badge-label">第一志望合格率</div>
              </div>
              <div className="hero-badge">
                <div className="hero-badge-number">
                  743<span style={{ fontSize: '28px' }}>+</span>
                </div>
                <div className="hero-badge-label">累計利用者数</div>
              </div>
              <div className="hero-badge">
                <div className="hero-badge-number">No.1</div>
                <div className="hero-badge-label">早慶模試 全国1位</div>
              </div>
            </div>
          </div>
          <a href="https://qyzxk47dyy.jp.larksuite.com/scheduler/176525bd10e971ba" className="btn btn-primary hero-animate-text delay-3" style={{ marginTop: '32px' }}>
            15分無料相談を予約する
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 12l4-4-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
