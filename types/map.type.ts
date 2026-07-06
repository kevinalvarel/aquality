// ─── Map Types ──────────────────────────────────────────────────────────────
// Type definitions for the interactive map page.

import type { DbBeachStatus } from "./beach.type";

/** Beach destination displayed on the map */
export interface Destination {
  id: string;
  slug: string;
  name: string;
  location: string;
  province: string;
  description: string | null;
  longitude: number;
  latitude: number;
  image: string | null;
  status: DbBeachStatus;
  latestScore: number | null;
  latestConfidence: number | null;
  lastAnalyzed: Date | null;
}
