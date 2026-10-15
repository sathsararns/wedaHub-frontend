import api from "../utils/api";

import cleanerImg from "../assets/images/services/cleaner.jpg";
import plumberImg from "../assets/images/services/plumber.jpg";
import electricianImg from "../assets/images/services/electrician.jpg";
import applianceImg from "../assets/images/services/appliance.jpg";
import pestImg from "../assets/images/services/pest-control.jpg";
import carpenterImg from "../assets/images/services/carpenter.jpg";
import painterImg from "../assets/images/services/painter.jpg";
import mechanicImg from "../assets/images/services/mechanic.jpg";

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

export async function sendMessage(message, customerId = null, authToken = null) {
  const { data } = await api.post(
    "/ai/chat",
    {
      message,
      customerId,
      customer_id: customerId,
    },
    authConfig(authToken)
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
  { onChunk, onDone } = {}
) {
  const headers = { "Content-Type": "application/json" };

  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  const baseURL = api.defaults.baseURL || "";

  const response = await fetch(`${baseURL}/ai/chat/stream`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      message,
      customerId,
      customer_id: customerId,
    }),
  });

  if (!response.ok || !response.body) {
    throw new Error(`AI stream request failed (${response.status})`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    let boundary = buffer.indexOf("\n\n");

    while (boundary !== -1) {
      const rawEvent = buffer.slice(0, boundary);
      buffer = buffer.slice(boundary + 2);

      const line = rawEvent.startsWith("data: ") ? rawEvent.slice(6) : rawEvent;

      if (line.trim()) {
        try {
          const event = JSON.parse(line);

          if (event.type === "chunk") {
            onChunk?.(event.text);
          } else if (event.type === "done") {
            onDone?.(event);
          }
        } catch {
          // Ignore a malformed/partial frame — shouldn't happen since
          // frames are only parsed once a full "\n\n" boundary arrives.
        }
      }

      boundary = buffer.indexOf("\n\n");
    }
  }
}

// ==============================
// Services shown in Services Panel
// ==============================

export const SERVICES = [
  {
    id: "cleaning",
    name: "Home Cleaning",
    image: cleanerImg,
    blurb: "Standard or deep clean by vetted, insured cleaners.",
    priceFrom: 3500,
    unit: "per visit",
    duration: "2–3 hrs",
  },
  {
    id: "plumbing",
    name: "Plumbing Repair",
    image: plumberImg,
    blurb: "Leaks, blocked drains, taps, water heaters and fittings.",
    priceFrom: 2500,
    unit: "call-out",
    duration: "1–2 hrs",
  },
  {
    id: "electrical",
    name: "Electrical Work",
    image: electricianImg,
    blurb: "Licensed electricians for wiring, sockets and fixtures.",
    priceFrom: 3000,
    unit: "call-out",
    duration: "1–2 hrs",
  },
  {
    id: "ac",
    name: "AC Service & Repair",
    image: mechanicImg,
    blurb: "Servicing, gas top-up and installation.",
    priceFrom: 4500,
    unit: "per unit",
    duration: "1–2 hrs",
  },
  {
    id: "pest",
    name: "Pest Control",
    image: pestImg,
    blurb: "Full-home pest treatment with warranty.",
    priceFrom: 5000,
    unit: "per treatment",
    duration: "1 hr",
  },
  {
    id: "carpentry",
    name: "Carpentry",
    image: carpenterImg,
    blurb: "Furniture repair and custom woodwork.",
    priceFrom: 3200,
    unit: "call-out",
    duration: "2–4 hrs",
  },
  {
    id: "painting",
    name: "Painting",
    image: painterImg,
    blurb: "Interior and exterior painting.",
    priceFrom: 6000,
    unit: "per room",
    duration: "4–6 hrs",
  },
  {
    id: "appliance",
    name: "Appliance Repair",
    image: applianceImg,
    blurb: "Repair washing machines, fridges and ovens.",
    priceFrom: 2800,
    unit: "call-out",
    duration: "1–2 hrs",
  },
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