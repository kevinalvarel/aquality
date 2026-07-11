import { Button } from "@/components/ui/button";
import { ArrowRight, Map } from "lucide-react";
import Link from "next/link";

export function FinalCTA() {
  return (
    <section id="cta" className="relative w-full py-24 sm:py-32 overflow-hidden">
      {/* Background lines */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* Decorative background glow */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="w-[600px] h-[300px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-275 px-6 sm:px-10">
        <div className="relative rounded-3xl border border-border/50 bg-gradient-to-br from-card via-card to-primary/[0.04] p-10 sm:p-16 overflow-hidden text-center">
          {/* Dot grid */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          />

          {/* Corner glows */}
          <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-primary/8 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-cyan-500/8 blur-3xl" />

          <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
              Get Started
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground leading-snug">
              Explore Coastal Water Quality{" "}
              <span className="text-primary">with AI</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
              Start exploring Banten&apos;s beaches with AI-powered water quality
              analysis. Get accurate predictions, industrial impact assessments,
              and environmental insights — all in one platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Button size="lg" className="px-8 gap-2 text-sm group" asChild>
                <Link href="/explore">
                  Explore Beaches
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="px-8 gap-2 text-sm" asChild>
                <Link href="/map">
                  <Map className="size-4" />
                  Open Interactive Map
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
