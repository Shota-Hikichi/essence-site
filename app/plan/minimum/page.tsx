import PlanHero from '@/components/plan/PlanHero';
import PlanFeatures from '@/components/plan/PlanFeatures';
import PlanWho from '@/components/plan/PlanWho';
import PlanComparison from '@/components/plan/PlanComparison';
import PlanCta from '@/components/plan/PlanCta';

export const metadata = {
  title: 'ミニマムプラン | ESSENCE Coaching',
  description: 'まずはコーチングを試してみたい方へ。チャットサポートと月1回の電話相談で、学習の方向性を明確にします。',
};

export default function MinimumPlanPage() {
  return (
    <>
      <PlanHero
        planName="ミニマムプラン"
        tierLabel="MINIMUM PLAN"
        price="29,800"
        description="まずはコーチングを試してみたい方へ。チャットサポートと月1回の電話相談で、学習の方向性を明確にします." planId="minimum"
      />
      <PlanFeatures planType="minimum" />
      <PlanWho planType="minimum" />
      <PlanComparison currentPlan="minimum" />
      <PlanCta planId="minimum" />
    </>
  );
}
