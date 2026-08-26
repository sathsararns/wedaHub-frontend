import { useCallback, useState } from "react";
import { sendMessage, createBooking } from "../services/aiChatService";
import { useAuth } from "../context/AuthContext";

const uid = () => Math.random().toString(36).slice(2);

const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export function useAIChat() {
  const { user } = useAuth();

  const [messages, setMessages] = useState([]);
  const [isResponding, setIsResponding] = useState(false);

  // =====================================
  // Send Message
  // =====================================

  const send = useCallback(
    async (text) => {
      if (!text.trim() || isResponding) return;

      const pendingId = uid();

      setMessages((prev) => [
        ...prev,
        {
          id: uid(),
          role: "user",
          content: text,
        },
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
        const result = await sendMessage(text, user?._id || null);

        const fullResponse =
          result.response || "No response received.";

        await sleep(700);

        setMessages((prev) =>
          prev.map((m) =>
            m.id === pendingId
              ? {
                  ...m,
                  pending: false,
                  typing: false,
                  content: "",
                }
              : m
          )
        );

        await sleep(150);

        let currentText = "";
        const chunkSize = 2;

        for (
          let i = 0;
          i < fullResponse.length;
          i += chunkSize
        ) {
          currentText += fullResponse.slice(
            i,
            i + chunkSize
          );

          setMessages((prev) =>
            prev.map((m) =>
              m.id === pendingId
                ? {
                    ...m,
                    content: currentText,
                  }
                : m
            )
          );

          const nextChar =
            fullResponse[i + chunkSize] || "";

          let delay = 22;

          if (nextChar === ".") delay = 180;
          else if (nextChar === ",") delay = 80;
          else if (nextChar === "\n") delay = 120;
          else if (nextChar === " ") delay = 25;

          await sleep(delay);
        }

        setMessages((prev) =>
          prev.map((m) =>
            m.id === pendingId
              ? {
                  ...m,
                  content: fullResponse,
                  pending: false,
                  typing: false,
                  booking: result.booking || null,
                  recommendations:
                    result.recommendations || [],
                }
              : m
          )
        );
      } catch (err) {
        console.error(err);

        setMessages((prev) =>
          prev.map((m) =>
            m.id === pendingId
              ? {
                  ...m,
                  pending: false,
                  typing: false,
                  content:
                    err.message ||
                    "Unable to contact AI service.",
                }
              : m
          )
        );
      } finally {
        setIsResponding(false);
      }
    },
    [user, isResponding]
  );

  // =====================================
  // Update Booking
  // =====================================

  const updateBooking = useCallback((booking) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.booking
          ? {
              ...msg,
              booking: {
                ...msg.booking,
                ...booking,
              },
            }
          : msg
      )
    );
  }, []);

  // =====================================
  // Confirm Booking
  // =====================================

  const confirmBooking = useCallback(async (booking) => {
    try {
      return await createBooking(booking);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }, []);

  // =====================================
  // Reset Chat
  // =====================================

  const reset = useCallback(() => {
    setMessages([]);
    setIsResponding(false);
  }, []);

  return {
    messages,
    isResponding,
    send,
    updateBooking,
    confirmBooking,
    reset,
  };
}