type WindowConfig = {
  limit: number;
  windowMs: number;
};

const configs: Record<string, WindowConfig> = {
  auth: { limit: 5, windowMs: 15 * 60 * 1000 },
  subscriber: { limit: 60, windowMs: 60 * 1000 },
  api: { limit: 100, windowMs: 60 * 1000 },
  ai: { limit: 20, windowMs: 60 * 1000 },
};

type Bucket = {
  timestamps: number[];
};

const store = new Map<string, Bucket>();

const CLEANUP_INTERVAL = 60_000;
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;
  let maxWindow = 0;
  for (const cfg of Object.values(configs)) {
    if (cfg.windowMs > maxWindow) maxWindow = cfg.windowMs;
  }
  const cutoff = now - maxWindow;
  for (const [key, bucket] of store) {
    bucket.timestamps = bucket.timestamps.filter((t) => t > cutoff);
    if (bucket.timestamps.length === 0) store.delete(key);
  }
}

function getRateLimitResult(
  bucket: Bucket,
  config: WindowConfig,
  now: number
): { allowed: boolean; retryAfter: number } {
  const cutoff = now - config.windowMs;
  bucket.timestamps = bucket.timestamps.filter((t) => t > cutoff);

  if (bucket.timestamps.length >= config.limit) {
    const retryAfter = Math.ceil(
      (bucket.timestamps[0] + config.windowMs - now) / 1000
    );
    return { allowed: false, retryAfter };
  }

  bucket.timestamps.push(now);
  return { allowed: true, retryAfter: 0 };
}

export function checkRateLimit(
  tier: keyof typeof configs,
  identifier: string
): { allowed: boolean; retryAfter: number } {
  cleanup();

  const config = configs[tier];
  if (!config) {
    return { allowed: true, retryAfter: 0 };
  }

  const now = Date.now();
  const key = `${tier}:${identifier}`;
  let bucket = store.get(key);
  if (!bucket) {
    bucket = { timestamps: [] };
    store.set(key, bucket);
  }

  return getRateLimitResult(bucket, config, now);
}

export function buildRateLimitResponse(retryAfter: number): Response {
  return new Response(
    JSON.stringify({
      error: "Too Many Requests",
      message: `Rate limit exceeded. Retry after ${retryAfter} seconds.`,
    }),
    {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "Retry-After": String(retryAfter),
        "X-RateLimit-Reset": String(Math.ceil(Date.now() / 1000) + retryAfter),
      },
    }
  );
}
