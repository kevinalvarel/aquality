"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sparkles } from "lucide-react";

interface WeatherSummaryProps {
  narrative: string;
}

export function WeatherSummary({ narrative }: WeatherSummaryProps) {
  return (
    <Card className="relative overflow-hidden border-border/50">
      {/* Subtle gradient accent */}
      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-sky-500 via-cyan-500 to-teal-500" />

      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2.5 text-base">
          <div className="flex size-8 items-center justify-center rounded-lg bg-sky-500/15">
            <Sparkles className="size-4 text-sky-400" />
          </div>
          Ringkasan Analisis AI
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="leading-relaxed text-muted-foreground">
          {narrative}
        </p>
      </CardContent>
    </Card>
  );
}
