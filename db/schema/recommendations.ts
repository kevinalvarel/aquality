import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  timestamp,
  index,
} from "drizzle-orm/pg-core";
import {
  recommendationPriorityEnum,
  recommendationCategoryEnum,
} from "../enums";
import { analyses } from "./analyses";
import { beaches } from "./beaches";
// ─── Recommendations ────────────────────────────────────────────────────────
// AI-generated actionable recommendations for improving coastal quality
export const recommendations = pgTable(
  "recommendations",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    analysisId: uuid("analysis_id")
      .notNull()
      .references(() => analyses.id, { onDelete: "cascade" }),
    beachId: uuid("beach_id")
      .notNull()
      .references(() => beaches.id, { onDelete: "cascade" }),
    title: varchar("title", { length: 500 }).notNull(),
    description: text("description").notNull(),
    priority: recommendationPriorityEnum("priority")
      .default("medium")
      .notNull(),
    category: recommendationCategoryEnum("category").notNull(),
    isCompleted: boolean("is_completed").default(false).notNull(),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("recommendations_analysis_id_idx").on(table.analysisId),
    index("recommendations_beach_id_idx").on(table.beachId),
    index("recommendations_priority_idx").on(table.priority),
    index("recommendations_category_idx").on(table.category),
  ],
);
