"use client";

import { useState } from "react";
import { Map, Droplets, BarChart3, Bell } from "lucide-react";

const steps = [
  {
    id: "select",
    icon: Map,
    number: "01",
    title: "Pilih Pantai di Banten",
    subtitle: "Peta Interaktif",
    description:
      "Gunakan peta interaktif untuk memilih pantai di wilayah Banten yang ingin Anda pantau. Tersedia 18+ lokasi pantai dari Anyer, Carita, Sawarna, hingga Tanjung Lesung.",
    visual: {
      gradient: "from-primary/10 to-sky-500/5",
      accent: "bg-primary",
    },
  },
  {
    id: "index",
    icon: Droplets,
    number: "02",
    title: "Baca Indeks Kualitas",
    subtitle: "Index Polusi & Air",
    description:
      "Lihat indeks pencemaran air (pH, salinitas, E. coli), indeks polusi udara (AQI, PM2.5), serta skor keramaian pengunjung dalam satu tampilan yang jelas.",
    visual: {
      gradient: "from-cyan-500/10 to-primary/5",
      accent: "bg-cyan-500",
    },
  },
  {
    id: "analyze",
    icon: BarChart3,
    number: "03",
    title: "Analisis Tren & Riwayat",
    subtitle: "Dashboard Analitik",
    description:
      "Pantau tren perubahan kualitas pantai dari waktu ke waktu. Bandingkan kondisi antar pantai dan identifikasi pola musiman pencemaran.",
    visual: {
      gradient: "from-emerald-500/10 to-cyan-500/5",
      accent: "bg-emerald-500",
    },
  },
  {
    id: "alert",
    icon: Bell,
    number: "04",
    title: "Aktifkan Notifikasi",
    subtitle: "Peringatan Dini",
    description:
      "Berlangganan notifikasi untuk pantai favorit Anda. Dapatkan peringatan segera ketika kualitas air atau polusi melewati ambang batas yang aman.",
    visual: {
      gradient: "from-amber-500/10 to-primary/5",
      accent: "bg-amber-500",
    },
  },
];

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="how-it-works" className="relative w-full py-24 sm:py-32">
      {/* Background lines */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="mx-auto w-full max-w-275 px-6 sm:px-10">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16 sm:mb-20">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary mb-4">
            Cara Kerja
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground leading-snug">
            Empat Langkah{" "}
            <span className="text-primary">Menuju Pantai Terbaik</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Proses sederhana untuk mengetahui kualitas, polusi, dan keramaian
            pantai di wilayah Banten sebelum berkunjung.
          </p>
        </div>

        {/* Steps content */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 items-start">
          {/* Left: Step list */}
          <div className="space-y-2">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeStep === index;

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setActiveStep(index)}
                  className={`group w-full text-left rounded-xl p-4 sm:p-5 transition-all duration-300 border ${
                    isActive
                      ? "bg-card border-border/60 shadow-md"
                      : "bg-transparent border-transparent hover:bg-card/50 hover:border-border/30"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Step number with icon */}
                    <div className="relative flex-shrink-0">
                      <div
                        className={`flex items-center justify-center size-10 rounded-xl transition-colors duration-300 ${
                          isActive
                            ? `${step.visual.accent} text-white`
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <Icon className="size-4.5" />
                      </div>
                      {/* Connector line */}
                      {index < steps.length - 1 && (
                        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-px h-6 bg-border/50" />
                      )}
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0 pt-0.5">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] tabular-nums font-medium text-muted-foreground/60">
                          {step.number}
                        </span>
                        <h3
                          className={`text-sm font-medium transition-colors ${
                            isActive
                              ? "text-foreground"
                              : "text-muted-foreground group-hover:text-foreground"
                          }`}
                        >
                          {step.title}
                        </h3>
                      </div>
                      {isActive && (
                        <p className="text-sm text-muted-foreground leading-relaxed mt-1.5 animate-in fade-in slide-in-from-top-1 duration-300">
                          {step.description}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Visual display */}
          <div className="relative">
            <div
              className={`relative rounded-2xl border border-border/40 overflow-hidden bg-gradient-to-br ${steps[activeStep].visual.gradient} p-8 sm:p-10 min-h-[320px] sm:min-h-[380px] transition-all duration-500`}
            >
              {/* Dot grid pattern */}
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />

              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground mb-6">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${steps[activeStep].visual.accent}`}
                    />
                    {steps[activeStep].subtitle}
                  </span>

                  <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground mb-3">
                    {steps[activeStep].title}
                  </h3>
                  <p className="text-muted-foreground max-w-md leading-relaxed">
                    {steps[activeStep].description}
                  </p>
                </div>

                {/* Step indicator dots */}
                <div className="flex gap-2 mt-8">
                  {steps.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveStep(i)}
                      aria-label={`Langkah ${i + 1}`}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        i === activeStep
                          ? `w-8 ${steps[activeStep].visual.accent}`
                          : "w-1 bg-foreground/15 hover:bg-foreground/25"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Decorative blurred shape */}
              <div
                className={`absolute -bottom-20 -right-20 w-60 h-60 rounded-full ${steps[activeStep].visual.accent} opacity-[0.03] blur-3xl`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
