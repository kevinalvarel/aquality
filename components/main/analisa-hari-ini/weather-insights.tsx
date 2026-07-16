"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { WeatherInsight } from "@/types/weather.type";
import { Lightbulb } from "lucide-react";

interface WeatherInsightsProps {
  insights: WeatherInsight[];
}

export function WeatherInsights({ insights }: WeatherInsightsProps) {
  if (insights.length === 0) return null;

  return (
    <Card className="border-border/50 h-full">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2.5 text-base">
          <div className="flex size-8 items-center justify-center rounded-lg bg-amber-500/15">
            <Lightbulb className="size-4 text-amber-400" />
          </div>
          Insight Wisata Pantai
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {insights.map((insight) => (
            <div
              key={insight.label}
              className="group rounded-lg border border-border/40 bg-muted/20 p-3 transition-all duration-200 hover:border-border/60 hover:bg-muted/30"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-base leading-none">{insight.icon}</span>
                <p className="text-xs font-medium text-muted-foreground">
                  {insight.label}
                </p>
              </div>
              <p className="text-sm font-bold tracking-tight mb-1">
                {insight.value}
              </p>
              <p className="text-xs text-muted-foreground/80 leading-relaxed">
                {insight.description}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
