import PlanHero from '@/components/plan/PlanHero';
import PlanApproach from '@/components/plan/PlanApproach';
import PlanFeatures from '@/components/plan/PlanFeatures';
import RoadmapSample from '@/components/plan/RoadmapSample';
import PlanWho from '@/components/plan/PlanWho';
import PlanComparison from '@/components/plan/PlanComparison';
import PlanCta from '@/components/plan/PlanCta';

export const metadata = {
  title: 'フルコミットプラン',
  description: '本気で第一志望合格を目指す方向けの最上位プラン。電話相談 回数・時間無制限、無制限の小論文添削、週次レポートで徹底伴走。大学受験オンラインコーチング「Essence」。',
  alternates: { canonical: 'https://www.essence-coaching.net/plan/fullcommit' },
  openGraph: {
    title: 'フルコミットプラン | Essence',
    description: '回数・時間無制限の面談 × 無制限添削 × 週次レポートで徹底伴走。',
    url: 'https://www.essence-coaching.net/plan/fullcommit',
    type: 'website',
  },
};

export default function FullcommitPlanPage() {
  return (
    <>
      <PlanHero
        planName="フルコミットプラン"
        tierLabel="FULL COMMIT PLAN"
        price="49,800"
        description="本気で第一志望に合格したい方へ。電話相談 回数・時間無制限、小論文添削無制限、月次レポートで徹底的にサポートします。Essenceの全サービスをフル活用できる最上位プランです。" planId="fullcommit"
      />
      <PlanApproach />
      <PlanFeatures planType="fullcommit" />
      <RoadmapSample variant="fullcommit" />
      <PlanWho planType="fullcommit" />
      <PlanComparison currentPlan="fullcommit" />
      <PlanCta planId="fullcommit" />
    </>
  );
}
