import { db } from "@/db";
import { beaches, analyses } from "@/db/schema/index";
import { eq, sql, count, avg, desc } from "drizzle-orm";
import { withCache } from "@/lib/cache";
import { CACHE_KEYS, CACHE_TTL } from "@/constants/cache-keys";
import type { DashboardStats, MonthlyStatItem } from "@/types/dashboard.type";
import type { AnalysisListItem } from "@/types/analysis.type";
// ─── Dashboard Service ──────────────────────────────────────────────────────
// Provides aggregated statistics for the dashboard view.
// All queries use cache-first strategy with a 5-minute TTL.
function mapStatus(status: string | null): string {
  switch (status) {
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
 * Get all dashboard statistics in a single call.
 * Aggregates: total analyses, total beaches, average score/confidence,
 * recent analyses, and monthly trend data.
 */
export async function getDashboardStats(): Promise<DashboardStats> {
  return withCache(CACHE_KEYS.dashboard, CACHE_TTL.dashboard, async () => {
    // Run all aggregation queries in parallel
    const [
      totalAnalysesResult,
      totalBeachesResult,
      averagesResult,
      recentAnalysesResult,
      monthlyStatsResult,
      statusDistributionResult,
    ] = await Promise.all([
      // Total completed analyses
      db
        .select({ count: count() })
        .from(analyses)
        .where(eq(analyses.status, "completed")),
      // Total beaches
      db.select({ count: count() }).from(beaches),
      // Average environmental score & confidence
      db
        .select({
          avgScore: avg(analyses.environmentalScore),
          avgConfidence: avg(analyses.aiConfidence),
        })
        .from(analyses)
        .where(eq(analyses.status, "completed")),
      // Recent 5 analyses with beach info
      db
        .select({
          id: analyses.id,
          slug: analyses.slug,
          status: analyses.status,
          environmentalScore: analyses.environmentalScore,
          aiConfidence: analyses.aiConfidence,
          overallStatus: analyses.overallStatus,
          createdAt: analyses.createdAt,
          beachName: beaches.pantai,
          beachSlug: beaches.slug,
          beachImage: beaches.image,
          location: beaches.kecamatan,
        })
        .from(analyses)
        .innerJoin(beaches, eq(analyses.beachId, beaches.id))
        .orderBy(desc(analyses.createdAt))
        .limit(5),
      // Monthly statistics for the last 6 months
      db
        .select({
          month: sql<string>`to_char(${analyses.createdAt}, 'Mon')`,
          year: sql<number>`extract(year from ${analyses.createdAt})::int`,
          totalAnalyses: count(),
          averageScore: avg(analyses.environmentalScore),
          averageConfidence: avg(analyses.aiConfidence),
        })
        .from(analyses)
        .where(sql`${analyses.createdAt} >= now() - interval '6 months'`)
        .groupBy(
          sql`to_char(${analyses.createdAt}, 'Mon')`,
          sql`extract(year from ${analyses.createdAt})`,
          sql`extract(month from ${analyses.createdAt})`,
        )
        .orderBy(
          sql`extract(year from ${analyses.createdAt})`,
          sql`extract(month from ${analyses.createdAt})`,
        ),
      // Status distribution across all completed analyses
      db
        .select({
          status: analyses.overallStatus,
          count: count(),
        })
        .from(analyses)
        .where(eq(analyses.status, "completed"))
        .groupBy(analyses.overallStatus),
    ]);

    // Map recent analyses to typed list items
    const recentAnalyses: AnalysisListItem[] = recentAnalysesResult.map(
      (row) => ({
        id: row.id,
        slug: row.slug,
        status: row.status,
        environmentalScore: row.environmentalScore,
        aiConfidence:
          row.aiConfidence !== null ? Math.round(row.aiConfidence * 100) : null,
        overallStatus: row.overallStatus,
        createdAt: row.createdAt,
        beachName: row.beachName,
        beachSlug: row.beachSlug,
        beachImage: row.beachImage,
        location: row.location,
      }),
    );

    // Map monthly stats
    const monthlyStats: MonthlyStatItem[] = monthlyStatsResult.map((row) => ({
      month: row.month,
      year: row.year,
      totalAnalyses: row.totalAnalyses,
      averageScore: Math.round(Number(row.averageScore) || 0),
      averageConfidence: Math.round((Number(row.averageConfidence) || 0) * 100),
    }));

    // Map status distribution
    const statusDistribution = statusDistributionResult.map((row) => ({
      status: mapStatus(row.status),
      count: row.count,
    }));

    return {
      totalAnalyses: totalAnalysesResult[0]?.count ?? 0,
      totalBeaches: totalBeachesResult[0]?.count ?? 0,
      averageScore: Math.round(Number(averagesResult[0]?.avgScore) || 0),
      averageConfidence: Math.round(
        (Number(averagesResult[0]?.avgConfidence) || 0) * 100,
      ),
      recentAnalyses,
      monthlyStats,
      statusDistribution,
    };
  });
}
