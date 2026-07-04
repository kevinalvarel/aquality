import { db } from "@/db";
import {
  analyses,
  beaches,
  environmentalMetrics,
  aiDetections,
  recommendations,
  activities,
} from "@/db/schema/index";
import { eq, desc, asc, sql, and, or, ilike, count } from "drizzle-orm";
import { withCache, deleteCache, invalidatePattern } from "@/lib/cache";
import { CACHE_KEYS, CACHE_TTL } from "@/constants/cache-keys";
import type {
  AnalysisDetail,
  AnalysisListItem,
  AnalysisListResponse,
  AnalysisFilters,
  CreateAnalysisInput,
} from "@/types/analysis.type";

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
            ilike(beaches.name, `%${filters.search}%`),
            ilike(beaches.location, `%${filters.search}%`),
          ),
        );
      }

      if (filters.province && filters.province !== "all") {
        conditions.push(eq(beaches.province, filters.province));
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
          orderByClause = sortDir(beaches.name);
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
            beachName: beaches.name,
            beachSlug: beaches.slug,
            beachImage: beaches.image,
            location: beaches.location,
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
        aiConfidence: row.aiConfidence,
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
 * Get a full analysis detail by slug.
 * Joins: analysis + beach + metrics + detections + recommendations + previous analyses.
 */
export async function getAnalysisBySlug(
  slug: string,
): Promise<AnalysisDetail | null> {
  return withCache(
    CACHE_KEYS.analysis(slug),
    CACHE_TTL.analysisDetail,
    async () => {
      // Fetch the analysis with its beach
      const analysisRows = await db
        .select({
          id: analyses.id,
          slug: analyses.slug,
          status: analyses.status,
          environmentalScore: analyses.environmentalScore,
          aiConfidence: analyses.aiConfidence,
          waterClarity: analyses.waterClarity,
          pollutionLevel: analyses.pollutionLevel,
          shorelineCleanliness: analyses.shorelineCleanliness,
          wasteDetection: analyses.wasteDetection,
          overallStatus: analyses.overallStatus,
          summary: analyses.summary,
          processedAt: analyses.processedAt,
          createdAt: analyses.createdAt,
          updatedAt: analyses.updatedAt,
          beachId: analyses.beachId,
          beachDbId: beaches.id,
          beachSlug: beaches.slug,
          beachName: beaches.name,
          beachLocation: beaches.location,
          beachProvince: beaches.province,
          beachImage: beaches.image,
        })
        .from(analyses)
        .innerJoin(beaches, eq(analyses.beachId, beaches.id))
        .where(eq(analyses.slug, slug))
        .limit(1);

      const analysis = analysisRows[0];
      if (!analysis) return null;

      // Fetch related data in parallel
      const [metricsRows, detectionRows, recommendationRows, previousRows] =
        await Promise.all([
          db
            .select()
            .from(environmentalMetrics)
            .where(eq(environmentalMetrics.analysisId, analysis.id))
            .limit(1),

          db
            .select()
            .from(aiDetections)
            .where(eq(aiDetections.analysisId, analysis.id))
            .orderBy(desc(aiDetections.confidence)),

          db
            .select()
            .from(recommendations)
            .where(eq(recommendations.analysisId, analysis.id))
            .orderBy(recommendations.priority),

          // Previous analyses for the same beach (excluding current)
          db
            .select({
              id: analyses.id,
              slug: analyses.slug,
              status: analyses.status,
              environmentalScore: analyses.environmentalScore,
              aiConfidence: analyses.aiConfidence,
              overallStatus: analyses.overallStatus,
              createdAt: analyses.createdAt,
              beachName: beaches.name,
              beachSlug: beaches.slug,
              beachImage: beaches.image,
              location: beaches.location,
            })
            .from(analyses)
            .innerJoin(beaches, eq(analyses.beachId, beaches.id))
            .where(
              and(
                eq(analyses.beachId, analysis.beachId),
                sql`${analyses.id} != ${analysis.id}`,
              ),
            )
            .orderBy(desc(analyses.createdAt))
            .limit(5),
        ]);

      const metrics = metricsRows[0] ?? null;

      return {
        id: analysis.id,
        slug: analysis.slug,
        status: analysis.status,
        environmentalScore: analysis.environmentalScore,
        aiConfidence: analysis.aiConfidence,
        waterClarity: analysis.waterClarity,
        pollutionLevel: analysis.pollutionLevel,
        shorelineCleanliness: analysis.shorelineCleanliness,
        wasteDetection: analysis.wasteDetection,
        overallStatus: analysis.overallStatus,
        summary: analysis.summary,
        processedAt: analysis.processedAt,
        createdAt: analysis.createdAt,
        updatedAt: analysis.updatedAt,
        beach: {
          id: analysis.beachDbId,
          slug: analysis.beachSlug,
          name: analysis.beachName,
          location: analysis.beachLocation,
          province: analysis.beachProvince,
          image: analysis.beachImage,
        },
        metrics: metrics
          ? {
              id: metrics.id,
              temperature: metrics.temperature,
              humidity: metrics.humidity,
              windSpeed: metrics.windSpeed,
              windDirection: metrics.windDirection,
              waveHeight: metrics.waveHeight,
              tideLevel: metrics.tideLevel,
              uvIndex: metrics.uvIndex,
              visibility: metrics.visibility,
              ph: metrics.ph,
              dissolvedOxygen: metrics.dissolvedOxygen,
              turbidity: metrics.turbidity,
              salinity: metrics.salinity,
              recordedAt: metrics.recordedAt,
            }
          : null,
        detections: detectionRows.map((d) => ({
          id: d.id,
          label: d.label,
          confidence: d.confidence,
          boundingBox: d.boundingBox,
          category: d.category,
          severity: d.severity,
          count: d.count,
        })),
        recommendations: recommendationRows.map((r) => ({
          id: r.id,
          title: r.title,
          description: r.description,
          priority: r.priority,
          category: r.category,
          isCompleted: r.isCompleted,
        })),
        previousAnalyses: previousRows.map((p) => ({
          id: p.id,
          slug: p.slug,
          status: p.status,
          environmentalScore: p.environmentalScore,
          aiConfidence: p.aiConfidence,
          overallStatus: p.overallStatus,
          createdAt: p.createdAt,
          beachName: p.beachName,
          beachSlug: p.beachSlug,
          beachImage: p.beachImage,
          location: p.location,
        })),
      };
    },
  );
}

/**
 * Get the most recent analyses across all beaches.
 */
export async function getRecentAnalyses(
  limit: number = 5,
): Promise<AnalysisListItem[]> {
  return withCache(
    CACHE_KEYS.recentAnalyses,
    CACHE_TTL.recentAnalysis,
    async () => {
      const rows = await db
        .select({
          id: analyses.id,
          slug: analyses.slug,
          status: analyses.status,
          environmentalScore: analyses.environmentalScore,
          aiConfidence: analyses.aiConfidence,
          overallStatus: analyses.overallStatus,
          createdAt: analyses.createdAt,
          beachName: beaches.name,
          beachSlug: beaches.slug,
          beachImage: beaches.image,
          location: beaches.location,
        })
        .from(analyses)
        .innerJoin(beaches, eq(analyses.beachId, beaches.id))
        .orderBy(desc(analyses.createdAt))
        .limit(limit);

      return rows.map((row) => ({
        id: row.id,
        slug: row.slug,
        status: row.status,
        environmentalScore: row.environmentalScore,
        aiConfidence: row.aiConfidence,
        overallStatus: row.overallStatus,
        createdAt: row.createdAt,
        beachName: row.beachName,
        beachSlug: row.beachSlug,
        beachImage: row.beachImage,
        location: row.location,
      }));
    },
  );
}

/**
 * Create a new analysis with all related data (metrics, detections, recommendations).
 * Automatically creates an activity log entry and invalidates relevant caches.
 */
export async function createAnalysis(
  input: CreateAnalysisInput,
): Promise<AnalysisDetail | null> {
  // Generate slug from beach name + timestamp
  const beachRows = await db
    .select({ slug: beaches.slug, name: beaches.name })
    .from(beaches)
    .where(eq(beaches.id, input.beachId))
    .limit(1);

  const beach = beachRows[0];
  if (!beach) {
    throw new Error(`Beach with id "${input.beachId}" not found`);
  }

  const analysisSlug = `${beach.slug}-${Date.now()}`;

  // Insert the analysis
  const [newAnalysis] = await db
    .insert(analyses)
    .values({
      slug: analysisSlug,
      beachId: input.beachId,
      userId: input.userId,
      status: "completed",
      environmentalScore: input.environmentalScore,
      aiConfidence: input.aiConfidence,
      waterClarity: input.waterClarity,
      pollutionLevel: input.pollutionLevel,
      shorelineCleanliness: input.shorelineCleanliness,
      wasteDetection: input.wasteDetection,
      overallStatus: input.overallStatus,
      summary: input.summary,
      processedAt: new Date(),
    })
    .returning();

  // Insert related data in parallel
  const relatedInserts: Promise<unknown>[] = [];

  if (input.metrics) {
    relatedInserts.push(
      db.insert(environmentalMetrics).values({
        analysisId: newAnalysis.id,
        ...input.metrics,
      }),
    );
  }

  if (input.detections && input.detections.length > 0) {
    relatedInserts.push(
      db.insert(aiDetections).values(
        input.detections.map((d) => ({
          analysisId: newAnalysis.id,
          label: d.label,
          confidence: d.confidence,
          boundingBox: d.boundingBox,
          category: d.category,
          severity: d.severity,
          count: d.count ?? 1,
        })),
      ),
    );
  }

  if (input.recommendations && input.recommendations.length > 0) {
    relatedInserts.push(
      db.insert(recommendations).values(
        input.recommendations.map((r) => ({
          analysisId: newAnalysis.id,
          beachId: input.beachId,
          title: r.title,
          description: r.description,
          priority: r.priority ?? "medium",
          category: r.category,
        })),
      ),
    );
  }

  // Activity log entry
  relatedInserts.push(
    db.insert(activities).values({
      userId: input.userId,
      beachId: input.beachId,
      analysisId: newAnalysis.id,
      type: "analysis_created",
      title: `New analysis for ${beach.name}`,
      description: input.summary,
    }),
  );

  await Promise.all(relatedInserts);

  // Invalidate relevant caches
  await Promise.all([
    deleteCache(CACHE_KEYS.dashboard),
    deleteCache(CACHE_KEYS.leaderboard),
    deleteCache(CACHE_KEYS.leaderboardSummary),
    deleteCache(CACHE_KEYS.leaderboardDistribution),
    deleteCache(CACHE_KEYS.leaderboardLocations),
    deleteCache(CACHE_KEYS.recentAnalyses),
    deleteCache(CACHE_KEYS.beach(beach.slug)),
    deleteCache(CACHE_KEYS.beachAll),
    invalidatePattern("analysis:list:*"),
    invalidatePattern("leaderboard:top:*"),
  ]);

  // Return the full analysis detail
  return getAnalysisBySlug(analysisSlug);
}

/**
 * Update an existing analysis.
 * Invalidates analysis-specific, beach, dashboard, and leaderboard caches.
 */
export async function updateAnalysis(
  id: string,
  data: Partial<{
    environmentalScore: number;
    aiConfidence: number;
    waterClarity: number;
    pollutionLevel: number;
    shorelineCleanliness: number;
    wasteDetection: number;
    overallStatus: "excellent" | "good" | "moderate" | "poor";
    summary: string;
    status: "pending" | "processing" | "completed" | "failed";
  }>,
): Promise<AnalysisDetail | null> {
  const [updated] = await db
    .update(analyses)
    .set(data)
    .where(eq(analyses.id, id))
    .returning();

  if (!updated) return null;

  // Get beach slug for cache invalidation
  const beachRows = await db
    .select({ slug: beaches.slug })
    .from(beaches)
    .where(eq(beaches.id, updated.beachId))
    .limit(1);

  const beachSlug = beachRows[0]?.slug;

  // Invalidate caches
  await Promise.all([
    deleteCache(CACHE_KEYS.analysis(updated.slug)),
    deleteCache(CACHE_KEYS.dashboard),
    deleteCache(CACHE_KEYS.leaderboard),
    deleteCache(CACHE_KEYS.leaderboardSummary),
    deleteCache(CACHE_KEYS.recentAnalyses),
    beachSlug ? deleteCache(CACHE_KEYS.beach(beachSlug)) : Promise.resolve(),
    deleteCache(CACHE_KEYS.beachAll),
    invalidatePattern("analysis:list:*"),
    invalidatePattern("leaderboard:*"),
  ]);

  return getAnalysisBySlug(updated.slug);
}
