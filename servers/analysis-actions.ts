"use server";

import { getAnalyses } from "@/services/analysis.service";
import type { AnalysisFilters } from "@/types/analysis.type";

export async function fetchAnalysesAction(filters: AnalysisFilters = {}) {
  try {
    const result = await getAnalyses(filters);
    return {
      success: true,
      data: result.data.map(item => ({
        ...item,
        createdAt: item.createdAt.toISOString(),
      })),
      total: result.total,
      totalPages: result.totalPages,
    };
  } catch (error) {
    console.error("Failed to fetch analyses in action:", error);
    return { success: false, error: "Failed to fetch analyses" };
  }
}
