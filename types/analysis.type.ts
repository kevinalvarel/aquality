// ─── Analysis Types ─────────────────────────────────────────────────────────
// Type definitions for the analysis domain.

import type { SortDirection } from "./common.type";

/** Full analysis detail — returned for the [slug] detail page */
export interface AnalysisDetail {
  id: string;
  slug: string;
  status: string;
  environmentalScore: number | null;
  aiConfidence: number | null;
  waterClarity: number | null;
  pollutionLevel: number | null;
  shorelineCleanliness: number | null;
  wasteDetection: number | null;
  overallStatus: string | null;
  summary: string | null;
  processedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  beach: AnalysisBeachInfo;
  metrics: AnalysisMetrics | null;
  detections: AnalysisDetection[];
  recommendations: AnalysisRecommendation[];
  previousAnalyses: AnalysisListItem[];
}

/** Beach info embedded in an analysis response */
export interface AnalysisBeachInfo {
  id: string;
  slug: string;
  pantai: string;
  kecamatan: string;
  kabupatenKota: string;
  pctSehat2026: number | null;
  statusKualitas2026: string | null;
  industriTerdekat: string | null;
  jarakIndustriKm: number | null;
  kategoriDampakIndustri: string | null;
  image: string | null;
}

/** Environmental metrics for an analysis */
export interface AnalysisMetrics {
  id: string;
  temperature: number | null;
  humidity: number | null;
  windSpeed: number | null;
  windDirection: string | null;
  waveHeight: number | null;
  tideLevel: string | null;
  uvIndex: number | null;
  visibility: number | null;
  ph: number | null;
  dissolvedOxygen: number | null;
  turbidity: number | null;
  salinity: number | null;
  recordedAt: Date;
}

/** AI detection result */
export interface AnalysisDetection {
  id: string;
  label: string;
  confidence: number;
  boundingBox: unknown;
  category: string | null;
  severity: string | null;
  count: number;
}

/** Recommendation attached to an analysis */
export interface AnalysisRecommendation {
  id: string;
  title: string;
  description: string;
  priority: string;
  category: string;
  isCompleted: boolean;
}

/** Lightweight analysis item for tables and lists */
export interface AnalysisListItem {
  id: string;
  slug: string;
  status: string;
  environmentalScore: number | null;
  aiConfidence: number | null;
  overallStatus: string | null;
  createdAt: Date;
  beachName: string;
  beachSlug: string;
  beachImage: string | null;
  location: string;
}

/** Filters for the analysis list page */
export interface AnalysisFilters {
  search?: string;
  province?: string;
  status?: string;
  sortField?: AnalysisSortField;
  sortDirection?: SortDirection;
  page?: number;
  pageSize?: number;
}

/** Fields available for sorting analyses */
export type AnalysisSortField =
  | "environmentalScore"
  | "aiConfidence"
  | "createdAt"
  | "beachName";

/** Paginated analysis list response */
export interface AnalysisListResponse {
  data: AnalysisListItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/** Input for creating a new analysis */
export interface CreateAnalysisInput {
  beachId: string;
  userId?: string;
  environmentalScore?: number;
  aiConfidence?: number;
  waterClarity?: number;
  pollutionLevel?: number;
  shorelineCleanliness?: number;
  wasteDetection?: number;
  overallStatus?: "excellent" | "good" | "moderate" | "poor";
  summary?: string;
  metrics?: CreateMetricsInput;
  detections?: CreateDetectionInput[];
  recommendations?: CreateRecommendationInput[];
}

export interface CreateMetricsInput {
  temperature?: number;
  humidity?: number;
  windSpeed?: number;
  windDirection?: string;
  waveHeight?: number;
  tideLevel?: string;
  uvIndex?: number;
  visibility?: number;
  ph?: number;
  dissolvedOxygen?: number;
  turbidity?: number;
  salinity?: number;
}

export interface CreateDetectionInput {
  label: string;
  confidence: number;
  boundingBox?: unknown;
  category?: string;
  severity?: string;
  count?: number;
}

export interface CreateRecommendationInput {
  title: string;
  description: string;
  priority?: "low" | "medium" | "high" | "critical";
  category:
    | "water_quality"
    | "waste_management"
    | "shoreline"
    | "ecosystem"
    | "infrastructure";
}
