// ─── Map Types ──────────────────────────────────────────────────────────────
// Type definitions for the interactive map page.

import type { DbBeachStatus } from "./beach.type";

/** Beach destination displayed on the map */
export interface Destination {
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
  description: string | null;
  longitude: number;
  latitude: number;
  image: string | null;
  status: DbBeachStatus;
  latestScore: number | null;
  latestConfidence: number | null;
  lastAnalyzed: Date | null;
}
