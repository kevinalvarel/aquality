"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BarChart3 } from "lucide-react";
import type { AnalyzeApiResponse } from "@/types/beach-api.type";

interface MetricItem {
  label: string;
  value: number;
  colorClass: string;
}

function getStatusLabel(value: number): string {
  return value >= 80 ? "Sangat Baik" : value >= 60 ? "Baik" : value >= 40 ? "Sedang" : "Buruk";
}

interface EnvironmentalMetricsProps {
  data: AnalyzeApiResponse;
}

export function EnvironmentalMetrics({ data }: EnvironmentalMetricsProps) {
  // Normalize indeks_dampak_industri (0-100 scale) and indeks_pengaruh_urban (0-100 scale)
  // kepadatan_penduduk_kecamatan: use inverse (lower = better), cap at 5000
  const normalizedKepadatan = Math.max(0, Math.min(100, 100 - (data.kepadatan_penduduk_kecamatan / 5000) * 100));

  const metrics: MetricItem[] = [
    { 
      label: "Indeks Dampak Industri", 
      value: Math.round(100 - data.indeks_dampak_industri), 
      colorClass: "[&>div]:bg-info" 
    },
    { 
      label: "Skor Kepadatan Penduduk", 
      value: Math.round(normalizedKepadatan), 
      colorClass: "[&>div]:bg-success" 
    },
    { 
      label: "Indeks Pengaruh Urban", 
      value: Math.round(100 - data.indeks_pengaruh_urban), 
      colorClass: "[&>div]:bg-primary" 
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="size-4 text-primary" />
          Rincian Skor Kelayakan
        </CardTitle>
        <CardDescription>
          Analisis rincian nilai kelayakan lingkungan pesisir
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {metrics.map((metric) => (
          <div key={metric.label} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{metric.label}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {getStatusLabel(metric.value)}
                </span>
                <span className="font-semibold tabular-nums">{metric.value}%</span>
              </div>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Progress
                    value={metric.value}
                    className={`h-2 ${metric.colorClass}`}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {metric.label}: {metric.value}% —{" "}
                  {getStatusLabel(metric.value)}
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
