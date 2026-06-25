import { About } from "@/components/landing-page/layout/about";
import { Features } from "@/components/landing-page/layout/features";
import { Hero } from "@/components/landing-page/layout/hero";
import { HowItWorks } from "@/components/landing-page/layout/how-it-works";

export default function Home() {
  return (
    <main id="main-content" className="flex flex-1 flex-col relative">
      <Hero />
      <About />
      <Features />
      <HowItWorks />
    </main>
  );
}
