// ─── Beach Analysis Utility ─────────────────────────────────────────────────
// Derives analysis-style fields from existing beach database columns.
// No schema modifications needed — all values are computed from status + scores.

import type {
  BeachAnalysis,
  WaterQualityLevel,
  SafetyLevel,
  CleanlinessLevel,
} from "@/types/explore.type";
import type { DbBeachStatus } from "@/types/beach.type";

interface BeachAnalysisInput {
  name: string;
  location: string;
  status: DbBeachStatus;
  latestScore: number | null;
  latestConfidence: number | null;
}

/**
 * Generate a lightweight derived analysis from existing beach data.
 * Maps beach status and scores to human-readable labels and recommendations.
 */
export function generateBeachAnalysis(beach: BeachAnalysisInput): BeachAnalysis {
  const waterQuality = deriveWaterQuality(beach.status);
  const safetyStatus = deriveSafetyStatus(beach.status, beach.latestScore);
  const cleanliness = deriveCleanliness(beach.status, beach.latestScore);
  const activities = deriveActivities(beach.status, beach.latestScore);
  const recommendation = deriveRecommendation(beach.status, activities);
  const summary = deriveSummary(beach, waterQuality, safetyStatus);

  return {
    waterQuality,
    safetyStatus,
    cleanliness,
    recommendation,
    activities,
    summary,
    score: beach.latestScore,
  };
}

function deriveWaterQuality(status: DbBeachStatus): WaterQualityLevel {
  const mapping: Record<DbBeachStatus, WaterQualityLevel> = {
    excellent: "Sangat Baik",
    good: "Baik",
    moderate: "Sedang",
    poor: "Buruk",
  };
  return mapping[status];
}

function deriveSafetyStatus(
  status: DbBeachStatus,
  score: number | null,
): SafetyLevel {
  if (status === "poor") return "Tidak Aman";
  if (status === "moderate") {
    return score !== null && score >= 60 ? "Cukup Aman" : "Perlu Hati-hati";
  }
  if (status === "good") {
    return score !== null && score >= 70 ? "Aman" : "Cukup Aman";
  }
  // excellent
  return "Aman";
}

function deriveCleanliness(
  status: DbBeachStatus,
  score: number | null,
): CleanlinessLevel {
  if (status === "excellent") return "Sangat Bersih";
  if (status === "good") {
    return score !== null && score >= 75 ? "Sangat Bersih" : "Bersih";
  }
  if (status === "moderate") {
    return score !== null && score >= 55 ? "Bersih" : "Cukup Bersih";
  }
  return "Kotor";
}

function deriveActivities(
  status: DbBeachStatus,
  score: number | null,
): string[] {
  const effectiveScore = score ?? statusToScore(status);

  if (effectiveScore >= 80) {
    return ["Berenang", "Snorkeling", "Menyelam", "Bermain Pasir"];
  }
  if (effectiveScore >= 60) {
    return ["Berenang", "Bermain Pasir", "Berjemur"];
  }
  if (effectiveScore >= 40) {
    return ["Berjalan-jalan", "Fotografi", "Bermain Pasir"];
  }
  return ["Berjalan-jalan", "Fotografi"];
}

function deriveRecommendation(
  status: DbBeachStatus,
  activities: string[],
): string {
  const activityList = activities.slice(0, 3).join(", ");

  switch (status) {
    case "excellent":
      return `Pantai ini sangat aman dan bersih. Cocok untuk ${activityList}.`;
    case "good":
      return `Kondisi pantai baik untuk aktivitas air. Disarankan untuk ${activityList}.`;
    case "moderate":
      return `Pantai dalam kondisi sedang. Bisa digunakan untuk ${activityList} dengan hati-hati.`;
    case "poor":
      return `Kualitas air kurang baik. Hanya disarankan untuk ${activityList}.`;
  }
}

function deriveSummary(
  beach: BeachAnalysisInput,
  waterQuality: WaterQualityLevel,
  safetyStatus: SafetyLevel,
): string {
  const scoreText =
    beach.latestScore !== null
      ? `Skor lingkungan terakhir: ${beach.latestScore}/100.`
      : "Belum ada skor analisis tersedia.";

  const confidenceText =
    beach.latestConfidence !== null
      ? ` Tingkat kepercayaan AI: ${Math.round(beach.latestConfidence * 100)}%.`
      : "";

  return (
    `${beach.name} berlokasi di ${beach.location}. ` +
    `Kualitas air saat ini: ${waterQuality}. ` +
    `Status keamanan: ${safetyStatus}. ` +
    `${scoreText}${confidenceText}`
  );
}

/** Fallback score when no analysis score is available */
function statusToScore(status: DbBeachStatus): number {
  const mapping: Record<DbBeachStatus, number> = {
    excellent: 90,
    good: 72,
    moderate: 50,
    poor: 25,
  };
  return mapping[status];
}
