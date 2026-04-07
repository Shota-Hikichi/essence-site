export default function Testimonials() {
  const testimonials = [
    {
      initial: 'D',
      avatarClass: 'a1',
      name: 'D.S さん',
      uni: '早稲田大学 合格',
      text: 'Essenceのロードマップのおかげで、何をすべきかが明確になりました。チャットですぐに相談できる環境が、精神的にも大きな支えでした。',
    },
    {
      initial: 'Y',
      avatarClass: 'a2',
      name: 'Y.Y さん',
      uni: '慶應義塾大学 合格',
      text: '独学では限界を感じていましたが、引地さんの的確なアドバイスで効率的に勉強できるようになりました。電話相談での戦略調整が本当にありがたかったです。',
    },
    {
      initial: 'R',
      avatarClass: 'a3',
      name: 'R.S さん',
      uni: '明治大学・法政大学 合格',
      text: '小論文の添削が丁寧で、回数を重ねるごとに自信がつきました。受験の不安を一人で抱えなくていいと思えたのが、一番大きかったです。',
    },
  ];

  return (
    <section className="testimonials animate-on-scroll" id="testimonials">
      <div className="container">
        <p className="section-label">Voices</p>
        <h2 className="section-title">メンバーの声</h2>
        <p className="section-subtitle" style={{ margin: '0 auto' }}>
          Essenceで合格を勝ち取った先輩たちのリアルな声をお届けします。
        </p>
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div className={`testimonial-card animate-on-scroll stagger-${i + 1}`} key={t.name}>
              <span
                className="testimonial-quote"
                style={{ fontFamily: 'Georgia, serif', color: 'rgba(154,7,26,0.12)' }}
              >
                &ldquo;
              </span>
              <div className="testimonial-header">
                <div className={`testimonial-avatar ${t.avatarClass}`}>{t.initial}</div>
                <div className="testimonial-info">
                  <h4>{t.name}</h4>
                  <p className="testimonial-uni">{t.uni}</p>
                </div>
              </div>
              <p>{t.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
