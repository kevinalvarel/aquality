import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Microscope, Plus, Download } from "lucide-react";
import { getAnalysisBySlug } from "@/services/analysis.service";
// ─── Components ─────────────────────────────────────────────────────────────
// These components currently render with hardcoded data.
// When you're ready to wire them up, pass the analysis data as props.
import { SummaryCards } from "@/components/main/analyze/slug/summary-cards";
import { BeachImagePreview } from "@/components/main/analyze/slug/beach-image-preview";
import { AIAnalysisResult } from "@/components/main/analyze/slug/ai-analysis-result";
import { EnvironmentalMetrics } from "@/components/main/analyze/slug/environmental-metrics";
import { AIRecommendation } from "@/components/main/analyze/slug/ai-recommendation";
import { AnalysisTimeline } from "@/components/main/analyze/slug/analysis-timeline";
import { EnvironmentalConditions } from "@/components/main/analyze/slug/environmental-conditions";
import { DetectedObjects } from "@/components/main/analyze/slug/detected-objects";
import { ConfidenceBreakdown } from "@/components/main/analyze/slug/confidence-breakdown";
import { AnalysisTabs } from "@/components/main/analyze/slug/analysis-tabs";
interface AnalysisDetailPageProps {
  params: Promise<{ slug: string }>;
}
export default async function AnalysisDetailPage({
  params,
}: AnalysisDetailPageProps) {
  const { slug } = await params;
  const analysis = await getAnalysisBySlug(slug);
  if (!analysis) {
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
              {analysis.beach.name} — Analysis
            </h1>
          </div>
          <p className="max-w-xl text-sm text-muted-foreground">
            AI-powered coastal water quality analysis for{" "}
            {analysis.beach.location}.
          </p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Plus className="size-4" />
            Analyze New Beach
          </Button>
          <Button variant="outline">
            <Download className="size-4" />
            Export Report
          </Button>
        </div>
      </div>
      <Separator />
      <SummaryCards />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column (larger) */}
        <div className="space-y-6 lg:col-span-2">
          <BeachImagePreview />
          <AIAnalysisResult />
          <EnvironmentalMetrics />
          <AIRecommendation />
        </div>
        {/* Right Sidebar */}
        <div className="space-y-6">
          <AnalysisTimeline />
          <EnvironmentalConditions />
          <DetectedObjects />
          <ConfidenceBreakdown />
        </div>
      </div>
      {/* Bottom Tabs Section */}
      <Separator />
      <AnalysisTabs />
    </div>
  );
}
