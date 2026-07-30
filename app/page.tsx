import DecisionIntelligence from "@/components/decision-intelligence";
import EasyToGetStarted from "@/components/easy-to-get-started";
import FAQ from "@/components/faq";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import IndustriesWeServe from "@/components/industries-we-serve";
import IntelligenceSection from "@/components/intelligence-section";
import Navbar from "@/components/navbar";
import RadialOrbitalTimelineSection from "@/components/radial-orbital-timeline-section";
import { Slider } from "@/components/slider";
import SplashScreen from "@/components/splash-screen";
import FennixDecision from "@/components/stacking-cards/fennix-decision";
import { DeferredAfterSplash } from "@/components/deferred-after-splash";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8F9FA]">
      <SplashScreen />
      <Navbar />
      <Hero />
      <Slider />
      <DeferredAfterSplash>
        <RadialOrbitalTimelineSection />
        <IntelligenceSection />
        <EasyToGetStarted />
        <FennixDecision />
        <IndustriesWeServe />
        <DecisionIntelligence />
      </DeferredAfterSplash>
      <FAQ />
      <Footer />
    </main>
  );
}
