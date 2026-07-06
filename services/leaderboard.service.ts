import { db } from "@/db";
import { beaches, analyses } from "@/db/schema/index";
import { eq, desc, sql, count, avg } from "drizzle-orm";
import { withCache } from "@/lib/cache";
import { CACHE_KEYS, CACHE_TTL } from "@/constants/cache-keys";

import type {
  BeachLeaderboard,
  LeaderboardFilters,
  LeaderboardResponse,
  LeaderboardSummary,
  BeachStatus,
} from "@/types/leaderboard.type";

// ─── Leaderboard Service ────────────────────────────────────────────────────
// Provides ranked beach data for the leaderboard view.
// All reads use cache-first strategy with a 10-minute TTL.

/**
 * Map a database status string to the UI BeachStatus type.
 */
function mapStatus(status: string | null): BeachStatus {
  switch (status?.toLowerCase()) {
    case "excellent":
      return "Excellent";
    case "good":
      return "Good";
    case "moderate":
      return "Moderate";
    case "poor":
      return "Poor";
    default:
      return "Moderate";
  }
}

/**
 * Fetch all beaches with their latest analysis data for leaderboard ranking.
 * Returns BeachLeaderboard[] ordered by environmental score descending.
 */
async function fetchLeaderboardData(): Promise<BeachLeaderboard[]> {
  return withCache(CACHE_KEYS.leaderboard, CACHE_TTL.leaderboard, async () => {
    // Get all beaches with their latest completed analysis
    // Using a subquery to get only the latest analysis per beach
    const rows = await db
      .select({
        beachId: beaches.id,
        beachSlug: beaches.slug,
        beachName: beaches.name,
        location: beaches.location,
        image: beaches.image,
        environmentalScore: analyses.environmentalScore,
        aiConfidence: analyses.aiConfidence,
        waterClarity: analyses.waterClarity,
        pollutionLevel: analyses.pollutionLevel,
        shorelineCleanliness: analyses.shorelineCleanliness,
        wasteDetection: analyses.wasteDetection,
        overallStatus: analyses.overallStatus,
        lastAnalyzed: analyses.createdAt,
      })
      .from(beaches)
      .innerJoin(
        analyses,
        sql`${analyses.beachId} = ${beaches.id} AND ${analyses.id} = (
          SELECT a.id FROM analyses a 
          WHERE a.beach_id = ${beaches.id} AND a.status = 'completed' 
          ORDER BY a.created_at DESC LIMIT 1
        )`,
      )
      .orderBy(desc(analyses.environmentalScore));

    return rows.map((row) => ({
      id: row.beachId,
      slug: row.beachSlug,
      beachName: row.beachName,
      location: row.location,
      image: row.image ?? "/beaches/default.jpg",
      environmentalScore: row.environmentalScore ?? 0,
      status: mapStatus(row.overallStatus),
      aiConfidence: row.aiConfidence !== null ? Math.round(row.aiConfidence * 100) : 0,
      waterClarity: row.waterClarity ?? 0,
      pollutionLevel: row.pollutionLevel ?? 0,
      shorelineCleanliness: row.shorelineCleanliness ?? 0,
      wasteDetection: row.wasteDetection ?? 0,
      lastAnalyzed: row.lastAnalyzed?.toISOString() ?? new Date().toISOString(),
    }));
  });
}

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Get paginated, filtered leaderboard data.
 * Filtering and sorting happen in-memory after cache hit for simplicity,
 * since the total dataset is bounded (coastal monitoring stations).
 */
export async function getLeaderboard(
  filters: LeaderboardFilters,
  page: number = 1,
  pageSize: number = 5,
): Promise<
  LeaderboardResponse & { page: number; pageSize: number; totalPages: number }
> {
  const allBeaches = await fetchLeaderboardData();
  let filtered = [...allBeaches];

  // Search filter
  if (filters.search) {
    const query = filters.search.toLowerCase();
    filtered = filtered.filter(
      (b) =>
        b.beachName.toLowerCase().includes(query) ||
        b.location.toLowerCase().includes(query),
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

  // Get last updated from the most recent analysis
  const lastUpdated =
    allBeaches.length > 0
      ? allBeaches.reduce((latest, b) =>
          new Date(b.lastAnalyzed) > new Date(latest.lastAnalyzed) ? b : latest,
        ).lastAnalyzed
      : new Date().toISOString();

  return {
    data: paginatedData,
    total,
    lastUpdated,
    page: safePage,
    pageSize,
    totalPages,
  };
}

/**
 * Get leaderboard summary statistics.
 */
export async function getLeaderboardSummary(): Promise<LeaderboardSummary> {
  return withCache(
    CACHE_KEYS.leaderboardSummary,
    CACHE_TTL.leaderboard,
    async () => {
      const allBeaches = await fetchLeaderboardData();

      if (allBeaches.length === 0) {
        return {
          totalBeaches: 0,
          averageScore: 0,
          highestScore: 0,
          lastUpdated: new Date().toISOString(),
        };
      }

      const totalScore = allBeaches.reduce(
        (sum, b) => sum + b.environmentalScore,
        0,
      );

      const lastUpdated = allBeaches.reduce((latest, b) =>
        new Date(b.lastAnalyzed) > new Date(latest.lastAnalyzed) ? b : latest,
      ).lastAnalyzed;

      return {
        totalBeaches: allBeaches.length,
        averageScore: Math.round(totalScore / allBeaches.length),
        highestScore: Math.max(...allBeaches.map((b) => b.environmentalScore)),
        lastUpdated,
      };
    },
  );
}

/**
 * Get the top N beaches by environmental score.
 */
export async function getTopBeaches(
  topCount: number = 3,
): Promise<BeachLeaderboard[]> {
  return withCache(
    CACHE_KEYS.leaderboardTop(topCount),
    CACHE_TTL.leaderboard,
    async () => {
      const allBeaches = await fetchLeaderboardData();
      return [...allBeaches]
        .sort((a, b) => b.environmentalScore - a.environmentalScore)
        .slice(0, topCount);
    },
  );
}

/**
 * Get all beaches for the leaderboard.
 */
export async function getAllBeaches(): Promise<BeachLeaderboard[]> {
  return fetchLeaderboardData();
}

/**
 * Get unique locations from all beaches.
 */
export async function getUniqueLocations(): Promise<string[]> {
  return withCache(
    CACHE_KEYS.leaderboardLocations,
    CACHE_TTL.leaderboard,
    async () => {
      const allBeaches = await fetchLeaderboardData();
      const locations = new Set(allBeaches.map((b) => b.location));
      return Array.from(locations).sort();
    },
  );
}

/**
 * Get score distribution grouped by status for charting.
 */
export async function getScoreDistribution(): Promise<
  { status: string; count: number; fill: string }[]
> {
  return withCache(
    CACHE_KEYS.leaderboardDistribution,
    CACHE_TTL.leaderboard,
    async () => {
      const allBeaches = await fetchLeaderboardData();
      const dist = { Excellent: 0, Good: 0, Moderate: 0, Poor: 0 };

      for (const b of allBeaches) {
        dist[b.status]++;
      }

      return [
        {
          status: "Excellent",
          count: dist.Excellent,
          fill: "var(--color-success)",
        },
        { status: "Good", count: dist.Good, fill: "var(--color-chart-2)" },
        {
          status: "Moderate",
          count: dist.Moderate,
          fill: "var(--color-warning)",
        },
        {
          status: "Poor",
          count: dist.Poor,
          fill: "var(--color-destructive)",
        },
      ];
    },
  );
}
