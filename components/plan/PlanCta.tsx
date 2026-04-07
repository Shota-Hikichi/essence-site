import Link from 'next/link';

interface PlanCtaProps {
  planId?: string;
}

export default function PlanCta({ planId }: PlanCtaProps) {
  return (
    <section className="plan-cta">
      <div className="container">
        <h2>まずは15分の無料相談から</h2>
        <p>あなたに最適なプランをご提案します。無理な勧誘は一切いたしません。</p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' as const }}>
          <a href="https://qyzxk47dyy.jp.larksuite.com/scheduler/176525bd10e971ba" className="btn btn-white">
            無料相談を予約する
          </a>
          {planId && (
            <Link href={`/checkout?plan=${planId}`} className="btn btn-white" style={{ background: 'transparent', border: '2px solid #fff', color: '#fff' }}>
              このプランに申し込む
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
