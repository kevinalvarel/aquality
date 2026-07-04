import { redis } from "./redis";
// ─── Cache Helpers ──────────────────────────────────────────────────────────
// Reusable cache utilities wrapping Upstash Redis.
// All helpers gracefully handle Redis failures — the app falls back to
// PostgreSQL when Redis is unavailable.
/**
 * Retrieve a cached value by key.
 * Returns `null` on cache miss or Redis error (graceful degradation).
 */
export async function getCache<T>(key: string): Promise<T | null> {
  try {
    const data = await redis.get<T>(key);
    return data ?? null;
  } catch (error) {
    console.warn(`[Cache] GET failed for key "${key}":`, error);
    return null;
  }
}
/**
 * Store a value in cache with a TTL (in seconds).
 * Silently fails on Redis errors — never blocks the request.
 */
export async function setCache<T>(
  key: string,
  data: T,
  ttlSeconds: number,
): Promise<void> {
  try {
    await redis.set(key, data, { ex: ttlSeconds });
  } catch (error) {
    console.warn(`[Cache] SET failed for key "${key}":`, error);
  }
}
/**
 * Delete a specific cache key.
 */
export async function deleteCache(key: string): Promise<void> {
  try {
    await redis.del(key);
  } catch (error) {
    console.warn(`[Cache] DEL failed for key "${key}":`, error);
  }
}
/**
 * Invalidate all cache keys matching a glob pattern.
 * Uses SCAN to find keys, then DEL to remove them in batch.
 *
 * Example: invalidatePattern("analysis:*") clears all analysis caches.
 */
export async function invalidatePattern(pattern: string): Promise<void> {
  try {
    let cursor = "0";
    const keysToDelete: string[] = [];
    // SCAN through all matching keys
    do {
      const [nextCursor, keys] = await redis.scan(Number(cursor), {
        match: pattern,
        count: 100,
      });
      cursor = String(nextCursor);
      keysToDelete.push(...keys);
    } while (cursor !== "0");
    // Batch delete if any keys found
    if (keysToDelete.length > 0) {
      await redis.del(...keysToDelete);
    }
  } catch (error) {
    console.warn(`[Cache] INVALIDATE_PATTERN failed for "${pattern}":`, error);
  }
}
/**
 * Cache-first data fetching pattern.
 * Checks Redis first, falls back to the provided fetcher, then caches the result.
 *
 * @param key - Cache key
 * @param ttlSeconds - TTL in seconds
 * @param fetcher - Async function to call on cache miss
 * @returns The data (from cache or fetcher)
 */
export async function withCache<T>(
  key: string,
  ttlSeconds: number,
  fetcher: () => Promise<T>,
): Promise<T> {
  // 1. Try cache first
  const cached = await getCache<T>(key);
  if (cached !== null) {
    return cached;
  }
  // 2. Cache miss — fetch from source
  const data = await fetcher();
  // 3. Store in cache (fire-and-forget)
  setCache(key, data, ttlSeconds);
  return data;
}
