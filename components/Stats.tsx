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
    </>
  );
}
