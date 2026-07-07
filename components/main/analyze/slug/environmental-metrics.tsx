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

interface MetricItem {
  label: string;
  value: number;
  colorClass: string;
}

const metrics: MetricItem[] = [
  { label: "Kejelasan Air", value: 86, colorClass: "[&>div]:bg-info" },
  { label: "Kekeruhan", value: 18, colorClass: "[&>div]:bg-success" },
  { label: "Sampah Terapung", value: 7, colorClass: "[&>div]:bg-success" },
  { label: "Keberadaan Alga", value: 12, colorClass: "[&>div]:bg-success" },
  { label: "Kebersihan Garis Pantai", value: 91, colorClass: "[&>div]:bg-primary" },
];

function getStatusLabel(label: string, value: number): string {
  const isPositive = label === "Kejelasan Air" || label === "Kebersihan Garis Pantai" || label === "Water Clarity" || label === "Shoreline Cleanliness";
  if (isPositive) {
    return value >= 80 ? "Sangat Baik" : value >= 60 ? "Baik" : value >= 40 ? "Sedang" : "Buruk";
  }
  return value <= 15 ? "Sangat Baik" : value <= 30 ? "Baik" : value <= 50 ? "Sedang" : "Buruk";
}

export function EnvironmentalMetrics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="size-4 text-primary" />
          Metrik Lingkungan
        </CardTitle>
        <CardDescription>
          Indikator lingkungan real-time dari analisis gambar
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {metrics.map((metric) => (
          <div key={metric.label} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{metric.label}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {getStatusLabel(metric.label, metric.value)}
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
                  {getStatusLabel(metric.label, metric.value)}
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
