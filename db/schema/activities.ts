import {
  pgTable,
  uuid,
  varchar,
  text,
  jsonb,
  timestamp,
  index,
} from "drizzle-orm/pg-core";
import { activityTypeEnum } from "../enums";
import { user } from "../schema";
import { beaches } from "./beaches";
import { analyses } from "./analyses";
// ─── Activities ─────────────────────────────────────────────────────────────
// Audit trail tracking user and system actions across the platform
export const activities = pgTable(
  "activities",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id").references(() => user.id, {
      onDelete: "set null",
    }),
    beachId: uuid("beach_id").references(() => beaches.id, {
      onDelete: "set null",
    }),
    analysisId: uuid("analysis_id").references(() => analyses.id, {
      onDelete: "set null",
    }),
    type: activityTypeEnum("type").notNull(),
    title: varchar("title", { length: 500 }).notNull(),
    description: text("description"),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("activities_user_id_idx").on(table.userId),
    index("activities_beach_id_idx").on(table.beachId),
    index("activities_analysis_id_idx").on(table.analysisId),
    index("activities_type_idx").on(table.type),
    index("activities_created_at_idx").on(table.createdAt),
  ],
);
