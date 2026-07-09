"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import type { BeachApiResponse } from "@/types/beach-api.type";

interface AnalysisTimelineProps {
  data: BeachApiResponse;
}

export function AnalysisTimeline({ data }: AnalysisTimelineProps) {
  const isSehat = data.status_kualitas_2026.toUpperCase() === "SEHAT";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Riwayat & Proyeksi Analisis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-0">
          <div className="group relative flex gap-3 pb-6 last:pb-0">
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
                    isSehat 
                      ? "bg-success/15 text-success border border-success/30" 
                      : "bg-destructive/15 text-destructive border border-destructive/30"
                  }
                >
                  {data.status_kualitas_2026}
                </Badge>
                <span className="text-xs tabular-nums text-muted-foreground">
                  Skor: {data.health_score}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

