"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, ShieldCheck } from "lucide-react";

const indicators = [
  { label: "Air jernih", detected: true },
  { label: "Kekeruhan rendah", detected: true },
  { label: "Sampah terapung minimal", detected: true },
  { label: "Garis pantai sehat", detected: true },
];

export function AIAnalysisResult() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-primary" />
              Hasil Analisis AI
            </CardTitle>
            <CardDescription>
              Output klasifikasi dari model AI AQuality
            </CardDescription>
          </div>
          <Badge
            variant="default"
            className="bg-success/15 text-success border border-success/30"
          >
            Risiko Rendah
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border border-border/60 bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Status Air</p>
            <p className="mt-1 text-lg font-semibold text-success">Baik</p>
          </div>
          <div className="rounded-lg border border-border/60 bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Keyakinan</p>
            <p className="mt-1 text-lg font-semibold">97%</p>
          </div>
        </div>

        <Separator />

        <div>
          <p className="mb-3 text-sm font-medium text-muted-foreground">
            Indikator Terdeteksi
          </p>
          <div className="space-y-2">
            {indicators.map((indicator) => (
              <div
                key={indicator.label}
                className="flex items-center gap-2 rounded-md bg-success/5 px-3 py-2"
              >
                <CheckCircle2 className="size-4 text-success" />
                <span className="text-sm">{indicator.label}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
