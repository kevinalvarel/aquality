// ─── Centralized Cache Keys ─────────────────────────────────────────────────
// All cache keys used across services. Centralizing prevents key collisions
// and makes invalidation predictable.

export const CACHE_KEYS = {
  // Dashboard
  dashboard: "dashboard:stats",

  // Leaderboard
  leaderboard: "leaderboard:all",
  leaderboardSummary: "leaderboard:summary",
  leaderboardTop: (count: number) => `leaderboard:top:${count}`,
  leaderboardLocations: "leaderboard:locations",
  leaderboardDistribution: "leaderboard:distribution",

  // Beach
  beach: (slug: string) => `beach:${slug}`,
  beachAll: "beach:all",

  // Analysis
  analysis: (slug: string) => `analysis:${slug}`,
  analysisList: (hash: string) => `analysis:list:${hash}`,
  recentAnalyses: "analysis:recent",
} as const;

// ─── Cache TTLs (seconds) ───────────────────────────────────────────────────
export const CACHE_TTL = {
  /** Dashboard aggregations — 5 minutes */
  dashboard: 300,

  /** Leaderboard rankings — 10 minutes */
  leaderboard: 600,

  /** Individual beach detail — 30 minutes */
  beach: 1800,

  /** Single analysis detail — 15 minutes */
  analysisDetail: 900,

  /** Recent analyses list — 5 minutes */
  recentAnalysis: 300,

  /** Analysis list (filtered/paginated) — 5 minutes */
  analysisList: 300,
} as const;
