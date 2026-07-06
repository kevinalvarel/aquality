import { db } from "@/db";
import { beaches, analyses } from "@/db/schema/index";
import { eq, desc, isNotNull, and } from "drizzle-orm";
import { withCache } from "@/lib/cache";
import { CACHE_KEYS, CACHE_TTL } from "@/constants/cache-keys";
import type { ExploreBeachItem, MapBeachItem } from "@/types/explore.type";
import type { DbBeachStatus } from "@/types/beach.type";

// ─── Explore Service ────────────────────────────────────────────────────────
// Provides data for the Explore page (ResultCard) and Map page (markers).
// Reuses the existing db instance and follows the project's cache-first pattern.

/**
 * Get all beaches for the Explore page with their latest analysis data.
 * Returns data shaped for the ResultCard component.
 */
export async function getExploreBeaches(): Promise<ExploreBeachItem[]> {
  return withCache(
    CACHE_KEYS.exploreBeaches,
    CACHE_TTL.explore,
    async () => {
      // Subquery: latest completed analysis per beach
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
          description: beaches.description,
          image: beaches.image,
          status: beaches.status,
          latestScore: latestAnalysis.environmentalScore,
          latestConfidence: latestAnalysis.aiConfidence,
          lastAnalyzed: latestAnalysis.createdAt,
        })
        .from(beaches)
        .leftJoin(latestAnalysis, eq(beaches.id, latestAnalysis.beachId));

      // Deduplicate (leftJoin may produce multiples), keep the most recent analysis
      const beachMap = new Map<string, ExploreBeachItem>();
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
            description: row.description,
            image: row.image,
            status: row.status as DbBeachStatus,
            latestScore: row.latestScore,
            latestConfidence: row.latestConfidence !== null ? Math.round(row.latestConfidence * 100) : null,
            lastAnalyzed: row.lastAnalyzed,
          });
        }
      }

      return Array.from(beachMap.values());
    },
  );
}

/**
 * Get all beaches with coordinates for the Map page.
 * Filters out beaches without lat/lng since they can't be placed on a map.
 */
export async function getBeachesForMap(): Promise<MapBeachItem[]> {
  return withCache(
    CACHE_KEYS.mapBeaches,
    CACHE_TTL.map,
    async () => {
      // Subquery: latest completed analysis per beach
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
        .as("latest_analysis_map");

      const rows = await db
        .select({
          id: beaches.id,
          slug: beaches.slug,
          name: beaches.name,
          location: beaches.location,
          province: beaches.province,
          description: beaches.description,
          latitude: beaches.latitude,
          longitude: beaches.longitude,
          image: beaches.image,
          status: beaches.status,
          latestScore: latestAnalysis.environmentalScore,
          latestConfidence: latestAnalysis.aiConfidence,
          lastAnalyzed: latestAnalysis.createdAt,
        })
        .from(beaches)
        .leftJoin(latestAnalysis, eq(beaches.id, latestAnalysis.beachId))
        .where(
          and(
            isNotNull(beaches.latitude),
            isNotNull(beaches.longitude),
          ),
        );

      // Deduplicate, keep the most recent analysis per beach
      const beachMap = new Map<string, MapBeachItem>();
      for (const row of rows) {
        // latitude and longitude are guaranteed non-null by the WHERE clause
        if (row.latitude === null || row.longitude === null) continue;

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
            description: row.description,
            latitude: row.latitude,
            longitude: row.longitude,
            image: row.image,
            status: row.status as DbBeachStatus,
            latestScore: row.latestScore,
            latestConfidence: row.latestConfidence !== null ? Math.round(row.latestConfidence * 100) : null,
            lastAnalyzed: row.lastAnalyzed,
          });
        }
      }

      return Array.from(beachMap.values());
    },
  );
}
