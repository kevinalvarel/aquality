import { relations } from "drizzle-orm";
// ─── Auth tables (from db/schema.ts) ────────────────────────────────────────
import { user, session, account } from "../schema";
// ─── Domain tables ──────────────────────────────────────────────────────────
import { beaches } from "../schema/beaches";
import { analyses } from "../schema/analyses";
import { environmentalMetrics } from "../schema/environmental-metrics";
import { aiDetections } from "../schema/ai-detections";
import { recommendations } from "../schema/recommendations";
import { files } from "../schema/files";
import { activities } from "../schema/activities";
// ═══════════════════════════════════════════════════════════════════════════
// Auth Relations (extended with domain references)
// ═══════════════════════════════════════════════════════════════════════════
export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  analyses: many(analyses),
  files: many(files),
  activities: many(activities),
}));
export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));
export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));
// ═══════════════════════════════════════════════════════════════════════════
// Domain Relations
// ═══════════════════════════════════════════════════════════════════════════
// ─── Beach Relations ────────────────────────────────────────────────────────
export const beachRelations = relations(beaches, ({ many }) => ({
  analyses: many(analyses),
  recommendations: many(recommendations),
  activities: many(activities),
}));
// ─── Analysis Relations ─────────────────────────────────────────────────────
export const analysisRelations = relations(analyses, ({ one, many }) => ({
  beach: one(beaches, {
    fields: [analyses.beachId],
    references: [beaches.id],
  }),
  user: one(user, {
    fields: [analyses.userId],
    references: [user.id],
  }),
  metrics: many(environmentalMetrics),
  detections: many(aiDetections),
  recommendations: many(recommendations),
  files: many(files),
  activities: many(activities),
}));
// ─── Environmental Metrics Relations ────────────────────────────────────────
export const environmentalMetricsRelations = relations(
  environmentalMetrics,
  ({ one }) => ({
    analysis: one(analyses, {
      fields: [environmentalMetrics.analysisId],
      references: [analyses.id],
    }),
  }),
);
// ─── AI Detections Relations ────────────────────────────────────────────────
export const aiDetectionRelations = relations(aiDetections, ({ one }) => ({
  analysis: one(analyses, {
    fields: [aiDetections.analysisId],
    references: [analyses.id],
  }),
}));
// ─── Recommendations Relations ──────────────────────────────────────────────
export const recommendationRelations = relations(
  recommendations,
  ({ one }) => ({
    analysis: one(analyses, {
      fields: [recommendations.analysisId],
      references: [analyses.id],
    }),
    beach: one(beaches, {
      fields: [recommendations.beachId],
      references: [beaches.id],
    }),
  }),
);
// ─── Files Relations ────────────────────────────────────────────────────────
export const fileRelations = relations(files, ({ one }) => ({
  analysis: one(analyses, {
    fields: [files.analysisId],
    references: [analyses.id],
  }),
  user: one(user, {
    fields: [files.userId],
    references: [user.id],
  }),
}));
// ─── Activities Relations ───────────────────────────────────────────────────
export const activityRelations = relations(activities, ({ one }) => ({
  user: one(user, {
    fields: [activities.userId],
    references: [user.id],
  }),
  beach: one(beaches, {
    fields: [activities.beachId],
    references: [beaches.id],
  }),
  analysis: one(analyses, {
    fields: [activities.analysisId],
    references: [analyses.id],
  }),
}));
