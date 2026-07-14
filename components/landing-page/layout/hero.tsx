"use client";

import { CallToAction } from "@/components/landing-page/ui/cta";
import { MapPin, Brain, BarChart3 } from "lucide-react";

const stats = [
  {
    icon: MapPin,
    value: "18+",
    label: "Pantai Pesisir",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Brain,
    value: "ML",
    label: "Prediksi AI",
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
  },
  {
    icon: BarChart3,
    value: "Live",
    label: "Wawasan Kualitas",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
];

export function Hero() {
  return (
    <section id="hero" className="relative w-full overflow-hidden">
      <div className="mx-auto w-full max-w-275 px-6 pt-52 pb-32 lg:px-10 lg:pt-48 lg:pb-40">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            AI-Powered Coastal Intelligence
          </div>

          {/* Main headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter leading-[1.08] text-foreground">
            Pahami Kualitas Air{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-primary via-cyan-500 to-primary bg-clip-text text-transparent">
                Pantai dengan AI
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-7 text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Aquality menganalisis kualitas air pesisir menggunakan{" "}
            <strong className="text-foreground font-medium">
              machine learning
            </strong>{" "}
            dan indikator lingkungan — menilai dampak industri, tingkat
            pencemaran, dan kesehatan ekosistem di sepanjang pesisir Banten.
          </p>

          <CallToAction />

          {/* Stats row */}
          <div
            className="mt-16 grid grid-cols-3 gap-6 sm:gap-12 w-full max-w-lg"
            style={{ animationDelay: "360ms" }}
          >
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-2">
                <div
                  className={`flex items-center justify-center size-10 rounded-xl ${s.bg} ${s.color}`}
                >
                  <s.icon className="size-4.5" />
                </div>
                <span className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
                  {s.value}
                </span>
                <span className="text-xs text-muted-foreground">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
