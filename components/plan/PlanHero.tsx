import Link from 'next/link';

interface PlanHeroProps {
  planName: string;
  tierLabel: string;
  price: string;
  description: string;
  showPopularBadge?: boolean;
  planId?: string;
}

export default function PlanHero({ planName, tierLabel, price, description, showPopularBadge, planId }: PlanHeroProps) {
  return (
    <section className="plan-hero">
      <div className="container">
        <Link href="/#plans" className="back-link">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          プラン一覧に戻る
        </Link>
        <div className="plan-hero-content">
          <span className="plan-tier-label" style={showPopularBadge ? { display: 'inline-flex', alignItems: 'center', gap: '8px' } : undefined}>
            {tierLabel}
            {showPopularBadge && (
              <span
                style={{
                  background: 'var(--primary)',
                  color: '#fff',
                  padding: '3px 12px',
                  borderRadius: '100px',
                  fontSize: '11px',
                }}
              >
                人気 No.1
              </span>
            )}
          </span>
          <h1>{planName}</h1>
          <p className="plan-hero-desc">{description}</p>
          <div className="plan-hero-price">
            <span className="price-amount">&yen;{price}</span>
            <span className="price-period">/月（税込）</span>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' as const }}>
            <a href="https://qyzxk47dyy.jp.larksuite.com/scheduler/176525bd10e971ba" className="btn btn-primary">
              無料相談で詳しく聞く
            </a>
            {planId && (
              <Link href={`/checkout?plan=${planId}`} className="btn btn-outline">
                このプランに申し込む
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
