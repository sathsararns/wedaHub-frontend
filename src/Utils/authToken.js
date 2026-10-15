export const TOKEN_KEYS = ["token", "accessToken", "authToken", "jwt"];

export function normalizeToken(value) {
  if (typeof value !== "string") return null;
  const token = value.trim().replace(/^Bearer\s+/i, "").trim();
  return token && !["null", "undefined"].includes(token) ? token : null;
}

function tokenClaims(token) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payload = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(payload.padEnd(Math.ceil(payload.length / 4) * 4, "=")));
  } catch {
    return null;
  }
}

function storedUser(storage) {
  try {
    return JSON.parse(storage?.getItem("user") || "null");
  } catch {
    return null;
  }
}

// Decoding only selects a usable local credential; the backend verifies its signature.
export function resolveAuthToken({ token = null, user = null, storage = globalThis.localStorage, now = Date.now() } = {}) {
  const expectedUser = user || storedUser(storage);
  const expectedId = expectedUser?._id || expectedUser?.id;
  const candidates = [
    token,
    user?.token,
    ...TOKEN_KEYS.map((key) => storage?.getItem(key)),
    expectedUser?.token,
  ];
  const usable = candidates.flatMap((candidate) => {
    const normalized = normalizeToken(candidate);
    const claims = normalized && tokenClaims(normalized);
    if (!claims || typeof claims.exp !== "number" || claims.exp * 1000 <= now) return [];
    if (expectedId && String(claims.id || claims._id || claims.sub) !== String(expectedId)) return [];
    return [{ token: normalized, issuedAt: Number(claims.iat) || 0 }];
  });
  usable.sort((a, b) => b.issuedAt - a.issuedAt);
  return usable[0]?.token || null;
}

export function readStoredSession(storage = globalThis.localStorage) {
  const user = storedUser(storage);
  const token = resolveAuthToken({ user, storage });
  return user && token ? { user, token } : { user: null, token: null };
}

export function storeToken(token, storage = globalThis.localStorage) {
  const normalized = normalizeToken(token);
  TOKEN_KEYS.forEach((key) => {
    if (normalized) storage?.setItem(key, normalized);
    else storage?.removeItem(key);
  });
}

export function clearStoredAuth(storage = globalThis.localStorage) {
  storeToken(null, storage);
  storage?.removeItem("user");
}
