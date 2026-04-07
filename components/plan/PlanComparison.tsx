import Link from 'next/link';

interface PlanComparisonProps {
  currentPlan: 'minimum' | 'standard' | 'fullcommit';
}

const rows = [
  { label: 'チャットサポート', minimum: '\u2713', standard: '\u2713', fullcommit: '\u2713（最優先）' },
  { label: '電話相談', minimum: '月1回', standard: '月2回', fullcommit: '無制限' },
  { label: '学習管理', minimum: '\u2713', standard: '\u2713', fullcommit: '\u2713' },
  { label: 'ロードマップ作成', minimum: '\u2014', standard: '\u2713', fullcommit: '\u2713（毎月更新）' },
  { label: '小論文添削', minimum: '\u2014', standard: '月3回', fullcommit: '無制限' },
  { label: '月次進捗レポート', minimum: '\u2014', standard: '\u2014', fullcommit: '\u2713' },
  { label: '料金（税込）', minimum: '\u00A529,800', standard: '\u00A539,800', fullcommit: '\u00A549,800' },
];

const planNames = {
  minimum: 'ミニマム',
  standard: 'スタンダード',
  fullcommit: 'フルコミット',
};

const otherPlanLinks: Record<string, { href: string; label: string }[]> = {
  minimum: [
    { href: '/plan/standard', label: 'スタンダードプランを見る' },
    { href: '/plan/fullcommit', label: 'フルコミットプランを見る' },
  ],
  standard: [
    { href: '/plan/minimum', label: 'ミニマムプランを見る' },
    { href: '/plan/fullcommit', label: 'フルコミットプランを見る' },
  ],
  fullcommit: [
    { href: '/plan/minimum', label: 'ミニマムプランを見る' },
    { href: '/plan/standard', label: 'スタンダードプランを見る' },
  ],
};

export default function PlanComparison({ currentPlan }: PlanComparisonProps) {
  const plans: ('minimum' | 'standard' | 'fullcommit')[] = ['minimum', 'standard', 'fullcommit'];

  return (
    <section className="plan-comparison">
      <div className="container">
        <h2 className="section-title">プラン比較</h2>
        <div className="comparison-table-wrap">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>サポート内容</th>
                {plans.map((p) => (
                  <th key={p} className={p === currentPlan ? 'current' : ''}>
                    {planNames[p]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label}>
                  <td>{row.label}</td>
                  {plans.map((p) => (
                    <td key={p} className={p === currentPlan ? 'current' : ''}>
                      {row.label === '料金（税込）' ? (
                        <strong>{row[p]}</strong>
                      ) : (
                        row[p]
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="comparison-links">
          {otherPlanLinks[currentPlan].map((link) => (
            <Link key={link.href} href={link.href} className="btn btn-outline">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
