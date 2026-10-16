import api from "../Utils/api.js";

const AI_REQUEST_TIMEOUT_MS = 180_000;

function shouldBufferReplies() {
  const browser = globalThis.navigator;
  // Choose the transport before submitting: never replay a booking message
  // just because a streaming response stalled on a mobile browser.
  return /iPhone|iPad|iPod/i.test(browser?.userAgent || "") ||
    (browser?.platform === "MacIntel" && browser?.maxTouchPoints > 1) ||
    typeof TextDecoder === "undefined" || typeof ReadableStream === "undefined";
}

const authConfig = (authToken) =>
  authToken
    ? {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    : undefined;

// ==============================
// AI Chat
// ==============================

export async function sendMessage(message, customerId = null, authToken = null, options = {}) {
  const { data } = await api.post(
    "/ai/chat",
    {
      message,
      customerId,
      customer_id: customerId,
    },
    {
      ...authConfig(authToken),
      signal: options.signal,
      timeout: options.timeoutMs ?? AI_REQUEST_TIMEOUT_MS,
    }
  );

  return data;
}

export async function resetChat(customerId = null, authToken = null) {
  const { data } = await api.post(
    "/ai/chat/reset",
    {
      customerId,
      customer_id: customerId,
    },
    authConfig(authToken)
  );

  return data;
}

// ==============================
// AI Chat (streaming)
// ==============================
// Uses fetch + ReadableStream directly (not axios) since a genuine
// incremental stream needs the raw response body reader — axios's
// browser adapter buffers the whole response before resolving.
// Frames are newline-delimited "data: {...}\n\n" (Server-Sent Events
// style), each either {type:"chunk", text} or the final
// {type:"done", recommendations, booking}.

export async function streamMessage(
  message,
  customerId = null,
  authToken = null,
  { onChunk, onDone, signal, timeoutMs = AI_REQUEST_TIMEOUT_MS } = {}
) {
  const controller = new AbortController();
  let timedOut = false;
  const abort = () => controller.abort();
  if (signal?.aborted) controller.abort();
  else signal?.addEventListener("abort", abort, { once: true });
  const timer = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, timeoutMs);

  try {
    if (shouldBufferReplies()) {
      const result = await sendMessage(message, customerId, authToken, {
        signal: controller.signal,
        timeoutMs,
      });
      if (typeof result?.response !== "string" || !result.response.trim()) {
        throw new Error("The AI assistant returned an empty reply. Please try again.");
      }
      onChunk?.(result.response);
      onDone?.({
        type: "done",
        recommendations: result.recommendations || [],
        booking: result.booking || null,
      });
      return;
    }

    await readStreamingMessage(message, customerId, authToken, {
      onChunk, onDone, signal: controller.signal,
    });
  } catch (error) {
    if (timedOut || error.code === "ECONNABORTED") {
      throw new Error("The AI assistant took too long to reply. Please try again shortly.", { cause: error });
    }
    if (error.response) {
      throw new Error(error.response.data?.message || "The AI assistant is temporarily unavailable. Please try again shortly.", { cause: error });
    }
    throw error;
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener("abort", abort);
  }
}

async function readStreamingMessage(
  message,
  customerId = null,
  authToken = null,
  { onChunk, onDone, signal } = {}
) {
  const headers = { "Content-Type": "application/json" };

  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  const baseURL = api.defaults.baseURL || "";

  const response = await fetch(`${baseURL}/ai/chat/stream`, {
    method: "POST",
    headers,
    signal,
    body: JSON.stringify({
      message,
      customerId,
      customer_id: customerId,
    }),
  });

  if (!response.ok || !response.body) {
    const error = await response.json().catch(() => null);
    throw new Error(
      error?.message || error?.detail ||
      "The AI assistant is temporarily unavailable. Please try again shortly."
    );
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let completed = false;

  function handleEvent(frame) {
    const data = frame.split("\n")
      .filter((line) => line.startsWith("data:"))
      .map((line) => line.slice(5).replace(/^ /, ""))
      .join("\n");
    if (!data) return;

    let event;
    try {
      event = JSON.parse(data);
    } catch {
      return;
    }

    if (event.type === "error") {
      throw new Error(event.message || "The AI connection was interrupted. Please try again shortly.");
    }
    if (event.type === "chunk") {
      onChunk?.(event.text);
    } else if (event.type === "done") {
      completed = true;
      onDone?.(event);
    }
  }

  try {
    while (!completed) {
      const { value, done } = await reader.read();
      buffer += done ? decoder.decode() : decoder.decode(value, { stream: true });
      buffer = buffer.replace(/\r\n/g, "\n");

      let boundary = buffer.indexOf("\n\n");
      while (boundary !== -1 && !completed) {
        handleEvent(buffer.slice(0, boundary));
        buffer = buffer.slice(boundary + 2);
        boundary = buffer.indexOf("\n\n");
      }

      if (done) {
        if (!completed && buffer.trim()) handleEvent(buffer);
        break;
      }
    }

    if (!completed) {
      throw new Error("The AI connection ended before the reply finished. Please try again shortly.");
    }
  } finally {
    await reader.cancel().catch(() => {});
    reader.releaseLock();
  }
}

// ==============================
// Services shown in Services Panel
// ==============================

export const SERVICES = [
  { id: "cleaning", name: "Home Cleaning" },
  { id: "plumbing", name: "Plumbing Repair" },
  { id: "electrical", name: "Electrical Work" },
  { id: "ac", name: "AC Service & Repair" },
  { id: "pest", name: "Pest Control" },
  { id: "carpentry", name: "Carpentry" },
  { id: "painting", name: "Painting" },
  { id: "appliance", name: "Appliance Repair" },
];

// ==============================
// Demo Bookings
// ==============================

export const MY_BOOKINGS = [
  {
    id: "b1",
    ref: "WH-40218",
    service: "Home Cleaning",
    pro: "Nadeesha P.",
    when: "Sat, 9 Aug · 10:00 – 12:00",
    status: "Upcoming",
    price: 5600,
  },
  {
    id: "b2",
    ref: "WH-40155",
    service: "AC Service",
    pro: "Ravi K.",
    when: "Tue, 12 Aug · 13:00 – 15:00",
    status: "Upcoming",
    price: 9000,
  },
  {
    id: "b3",
    ref: "WH-39902",
    service: "Plumbing Repair",
    pro: "Suresh M.",
    when: "Thu, 24 Jul · 15:00 – 17:00",
    status: "Completed",
    price: 2500,
  },
  {
    id: "b4",
    ref: "WH-39740",
    service: "Pest Control",
    pro: "Ishara D.",
    when: "Mon, 14 Jul · 08:00 – 10:00",
    status: "Completed",
    price: 8000,
  },
  {
    id: "b5",
    ref: "WH-39611",
    service: "Electrical Work",
    pro: "Chamath R.",
    when: "Fri, 4 Jul · 10:00 – 12:00",
    status: "Cancelled",
    price: 3000,
  },
];
