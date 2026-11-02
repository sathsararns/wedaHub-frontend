import assert from "node:assert/strict";
import { test } from "node:test";
import { resolveApiUrls } from "../src/Utils/config.js";

test("Docker API calls and WebSockets use the browser's origin", () => {
  assert.deepEqual(resolveApiUrls("/api/", "http://localhost:5173"), {
    api: "/api", socket: "http://localhost:5173",
  });
  assert.deepEqual(resolveApiUrls("/api", "http://127.0.0.1:8080"), {
    api: "/api", socket: "http://127.0.0.1:8080",
  });
});

test("a deployed backend URL keeps its own WebSocket origin", () => {
  assert.deepEqual(resolveApiUrls("https://api.example.com/api/", "https://web.example.com"), {
    api: "https://api.example.com/api", socket: "https://api.example.com",
  });
});

test("direct Vite development keeps the localhost backend default", () => {
  assert.deepEqual(resolveApiUrls(), {
    api: "http://localhost:3000/api", socket: "http://localhost:3000",
  });
});
