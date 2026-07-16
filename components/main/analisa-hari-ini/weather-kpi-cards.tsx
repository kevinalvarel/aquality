"use client";

import type { ProcessedWeatherData } from "@/types/weather.type";
import { getWeatherIcon } from "@/lib/weather.util";
import {
  Thermometer,
  Wind,
  CloudRain,
  Cloud,
} from "lucide-react";

interface WeatherKpiCardsProps {
  data: ProcessedWeatherData;
}

const kpiConfig = [
  {
    key: "weather" as const,
    label: "Kondisi Cuaca Saat Ini",
    icon: Cloud,
    iconBg: "bg-sky-500/15",
    iconColor: "text-sky-400",
  },
  {
    key: "temp" as const,
    label: "Suhu Rata-rata",
    icon: Thermometer,
    iconBg: "bg-orange-500/15",
    iconColor: "text-orange-400",
  },
  {
    key: "wind" as const,
    label: "Kecepatan Angin",
    icon: Wind,
    iconBg: "bg-teal-500/15",
    iconColor: "text-teal-400",
  },
  {
    key: "rain" as const,
    label: "Potensi Hujan",
    icon: CloudRain,
    iconBg: "bg-blue-500/15",
    iconColor: "text-blue-400",
  },
];

function getKpiValue(
  key: "weather" | "temp" | "wind" | "rain",
  data: ProcessedWeatherData,
): string {
  switch (key) {
    case "weather":
      return data.currentWeather
        ? `${getWeatherIcon(data.currentWeather.weather)} ${data.currentWeather.weather_desc}`
        : "—";
    case "temp":
      return `${data.averageTemp}°C`;
    case "wind":
      return data.currentWeather
        ? `${data.currentWeather.ws} km/h`
        : "—";
    case "rain": {
      const maxRain = data.todayForecasts.length > 0
        ? Math.max(...data.todayForecasts.map((e) => e.tp))
        : 0;
      return `${maxRain} mm`;
    }
  }
}

function getKpiDescription(
  key: "weather" | "temp" | "wind" | "rain",
  data: ProcessedWeatherData,
): string {
  switch (key) {
    case "weather": {
      const cloud = data.currentWeather?.tcc ?? 0;
      return cloud < 30
        ? "Langit cerah, pencahayaan sempurna"
        : cloud < 60
          ? "Berawan sebagian, masih nyaman"
          : "Tutupan awan tebal, kemungkinan mendung";
    }
    case "temp": {
      const t = data.averageTemp;
      return t >= 25 && t <= 30
        ? "Suhu ideal untuk aktivitas pantai"
        : t > 30
          ? "Cukup panas, gunakan tabir surya"
          : "Agak sejuk, siapkan jaket tipis";
    }
    case "wind": {
      const ws = data.currentWeather?.ws ?? 0;
      return ws < 10
        ? "Masih aman untuk aktivitas wisata pantai"
        : ws < 20
          ? "Cukup berangin, waspada saat di air"
          : "Angin kencang, hindari aktivitas air";
    }
    case "rain": {
      const maxRain = data.todayForecasts.length > 0
        ? Math.max(...data.todayForecasts.map((e) => e.tp))
        : 0;
      return maxRain < 0.5
        ? "Tidak ada hujan signifikan hari ini"
        : maxRain < 2
          ? "Potensi gerimis ringan di beberapa waktu"
          : "Hujan cukup deras, siapkan perlindungan";
    }
  }
}

export function WeatherKpiCards({ data }: WeatherKpiCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
      {kpiConfig.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <div
            key={kpi.key}
            className="group relative overflow-hidden rounded-xl border border-border/50 bg-card p-4 transition-all duration-300 hover:border-border hover:shadow-md"
          >
            {/* Hover glow */}
            <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-br from-sky-500/5 to-transparent" />

            <div className="relative space-y-3">
              <div
                className={`flex size-10 items-center justify-center rounded-xl ${kpi.iconBg}`}
              >
                <Icon className={`size-5 ${kpi.iconColor}`} />
              </div>

              <div>
                <p className="text-lg font-bold tracking-tight md:text-xl">
                  {getKpiValue(kpi.key, data)}
                </p>
                <p className="text-xs font-medium text-muted-foreground mt-0.5">
                  {kpi.label}
                </p>
              </div>

              <p className="text-xs text-muted-foreground/80 leading-relaxed">
                {getKpiDescription(kpi.key, data)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
