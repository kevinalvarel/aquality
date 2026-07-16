"use client";

import { useWeatherForecast } from "@/hooks/use-weather-forecast";
import type { BeachWeatherInfo } from "@/types/weather.type";
import { WeatherHero } from "./weather-hero";
import { WeatherSummary } from "./weather-summary";
import { WeatherKpiCards } from "./weather-kpi-cards";
import { WeatherTimelineChart } from "./weather-timeline-chart";
import { ActivityRecommendations } from "./activity-recommendations";
import { RiskAnalysis } from "./risk-analysis";
import { BestVisitTime } from "./best-visit-time";
import { WeatherInsights } from "./weather-insights";
import { Skeleton } from "@/components/ui/skeleton";
import { CloudOff, RefreshCw, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

interface WeatherAnalysisContentProps {
  beach: BeachWeatherInfo;
}

export function WeatherAnalysisContent({ beach }: WeatherAnalysisContentProps) {
  const { data, isLoading, isError, error, refetch } = useWeatherForecast(
    beach.pantai,
    beach.kodeAdm4,
  );

  // No adm4 code available
  if (!beach.kodeAdm4) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center space-y-5 px-4 text-center">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-amber-500/20 blur-xl" />
          <div className="relative rounded-full bg-amber-500/10 p-5 ring-1 ring-amber-500/20">
            <CloudOff className="size-8 text-amber-400" />
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold tracking-tight">
            Data Cuaca Tidak Tersedia
          </h2>
          <p className="mx-auto max-w-sm text-sm text-muted-foreground">
            {beach.pantai} belum memiliki kode wilayah (adm4) yang diperlukan
            untuk mengambil data prakiraan cuaca dari BMKG.
          </p>
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-6 px-4 py-6 md:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card">
          <div className="p-6 md:p-8">
            <Skeleton className="h-4 w-48 mb-4" />
            <Skeleton className="h-10 w-80 mb-3" />
            <Skeleton className="h-5 w-60 mb-4" />
            <Skeleton className="h-7 w-44 rounded-full" />
          </div>
        </div>
        <div className="rounded-xl border border-border/50 bg-card p-6">
          <Skeleton className="h-5 w-40 mb-3" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-border/50 bg-card p-4"
            >
              <Skeleton className="size-10 rounded-lg mb-3" />
              <Skeleton className="h-7 w-20 mb-1" />
              <Skeleton className="h-4 w-28" />
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-border/50 bg-card p-6">
          <Skeleton className="h-64 w-full rounded-lg" />
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center space-y-5 px-4 text-center">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-rose-500/20 blur-xl" />
          <div className="relative rounded-full bg-rose-500/10 p-5 ring-1 ring-rose-500/20">
            <WifiOff className="size-8 text-rose-400" />
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold tracking-tight">
            Gagal Memuat Data Cuaca
          </h2>
          <p className="mx-auto max-w-sm text-sm text-muted-foreground">
            {error?.message ||
              "Terjadi kesalahan saat menghubungi server cuaca BMKG."}
          </p>
        </div>
        <Button onClick={() => refetch()} className="gap-2">
          <RefreshCw className="size-4" />
          Coba Lagi
        </Button>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-6 px-4 py-6 md:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <WeatherHero beach={beach} data={data} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <WeatherSummary narrative={data.narrative} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <WeatherKpiCards data={data} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <WeatherTimelineChart data={data.timelineData} />
      </motion.div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <ActivityRecommendations activities={data.activities} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <RiskAnalysis risks={data.risks} />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <BestVisitTime bestTime={data.bestVisitTime} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <WeatherInsights insights={data.insights} />
        </motion.div>
      </div>
    </div>
  );
}
