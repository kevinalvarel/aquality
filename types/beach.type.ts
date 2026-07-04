// ─── Beach Types ────────────────────────────────────────────────────────────
// Type definitions for the beach domain.

/** DB-level beach status (lowercase, matches pgEnum) */
export type DbBeachStatus = "excellent" | "good" | "moderate" | "poor";

/** Full beach detail with recent analyses summary */
export interface BeachDetail {
  id: string;
  slug: string;
  name: string;
  location: string;
  province: string;
  description: string | null;
  latitude: number | null;
  longitude: number | null;
  image: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  recentAnalyses: BeachAnalysisSummary[];
}

/** Lightweight analysis summary used within beach context */
export interface BeachAnalysisSummary {
  id: string;
  slug: string;
  environmentalScore: number | null;
  aiConfidence: number | null;
  overallStatus: string | null;
  createdAt: Date;
}

/** Lightweight beach item for lists */
export interface BeachListItem {
  id: string;
  slug: string;
  name: string;
  location: string;
  province: string;
  image: string | null;
  status: string;
  latestScore: number | null;
  latestConfidence: number | null;
  lastAnalyzed: Date | null;
}

/** Input for creating a new beach */
export interface CreateBeachInput {
  slug: string;
  name: string;
  location: string;
  province: string;
  description?: string;
  latitude?: number;
  longitude?: number;
  image?: string;
  status?: DbBeachStatus;
}

/** Input for updating an existing beach */
export interface UpdateBeachInput {
  name?: string;
  location?: string;
  province?: string;
  description?: string;
  latitude?: number;
  longitude?: number;
  image?: string;
  status?: DbBeachStatus;
}
