import Hero from '@/components/Hero';
import Philosophy from '@/components/Philosophy';
import Stats from '@/components/Stats';
import Services from '@/components/Services';
import Approach from '@/components/Approach';
import Flow from '@/components/Flow';
import Profile from '@/components/Profile';
import Testimonials from '@/components/Testimonials';
import PricingCompare from '@/components/PricingCompare';
import Plans from '@/components/Plans';
import CtaSection from '@/components/CtaSection';
import FloatingCta from '@/components/FloatingCta';

export default function Home() {
  return (
    <>
      <Hero />
      <Philosophy />
      <Stats />
      <Services />
      <Approach />
      <Flow />
      <Profile />
      <Testimonials />
      <PricingCompare />
      <Plans />
      <CtaSection />
      <FloatingCta />
    </>
  );
}
