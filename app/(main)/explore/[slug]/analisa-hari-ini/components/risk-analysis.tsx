"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { RiskInfo } from "@/types/weather.type";
import { ShieldAlert, CloudRain, Wind, Waves, Zap } from "lucide-react";

interface RiskAnalysisProps {
  risks: {
    rain: RiskInfo;
    wind: RiskInfo;
    wave: RiskInfo;
    thunder: RiskInfo;
  };
}

const riskIcons = {
  rain: CloudRain,
  wind: Wind,
  wave: Waves,
  thunder: Zap,
};

const riskLabels = {
  rain: "Risiko Hujan",
  wind: "Risiko Angin Kencang",
  wave: "Risiko Gelombang Tinggi",
  thunder: "Risiko Petir",
};

const levelLabels: Record<string, string> = {
  rendah: "Rendah",
  sedang: "Sedang",
  tinggi: "Tinggi",
};

const levelColors: Record<string, string> = {
  rendah: "text-emerald-400",
  sedang: "text-amber-400",
  tinggi: "text-rose-400",
};

const progressColors: Record<string, string> = {
  rendah: "[&>[data-slot=progress-indicator]]:bg-emerald-500",
  sedang: "[&>[data-slot=progress-indicator]]:bg-amber-500",
  tinggi: "[&>[data-slot=progress-indicator]]:bg-rose-500",
};

export function RiskAnalysis({ risks }: RiskAnalysisProps) {
  const riskEntries = Object.entries(risks) as Array<
    [keyof typeof risks, RiskInfo]
  >;

  return (
    <Card className="border-border/50 h-full">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2.5 text-base">
          <div className="flex size-8 items-center justify-center rounded-lg bg-rose-500/15">
            <ShieldAlert className="size-4 text-rose-400" />
          </div>
          Analisis Risiko
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {riskEntries.map(([key, risk]) => {
            const Icon = riskIcons[key];
            return (
              <div key={key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className={`size-4 ${risk.color}`} />
                    <span className="text-sm font-medium">
                      {riskLabels[key]}
                    </span>
                  </div>
                  <span
                    className={`text-xs font-semibold ${levelColors[risk.level]}`}
                  >
                    {levelLabels[risk.level]}
                  </span>
                </div>

                <Progress
                  value={risk.value}
                  className={`h-2 ${progressColors[risk.level]}`}
                />

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {risk.description}
                </p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
