import { Redis } from "@upstash/redis";
// ─── Upstash Redis Client ───────────────────────────────────────────────────
// HTTP-based client compatible with Edge runtime and serverless environments.
// Connection uses the Upstash REST API — no TCP socket needed.
export const redis = new Redis({
  url: process.env.REDIS_ENDPOINT!,
  token: process.env.REDIS_TOKEN!,
});
