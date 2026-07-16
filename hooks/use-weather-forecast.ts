"use client";

import { useQuery } from "@tanstack/react-query";
import type {
  BMKGWeatherResponse,
  ProcessedWeatherData,
} from "@/types/weather.type";
import { processWeatherData } from "@/lib/weather.util";

async function fetchWeatherForecast(
  adm4: string,
): Promise<BMKGWeatherResponse> {
  const res = await fetch(`/api/weather?adm4=${encodeURIComponent(adm4)}`);

  if (!res.ok) {
    const error = await res
      .json()
      .catch(() => ({ error: "Gagal memuat data cuaca" }));
    throw new Error(error.error || `HTTP ${res.status}`);
  }

  return res.json();
}

/**
 * React Query hook for fetching and processing BMKG weather forecast data.
 * Automatically processes raw data into tourism-focused insights.
 */
export function useWeatherForecast(beachName: string, adm4Code: string | null) {
  return useQuery<ProcessedWeatherData>({
    queryKey: ["weather-forecast", adm4Code],
    queryFn: async () => {
      if (!adm4Code) throw new Error("Kode wilayah tidak tersedia");
      const raw = await fetchWeatherForecast(adm4Code);
      return processWeatherData(beachName, raw);
    },
    enabled: !!adm4Code,
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
    retry: 2,
    refetchOnWindowFocus: false,
  });
}
