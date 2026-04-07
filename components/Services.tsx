import svcStyles from './services.module.css';

export default function Services() {
  return (
    <section className="services" id="services">
      <div className="container">
        <p className="section-label animate-on-scroll">Services</p>
        <h2 className="section-title animate-on-scroll">あなたの合格を支える4つのサポート</h2>
        <p className="section-subtitle animate-on-scroll" style={{ margin: '0 auto' }}>
          チャットから電話相談まで、あらゆる場面であなたの受験を支えます。
        </p>
        <div className={`services-grid ${svcStyles.grid}`}>
          <div className="service-card animate-on-scroll stagger-1">
            <div className="service-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9A071A" strokeWidth="2">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
            </div>
            <h3>チャットサポート</h3>
            <p>Discordを使った即時対応。勉強の疑問や不安をいつでも相談できます。</p>
          </div>
          <div className="service-card animate-on-scroll stagger-2">
            <div className="service-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9A071A" strokeWidth="2">
                <path d="M15.05 5A5 5 0 0119 8.95M15.05 1A9 9 0 0123 8.94m-1 7.98v3a2 2 0 01-2.18 2A19.79 19.79 0 013.07 2.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
            </div>
            <h3>電話相談</h3>
            <p>定期的な電話相談で学習状況を確認し、戦略を調整します。</p>
          </div>
          <div className="service-card animate-on-scroll stagger-3">
            <div className="service-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9A071A" strokeWidth="2">
                <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
              </svg>
            </div>
            <h3>ロードマップ作成</h3>
            <p>志望校に合わせた完全オーダーメイドの学習計画を作成します。</p>
          </div>
          <div className="service-card animate-on-scroll stagger-4">
            <div className="service-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9A071A" strokeWidth="2">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </div>
            <h3>小論文・文章添削</h3>
            <p>プロの視点で小論文・志望理由書を丁寧に添削し、合格水準へ引き上げます。</p>
          </div>
        </div>
      </div>
    </section>
  );
}
