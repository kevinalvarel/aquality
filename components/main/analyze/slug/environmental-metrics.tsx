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
import type { BeachApiResponse } from "@/types/beach-api.type";

interface MetricItem {
  label: string;
  value: number;
  colorClass: string;
}

function getStatusLabel(value: number): string {
  return value >= 80 ? "Sangat Baik" : value >= 60 ? "Baik" : value >= 40 ? "Sedang" : "Buruk";
}

interface EnvironmentalMetricsProps {
  data: BeachApiResponse;
}

export function EnvironmentalMetrics({ data }: EnvironmentalMetricsProps) {
  const metrics: MetricItem[] = [
    { 
      label: "Skor Dampak Industri", 
      value: Math.round(data.skor_detail.skor_industri), 
      colorClass: "[&>div]:bg-info" 
    },
    { 
      label: "Skor Kepadatan Penduduk", 
      value: Math.round(data.skor_detail.skor_kepadatan_penduduk), 
      colorClass: "[&>div]:bg-success" 
    },
    { 
      label: "Skor Pengaruh Urban", 
      value: Math.round(data.skor_detail.skor_pengaruh_urban), 
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

