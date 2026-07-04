import {
  pgTable,
  uuid,
  varchar,
  text,
  integer,
  timestamp,
  index,
} from "drizzle-orm/pg-core";
import { fileTypeEnum } from "../enums";
import { analyses } from "./analyses";
import { user } from "../schema";
// ─── Files ──────────────────────────────────────────────────────────────────
// Uploaded images and generated reports linked to analyses
export const files = pgTable(
  "files",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    analysisId: uuid("analysis_id")
      .notNull()
      .references(() => analyses.id, { onDelete: "cascade" }),
    userId: text("user_id").references(() => user.id, {
      onDelete: "set null",
    }),
    filename: varchar("filename", { length: 500 }).notNull(),
    originalName: varchar("original_name", { length: 500 }).notNull(),
    mimeType: varchar("mime_type", { length: 100 }).notNull(),
    size: integer("size").notNull(),
    url: text("url").notNull(),
    bucket: varchar("bucket", { length: 255 }),
    path: varchar("path", { length: 500 }),
    fileType: fileTypeEnum("file_type").default("image").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("files_analysis_id_idx").on(table.analysisId),
    index("files_user_id_idx").on(table.userId),
    index("files_file_type_idx").on(table.fileType),
  ],
);
