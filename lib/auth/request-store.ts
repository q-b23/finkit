/**
 * In-memory auth request store with deterministic status resolution.
 *
 * Key design decisions for serverless (Vercel):
 * 1. Request IDs encode the creation timestamp so ANY instance can compute status.
 * 2. The in-memory Map is a best-effort cache (same-instance only).
 * 3. The GET /api/auth/status endpoint falls back to elapsed-time computation
 *    when the Map doesn't contain the request (cross-instance scenario).
 *
 * Production upgrade path: Redis / Upstash for persistent shared state.
 */

interface AuthRequest {
  email: string;
  status: "pending" | "complete" | "failed";
  token?: string;
  createdAt: number;
  completeAfterMs: number;
}

const store = new Map<string, AuthRequest>();

/** Duration before a simulated request auto-completes. */
const DEFAULT_COMPLETE_AFTER_MS = 5_000;

/** Separator used to pack uuid and timestamp into the request_id. */
const ID_SEPARATOR = "_";

/**
 * Pack a UUID and creation timestamp into a single request_id string.
 * Format: "<uuid>_<timestamp>"
 * This allows any serverless instance to compute elapsed time without
 * needing access to the same in-memory Map.
 */
function packRequestId(uuid: string, createdAt: number): string {
  return `${uuid}_${createdAt}`;
}

/**
 * Unpack a request_id back into its components.
 * Returns null if the format is invalid.
 */
function unpackRequestId(requestId: string): { uuid: string; createdAt: number } | null {
  const lastSep = requestId.lastIndexOf(ID_SEPARATOR);
  if (lastSep === -1) return null;
  const uuid = requestId.slice(0, lastSep);
  const ts = Number(requestId.slice(lastSep + 1));
  if (!uuid || Number.isNaN(ts)) return null;
  return { uuid, createdAt: ts };
}

/** Generate a unique request ID that embeds the creation timestamp. */
export function createRequest(email: string): string {
  const uuid = crypto.randomUUID();
  const createdAt = Date.now();
  const id = packRequestId(uuid, createdAt);
  store.set(id, {
    email,
    status: "pending",
    createdAt,
    completeAfterMs: DEFAULT_COMPLETE_AFTER_MS,
  });
  return id;
}

/** Get the current status of a request. Falls back to elapsed-time computation. */
export function getRequest(id: string): AuthRequest | undefined {
  // Best-effort: check local Map first.
  const cached = store.get(id);
  if (cached) {
    // Auto-transition pending → complete if enough time has elapsed.
    if (cached.status === "pending" && Date.now() - cached.createdAt >= cached.completeAfterMs) {
      cached.status = "complete";
      cached.token = cached.token ?? `tok_${id.slice(0, 8)}`;
      store.set(id, cached);
    }
    return cached;
  }

  // Cross-instance fallback: reconstruct from the encoded request_id.
  const unpacked = unpackRequestId(id);
  if (!unpacked) return undefined;

  const elapsed = Date.now() - unpacked.createdAt;
  if (elapsed >= DEFAULT_COMPLETE_AFTER_MS) {
    // Reconstruct a synthetic "complete" entry.
    return {
      email: "",
      status: "complete",
      token: `tok_${id.slice(0, 8)}`,
      createdAt: unpacked.createdAt,
      completeAfterMs: DEFAULT_COMPLETE_AFTER_MS,
    };
  }

  // Still pending, reconstruct a synthetic pending entry.
  return {
    email: "",
    status: "pending",
    createdAt: unpacked.createdAt,
    completeAfterMs: DEFAULT_COMPLETE_AFTER_MS,
  };
}

/** Update a request's status (called by verification process). */
export function updateRequest(
  id: string,
  updates: Partial<Pick<AuthRequest, "status" | "token">>
): void {
  const existing = store.get(id);
  if (existing) {
    store.set(id, { ...existing, ...updates });
  }
}

/** Clean up requests older than the given milliseconds. */
export function cleanupStore(maxAgeMs: number = 600_000): void {
  const now = Date.now();
  for (const [id, req] of Array.from(store)) {
    if (now - req.createdAt > maxAgeMs) {
      store.delete(id);
    }
  }
}
