import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ChatLogo from "./ChatLogo";
import ChatBookingCard from "./ChatBookingCard";

function renderLine(line, key) {
  const parts = line.split(/(\*\*[^*]+\*\*)/g);

  return (
    <p key={key} className="text-[14px] leading-relaxed text-zinc-700">
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} className="font-semibold text-zinc-900">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      )}
    </p>
  );
}

const hasMeaningfulBooking = (booking) =>
  booking &&
  typeof booking === "object" &&
  !Array.isArray(booking) &&
  Object.keys(booking).some((key) => {
    const value = booking[key];
    return value !== null && value !== undefined && value !== "";
  });

export default function ChatMessages({
  messages,
  onUpdateBooking,
  onConfirmBooking,
}) {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  return (
    <div className="space-y-6" role="log" aria-live="polite">
      {messages.map((m) =>
        m.role === "user" ? (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
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
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex gap-3"
          >
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-white">
              <ChatLogo showWordmark={false} />
            </span>

            <div className="min-w-0 flex-1">
              {m.pending ? (
                <div className="space-y-2.5 pt-1.5" aria-label="Checking availability">
                  {["w-10/12", "w-8/12", "w-6/12"].map((w, i) => (
                    <motion.div
                      key={w}
                      className={`h-3 rounded-full bg-zinc-100 ${w}`}
                      animate={{ opacity: [0.45, 1, 0.45] }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        delay: i * 0.15,
                      }}
                    />
                  ))}
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    {String(m.content || "")
                      .split("\n")
                      .filter(Boolean)
                      .map(renderLine)}
                  </div>

                  {hasMeaningfulBooking(m.booking) && (
                    <ChatBookingCard
                      booking={m.booking}
                      bookingRef={m.bookingRef}
                      onChange={(patch) => onUpdateBooking(m.id, patch)}
                      onConfirm={() => onConfirmBooking(m.id)}
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