"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Layers } from "lucide-react";
import type { AnalyzeApiResponse } from "@/types/beach-api.type";

interface ConfidenceBreakdownProps {
  data: AnalyzeApiResponse;
}

export function ConfidenceBreakdown({ data }: ConfidenceBreakdownProps) {
  const rawData = [
    { 
      label: "Area Sehat", 
      value: data.Pct_Sehat_2026, 
      color: "bg-emerald-500" 
    },
    { 
      label: "Area Sedang", 
      value: data.Pct_Sedang_2026, 
      color: "bg-amber-400" 
    },
    { 
      label: "Area Tidak Sehat", 
      value: data.Pct_TidakSehat_2026, 
      color: "bg-rose-500" 
    },
  ];

  const total = rawData.reduce((acc, curr) => acc + curr.value, 0);
  const breakdownData = rawData.map(item => ({
    ...item,
    percent: total > 0 ? (item.value / total) * 100 : 0
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm">
          <Layers className="size-4 text-primary" />
          Distribusi Kualitas Area
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Stacked bar */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex h-3 w-full overflow-hidden rounded-full">
              {breakdownData.map((item) => (
                <div
                  key={item.label}
                  className={`${item.color} transition-all duration-500 first:rounded-l-full last:rounded-r-full`}
                  style={{ width: `${item.percent}%` }}
                />
              ))}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Distribusi proporsional kualitas area perairan</p>
          </TooltipContent>
        </Tooltip>

        {/* Legend */}
        <div className="space-y-2">
          {breakdownData.map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`size-2.5 rounded-full ${item.color}`} />
                <span className="text-xs text-muted-foreground">
                  {item.label}
                </span>
              </div>
              <span className="text-xs font-semibold tabular-nums">
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
