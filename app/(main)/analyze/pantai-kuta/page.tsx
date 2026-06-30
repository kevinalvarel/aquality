import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SummaryCards } from "@/components/main/analyze/summary-cards";
import { BeachImagePreview } from "@/components/main/analyze/beach-image-preview";
import { AIAnalysisResult } from "@/components/main/analyze/ai-analysis-result";
import { EnvironmentalMetrics } from "@/components/main/analyze/environmental-metrics";
import { AIRecommendation } from "@/components/main/analyze/ai-recommendation";
import { AnalysisTimeline } from "@/components/main/analyze/analysis-timeline";
import { EnvironmentalConditions } from "@/components/main/analyze/environmental-conditions";
import { DetectedObjects } from "@/components/main/analyze/detected-objects";
import { ConfidenceBreakdown } from "@/components/main/analyze/confidence-breakdown";
import { AnalysisTabs } from "@/components/main/analyze/analysis-tabs";
import { Microscope, Plus, Download } from "lucide-react";

export default function SlugPage() {
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
              Beach Analysis
            </h1>
          </div>
          <p className="max-w-xl text-sm text-muted-foreground">
            Analyze coastal water conditions using AI-powered image
            classification and environmental metrics.
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

      {/* Summary Cards */}
      <SummaryCards />

      {/* Main Content: Two-Column Layout */}
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
