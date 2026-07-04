import {
  pgTable,
  uuid,
  varchar,
  text,
  integer,
  doublePrecision,
  timestamp,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { analysisStatusEnum, beachStatusEnum } from "../enums";
import { beaches } from "./beaches";
import { user } from "../schema";
// ─── Analyses ───────────────────────────────────────────────────────────────
// AI-powered coastal water quality analysis results
export const analyses = pgTable(
  "analyses",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    beachId: uuid("beach_id")
      .notNull()
      .references(() => beaches.id, { onDelete: "cascade" }),
    userId: text("user_id").references(() => user.id, {
      onDelete: "set null",
    }),
    status: analysisStatusEnum("status").default("pending").notNull(),
    environmentalScore: integer("environmental_score"),
    aiConfidence: doublePrecision("ai_confidence"),
    waterClarity: doublePrecision("water_clarity"),
    pollutionLevel: doublePrecision("pollution_level"),
    shorelineCleanliness: doublePrecision("shoreline_cleanliness"),
    wasteDetection: doublePrecision("waste_detection"),
    overallStatus: beachStatusEnum("overall_status"),
    summary: text("summary"),
    processedAt: timestamp("processed_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    uniqueIndex("analyses_slug_idx").on(table.slug),
    index("analyses_beach_id_idx").on(table.beachId),
    index("analyses_user_id_idx").on(table.userId),
    index("analyses_status_idx").on(table.status),
    index("analyses_created_at_idx").on(table.createdAt),
  ],
);
