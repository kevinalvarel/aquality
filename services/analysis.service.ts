import { db } from "@/db";
import { analyses, beaches } from "@/db/schema/index";
import { eq, desc, asc, and, or, ilike, count } from "drizzle-orm";
import { withCache } from "@/lib/cache";
import { CACHE_KEYS, CACHE_TTL } from "@/constants/cache-keys";
import type {
  AnalysisListItem,
  AnalysisListResponse,
  AnalysisFilters,
} from "@/types/analysis.type";
import type { BeachApiResponse } from "@/types/beach-api.type";

// ─── Analysis Service ───────────────────────────────────────────────────────
// Provides CRUD and query operations for AI-powered coastal analyses.
// All reads use cache-first strategy.

/**
 * Generate a deterministic cache key hash from filter params.
 */
function filtersToHash(filters: AnalysisFilters): string {
  const parts = [
    filters.search || "",
    filters.province || "",
    filters.status || "",
    filters.sortField || "createdAt",
    filters.sortDirection || "desc",
    String(filters.page || 1),
    String(filters.pageSize || 10),
  ];
  return parts.join(":");
}

/**
 * Get a paginated, filtered list of analyses.
 * Supports search (beach name/location), province filter, status filter, and sorting.
 */
export async function getAnalyses(
  filters: AnalysisFilters = {},
): Promise<AnalysisListResponse> {
  const hash = filtersToHash(filters);

  return withCache(
    CACHE_KEYS.analysisList(hash),
    CACHE_TTL.analysisList,
    async () => {
      const page = filters.page || 1;
      const pageSize = filters.pageSize || 10;
      const offset = (page - 1) * pageSize;

      // Build WHERE conditions
      const conditions = [];

      if (filters.search) {
        conditions.push(
          or(
            ilike(beaches.pantai, `%${filters.search}%`),
            ilike(beaches.kecamatan, `%${filters.search}%`),
          ),
        );
      }

      if (filters.province && filters.province !== "all") {
        conditions.push(eq(beaches.kabupatenKota, filters.province));
      }

      if (filters.status && filters.status !== "all") {
        conditions.push(
          eq(
            analyses.overallStatus,
            filters.status as "excellent" | "good" | "moderate" | "poor",
          ),
        );
      }

      const whereClause =
        conditions.length > 0 ? and(...conditions) : undefined;

      // Determine sort column and direction
      const sortDir = filters.sortDirection === "asc" ? asc : desc;

      let orderByClause;
      switch (filters.sortField) {
        case "environmentalScore":
          orderByClause = sortDir(analyses.environmentalScore);
          break;
        case "aiConfidence":
          orderByClause = sortDir(analyses.aiConfidence);
          break;
        case "beachName":
          orderByClause = sortDir(beaches.pantai);
          break;
        case "createdAt":
        default:
          orderByClause = sortDir(analyses.createdAt);
          break;
      }

      // Run count and data queries in parallel
      const [totalResult, dataResult] = await Promise.all([
        db
          .select({ count: count() })
          .from(analyses)
          .innerJoin(beaches, eq(analyses.beachId, beaches.id))
          .where(whereClause),

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
          .where(whereClause)
          .orderBy(orderByClause)
          .limit(pageSize)
          .offset(offset),
      ]);

      const total = totalResult[0]?.count ?? 0;
      const totalPages = Math.max(1, Math.ceil(total / pageSize));

      const data: AnalysisListItem[] = dataResult.map((row) => ({
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
      }));

      return {
        data,
        total,
        page,
        pageSize,
        totalPages,
      };
    },
  );
}

/**
 * Fetch beach recommendation details by slug from the AQuality external API.
 */
export async function getBeachRecommendationBySlug(
  slug: string,
): Promise<BeachApiResponse | null> {
  const apiUrl = process.env.NEXT_PUBLIC_AQUALITY_API_URL;
  const res = await fetch(`${apiUrl}/api/recommendation/beaches`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch beach data: ${res.statusText}`);
  }

  const result = await res.json();
  const recommendations: BeachApiResponse[] = result.recommendations || [];
  return recommendations.find((item) => item.slug === slug) || null;
}
