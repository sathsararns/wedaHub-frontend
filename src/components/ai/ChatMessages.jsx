import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ChatLogo from "./ChatLogo";
import ChatBookingCard from "./ChatBookingCard";

function renderLine(line, key) {
  const parts = line.split(/(\*\*[^*]+\*\*)/g);

  return (
    <p
      key={key}
      className="text-[14px] leading-relaxed text-zinc-700"
    >
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong
            key={i}
            className="font-semibold text-zinc-900"
          >
            {part.slice(2, -2)}
          </strong>
        ) : (
          <React.Fragment key={i}>
            {part}
          </React.Fragment>
        )
      )}
    </p>
  );
}

export default function ChatMessages({
  messages,
  onUpdateBooking,
  onConfirmBooking,
}) {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages]);

  return (
    <div
      className="space-y-6"
      role="log"
      aria-live="polite"
    >
      {messages.map((m) =>
        m.role === "user" ? (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
            className="flex justify-end"
          >
            <p className="max-w-[85%] rounded-2xl rounded-br-md bg-zinc-900 px-4 py-2.5 text-[14px] leading-relaxed text-white">
              {m.content}
            </p>
          </motion.div>
        ) : (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
            className="flex gap-3"
          >
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-white">
              <ChatLogo showWordmark={false} />
            </span>

            <div className="min-w-0 flex-1">
              {m.typing ? (
                <div className="flex items-center gap-1 pt-2">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="h-2 w-2 rounded-full bg-zinc-400"
                      animate={{
                        y: [0, -5, 0],
                        opacity: [0.4, 1, 0.4],
                      }}
                      transition={{
                        duration: 0.7,
                        repeat: Infinity,
                        delay: i * 0.15,
                      }}
                    />
                  ))}
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    {m.content
                      .split("\n")
                      .filter(Boolean)
                      .map(renderLine)}
                  </div>

                  {m.booking && (
                    <ChatBookingCard
                      booking={m.booking}
                      bookingRef={m.bookingRef}
                      onChange={(patch) =>
                        onUpdateBooking({
                          ...m.booking,
                          ...patch,
                        })
                      }
                      onConfirm={() =>
                        onConfirmBooking({
                          ...m.booking,
                        })
                      }
                    />
                  )}
                </>
              )}
            </div>
          </motion.div>
        )
      )}

      <div ref={endRef} />
    </div>
  );
}