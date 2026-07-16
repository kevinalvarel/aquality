"use client";

import type {
  BeachWeatherInfo,
  ProcessedWeatherData,
} from "@/types/weather.type";
import { Badge } from "@/components/ui/badge";
import { MapPin, ChevronRight, Sun } from "lucide-react";
import Link from "next/link";

interface WeatherHeroProps {
  beach: BeachWeatherInfo;
  data: ProcessedWeatherData;
}

export function WeatherHero({ beach, data }: WeatherHeroProps) {
  const { recommendationStatus, currentWeather } = data;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/50">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-950/80 via-card to-cyan-950/60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sky-500/10 via-transparent to-transparent" />

      {/* Decorative dots pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative p-6 md:p-8">
        {/* Breadcrumb */}
        <nav className="mb-5 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Link
            href="/explore"
            className="transition-colors hover:text-foreground"
          >
            Explore
          </Link>
          <ChevronRight className="size-3" />
          <Link
            href={`/explore/${beach.slug}`}
            className="transition-colors hover:text-foreground"
          >
            {beach.pantai}
          </Link>
          <ChevronRight className="size-3" />
          <span className="text-foreground">Analisis Cuaca</span>
        </nav>

        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="flex size-10 items-center justify-center rounded-xl bg-sky-500/15 ring-1 ring-sky-500/20">
                <Sun className="size-5 text-sky-400" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                Analisis Cuaca Hari Ini
              </h1>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="size-3.5" />
              <span>
                {beach.pantai} — {beach.kecamatan}, {beach.kabupatenKota}
                {beach.provinsi ? `, ${beach.provinsi}` : ""}
              </span>
            </div>

            {currentWeather && (
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span>
                  {currentWeather.weather_desc} • {currentWeather.t}°C • Angin{" "}
                  {currentWeather.ws} km/h {currentWeather.wd}
                </span>
              </div>
            )}
          </div>

          {/* Status badge */}
          <Badge
            className={`${recommendationStatus.bgColor} ${recommendationStatus.color} ${recommendationStatus.borderColor} border px-4 py-1.5 text-sm font-semibold h-auto`}
          >
            {recommendationStatus.icon} {recommendationStatus.label}
          </Badge>
        </div>
      </div>
    </div>
  );
}
