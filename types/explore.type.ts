// ─── Explore & Map Types ────────────────────────────────────────────────────
// Type definitions for the Explore page and Map page data.

import type { DbBeachStatus } from "./beach.type";

/** Beach item shaped for the Explore page ResultCard */
export interface ExploreBeachItem {
  id: string;
  slug: string;
  name: string;
  location: string;
  province: string;
  description: string | null;
  image: string | null;
  status: DbBeachStatus;
  latestScore: number | null;
  latestConfidence: number | null;
  lastAnalyzed: Date | null;
}

/** Beach item shaped for the Map page markers and sidebar */
export interface MapBeachItem {
  id: string;
  slug: string;
  name: string;
  location: string;
  province: string;
  description: string | null;
  latitude: number;
  longitude: number;
  image: string | null;
  status: DbBeachStatus;
  latestScore: number | null;
  latestConfidence: number | null;
  lastAnalyzed: Date | null;
}

/** Derived analysis output from generateBeachAnalysis */
export interface BeachAnalysis {
  waterQuality: WaterQualityLevel;
  safetyStatus: SafetyLevel;
  cleanliness: CleanlinessLevel;
  recommendation: string;
  activities: string[];
  summary: string;
  score: number | null;
}

/** Water quality level labels */
export type WaterQualityLevel = "Sangat Baik" | "Baik" | "Sedang" | "Buruk";

/** Safety status labels */
export type SafetyLevel = "Aman" | "Cukup Aman" | "Perlu Hati-hati" | "Tidak Aman";

/** Cleanliness level labels */
export type CleanlinessLevel = "Sangat Bersih" | "Bersih" | "Cukup Bersih" | "Kotor";
