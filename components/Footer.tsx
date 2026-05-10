export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-brand">
          <div className="logo">
            <span className="logo-text">ESSENCE</span>
          </div>
          <p>
            オンライン受験コーチング<br />
            あなたの「本質」を見極め、最短ルートで合格へ。
          </p>
        </div>
        <div>
          <h4>サービス</h4>
          <ul>
            <li><a href="/#services">サービス内容</a></li>
            <li><a href="/#plans">料金プラン</a></li>
            <li><a href="/#flow">ご利用の流れ</a></li>
            <li><a href="/#testimonials">メンバーの声</a></li>
          </ul>
        </div>
        <div>
          <h4>法的情報</h4>
          <ul>
            <li><a href="/tokushoho">特定商取引法に基づく表記</a></li>
          </ul>
        </div>
        <div className="footer-bottom" style={{ gridColumn: '1 / -1' }}>
          <p>&copy; 2019-2026 ESSENCE Coaching. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
