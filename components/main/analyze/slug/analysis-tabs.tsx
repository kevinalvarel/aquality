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
import { FileText, Cpu } from "lucide-react";
import type { AnalyzeApiResponse } from "@/types/beach-api.type";
import { extractStatusFromExplanation } from "@/lib/utils";

interface AnalysisTabsProps {
  data: AnalyzeApiResponse;
}

export function AnalysisTabs({ data }: AnalysisTabsProps) {
  const statusEnv = extractStatusFromExplanation(data.penjelasan_kualitas);
  const isLestari = statusEnv.toUpperCase().includes("LESTARI") || statusEnv.toUpperCase().includes("BAIK");

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
      </TabsList>

      <TabsContent value="overview" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Ringkasan Analisis</CardTitle>
            <CardDescription>
              Ringkasan kelayakan lingkungan pantai terbaru berdasarkan analisis AI
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Analisis kelayakan lingkungan untuk pantai{" "}
              <span className="font-medium text-foreground">{data.pantai}</span>{" "}
              (Kecamatan {data.Kecamatan}, Kabupaten/Kota {data.Kabupaten_Kota}) menghasilkan klasifikasi{" "}
              <span className={`font-semibold ${isLestari ? "text-success" : "text-destructive"}`}>
                {statusEnv}
              </span>.
              Pantai ini memiliki kepadatan penduduk kecamatan sebesar{" "}
              <span className="font-medium text-foreground">{data.kepadatan_penduduk_kecamatan} jiwa/km²</span>{" "}
              dan indeks dampak industri sebesar{" "}
              <span className="font-medium text-foreground">{data.indeks_dampak_industri.toFixed(2)}</span>.
            </p>
            <Separator />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-lg bg-muted/30 p-4 text-center">
                <p className={`text-xl font-bold ${isLestari ? "text-success" : "text-destructive"}`}>
                  {statusEnv}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Klasifikasi Kelayakan</p>
              </div>
              <div className="rounded-lg bg-muted/30 p-4 text-center">
                <p className="text-xl font-bold text-primary">{data.indeks_pengaruh_urban.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground mt-1">Indeks Pengaruh Urban</p>
              </div>
              <div className="rounded-lg bg-muted/30 p-4 text-center">
                <p className="text-xl font-bold text-primary">{data.indeks_dampak_industri.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground mt-1">Indeks Dampak Industri</p>
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
                <InfoRow label="Industri Terdekat" value={`${data.industri_terdekat} (${data.tipe_industri})`} />
                <InfoRow label="Jarak Industri" value={`${data.jarak_industri_km.toFixed(2)} km`} />
                {data.industri_terdekat_2 && (
                  <>
                    <InfoRow label="Industri #2" value={`${data.industri_terdekat_2} (${data.tipe_industri_2})`} />
                    <InfoRow label="Jarak Industri #2" value={`${data.jarak_industri_2_km.toFixed(2)} km`} />
                  </>
                )}
                {data.industri_terdekat_3 && (
                  <>
                    <InfoRow label="Industri #3" value={`${data.industri_terdekat_3} (${data.tipe_industri_3})`} />
                    <InfoRow label="Jarak Industri #3" value={`${data.jarak_industri_3_km.toFixed(2)} km`} />
                  </>
                )}
                <InfoRow label="Kategori Dampak" value={data.kategori_dampak_industri} />
                <InfoRow label="Indeks Dampak Industri" value={data.indeks_dampak_industri.toFixed(2)} />
                <InfoRow label="Industri Relevan" value={`${data.industri_relevan_terdekat} (${data.tipe_industri_relevan})`} />
                <InfoRow label="Jarak Industri Relevan" value={`${data.jarak_industri_relevan_km.toFixed(2)} km`} />
                <InfoRow label="Jumlah Industri (10km)" value={data.jumlah_industri_radius_10km.toString()} />
                <InfoRow label="Kepadatan Industri" value={data.kepadatan_industri.toString()} />
                <InfoRow label="Kepadatan Penduduk" value={`${data.kepadatan_penduduk_kecamatan} jiwa/km²`} />
                <InfoRow label="Indeks Pengaruh Urban" value={data.indeks_pengaruh_urban.toFixed(2)} />
              </div>
              {data.daftar_industri_radius && data.daftar_industri_radius.length > 0 && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Industri dalam Radius 10km</p>
                    <div className="flex flex-wrap gap-2">
                      {data.daftar_industri_radius.map((name) => (
                        <Badge key={name} variant="outline" className="text-xs">
                          {name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </>
              )}
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
