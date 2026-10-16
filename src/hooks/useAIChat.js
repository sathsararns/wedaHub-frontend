import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { streamMessage, resetChat } from "../services/aiChatService";
import { useAuth } from "./useAuth.js";

const uid = () => Math.random().toString(36).slice(2);

const compactBookingResponse = (text) => {
  const raw = String(text || "").replace(/\r/g, "");
  const lines = raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const kept = [];
  for (const line of lines) {
    if (/^(booking id|provider|service|city|date|description|status)\s*:/i.test(line)) {
      break;
    }
    kept.push(line);
  }

  return kept.join("\n").trim() || "✅ Booking Created Successfully!";
};

const normalizeBooking = (booking) => {
  if (!booking || typeof booking !== "object" || Array.isArray(booking)) {
    return null;
  }

  const providerObject =
    (booking.providerId && typeof booking.providerId === "object" && booking.providerId) ||
    (booking.provider && typeof booking.provider === "object" && booking.provider) ||
    (booking.providerData && typeof booking.providerData === "object" && booking.providerData) ||
    null;

  const providerName = [
    booking.provider_name,
    booking.providerName,
    booking.business_name,
    booking.businessName,
    providerObject?.businessName,
    [providerObject?.firstName, providerObject?.lastName].filter(Boolean).join(" ").trim(),
  ].find((value) => value && String(value).trim() !== "");

  return {
    ...booking,
    provider_name: providerName || "",
    service: booking.service || booking.serviceName || booking.service_name || "",
    date: booking.date || booking.bookingDate || booking.booking_date || "",
    description: booking.description || booking.instructions || booking.note || "",
    status: booking.status || "Pending",
  };
};

export function useAIChat() {
  const { user, token } = useAuth();

  const customerId = useMemo(
    () => user?._id || user?.id || user?.user?._id || null,
    [user]
  );

  const authToken = useMemo(
    () => token || user?.token || null,
    [token, user]
  );

  const [messages, setMessages] = useState([]);
  const [isResponding, setIsResponding] = useState(false);

  const generationRef = useRef(0);
  const requestRef = useRef(null);

  useEffect(() => () => {
    generationRef.current += 1;
    requestRef.current?.abort();
  }, []);

  const send = useCallback(
    async (text) => {
      if (!text.trim() || requestRef.current) return;

      const request = new AbortController();
      requestRef.current = request;

      const myGeneration = generationRef.current;
      const pendingId = uid();

      setMessages((prev) => [
        ...prev,
        { id: uid(), role: "user", content: text },
        {
          id: pendingId,
          role: "assistant",
          content: "",
          pending: true,
          typing: true,
        },
      ]);

      setIsResponding(true);

      let streamedText = "";
      let receivedFirstChunk = false;

      try {
        await streamMessage(text, customerId, authToken, {
          signal: request.signal,
          onChunk: (chunk) => {
            if (myGeneration !== generationRef.current) return;

            streamedText += chunk;
            receivedFirstChunk = true;

            setMessages((prev) =>
              prev.map((m) =>
                m.id === pendingId
                  ? { ...m, pending: false, typing: false, content: streamedText }
                  : m
              )
            );
          },
          onDone: (event) => {
            if (myGeneration !== generationRef.current) return;

            const booking = normalizeBooking(event.booking);
            // Snap to the compacted text now that we know whether this
            // turn produced a booking — while streaming we can't tell
            // until this final event arrives, so the raw text is shown
            // briefly and then replaced here (see aiChatService.js).
            const finalText = booking
              ? compactBookingResponse(streamedText)
              : streamedText || "No response received.";

            setMessages((prev) =>
              prev.map((m) =>
                m.id === pendingId
                  ? {
                      ...m,
                      content: finalText,
                      pending: false,
                      typing: false,
                      booking,
                      recommendations: event.recommendations || [],
                    }
                  : m
              )
            );
          },
        });

        if (myGeneration !== generationRef.current) return;

        if (!receivedFirstChunk) {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === pendingId
                ? { ...m, pending: false, typing: false, content: "No response received." }
                : m
            )
          );
        }
      } catch (err) {
        if (myGeneration !== generationRef.current) return;

        console.error(err);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === pendingId
              ? {
                  ...m,
                  pending: false,
                  typing: false,
                  content: err.message || "Unable to contact AI service.",
                }
              : m
          )
        );
      } finally {
        if (myGeneration === generationRef.current) {
          requestRef.current = null;
          setIsResponding(false);
        }
      }
    },
    [authToken, customerId]
  );

  const resetAll = useCallback(() => {
    generationRef.current += 1;
    requestRef.current?.abort();
    requestRef.current = null;
    setMessages([]);
    setIsResponding(false);

    void resetChat(customerId, authToken).catch((err) => {
      console.error("Failed to reset chat memory:", err);
    });
  }, [authToken, customerId]);

  const updateBooking = useCallback((messageId, patch) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId && msg.booking
          ? { ...msg, booking: { ...msg.booking, ...patch } }
          : msg
      )
    );
  }, []);

  return {
    messages,
    isResponding,
    send,
    updateBooking,
    resetAll,
  };
}
