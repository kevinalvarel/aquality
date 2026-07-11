export type BeachStatus = "Excellent" | "Good" | "Moderate" | "Poor";

export interface BeachLeaderboard {
  id: string;
  slug: string;
  beachName: string;
  location: string;
  image: string;
  environmentalScore: number;
  status: BeachStatus;
  aiConfidence: number;
  waterClarity: number;
  pollutionLevel: number;
  shorelineCleanliness: number;
  wasteDetection: number;
  lastAnalyzed: string;
  
  // Optional fields from /api/recommendation/beaches response
  narasi_rekomendasi?: string;
  indeks_dampak_industri?: number;
  kepadatan_penduduk_kecamatan?: number;
  indeks_pengaruh_urban?: number;
  label_rekomendasi?: string;
  industri_terdekat?: string;
  jarak_industri_km?: number;
}

export type SortField =
  | "environmentalScore"
  | "aiConfidence"
  | "beachName"
  | "lastAnalyzed";

export type SortDirection = "asc" | "desc";

export interface LeaderboardFilters {
  search: string;
  status: BeachStatus | "all";
  location: string;
  sortField: SortField;
  sortDirection: SortDirection;
}

export interface LeaderboardResponse {
  data: BeachLeaderboard[];
  total: number;
  lastUpdated: string;
}

export interface LeaderboardSummary {
  totalBeaches: number;
  averageScore: number;
  highestScore: number;
  lastUpdated: string;
}
