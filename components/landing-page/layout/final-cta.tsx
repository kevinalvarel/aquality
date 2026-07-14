import DotField from "@/components/shaders/dot-field";
import { Button } from "@/components/ui/button";
import { ArrowRight, Map } from "lucide-react";
import Link from "next/link";

export function FinalCTA() {
  return (
    <section
      id="cta"
      className="relative w-full py-24 sm:py-32 overflow-hidden"
    >
      <div className="mx-auto w-full max-w-275 px-6 sm:px-10">
        <div className="relative rounded-3xl border border-border/50 bg-gradient-to-br from-card via-card to-primary/[0.04] p-10 sm:p-16 overflow-hidden text-center">
          <DotField
            className="absolute inset-0 pointer-events-none"
            dotRadius={1.5}
            dotSpacing={14}
            bulgeStrength={67}
            glowRadius={0}
            sparkle={false}
            waveAmplitude={0}
            cursorRadius={500}
            gradientFrom="#7508cc"
            gradientTo="#5795d9"
            cursorForce={0.1}
            bulgeOnly
          />
          <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
              Mulai Sekarang
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground leading-snug">
              Jelajahi Kualitas Air Pesisir{" "}
              <span className="text-primary">dengan AI</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
              Mulai jelajahi pantai-pantai Banten dengan analisis kualitas air
              bertenaga AI. Dapatkan prediksi akurat, penilaian dampak industri,
              dan wawasan lingkungan — semua dalam satu platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Button size="lg" className="px-8 gap-2 text-sm group" asChild>
                <Link href="/explore">
                  Jelajahi Pantai
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 gap-2 text-sm"
                asChild
              >
                <Link href="/map">
                  <Map className="size-4" />
                  Buka Peta Interaktif
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
