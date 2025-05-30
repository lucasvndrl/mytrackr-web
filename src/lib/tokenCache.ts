type TokenCacheItem = {
  token: string;
  expiresAt: number;
};

const tokenCache = new Map<string, TokenCacheItem>();

export function getCachedToken(key: string): string | null {
  const cached = tokenCache.get(key);
  if (!cached) return null;

  const now = Math.floor(Date.now() / 1000);
  if (cached.expiresAt > now) {
    return cached.token;
  } else {
    tokenCache.delete(key);
    return null;
  }
}

export function setCachedToken(
  key: string,
  token: string,
  expiresInSeconds: number
) {
  const expiresAt = Math.floor(Date.now() / 1000) + expiresInSeconds;
  tokenCache.set(key, { token, expiresAt });
}
