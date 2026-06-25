const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;

const requests = new Map<string, number[]>();

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (requests.get(key) ?? []).filter(
    (time) => now - time < WINDOW_MS
  );

  if (timestamps.length >= MAX_REQUESTS) {
    return true;
  }

  timestamps.push(now);
  requests.set(key, timestamps);
  return false;
}
