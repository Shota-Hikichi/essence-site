export default function Stats() {
  return (
    <>
      {/* Logo Bar */}
      <section className="logo-bar">
        <div className="container">
          <p className="logo-bar-label">
            <span>2026</span>年度 合格実績校
          </p>
          <div className="logo-list">
            <div className="logo-item animate-on-scroll">早稲田大学</div>
            <div className="logo-item animate-on-scroll">慶應義塾大学</div>
            <div className="logo-item animate-on-scroll">明治大学</div>
            <div className="logo-item animate-on-scroll">法政大学</div>
            <div className="logo-item animate-on-scroll">立教大学</div>
            <div className="logo-item animate-on-scroll">青山学院大学</div>
            <div className="logo-item animate-on-scroll">中央大学</div>
            <div className="logo-item animate-on-scroll">京都大学</div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats animate-on-scroll" id="stats">
        <div className="container">
          <p className="section-label">Results</p>
          <h2 className="section-title">数字が証明する、確かな実績</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            2019年の設立以来、多くの受験生が Essence を通じて志望校合格を勝ち取っています。
          </p>
          <p className="animate-on-scroll" style={{ display: 'inline-block', padding: '8px 24px', border: '1px solid #9A071A', borderRadius: '100px', fontSize: '13px', fontWeight: 600, color: '#9A071A', marginTop: '20px', letterSpacing: '1px' }}>
            超少人数制だからこそ実現できる、一人ひとりへの徹底サポート
          </p>
          <div className="stats-grid">
            <div className="stat-card animate-on-scroll stagger-1">
              <div className="stat-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
              </div>
              <div className="stat-number">
                76<span>%</span>
              </div>
              <div className="stat-label">第一志望合格率</div>
            </div>
            <div className="stat-card animate-on-scroll stagger-2">
              <div className="stat-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 00-3-3.87" />
                  <path d="M16 3.13a4 4 0 010 7.75" />
                </svg>
              </div>
              <div className="stat-number">
                743<span>+</span>
              </div>
              <div className="stat-label">累計利用者数</div>
            </div>
            <div className="stat-card animate-on-scroll stagger-3">
              <div className="stat-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5" />
                </svg>
              </div>
              <div className="stat-number">
                31<span>名</span>
              </div>
              <div className="stat-label">2026年度 合格者数</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
