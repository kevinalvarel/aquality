"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { BestVisitTimeInfo } from "@/types/weather.type";
import { Clock, Star } from "lucide-react";

interface BestVisitTimeProps {
  bestTime: BestVisitTimeInfo;
}

export function BestVisitTime({ bestTime }: BestVisitTimeProps) {
  return (
    <Card className="relative overflow-hidden border-border/50 h-full">
      {/* Background accent */}
      <div className="absolute right-0 top-0 size-32 rounded-full bg-gradient-to-bl from-cyan-500/10 to-transparent blur-2xl" />

      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2.5 text-base">
          <div className="flex size-8 items-center justify-center rounded-lg bg-cyan-500/15">
            <Clock className="size-4 text-cyan-400" />
          </div>
          Waktu Terbaik Berkunjung
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-4">
          {/* Time display */}
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-gradient-to-br from-cyan-500/20 to-sky-500/20 px-4 py-2.5 ring-1 ring-cyan-500/20">
              <p className="text-2xl font-bold tracking-tight text-cyan-400 md:text-3xl">
                {bestTime.startTime}
              </p>
            </div>
            <span className="text-lg text-muted-foreground">—</span>
            <div className="rounded-xl bg-gradient-to-br from-cyan-500/20 to-sky-500/20 px-4 py-2.5 ring-1 ring-cyan-500/20">
              <p className="text-2xl font-bold tracking-tight text-cyan-400 md:text-3xl">
                {bestTime.endTime}
              </p>
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              WIB
            </span>
          </div>

          {/* Reason */}
          <div className="flex gap-2 rounded-lg bg-muted/30 p-3">
            <Star className="mt-0.5 size-4 flex-shrink-0 text-amber-400" />
            <div>
              <p className="text-xs font-semibold text-foreground mb-0.5">
                Alasan
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {bestTime.reason}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
