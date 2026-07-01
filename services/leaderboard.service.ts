import type {
  BeachLeaderboard,
  LeaderboardFilters,
  LeaderboardResponse,
  LeaderboardSummary,
} from "@/types/leaderboard";

import leaderboardData from "@/data/leaderboard.json";

// ─── Data Source ──────────────────────────────────────────────────────────
// Currently reads from local JSON. To switch to Redis/API:
//
//   1. Replace fetchRawData() to call your API route
//   2. Keep the rest of the service untouched
//   3. UI components stay the same
// ──────────────────────────────────────────────────────────────────────────

async function fetchRawData(): Promise<{
  data: BeachLeaderboard[];
  lastUpdated: string;
}> {
  // Simulate async to match future API pattern
  return {
    data: leaderboardData.data as BeachLeaderboard[],
    lastUpdated: leaderboardData.lastUpdated,
  };
}

// ─── Public API ──────────────────────────────────────────────────────────

export async function getLeaderboard(
  filters: LeaderboardFilters,
  page: number = 1,
  pageSize: number = 5
): Promise<LeaderboardResponse & { page: number; pageSize: number; totalPages: number }> {
  const raw = await fetchRawData();
  let filtered = [...raw.data];

  // Search filter
  if (filters.search) {
    const query = filters.search.toLowerCase();
    filtered = filtered.filter(
      (b) =>
        b.beachName.toLowerCase().includes(query) ||
        b.location.toLowerCase().includes(query)
    );
  }

  // Status filter
  if (filters.status !== "all") {
    filtered = filtered.filter((b) => b.status === filters.status);
  }

  // Location filter
  if (filters.location && filters.location !== "all") {
    filtered = filtered.filter((b) => b.location === filters.location);
  }

  // Sort
  filtered.sort((a, b) => {
    const field = filters.sortField;
    const dir = filters.sortDirection === "asc" ? 1 : -1;

    if (field === "beachName") {
      return a.beachName.localeCompare(b.beachName) * dir;
    }
    if (field === "lastAnalyzed") {
      return (
        (new Date(a.lastAnalyzed).getTime() -
          new Date(b.lastAnalyzed).getTime()) *
        dir
      );
    }
    return ((a[field] as number) - (b[field] as number)) * dir;
  });

  // Pagination
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const paginatedData = filtered.slice(start, start + pageSize);

  return {
    data: paginatedData,
    total,
    lastUpdated: raw.lastUpdated,
    page: safePage,
    pageSize,
    totalPages,
  };
}

export async function getLeaderboardSummary(): Promise<LeaderboardSummary> {
  const raw = await fetchRawData();
  const beaches = raw.data;

  if (beaches.length === 0) {
    return {
      totalBeaches: 0,
      averageScore: 0,
      highestScore: 0,
      lastUpdated: raw.lastUpdated,
    };
  }

  const totalScore = beaches.reduce((sum, b) => sum + b.environmentalScore, 0);

  return {
    totalBeaches: beaches.length,
    averageScore: Math.round(totalScore / beaches.length),
    highestScore: Math.max(...beaches.map((b) => b.environmentalScore)),
    lastUpdated: raw.lastUpdated,
  };
}

export async function getTopBeaches(
  count: number = 3
): Promise<BeachLeaderboard[]> {
  const raw = await fetchRawData();
  return [...raw.data]
    .sort((a, b) => b.environmentalScore - a.environmentalScore)
    .slice(0, count);
}

export async function getAllBeaches(): Promise<BeachLeaderboard[]> {
  const raw = await fetchRawData();
  return raw.data;
}

export async function getUniqueLocations(): Promise<string[]> {
  const raw = await fetchRawData();
  const locations = new Set(raw.data.map((b) => b.location));
  return Array.from(locations).sort();
}

export async function getScoreDistribution(): Promise<
  { status: string; count: number; fill: string }[]
> {
  const raw = await fetchRawData();
  const dist = { Excellent: 0, Good: 0, Moderate: 0, Poor: 0 };

  for (const b of raw.data) {
    dist[b.status]++;
  }

  return [
    { status: "Excellent", count: dist.Excellent, fill: "var(--color-success)" },
    { status: "Good", count: dist.Good, fill: "var(--color-chart-2)" },
    { status: "Moderate", count: dist.Moderate, fill: "var(--color-warning)" },
    { status: "Poor", count: dist.Poor, fill: "var(--color-destructive)" },
  ];
}
