export default function Flow() {
  const steps = [
    { number: 1, title: '無料相談の予約', desc: 'LINEまたはWebから15分の無料電話相談を予約します。' },
    { number: 2, title: 'ヒアリング', desc: '現在の学習状況や志望校をお伺いし、最適なプランをご提案します。' },
    { number: 3, title: 'プラン決定・契約', desc: 'ご納得いただいた上でプランを決定。すぐにコーチングを開始できます。' },
    { number: 4, title: 'コーチング開始', desc: '引地（Hikky）本人がマンツーマンで伴走。ロードマップに基づき、チャット・電話相談で合格まで直接導きます。' },
  ];

  return (
    <section className="flow animate-on-scroll" id="flow">
      <div className="container">
        <p className="section-label">How It Works</p>
        <h2 className="section-title">ご利用までの流れ</h2>
        <p className="section-subtitle" style={{ margin: '0 auto' }}>
          まずは15分の無料相談から。お気軽にお問い合わせください。
        </p>
        <div className="flow-steps">
          {steps.map((step) => (
            <div className={`flow-step animate-on-scroll stagger-${step.number}`} key={step.number}>
              <div className="flow-step-number">{step.number}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
