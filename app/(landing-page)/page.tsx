import { About } from "@/components/landing-page/layout/about";
import { Features } from "@/components/landing-page/layout/features";
import { FinalCTA } from "@/components/landing-page/layout/final-cta";
import { Hero } from "@/components/landing-page/layout/hero";
import { HowItWorks } from "@/components/landing-page/layout/how-it-works";
import { MLOutputs } from "@/components/landing-page/layout/ml-outputs";
import { WhyAquality } from "@/components/landing-page/layout/why-aquality";

export default function Home() {
  return (
    <main id="main-content" className="flex flex-1 flex-col relative">
      <Hero />
      <About />
      <Features />
      <HowItWorks />
      <MLOutputs />
      <WhyAquality />
      <FinalCTA />
    </main>
  );
}
