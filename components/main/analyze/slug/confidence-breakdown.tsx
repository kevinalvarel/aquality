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

interface ConfidenceItem {
  label: string;
  value: number;
  color: string;
}

const breakdownData: ConfidenceItem[] = [
  { label: "Air", value: 42, color: "bg-sky-500" },
  { label: "Pasir", value: 28, color: "bg-amber-400" },
  { label: "Vegetasi", value: 15, color: "bg-emerald-500" },
  { label: "Sampah", value: 8, color: "bg-red-400" },
  { label: "Lainnya", value: 7, color: "bg-slate-400" },
];

export function ConfidenceBreakdown() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm">
          <Layers className="size-4 text-primary" />
          Rincian Keyakinan
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
                  style={{ width: `${item.value}%` }}
                />
              ))}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Distribusi keyakinan klasifikasi</p>
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
