import { db } from "@/db";
import { beaches, analyses } from "@/db/schema/index";
import { eq, desc, sql } from "drizzle-orm";
import { withCache, deleteCache, invalidatePattern } from "@/lib/cache";
import { CACHE_KEYS, CACHE_TTL } from "@/constants/cache-keys";
import type {
  BeachDetail,
  BeachListItem,
  BeachAnalysisSummary,
  CreateBeachInput,
  UpdateBeachInput,
} from "@/types/beach.type";
// ─── Beach Service ──────────────────────────────────────────────────────────
// CRUD operations and queries for coastal locations.
// All reads use cache-first strategy with a 30-minute TTL.
/**
 * Get a single beach by slug with its recent analyses.
 */
export async function getBeachBySlug(
  slug: string,
): Promise<BeachDetail | null> {
  return withCache(CACHE_KEYS.beach(slug), CACHE_TTL.beach, async () => {
    // Fetch beach
    const beachRows = await db
      .select()
      .from(beaches)
      .where(eq(beaches.slug, slug))
      .limit(1);
    const beach = beachRows[0];
    if (!beach) return null;
    // Fetch recent analyses for this beach
    const recentAnalysesRows = await db
      .select({
        id: analyses.id,
        slug: analyses.slug,
        environmentalScore: analyses.environmentalScore,
        aiConfidence: analyses.aiConfidence,
        overallStatus: analyses.overallStatus,
        createdAt: analyses.createdAt,
      })
      .from(analyses)
      .where(eq(analyses.beachId, beach.id))
      .orderBy(desc(analyses.createdAt))
      .limit(10);
    const recentAnalyses: BeachAnalysisSummary[] = recentAnalysesRows.map(
      (row) => ({
        id: row.id,
        slug: row.slug,
        environmentalScore: row.environmentalScore,
        aiConfidence: row.aiConfidence !== null ? Math.round(row.aiConfidence * 100) : null,
        overallStatus: row.overallStatus,
        createdAt: row.createdAt,
      }),
    );
    return {
      ...beach,
      recentAnalyses,
    };
  });
}
/**
 * Get all beaches with latest analysis summary for listing.
 * Uses a subquery to avoid N+1 — fetches latest analysis per beach in one query.
 */
export async function getAllBeaches(): Promise<BeachListItem[]> {
  return withCache(CACHE_KEYS.beachAll, CACHE_TTL.beach, async () => {
    // Subquery: latest analysis per beach using DISTINCT ON
    const latestAnalysis = db
      .select({
        beachId: analyses.beachId,
        environmentalScore: analyses.environmentalScore,
        aiConfidence: analyses.aiConfidence,
        createdAt: analyses.createdAt,
      })
      .from(analyses)
      .where(eq(analyses.status, "completed"))
      .orderBy(analyses.beachId, desc(analyses.createdAt))
      .as("latest_analysis");
    const rows = await db
      .select({
        id: beaches.id,
        slug: beaches.slug,
        name: beaches.name,
        location: beaches.location,
        province: beaches.province,
        image: beaches.image,
        status: beaches.status,
        latestScore: latestAnalysis.environmentalScore,
        latestConfidence: latestAnalysis.aiConfidence,
        lastAnalyzed: latestAnalysis.createdAt,
      })
      .from(beaches)
      .leftJoin(latestAnalysis, eq(beaches.id, latestAnalysis.beachId));
    // Deduplicate (leftJoin may produce multiples), keep the one with the most recent analysis
    const beachMap = new Map<string, BeachListItem>();
    for (const row of rows) {
      const existing = beachMap.get(row.id);
      if (
        !existing ||
        (row.lastAnalyzed &&
          (!existing.lastAnalyzed || row.lastAnalyzed > existing.lastAnalyzed))
      ) {
        beachMap.set(row.id, {
          id: row.id,
          slug: row.slug,
          name: row.name,
          location: row.location,
          province: row.province,
          image: row.image,
          status: row.status,
          latestScore: row.latestScore,
          latestConfidence: row.latestConfidence !== null ? Math.round(row.latestConfidence * 100) : null,
          lastAnalyzed: row.lastAnalyzed,
        });
      }
    }
    return Array.from(beachMap.values());
  });
}
/**
 * Get all unique provinces from existing beaches.
 */
export async function getUniqueProvinces(): Promise<string[]> {
  return withCache("beach:provinces", CACHE_TTL.beach, async () => {
    const rows = await db
      .selectDistinct({ province: beaches.province })
      .from(beaches)
      .orderBy(beaches.province);
    return rows.map((r) => r.province);
  });
}
/**
 * Create a new beach.
 * Invalidates related caches.
 */
export async function createBeach(
  input: CreateBeachInput,
): Promise<BeachDetail> {
  const [newBeach] = await db
    .insert(beaches)
    .values({
      slug: input.slug,
      name: input.name,
      location: input.location,
      province: input.province,
      description: input.description,
      latitude: input.latitude,
      longitude: input.longitude,
      image: input.image,
      status: input.status ?? "moderate",
    })
    .returning();
  // Invalidate related caches
  await Promise.all([
    deleteCache(CACHE_KEYS.beachAll),
    deleteCache(CACHE_KEYS.leaderboard),
    deleteCache(CACHE_KEYS.leaderboardSummary),
    deleteCache(CACHE_KEYS.dashboard),
    deleteCache("beach:provinces"),
  ]);
  return {
    ...newBeach,
    recentAnalyses: [],
  };
}
/**
 * Update an existing beach.
 * Invalidates the beach-specific and aggregate caches.
 */
export async function updateBeach(
  id: string,
  input: UpdateBeachInput,
): Promise<BeachDetail | null> {
  const [updated] = await db
    .update(beaches)
    .set(input)
    .where(eq(beaches.id, id))
    .returning();
  if (!updated) return null;
  // Invalidate related caches
  await Promise.all([
    deleteCache(CACHE_KEYS.beach(updated.slug)),
    deleteCache(CACHE_KEYS.beachAll),
    deleteCache(CACHE_KEYS.leaderboard),
    deleteCache(CACHE_KEYS.leaderboardSummary),
    deleteCache(CACHE_KEYS.dashboard),
    invalidatePattern("leaderboard:*"),
  ]);
  // Return full detail
  return getBeachBySlug(updated.slug);
}
