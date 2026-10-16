import assert from "node:assert/strict";
import { test } from "node:test";
import { streamMessage } from "../src/services/aiChatService.js";
import api from "../src/Utils/api.js";

function browser(t, value) {
  const previous = Object.getOwnPropertyDescriptor(globalThis, "navigator");
  Object.defineProperty(globalThis, "navigator", { configurable: true, value });
  t.after(() => {
    if (previous) Object.defineProperty(globalThis, "navigator", previous);
    else delete globalThis.navigator;
  });
}

function response(t, parts, { status = 200 } = {}) {
  const encoder = new TextEncoder();
  const body = new ReadableStream({
    start(controller) {
      for (const part of parts) controller.enqueue(encoder.encode(part));
      controller.close();
    },
  });
  t.mock.method(globalThis, "fetch", async () => new Response(body, { status }));
}

test("shows the backend's useful error instead of only the HTTP status", async (t) => {
  response(t, [JSON.stringify({ message: "The AI assistant is temporarily unavailable." })], { status: 503 });
  await assert.rejects(streamMessage("hi"), /temporarily unavailable/);
});

test("handles proxy HTML errors without displaying HTML to the customer", async (t) => {
  response(t, ["<html>Bad Gateway</html>"], { status: 502 });
  await assert.rejects(streamMessage("hi"), /temporarily unavailable/);
});

test("handles fragmented SSE, CRLF, heartbeats, Unicode, and final metadata", async (t) => {
  const frame = ': connected\r\n\r\ndata: {"type":"chunk","text":"Hello 👋"}\r\n\r\ndata: {"type":"done","booking":null,"recommendations":[]}\r\n\r\n';
  // Split on every byte, including inside a multibyte Unicode character.
  const bytes = new TextEncoder().encode(frame);
  t.mock.method(globalThis, "fetch", async () => new Response(new ReadableStream({
    start(controller) {
      for (const byte of bytes) controller.enqueue(Uint8Array.of(byte));
      controller.close();
    },
  })));
  let text = "";
  let metadata;
  await streamMessage("hi", null, null, {
    onChunk: (chunk) => { text += chunk; },
    onDone: (event) => { metadata = event; },
  });
  assert.equal(text, "Hello 👋");
  assert.equal(metadata.type, "done");
  assert.equal(metadata.booking, null);
});

test("surfaces an error sent after streaming headers have been written", async (t) => {
  response(t, [': connected\n\ndata: {"type":"error","message":"AI connection interrupted"}\n\n']);
  let completed = false;
  await assert.rejects(streamMessage("hi", null, null, {
    onDone: () => { completed = true; },
  }), /AI connection interrupted/);
  assert.equal(completed, false);
});

test("a truncated stream is reported as incomplete rather than successful", async (t) => {
  response(t, ['data: {"type":"chunk","text":"Partial reply"}\n\n']);
  await assert.rejects(streamMessage("hi"), /before the reply finished/);
});

test("does not swallow exceptions thrown by the message callback", async (t) => {
  response(t, ['data: {"type":"chunk","text":"Hello"}\n\n']);
  await assert.rejects(streamMessage("hi", null, null, {
    onChunk: () => { throw new Error("Callback failed"); },
  }), /Callback failed/);
});

for (const [name, device] of [
  ["iPhone Chrome", { userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) CriOS/130.0", platform: "iPhone" }],
  ["iPad desktop mode", { userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X)", platform: "MacIntel", maxTouchPoints: 5 }],
]) {
  test(`${name} receives a reply and booking metadata through exactly one JSON POST`, async (t) => {
    browser(t, device);
    t.mock.method(globalThis, "fetch", () => assert.fail("Must not depend on a streaming fetch on iOS"));
    const previous = api.defaults.adapter;
    t.after(() => { api.defaults.adapter = previous; });
    let posts = 0;
    const booking = { booking_id: "booking-1", city: "Matara" };
    api.defaults.adapter = async (config) => {
      posts++;
      assert.equal(config.url, "/ai/chat");
      assert.deepEqual(JSON.parse(config.data), { message: "hi", customerId: "customer-1", customer_id: "customer-1" });
      return { data: { response: "Welcome", booking, recommendations: [{ id: "provider-1" }] }, status: 200, config, headers: {} };
    };
    let reply = "";
    let done;
    await streamMessage("hi", "customer-1", null, {
      onChunk: (text) => { reply += text; },
      onDone: (event) => { done = event; },
    });
    assert.equal(reply, "Welcome");
    assert.deepEqual(done.booking, booking);
    assert.equal(done.recommendations.length, 1);
    assert.equal(posts, 1);
  });
}

test("iPhone requests surface a backend error without replaying the message", async (t) => {
  browser(t, { userAgent: "iPhone" });
  const previous = api.defaults.adapter;
  t.after(() => { api.defaults.adapter = previous; });
  let posts = 0;
  api.defaults.adapter = async () => {
    posts++;
    throw { response: { data: { message: "The AI service is waking up. Try again shortly." } } };
  };
  await assert.rejects(streamMessage("confirm booking"), /waking up/);
  assert.equal(posts, 1);
});

test("iPhone requests reject an empty reply instead of silently completing", async (t) => {
  browser(t, { userAgent: "iPhone" });
  const previous = api.defaults.adapter;
  t.after(() => { api.defaults.adapter = previous; });
  api.defaults.adapter = async (config) => ({ data: { response: "" }, status: 200, config, headers: {} });
  await assert.rejects(streamMessage("hi"), /empty reply/);
});

test("a stalled streaming connection times out and releases the pending request", async (t) => {
  t.mock.method(globalThis, "fetch", async (url, { signal }) => new Response(new ReadableStream({
    start(controller) {
      signal.addEventListener("abort", () => controller.error(new DOMException("Aborted", "AbortError")), { once: true });
      controller.enqueue(new TextEncoder().encode(": connected\n\n"));
    },
  })));
  await assert.rejects(streamMessage("hi", null, null, { timeoutMs: 30 }), /took too long/);
});

test("resetting a chat can abort its in-flight request", async (t) => {
  const request = new AbortController();
  t.mock.method(globalThis, "fetch", (url, { signal }) => new Promise((resolve, reject) => {
    signal.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")), { once: true });
  }));
  const reply = streamMessage("hi", null, null, { signal: request.signal });
  request.abort();
  await assert.rejects(reply, { name: "AbortError" });
});
