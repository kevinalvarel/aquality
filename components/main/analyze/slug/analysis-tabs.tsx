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

export function AnalysisTabs() {
  return (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">
          <FileText className="size-3.5" />
          Ringkasan
        </TabsTrigger>
        <TabsTrigger value="ai-details">
          <Cpu className="size-3.5" />
          Detail AI
        </TabsTrigger>
        <TabsTrigger value="environmental">
          <FlaskConical className="size-3.5" />
          Data Lingkungan
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
              Ringkasan analisis kualitas air pantai terbaru
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Analisis AI untuk Pantai Kuta yang diambil pada 30 Juni 2026 menunjukkan
              <span className="font-medium text-success"> kualitas air yang baik</span>{" "}
              dengan skor keyakinan{" "}
              <span className="font-medium text-foreground">97%</span>. Lingkungan
              pesisir menunjukkan{" "}
              <span className="font-medium text-foreground">polusi minimal</span>{" "}
              dan garis pantai terawat dengan baik. Metrik lingkungan menunjukkan kekeruhan
              rendah (18%), sampah terapung minimal (7%), dan kejelasan air yang tinggi (86%).
            </p>
            <Separator />
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">97%</p>
                <p className="text-xs text-muted-foreground">Skor Keseluruhan</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-success">Baik</p>
                <p className="text-xs text-muted-foreground">Klasifikasi</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">6</p>
                <p className="text-xs text-muted-foreground">Objek Terdeteksi</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="ai-details" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Detail Model AI</CardTitle>
            <CardDescription>
              Informasi teknis tentang model klasifikasi
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <InfoRow label="Nama Model" value="AQuality Vision v2.4" />
                <InfoRow label="Jenis Model" value="CNN + Transformer" />
                <InfoRow label="Waktu Inferensi" value="1,23 detik" />
                <InfoRow label="Resolusi Input" value="1920 × 1080" />
                <InfoRow label="Framework" value="PyTorch 2.3" />
                <InfoRow label="Terakhir Diperbarui" value="15 Juni 2026" />
              </div>
              <Separator />
              <div className="space-y-3">
                <p className="text-sm font-medium">Distribusi Keyakinan</p>
                <div className="space-y-2">
                  <ConfidenceRow label="Kualitas Air" value={97} />
                  <ConfidenceRow label="Deteksi Objek" value={94} />
                  <ConfidenceRow label="Penilaian Polusi" value={91} />
                  <ConfidenceRow label="Analisis Garis Pantai" value={89} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="environmental" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Data Lingkungan</CardTitle>
            <CardDescription>
              Parameter kimia dan fisik air
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <EnvironmentParam label="Tingkat pH" value="7.8" unit="pH" status="Normal" />
              <EnvironmentParam label="Salinitas" value="35.2" unit="ppt" status="Normal" />
              <EnvironmentParam label="Oksigen Terlarut" value="6.8" unit="mg/L" status="Baik" />
              <EnvironmentParam label="Kekeruhan" value="4.2" unit="NTU" status="Rendah" />
              <EnvironmentParam label="Suhu" value="28.5" unit="°C" status="Normal" />
              <EnvironmentParam label="Konduktivitas" value="52.4" unit="mS/cm" status="Normal" />
              <EnvironmentParam label="Total Padatan Terlarut" value="34.100" unit="mg/L" status="Normal" />
              <EnvironmentParam label="Klorofil-a" value="1.2" unit="μg/L" status="Rendah" />
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="history" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Riwayat Analisis</CardTitle>
            <CardDescription>
              Analisis sebelumnya untuk lokasi pantai ini
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="pb-3 font-medium">Tanggal</th>
                    <th className="pb-3 font-medium">Kualitas</th>
                    <th className="pb-3 font-medium">Keyakinan</th>
                    <th className="pb-3 font-medium">Polusi</th>
                    <th className="pb-3 font-medium">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <HistoryRow date="30 Juni 2026" quality="Baik" qualityColor="text-success" confidence={97} pollution="Rendah" />
                  <HistoryRow date="23 Juni 2026" quality="Baik" qualityColor="text-success" confidence={94} pollution="Rendah" />
                  <HistoryRow date="16 Juni 2026" quality="Sedang" qualityColor="text-warning" confidence={89} pollution="Sedang" />
                  <HistoryRow date="09 Juni 2026" quality="Baik" qualityColor="text-success" confidence={92} pollution="Rendah" />
                  <HistoryRow date="02 Juni 2026" quality="Sangat Baik" qualityColor="text-primary" confidence={98} pollution="Sangat Rendah" />
                  <HistoryRow date="26 Mei 2026" quality="Baik" qualityColor="text-success" confidence={91} pollution="Rendah" />
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
  return (
    <div className="rounded-xl border border-border/60 bg-muted/20 p-4 transition-colors hover:bg-muted/40">
      <p className="text-xs text-muted-foreground">{label}</p>
      <div className="mt-1 flex items-baseline gap-1">
        <span className="text-xl font-bold">{value}</span>
        <span className="text-xs text-muted-foreground">{unit}</span>
      </div>
      <Badge
        variant="outline"
        className="mt-2 border-success/30 text-success text-[10px]"
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
