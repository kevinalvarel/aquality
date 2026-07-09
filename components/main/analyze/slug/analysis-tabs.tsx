"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  FileText,
  Cpu,
  FlaskConical,
  History,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { BeachApiResponse } from "@/types/beach-api.type";

interface AnalysisTabsProps {
  data: BeachApiResponse;
}

export function AnalysisTabs({ data }: AnalysisTabsProps) {
  const isSehat = data.status_kualitas_2026.toUpperCase() === "SEHAT";

  return (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">
          <FileText className="size-3.5" />
          Ringkasan
        </TabsTrigger>
        <TabsTrigger value="ai-details">
          <Cpu className="size-3.5" />
          Detail AI & Industri
        </TabsTrigger>
        <TabsTrigger value="environmental">
          <FlaskConical className="size-3.5" />
          Metrik Satelit
        </TabsTrigger>
        <TabsTrigger value="history">
          <History className="size-3.5" />
          Riwayat
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Ringkasan Analisis</CardTitle>
            <CardDescription>
              Ringkasan kualitas air dan kelayakan lingkungan pantai terbaru
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Analisis kualitas lingkungan untuk pantai{" "}
              <span className="font-medium text-foreground">{data.pantai}</span>{" "}
              (Kecamatan {data.kecamatan}) menunjukkan skor kelayakan lingkungan
              sebesar{" "}
              <span className="font-semibold text-primary">{data.health_score}/100</span>. 
              Klasifikasi kualitas air pantai ini dinilai sebagai{" "}
              <span className={`font-semibold ${isSehat ? "text-success" : "text-destructive"}`}>
                {data.status_kualitas_2026}
              </span>{" "}
              dengan tren kualitas yang terpantau{" "}
              <span className="font-medium text-foreground">{data.tren_kualitas}</span>.
            </p>
            <Separator />
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{data.health_score}%</p>
                <p className="text-xs text-muted-foreground">Skor Keseluruhan</p>
              </div>
              <div className="text-center">
                <p className={`text-2xl font-bold ${isSehat ? "text-success" : "text-destructive"}`}>
                  {data.status_kualitas_2026}
                </p>
                <p className="text-xs text-muted-foreground">Klasifikasi</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">#{data.ranking}</p>
                <p className="text-xs text-muted-foreground">Peringkat Pantai</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="ai-details" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Detail Analisis AI & Industri</CardTitle>
            <CardDescription>
              Informasi teknis dan faktor dampak antropogenik perkotaan dan industri
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <InfoRow label="Industri Terdekat" value={data.industri_terdekat} />
                <InfoRow label="Jarak Industri" value={`${data.jarak_industri_km} km`} />
                <InfoRow label="Kategori Dampak" value={data.kategori_dampak_industri} />
                <InfoRow label="Indeks Dampak Industri" value={data.indeks_dampak_industri.toString()} />
                <InfoRow label="Industri Relevan" value={data.industri_relevan_terdekat} />
                <InfoRow label="Jarak Industri Relevan" value={`${data.jarak_industri_relevan_km} km`} />
                <InfoRow label="Jumlah Industri (10km)" value={data.jumlah_industri_radius_10km.toString()} />
                <InfoRow label="Kepadatan Industri" value={data.kepadatan_industri.toString()} />
                <InfoRow label="Kepadatan Penduduk" value={`${data.kepadatan_penduduk_kecamatan} jiwa/km²`} />
                <InfoRow label="Indeks Pengaruh Urban" value={data.indeks_pengaruh_urban.toString()} />
              </div>
              <Separator />
              <div className="space-y-3">
                <p className="text-sm font-medium">Faktor Skor Detail</p>
                <div className="space-y-2">
                  <ConfidenceRow label="Skor Dampak Industri" value={Math.round(data.skor_detail.skor_industri)} />
                  <ConfidenceRow label="Skor Kepadatan Penduduk" value={Math.round(data.skor_detail.skor_kepadatan_penduduk)} />
                  <ConfidenceRow label="Skor Pengaruh Urban" value={Math.round(data.skor_detail.skor_pengaruh_urban)} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="environmental" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Metrik Penginderaan Jauh (Satelit)</CardTitle>
            <CardDescription>
              Parameter bio-optik air berdasarkan citra satelit Sentinel/Landsat 2026
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <EnvironmentParam 
                label="Water Turbidity (NDTI)" 
                value={data.mean_ndti_2026.toFixed(4)} 
                unit="indeks" 
                status={data.mean_ndti_2026 > 0.2 ? "Tinggi" : "Normal"} 
              />
              <EnvironmentParam 
                label="Chlorophyll-a (NDCI)" 
                value={data.mean_ndci_2026.toFixed(4)} 
                unit="indeks" 
                status={data.mean_ndci_2026 > 0 ? "Tinggi" : "Normal"} 
              />
              <EnvironmentParam 
                label="Total Suspended Solids (TSS)" 
                value={data.mean_tss_2026.toFixed(4)} 
                unit="indeks" 
                status={data.mean_tss_2026 > 1.0 ? "Tinggi" : "Normal"} 
              />
              <EnvironmentParam 
                label="Dissolved Organic (CDOM)" 
                value={data.mean_cdom_2026.toFixed(4)} 
                unit="indeks" 
                status={data.mean_cdom_2026 > 1.0 ? "Tinggi" : "Normal"} 
              />
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="history" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Riwayat Analisis</CardTitle>
            <CardDescription>
              Proyeksi analisis kualitas air untuk lokasi ini
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="pb-3 font-medium">Periode</th>
                    <th className="pb-3 font-medium">Kualitas</th>
                    <th className="pb-3 font-medium">Skor</th>
                    <th className="pb-3 font-medium">Dampak Industri</th>
                    <th className="pb-3 font-medium">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <HistoryRow 
                    date="Proyeksi 2026" 
                    quality={data.status_kualitas_2026} 
                    qualityColor={isSehat ? "text-success" : "text-destructive"} 
                    confidence={data.health_score} 
                    pollution={data.kategori_dampak_industri} 
                  />
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-muted/30 px-3 py-2">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}

function ConfidenceRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium tabular-nums">{value}%</span>
      </div>
      <Progress value={value} className="h-1.5" />
    </div>
  );
}

function EnvironmentParam({
  label,
  value,
  unit,
  status,
}: {
  label: string;
  value: string;
  unit: string;
  status: string;
}) {
  const isNormal = status === "Normal";

  return (
    <div className="rounded-xl border border-border/60 bg-muted/20 p-4 transition-colors hover:bg-muted/40">
      <p className="text-xs text-muted-foreground">{label}</p>
      <div className="mt-1 flex items-baseline gap-1">
        <span className="text-xl font-bold">{value}</span>
        <span className="text-xs text-muted-foreground">{unit}</span>
      </div>
      <Badge
        variant="outline"
        className={`mt-2 text-[10px] ${
          isNormal 
            ? "border-success/30 text-success" 
            : "border-destructive/30 text-destructive"
        }`}
      >
        {status}
      </Badge>
    </div>
  );
}

function HistoryRow({
  date,
  quality,
  qualityColor,
  confidence,
  pollution,
}: {
  date: string;
  quality: string;
  qualityColor: string;
  confidence: number;
  pollution: string;
}) {
  return (
    <tr className="transition-colors hover:bg-muted/30">
      <td className="py-3 font-medium">{date}</td>
      <td className={`py-3 font-semibold ${qualityColor}`}>{quality}</td>
      <td className="py-3 tabular-nums">{confidence}%</td>
      <td className="py-3">{pollution}</td>
      <td className="py-3">
        <Button variant="ghost" size="xs">
          <Eye className="size-3" />
          Lihat
        </Button>
      </td>
    </tr>
  );
}

