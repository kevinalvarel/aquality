import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Microscope, ImagePlus, Download } from "lucide-react";
import { DashboardSummaryCards } from "@/components/main/analyze/main/dashboard-summary-cards";
import { AIInsightsCard } from "@/components/main/analyze/main/ai-insights-card";
import { AnalysisTrendChart } from "@/components/main/analyze/main/analysis-trend-chart";
import { BeachStatusDonut } from "@/components/main/analyze/main/beach-status-donut";
import { SearchAndFilters } from "@/components/main/analyze/main/search-and-filters";
import { RecentAnalysesTable } from "@/components/main/analyze/main/recent-analyses-table";

export default function AnalyzePage() {
  return (
    <div className="space-y-8 px-4 py-6 md:px-6 lg:px-8">
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
          <p className="max-w-lg text-sm text-muted-foreground">
            Monitor, manage, and review AI-powered coastal water quality
            analyses.
          </p>
        </div>
        <div className="flex gap-2">
          <Button>
            <ImagePlus className="size-4" />
            Analyze New Image
          </Button>
          <Button variant="outline">
            <Download className="size-4" />
            Export Report
          </Button>
        </div>
      </div>

      <Separator />

      {/* Summary KPI Cards */}
      <DashboardSummaryCards />

      {/* AI Insights */}
      <AIInsightsCard />

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AnalysisTrendChart />
        <BeachStatusDonut />
      </div>

      {/* Search & Filters */}
      <div className="space-y-4">
        <SearchAndFilters />

        {/* Recent Analyses Table */}
        <RecentAnalysesTable />
      </div>
    </div>
  );
}
