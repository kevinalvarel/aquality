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
  { label: "Water Clarity", value: 86, colorClass: "[&>div]:bg-info" },
  { label: "Turbidity", value: 18, colorClass: "[&>div]:bg-success" },
  { label: "Floating Waste", value: 7, colorClass: "[&>div]:bg-success" },
  { label: "Algae Presence", value: 12, colorClass: "[&>div]:bg-success" },
  { label: "Shoreline Cleanliness", value: 91, colorClass: "[&>div]:bg-primary" },
];

function getStatusLabel(label: string, value: number): string {
  if (label === "Water Clarity" || label === "Shoreline Cleanliness") {
    return value >= 80 ? "Excellent" : value >= 60 ? "Good" : value >= 40 ? "Moderate" : "Poor";
  }
  return value <= 15 ? "Excellent" : value <= 30 ? "Good" : value <= 50 ? "Moderate" : "Poor";
}

export function EnvironmentalMetrics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="size-4 text-primary" />
          Environmental Metrics
        </CardTitle>
        <CardDescription>
          Real-time environmental indicators from image analysis
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
