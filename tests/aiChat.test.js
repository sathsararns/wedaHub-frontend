import assert from "node:assert/strict";
import { test } from "node:test";
import { streamMessage } from "../src/services/aiChatService.js";

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
