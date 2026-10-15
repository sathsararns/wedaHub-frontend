import assert from "node:assert/strict";
import { test } from "node:test";

import api from "../src/Utils/api.js";
import { clearStoredAuth, normalizeToken, readStoredSession, resolveAuthToken, storeToken, TOKEN_KEYS } from "../src/Utils/authToken.js";
import { loginReturnPath } from "../src/Utils/authRedirect.js";
import { getCustomerBookings } from "../src/services/bookingService.js";

const now = Math.floor(Date.now() / 1000);
const token = (claims) => [
  { alg: "HS256", typ: "JWT" },
  { id: "customer-1", iat: now - 10, exp: now + 3600, ...claims },
].map((part) => Buffer.from(JSON.stringify(part)).toString("base64url")).join(".") + ".test-signature";

function storage(values = {}) {
  const items = new Map(Object.entries(values));
  return {
    getItem: (key) => items.get(key) ?? null,
    setItem: (key, value) => items.set(key, value),
    removeItem: (key) => items.delete(key),
  };
}

test("normalizes a Bearer credential without adding a second prefix", () => {
  const raw = token();
  assert.equal(normalizeToken(` bearer ${raw} `), raw);
  assert.equal(normalizeToken("undefined"), null);
  assert.equal(normalizeToken(null), null);
});

test("restores a valid session from legacy jwt storage", () => {
  const raw = token();
  const saved = storage({ jwt: `Bearer ${raw}`, user: JSON.stringify({ _id: "customer-1" }) });
  assert.deepEqual(readStoredSession(saved), { user: { _id: "customer-1" }, token: raw });
});

test("expired and malformed credentials do not restore a logged-in user", () => {
  for (const raw of [token({ exp: now - 10 }), "not-a-token", "undefined"]) {
    const saved = storage({ token: raw, user: JSON.stringify({ _id: "customer-1" }) });
    assert.deepEqual(readStoredSession(saved), { user: null, token: null });
  }
});

test("chooses the latest valid credential over stale context or alias values", () => {
  const stale = token({ iat: now - 300 });
  const fresh = token({ iat: now - 1 });
  const saved = storage({ token: fresh, accessToken: stale });
  assert.equal(resolveAuthToken({ token: stale, user: { _id: "customer-1" }, storage: saved }), fresh);
});

test("does not reuse a token belonging to another customer", () => {
  const saved = storage({ token: token({ id: "other-customer", iat: now }) });
  assert.equal(resolveAuthToken({ user: { _id: "customer-1" }, storage: saved }), null);
});

test("login and logout keep all credential aliases consistent", () => {
  const saved = storage({ user: JSON.stringify({ _id: "customer-1" }) });
  const raw = token();
  storeToken(`Bearer ${raw}`, saved);
  TOKEN_KEYS.forEach((key) => assert.equal(saved.getItem(key), raw));
  clearStoredAuth(saved);
  [...TOKEN_KEYS, "user"].forEach((key) => assert.equal(saved.getItem(key), null));
});

test("login returns to the bookings tab and rejects external return URLs", () => {
  assert.equal(loginReturnPath("/ai-support?section=bookings"), "/ai-support?section=bookings");
  for (const from of [undefined, "https://example.com", "//example.com", "/\\example.com"]) {
    assert.equal(loginReturnPath(from), "/");
  }
});

test("the booking request uses a fresh stored token and receives customer bookings", async (t) => {
  const stale = token({ iat: now - 300, exp: now - 1 });
  const fresh = token({ iat: now - 1 });
  const saved = storage({ token: fresh, user: JSON.stringify({ _id: "customer-1" }) });
  const previousStorage = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
  Object.defineProperty(globalThis, "localStorage", { configurable: true, value: saved });
  t.after(() => {
    if (previousStorage) Object.defineProperty(globalThis, "localStorage", previousStorage);
    else delete globalThis.localStorage;
  });
  const bookings = [{ _id: "booking-1", source: "ai", status: "pending" }];
  const previousAdapter = api.defaults.adapter;
  t.after(() => { api.defaults.adapter = previousAdapter; });
  api.defaults.adapter = async (config) => {
    assert.equal(config.url, "/bookings/customer");
    assert.equal(config.headers.Authorization, `Bearer ${fresh}`);
    return { data: bookings, status: 200, statusText: "OK", config, headers: {} };
  };
  assert.deepEqual(await getCustomerBookings(`Bearer ${stale}`), bookings);
});
