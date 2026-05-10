export default function Philosophy() {
  return (
    <section className="animate-on-scroll" style={{ padding: '120px 0', background: '#fff' }}>
      <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
        <p className="section-label" style={{ color: 'var(--primary)' }}>Philosophy</p>
        <h2
          className="philosophy-heading"
          style={{
            fontFamily: "'Noto Serif JP', serif",
            fontSize: '22px',
            fontWeight: 500,
            lineHeight: 2.8,
            color: '#2D2D3A',
            marginBottom: '36px',
            letterSpacing: '0.5px',
          }}
        >
          <span style={{ color: 'var(--primary)' }}>自分で自分を改善できる考え方</span>、<br />
          そして<br />
          <span style={{ color: 'var(--primary)' }}>
            どこに向けて努力をしていけばいいかの<br className="mobile-br" />軌道修正
          </span>を<br />
          二人三脚で行う、唯一の場所。
        </h2>
        <div
          style={{
            width: '60px',
            height: '1px',
            background: 'var(--primary)',
            margin: '0 auto 36px',
            opacity: 0.4,
          }}
        />
        <p
          className="philosophy-sub"
          style={{
            fontSize: '14px',
            color: '#9CA3AF',
            lineHeight: 2.2,
            maxWidth: '560px',
            margin: '0 auto',
            letterSpacing: '0.3px',
          }}
        >
          受験に必要なのは、誰かに教わった知識ではなく<br />
          「自分で考え、自分で改善し続ける力」です。<br />
          Essenceはその力を引き出しながら、合格までの道筋を一緒に歩みます。
        </p>
        <p
          className="philosophy-badge animate-on-scroll"
          style={{
            display: 'inline-block',
            padding: '10px 28px',
            border: '1px solid var(--primary)',
            borderRadius: '100px',
            fontSize: '13px',
            fontWeight: 600,
            color: 'var(--primary)',
            marginTop: '36px',
            letterSpacing: '1px',
          }}
        >
          超少人数制だからこそ実現できる、一人ひとりへの徹底サポート
        </p>
      </div>
    </section>
  );
}
