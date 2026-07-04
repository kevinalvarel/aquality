import {
  pgTable,
  uuid,
  varchar,
  doublePrecision,
  timestamp,
  index,
} from "drizzle-orm/pg-core";
import { analyses } from "./analyses";
// ─── Environmental Metrics ──────────────────────────────────────────────────
// Physical and chemical measurements recorded during analysis
export const environmentalMetrics = pgTable(
  "environmental_metrics",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    analysisId: uuid("analysis_id")
      .notNull()
      .references(() => analyses.id, { onDelete: "cascade" }),
    temperature: doublePrecision("temperature"),
    humidity: doublePrecision("humidity"),
    windSpeed: doublePrecision("wind_speed"),
    windDirection: varchar("wind_direction", { length: 50 }),
    waveHeight: doublePrecision("wave_height"),
    tideLevel: varchar("tide_level", { length: 50 }),
    uvIndex: doublePrecision("uv_index"),
    visibility: doublePrecision("visibility"),
    ph: doublePrecision("ph"),
    dissolvedOxygen: doublePrecision("dissolved_oxygen"),
    turbidity: doublePrecision("turbidity"),
    salinity: doublePrecision("salinity"),
    recordedAt: timestamp("recorded_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("environmental_metrics_analysis_id_idx").on(table.analysisId),
  ],
);
