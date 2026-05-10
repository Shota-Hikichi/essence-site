interface PlanWhoProps {
  planType: 'minimum' | 'standard' | 'fullcommit';
}

const whoData = {
  minimum: [
    '自分で学習計画を立てられるが、方向性の確認がほしい',
    '塾や予備校と併用して、コーチングを追加したい',
    'まずはEssenceのコーチングを体験してみたい',
    '受験勉強の相談相手がほしい',
  ],
  standard: [
    '何から手を付ければいいかわからない',
    '自分だけの学習計画を作ってほしい',
    '早慶・GMARCHに確実に合格したい',
    '小論文や志望理由書の添削も受けたい',
  ],
  fullcommit: [
    '絶対に第一志望に合格したい',
    '電話相談 回数・時間無制限で徹底的に管理してほしい',
    '小論文や志望理由書を何度でも添削してほしい',
    '保護者に進捗を共有できるレポートがほしい',
  ],
};

export default function PlanWho({ planType }: PlanWhoProps) {
  const items = whoData[planType];

  return (
    <section className="plan-who">
      <div className="container">
        <h2 className="section-title">こんな方におすすめ</h2>
        <div className="who-grid">
          {items.map((item) => (
            <div className="who-item" key={item}>
              <span className="who-check">&#10003;</span>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
