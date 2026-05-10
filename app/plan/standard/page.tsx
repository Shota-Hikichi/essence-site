import PlanHero from '@/components/plan/PlanHero';
import PlanApproach from '@/components/plan/PlanApproach';
import PlanFeatures from '@/components/plan/PlanFeatures';
import RoadmapSample from '@/components/plan/RoadmapSample';
import PlanWho from '@/components/plan/PlanWho';
import PlanComparison from '@/components/plan/PlanComparison';
import PlanCta from '@/components/plan/PlanCta';

export const metadata = {
  title: 'スタンダードプラン',
  description: 'Essenceの最も人気なプラン。あなた専用のロードマップを作成し、電話相談 週2回（1時間/回）と小論文添削で確実に第一志望合格へ導きます。大学受験オンラインコーチング「Essence」。',
  alternates: { canonical: 'https://www.essence-coaching.net/plan/standard' },
  openGraph: {
    title: 'スタンダードプラン | Essence',
    description: '専用ロードマップ × 電話相談 週2回 × 小論文添削で第一志望合格へ。',
    url: 'https://www.essence-coaching.net/plan/standard',
    type: 'website',
  },
};

export default function StandardPlanPage() {
  return (
    <>
      <PlanHero
        planName="スタンダードプラン"
        tierLabel="STANDARD PLAN"
        price="39,800"
        description="Essenceの核心。あなた専用のロードマップを作成し、電話相談 週2回（1時間/回）と小論文添削で確実に合格へ導きます。最も多くの合格者を輩出しているプランです。"
        showPopularBadge planId="standard"
      />
      <PlanApproach />
      <PlanFeatures planType="standard" />
      <RoadmapSample variant="standard" />
      <PlanWho planType="standard" />
      <PlanComparison currentPlan="standard" />
      <PlanCta planId="standard" />
    </>
  );
}
