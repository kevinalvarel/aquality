import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Microscope, Plus, Download } from "lucide-react";
import Link from "next/link";

// ─── Components ─────────────────────────────────────────────────────────────
import { SummaryCards } from "@/components/main/analyze/slug/summary-cards";
import { BeachImagePreview } from "@/components/main/analyze/slug/beach-image-preview";
import { AIAnalysisResult } from "@/components/main/analyze/slug/ai-analysis-result";
import { EnvironmentalMetrics } from "@/components/main/analyze/slug/environmental-metrics";
import { AIRecommendation } from "@/components/main/analyze/slug/ai-recommendation";
import { NearestIndustries } from "@/components/main/analyze/slug/nearest-industries";
import { EnvironmentalConditions } from "@/components/main/analyze/slug/environmental-conditions";
import { DetectedObjects } from "@/components/main/analyze/slug/detected-objects";
import { AnalysisTabs } from "@/components/main/analyze/slug/analysis-tabs";
import type { AnalyzeApiResponse } from "@/types/beach-api.type";
import { getBeachAnalysisBySlug } from "@/services/analysis.service";

interface AnalysisDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function AnalysisDetailPage({
  params,
}: AnalysisDetailPageProps) {
  const { slug } = await params;

  let beachData: AnalyzeApiResponse | null = null;
  let hasError = false;

  try {
    beachData = await getBeachAnalysisBySlug(slug);
  } catch (error) {
    console.error("Error fetching beach analysis data:", error);
    hasError = true;
  }

  if (hasError) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center space-y-6 px-4 text-center">
        <div className="rounded-full bg-destructive/10 p-4">
          <svg
            className="size-8 text-destructive"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold tracking-tight">
            Gagal Memuat Data Analisis
          </h2>
          <p className="mx-auto max-w-sm text-sm text-muted-foreground">
            Terjadi kesalahan saat mengambil data dari server analisis. Pastikan
            koneksi internet Anda stabil.
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="/">
            <Button variant="outline">Kembali ke Beranda</Button>
          </Link>
          <a href="">
            <Button>Coba Lagi</Button>
          </a>
        </div>
      </div>
    );
  }

  if (!beachData) {
    notFound();
  }

  return (
    <div className="space-y-6 px-4 py-6 md:px-6 lg:px-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-primary/10 p-2">
              <Microscope className="size-5 text-primary" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">
              {beachData.pantai} — Analisis
            </h1>
          </div>
          <p className="max-w-xl text-sm text-muted-foreground">
            Analisis kualitas air pantai bertenaga AI untuk{" "}
            {beachData.Kecamatan}.
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/analyze">
            <Button>
              <Plus className="size-4" />
              Analisis Pantai Baru
            </Button>
          </Link>
          <Button variant="outline">
            <Download className="size-4" />
            Ekspor Laporan
          </Button>
        </div>
      </div>
      <Separator />
      <SummaryCards data={beachData} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column (larger) */}
        <div className="space-y-6 lg:col-span-2">
          <BeachImagePreview data={beachData} />
          <AIAnalysisResult data={beachData} />
          <EnvironmentalMetrics data={beachData} />
          <AIRecommendation data={beachData} />
        </div>
        {/* Right Sidebar */}
        <div className="space-y-6">
          <NearestIndustries data={beachData} />
          <EnvironmentalConditions />
          <DetectedObjects data={beachData} />
        </div>
      </div>
      {/* Bottom Tabs Section */}
      <Separator />
      <AnalysisTabs data={beachData} />
    </div>
  );
}
