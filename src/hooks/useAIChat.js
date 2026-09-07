import { useCallback, useMemo, useRef, useState } from "react";
import {
  sendMessage,
  createBooking,
  resetChat,
} from "../services/aiChatService";
import { useAuth } from "../context/AuthContext";

const uid = () => Math.random().toString(36).slice(2);
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const isEmptyObject = (value) =>
  value &&
  typeof value === "object" &&
  !Array.isArray(value) &&
  Object.keys(value).length === 0;

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

  const send = useCallback(
    async (text) => {
      if (!text.trim() || isResponding) return;

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

      try {
        const result = await sendMessage(text, customerId, authToken);

        if (myGeneration !== generationRef.current) return;

        const booking = normalizeBooking(result.booking);
        const fullResponseRaw = result.response || "No response received.";
        const fullResponse = booking
          ? compactBookingResponse(fullResponseRaw)
          : fullResponseRaw;

        await sleep(500);
        if (myGeneration !== generationRef.current) return;

        setMessages((prev) =>
          prev.map((m) =>
            m.id === pendingId
              ? { ...m, pending: false, typing: false, content: "" }
              : m
          )
        );

        await sleep(100);
        if (myGeneration !== generationRef.current) return;

        let currentText = "";
        const chunkSize = 2;

        for (let i = 0; i < fullResponse.length; i += chunkSize) {
          if (myGeneration !== generationRef.current) return;

          currentText += fullResponse.slice(i, i + chunkSize);

          setMessages((prev) =>
            prev.map((m) =>
              m.id === pendingId ? { ...m, content: currentText } : m
            )
          );

          const nextChar = fullResponse[i + chunkSize] || "";
          let delay = 22;
          if (nextChar === ".") delay = 180;
          else if (nextChar === ",") delay = 80;
          else if (nextChar === "\n") delay = 120;
          else if (nextChar === " ") delay = 25;

          await sleep(delay);
        }

        if (myGeneration !== generationRef.current) return;

        setMessages((prev) =>
          prev.map((m) =>
            m.id === pendingId
              ? {
                  ...m,
                  content: fullResponse,
                  pending: false,
                  typing: false,
                  booking,
                  recommendations: result.recommendations || [],
                }
              : m
          )
        );
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
          setIsResponding(false);
        }
      }
    },
    [authToken, customerId, isResponding]
  );

  const resetAll = useCallback(() => {
    generationRef.current += 1;
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

  const confirmBooking = useCallback(
    async (booking) => {
      return await createBooking(booking, authToken);
    },
    [authToken]
  );

  return {
    messages,
    isResponding,
    send,
    updateBooking,
    confirmBooking,
    resetAll,
  };
}