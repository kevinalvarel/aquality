// ─── Dashboard Types ────────────────────────────────────────────────────────
// Type definitions for the dashboard/analytics domain.

import type { AnalysisListItem } from "./analysis.type";

/** Aggregated dashboard statistics */
export interface DashboardStats {
  totalAnalyses: number;
  totalBeaches: number;
  averageScore: number;
  averageConfidence: number;
  recentAnalyses: AnalysisListItem[];
  monthlyStats: MonthlyStatItem[];
  statusDistribution: { status: string; count: number }[];
}

/** Monthly aggregation for trend charts */
export interface MonthlyStatItem {
  month: string;
  year: number;
  totalAnalyses: number;
  averageScore: number;
  averageConfidence: number;
}
