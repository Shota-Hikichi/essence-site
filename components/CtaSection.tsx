export default function CtaSection() {
  return (
    <section className="cta-section" id="cta">
      <div className="container animate-on-scroll scale-up">
        <h2>まずは15分の無料相談から</h2>
        <p>
          受験のお悩み、学習計画の相談、プランのご質問など、お気軽にどうぞ。<br />
          無理な勧誘は一切いたしません。
        </p>
        <a href="https://qyzxk47dyy.jp.larksuite.com/scheduler/176525bd10e971ba" className="btn btn-white">
          無料相談を予約する
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 12l4-4-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </a>
        <div className="cta-slots">
          <span className="cta-slots-dot" />
          超少人数制のため、空き枠には限りがあります
        </div>
      </div>
    </section>
  );
}
