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
import { CheckCircle2, AlertCircle, ShieldCheck } from "lucide-react";
import type { BeachApiResponse } from "@/types/beach-api.type";

interface AIAnalysisResultProps {
  data: BeachApiResponse;
}

export function AIAnalysisResult({ data }: AIAnalysisResultProps) {
  const isSehat = data.status_kualitas_2026.toUpperCase() === "SEHAT";
  const isDampakRendah = data.kategori_dampak_industri.toUpperCase().includes("RENDAH");
  const isDampakSedang = data.kategori_dampak_industri.toUpperCase().includes("SEDANG");

  const indicators = [
    { 
      label: `Dampak Industri: ${data.kategori_dampak_industri}`, 
      positive: isDampakRendah 
    },
    { 
      label: `Jarak Industri Terdekat: ${data.jarak_industri_km} km`, 
      positive: data.jarak_industri_km > 10 
    },
    { 
      label: `Kepadatan Penduduk: ${data.kepadatan_penduduk_kecamatan} jiwa/km²`, 
      positive: data.kepadatan_penduduk_kecamatan < 1000 
    },
    { 
      label: `Tren Kualitas Air: ${data.tren_kualitas}`, 
      positive: data.tren_kualitas.toUpperCase() !== "MEMBURUK" 
    },
  ];

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
            className={
              isDampakRendah 
                ? "bg-success/15 text-success border border-success/30" 
                : isDampakSedang 
                ? "bg-warning/15 text-warning border border-warning/30"
                : "bg-destructive/15 text-destructive border border-destructive/30"
            }
          >
            Dampak {data.kategori_dampak_industri}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border border-border/60 bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Status Air</p>
            <p className={`mt-1 text-lg font-semibold ${isSehat ? "text-success" : "text-destructive"}`}>
              {data.status_kualitas_2026}
            </p>
          </div>
          <div className="rounded-lg border border-border/60 bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Keyakinan / Skor</p>
            <p className="mt-1 text-lg font-semibold">{data.health_score}%</p>
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
                className={`flex items-center gap-2 rounded-md px-3 py-2 ${
                  indicator.positive 
                    ? "bg-success/5 text-success" 
                    : "bg-destructive/5 text-destructive"
                }`}
              >
                {indicator.positive ? (
                  <CheckCircle2 className="size-4 text-success" />
                ) : (
                  <AlertCircle className="size-4 text-destructive" />
                )}
                <span className="text-sm">{indicator.label}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

