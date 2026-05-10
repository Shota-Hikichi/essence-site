import PlanHero from '@/components/plan/PlanHero';
import PlanFeatures from '@/components/plan/PlanFeatures';
import PlanWho from '@/components/plan/PlanWho';
import PlanComparison from '@/components/plan/PlanComparison';
import PlanCta from '@/components/plan/PlanCta';

export const metadata = {
  title: 'ミニマムプラン',
  description: 'まずはEssenceのコーチングを試してみたい方向け。チャットサポートと電話相談 週1回（30分/回）で、学習の方向性を明確にします。大学受験オンラインコーチング「Essence」の入門プラン。',
  alternates: { canonical: 'https://www.essence-coaching.net/plan/minimum' },
  openGraph: {
    title: 'ミニマムプラン | Essence',
    description: 'チャットサポートと電話相談 週1回（30分/回）で学習の方向性を明確化。',
    url: 'https://www.essence-coaching.net/plan/minimum',
    type: 'website',
  },
};

export default function MinimumPlanPage() {
  return (
    <>
      <PlanHero
        planName="ミニマムプラン"
        tierLabel="MINIMUM PLAN"
        price="29,800"
        description="まずはコーチングを試してみたい方へ。チャットサポートと電話相談 週1回（30分/回）で、学習の方向性を明確にします." planId="minimum"
      />
      <PlanFeatures planType="minimum" />
      <PlanWho planType="minimum" />
      <PlanComparison currentPlan="minimum" />
      <PlanCta planId="minimum" />
    </>
  );
}
