"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock } from "lucide-react";
import type { AnalyzeApiResponse } from "@/types/beach-api.type";

interface AnalysisTimelineProps {
  data: AnalyzeApiResponse;
}

export function AnalysisTimeline({ data }: AnalysisTimelineProps) {
  const isSehat2026 = data.Status_Kualitas_2026.toUpperCase() === "SEHAT";
  const isSehat2017 = data.Status_Kualitas_2017.toUpperCase() === "SEHAT";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Riwayat & Proyeksi Analisis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-0">
          {/* 2017 Historical */}
          <div className="group relative flex gap-3 pb-6">
            {/* Timeline line */}
            <div className="absolute left-[7px] top-5 h-full w-px bg-border" />
            {/* Timeline dot */}
            <div className="relative z-10 mt-1.5 flex size-4 shrink-0 items-center justify-center">
              <Clock className="size-4 text-muted-foreground" />
            </div>
            {/* Content */}
            <div className="flex-1 space-y-1.5">
              <p className="text-xs text-muted-foreground">Data Historis 2017</p>
              <div className="flex items-center justify-between">
                <Badge 
                  variant="default" 
                  className={
                    isSehat2017 
                      ? "bg-success/15 text-success border border-success/30" 
                      : "bg-destructive/15 text-destructive border border-destructive/30"
                  }
                >
                  {data.Status_Kualitas_2017}
                </Badge>
                <span className="text-xs tabular-nums text-muted-foreground">
                  Sehat: {data.Pct_Sehat_2017}%
                </span>
              </div>
            </div>
          </div>

          {/* 2026 Projection */}
          <div className="group relative flex gap-3 pb-0">
            {/* Timeline dot */}
            <div className="relative z-10 mt-1.5 flex size-4 shrink-0 items-center justify-center">
              <CheckCircle2 className="size-4 text-primary" />
            </div>
            {/* Content */}
            <div className="flex-1 space-y-1.5">
              <p className="text-xs text-muted-foreground">Proyeksi Kualitas 2026</p>
              <div className="flex items-center justify-between">
                <Badge 
                  variant="default" 
                  className={
                    isSehat2026 
                      ? "bg-success/15 text-success border border-success/30" 
                      : "bg-destructive/15 text-destructive border border-destructive/30"
                  }
                >
                  {data.Status_Kualitas_2026}
                </Badge>
                <span className="text-xs tabular-nums text-muted-foreground">
                  Sehat: {data.Pct_Sehat_2026}%
                </span>
              </div>
            </div>
          </div>

          {/* Delta */}
          <div className="mt-3 rounded-lg bg-muted/40 px-3 py-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Perubahan Area Sehat</span>
              <span className={`font-semibold tabular-nums ${data.Delta_Pct_Sehat > 0 ? "text-success" : "text-destructive"}`}>
                {data.Delta_Pct_Sehat > 0 ? "+" : ""}{data.Delta_Pct_Sehat}%
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
