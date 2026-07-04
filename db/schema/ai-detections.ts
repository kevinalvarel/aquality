import {
  pgTable,
  uuid,
  varchar,
  integer,
  doublePrecision,
  jsonb,
  timestamp,
  index,
} from "drizzle-orm/pg-core";
import { analyses } from "./analyses";
// ─── AI Detections ──────────────────────────────────────────────────────────
// Objects and anomalies detected by the AI model in coastal imagery
export const aiDetections = pgTable(
  "ai_detections",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    analysisId: uuid("analysis_id")
      .notNull()
      .references(() => analyses.id, { onDelete: "cascade" }),
    label: varchar("label", { length: 255 }).notNull(),
    confidence: doublePrecision("confidence").notNull(),
    boundingBox: jsonb("bounding_box"),
    category: varchar("category", { length: 100 }),
    severity: varchar("severity", { length: 50 }),
    count: integer("count").default(1).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("ai_detections_analysis_id_idx").on(table.analysisId),
    index("ai_detections_category_idx").on(table.category),
  ],
);
