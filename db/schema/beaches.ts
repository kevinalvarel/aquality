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

export const beaches = pgTable(
  "beaches",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    pantai: varchar("pantai", { length: 255 }).notNull(),
    kelurahan: varchar("kelurahan", { length: 255 }).notNull(),
    kecamatan: varchar("kecamatan", { length: 255 }).notNull(),
    kabupatenKota: varchar("kabupaten_kota", { length: 255 }).notNull(),
    provinsi: varchar("provinsi", { length: 255 }).notNull(),
    kodeAdm4: varchar("kode_adm4", { length: 15 }).notNull(),
    pctSehat2026: doublePrecision("pct_sehat_2026"),
    statusKualitas2026: varchar("status_kualitas_2026", { length: 100 }),
    latitude: doublePrecision("latitude"),
    longitude: doublePrecision("longitude"),
    industriTerdekat: text("industri_terdekat"),
    jarakIndustriKm: doublePrecision("jarak_industri_km"),
    kategoriDampakIndustri: varchar("kategori_dampak_industri", {
      length: 100,
    }),
    image: text("image"),
    description: text("description"),
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
    index("beaches_kabupaten_idx").on(table.kabupatenKota),
    index("beaches_status_idx").on(table.status),
  ],
);
