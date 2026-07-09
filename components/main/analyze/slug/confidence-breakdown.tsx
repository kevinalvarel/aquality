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
import type { BeachApiResponse } from "@/types/beach-api.type";

interface ConfidenceBreakdownProps {
  data: BeachApiResponse;
}

export function ConfidenceBreakdown({ data }: ConfidenceBreakdownProps) {
  const rawData = [
    { 
      label: "Skor Dampak Industri", 
      value: Math.round(data.skor_detail.skor_industri), 
      color: "bg-sky-500" 
    },
    { 
      label: "Skor Kepadatan Penduduk", 
      value: Math.round(data.skor_detail.skor_kepadatan_penduduk), 
      color: "bg-amber-400" 
    },
    { 
      label: "Skor Pengaruh Urban", 
      value: Math.round(data.skor_detail.skor_pengaruh_urban), 
      color: "bg-emerald-500" 
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
          Rincian Skor Kelayakan
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
            <p>Distribusi proporsional skor kelayakan</p>
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

