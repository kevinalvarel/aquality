import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Waves, TreePalm } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section id="hero" className="relative w-full overflow-hidden">
      <div className="mx-auto w-full max-w-275 px-6 pt-44 pb-32 sm:px-10 sm:pt-56 sm:pb-40">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Main headline */}
          <h1
            className="hero-fade-up text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter leading-[1.08] text-foreground"
            style={{ animationDelay: "80ms" }}
          >
            Pantau Pesisir,{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-primary via-chart-2 to-primary bg-clip-text text-transparent">
                Lindungi Masa Depan
              </span>
              <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="hero-fade-up mt-7 text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed"
            style={{ animationDelay: "160ms" }}
          >
            Analisis abrasi, pemantauan kesehatan mangrove, dan peta interaktif
            terpadu dalam satu platform berbasis web untuk pengelolaan daerah
            pesisir yang lebih baik.
          </p>

          {/* CTA buttons */}
          <div
            className="hero-fade-up mt-10 flex flex-col sm:flex-row gap-3 items-center"
            style={{ animationDelay: "240ms" }}
          >
            <Button size="lg" className="px-7 gap-2 text-sm">
              Mulai Pemantauan
              <ArrowRight className="size-4 transition-transform group-hover/button:translate-x-0.5" />
            </Button>
            <Button variant="outline" size="lg" className="px-7 gap-2 text-sm">
              Jelajahi Fitur
            </Button>
          </div>

          {/* Stats row */}
          <div
            className="hero-fade-up mt-16 grid grid-cols-3 gap-6 sm:gap-12 w-full max-w-lg"
            style={{ animationDelay: "360ms" }}
          >
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center justify-center size-10 rounded-xl bg-primary/8 text-primary">
                <MapPin className="size-4.5" />
              </div>
              <span className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
                50+
              </span>
              <span className="text-xs text-muted-foreground">
                Titik Pantau
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center justify-center size-10 rounded-xl bg-chart-2/10 text-chart-2">
                <Waves className="size-4.5" />
              </div>
              <span className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
                1.2K+
              </span>
              <span className="text-xs text-muted-foreground">Data Abrasi</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center justify-center size-10 rounded-xl bg-green-500/10 text-green-600 dark:text-green-400">
                <TreePalm className="size-4.5" />
              </div>
              <span className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
                300+
              </span>
              <span className="text-xs text-muted-foreground">
                Zona Mangrove
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
