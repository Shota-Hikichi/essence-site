import Hero from '@/components/Hero';
import HeroSlots from '@/components/HeroSlots';
import ThinkingProcess from '@/components/ThinkingProcess';
import Philosophy from '@/components/Philosophy';
import Stats from '@/components/Stats';
import Services from '@/components/Services';
import Approach from '@/components/Approach';
import Flow from '@/components/Flow';
import Profile from '@/components/Profile';
import Testimonials from '@/components/Testimonials';
import ReportSample from '@/components/ReportSample';
// import Delto from '@/components/Delto'; // 一時非表示
import PricingCompare from '@/components/PricingCompare';
import Plans from '@/components/Plans';
import CtaSection from '@/components/CtaSection';
import FAQ from '@/components/FAQ';
import News from '@/components/News';
import ContactForm from '@/components/ContactForm';
import FloatingCta from '@/components/FloatingCta';

export default function Home() {
  return (
    <>
      <Hero />
      <HeroSlots />
      <ThinkingProcess />
      <Philosophy />
      <Stats />
      <Services />
      {/* <Delto /> 一時非表示 */}
      <ReportSample />
      <Approach />
      <Flow />
      <Profile />
      <Testimonials />
      <PricingCompare />
      <Plans />
      <CtaSection />
      <FAQ />
      <News />
      <ContactForm />
      <FloatingCta />
    </>
  );
}
