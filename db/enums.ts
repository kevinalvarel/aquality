import { pgEnum } from "drizzle-orm/pg-core";
// Tracks the processing pipeline of a coastal analysis
export const analysisStatusEnum = pgEnum("analysis_status", [
  "pending",
  "processing",
  "completed",
  "failed",
]);

// Overall quality rating derived from environmental metrics
export const beachStatusEnum = pgEnum("beach_status", [
  "excellent",
  "good",
  "moderate",
  "poor",
]);
// ─── Recommendation Priority ────────────────────────────────────────────────
export const recommendationPriorityEnum = pgEnum("recommendation_priority", [
  "low",
  "medium",
  "high",
  "critical",
]);
// ─── Recommendation Category ────────────────────────────────────────────────
export const recommendationCategoryEnum = pgEnum("recommendation_category", [
  "water_quality",
  "waste_management",
  "shoreline",
  "ecosystem",
  "infrastructure",
]);
// ─── Activity Type ──────────────────────────────────────────────────────────
// Audit trail for user and system actions
export const activityTypeEnum = pgEnum("activity_type", [
  "analysis_created",
  "analysis_updated",
  "beach_created",
  "beach_updated",
  "recommendation_added",
]);
// ─── File Type ──────────────────────────────────────────────────────────────
export const fileTypeEnum = pgEnum("file_type", [
  "image",
  "report",
  "satellite",
]);
