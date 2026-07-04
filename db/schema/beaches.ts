import {
  pgTable,
  uuid,
  varchar,
  text,
  doublePrecision,
  timestamp,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { beachStatusEnum } from "../enums";
// ─── Beaches ────────────────────────────────────────────────────────────────
// Core entity representing a monitored coastal location
export const beaches = pgTable(
  "beaches",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    name: varchar("name", { length: 255 }).notNull(),
    location: varchar("location", { length: 255 }).notNull(),
    province: varchar("province", { length: 100 }).notNull(),
    description: text("description"),
    latitude: doublePrecision("latitude"),
    longitude: doublePrecision("longitude"),
    image: text("image"),
    status: beachStatusEnum("status").default("moderate").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    uniqueIndex("beaches_slug_idx").on(table.slug),
    index("beaches_province_idx").on(table.province),
    index("beaches_status_idx").on(table.status),
  ],
);
