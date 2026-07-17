import { db } from "@/db";
import { beaches } from "@/db/schema/index";
import { eq } from "drizzle-orm";
import { withCache } from "@/lib/cache";
import { CACHE_TTL } from "@/constants/cache-keys";
import type { BeachWeatherInfo } from "@/types/weather.type";

// ─── Weather Service ────────────────────────────────────────────────────────
// Provides beach data needed for the weather analysis page.
// Uses the project's existing cache-first pattern.
export async function getBeachBySlugForWeather(
  slug: string,
): Promise<BeachWeatherInfo | null> {
  return withCache(`beach:weather:${slug}`, CACHE_TTL.beach, async () => {
    const rows = await db
      .select({
        id: beaches.id,
        slug: beaches.slug,
        pantai: beaches.pantai,
        kecamatan: beaches.kecamatan,
        kabupatenKota: beaches.kabupatenKota,
        provinsi: beaches.provinsi,
        kodeAdm4: beaches.kodeAdm4,
        latitude: beaches.latitude,
        longitude: beaches.longitude,
        image: beaches.image,
        description: beaches.description,
      })
      .from(beaches)
      .where(eq(beaches.slug, slug))
      .limit(1);

    return rows[0] ?? null;
  });
}
