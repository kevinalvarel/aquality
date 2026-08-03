import { withCache } from '@/lib/cache';
import { CACHE_KEYS, CACHE_TTL } from '@/constants/cache-keys';

import type {
  BeachLeaderboard,
  LeaderboardFilters,
  LeaderboardResponse,
  LeaderboardSummary,
  BeachStatus,
} from '@/types/leaderboard.type';
import type { BeachRecommendation } from '@/types/explore.type';

// ─── Leaderboard Service ────────────────────────────────────────────────────
// Provides ranked beach data for the leaderboard view.
// All reads use cache-first strategy with a 10-minute TTL.

/**
 * Fetch all beaches with their latest analysis data for leaderboard ranking.
 * Returns BeachLeaderboard[] ordered by environmental score descending.
 */
async function fetchLeaderboardData(): Promise<BeachLeaderboard[]> {
  return withCache(CACHE_KEYS.leaderboard, CACHE_TTL.leaderboard, async () => {
    const apiUrl = process.env.NEXT_PUBLIC_AQUALITY_API_URL;
    const res = await fetch(`${apiUrl}/api/recommendation/beaches`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch leaderboard recommendation data: ${res.statusText}`,
      );
    }

    const json = await res.json();
    const recommendations: BeachRecommendation[] = json.recommendations || [];

    return recommendations.map((rec) => {
      // Map label_rekomendasi (SANGAT DIREKOMENDASIKAN / DIREKOMENDASIKAN / CUKUP / KURANG) to BeachStatus
      let status: BeachStatus = 'Moderate';
      const label = (rec.label_rekomendasi || '').toUpperCase();
      if (label.includes('SANGAT') || label.includes('EXCELLENT')) {
        status = 'Excellent';
      } else if (label.includes('DIREKOMENDASIKAN') || label.includes('GOOD')) {
        status = 'Good';
      } else if (label.includes('CUKUP') || label.includes('MODERATE')) {
        status = 'Moderate';
      } else if (label.includes('KURANG') || label.includes('POOR')) {
        status = 'Poor';
      }

      return {
        id: rec.slug,
        slug: rec.slug,
        beachName: rec.pantai,
        location: `${rec.kecamatan}, ${rec.kabupaten_kota}`,
        image: rec.url_gambar || '/beaches/default.jpg',
        environmentalScore: Math.round(rec.health_score),
        status,
        aiConfidence: Math.round(rec.skor_detail.skor_industri),
        waterClarity: Math.round(rec.skor_detail.skor_kepadatan_penduduk),
        pollutionLevel: Math.round(rec.skor_detail.skor_pengaruh_urban),
        shorelineCleanliness: Math.round(100 - rec.indeks_dampak_industri),
        wasteDetection: Math.round(rec.indeks_pengaruh_urban),
        lastAnalyzed: new Date().toISOString(),

        // Optional recommendations fields
        narasi_rekomendasi: rec.narasi_rekomendasi,
        indeks_dampak_industri: rec.indeks_dampak_industri,
        kepadatan_penduduk_kecamatan: rec.kepadatan_penduduk_kecamatan,
        indeks_pengaruh_urban: rec.indeks_pengaruh_urban,
        label_rekomendasi: rec.label_rekomendasi,
        industri_terdekat: rec.industri_terdekat,
        jarak_industri_km: rec.jarak_industri_km,
      };
    });
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
  if (filters.status !== 'all') {
    filtered = filtered.filter((b) => b.status === filters.status);
  }

  // Location filter
  if (filters.location && filters.location !== 'all') {
    filtered = filtered.filter((b) => b.location === filters.location);
  }

  // Sort
  filtered.sort((a, b) => {
    const field = filters.sortField;
    const dir = filters.sortDirection === 'asc' ? 1 : -1;

    if (field === 'beachName') {
      return a.beachName.localeCompare(b.beachName) * dir;
    }
    if (field === 'lastAnalyzed') {
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
          status: 'Excellent',
          count: dist.Excellent,
          fill: 'var(--color-success)',
        },
        { status: 'Good', count: dist.Good, fill: 'var(--color-chart-2)' },
        {
          status: 'Moderate',
          count: dist.Moderate,
          fill: 'var(--color-warning)',
        },
        {
          status: 'Poor',
          count: dist.Poor,
          fill: 'var(--color-destructive)',
        },
      ];
    },
  );
}
