import React, { useState } from "react";
import { PanelLeftIcon } from "lucide-react";

import ChatSidebar from "../components/ai/ChatSidebar";
import ChatUserAvatar from "../components/ai/ChatUserAvatar";
import ChatWelcome from "../components/ai/ChatWelcome";
import ChatMessages from "../components/ai/ChatMessages";
import ChatComposer from "../components/ai/ChatComposer";
import ChatServicesPanel from "../components/ai/ChatServicesPanel";
import ChatBookingsPanel from "../components/ai/ChatBookingsPanel";

import { useAIChat } from "../hooks/useAIChat";

export default function AIChatPage() {
  const [section, setSection] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [draft, setDraft] = useState("");

  const {
    messages,
    isResponding,
    send,
    updateBooking,
    confirmBooking,
    reset,
  } = useAIChat();

  const hasChat = messages.length > 0;

  const handleSubmit = () => {
    if (!draft.trim() || isResponding) return;

    send(draft);
    setDraft("");
    setSection("home");
  };

  const handlePrompt = (prompt) => {
    send(prompt);
    setSection("home");
  };

  const handleNewChat = () => {
    reset();
    setDraft("");
    setSection("home");
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen w-full bg-zinc-100 text-zinc-900">
      <ChatSidebar
        active={section}
        onNavigate={(key) => {
          setSection(key);
          setSidebarOpen(false);
        }}
        onNewChat={handleNewChat}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen((o) => !o)}
      />

      <main className="flex min-w-0 flex-1 flex-col overflow-hidden bg-white md:my-3 md:mr-3 md:rounded-2xl md:border md:border-zinc-200">
        {/* Header */}
        <header className="flex shrink-0 items-center justify-between px-5 py-4">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
            className="rounded-md p-1 text-zinc-500 transition hover:text-zinc-900 md:invisible"
          >
            <PanelLeftIcon className="h-4 w-4" />
          </button>

          <ChatUserAvatar />
        </header>

        {section === "home" ? (
          <>
            <div className="min-h-0 flex-1 overflow-y-auto px-5 sm:px-8">
              <div
                className={`mx-auto w-full max-w-[640px] ${
                  hasChat
                    ? "py-6"
                    : "flex min-h-full flex-col justify-center py-10"
                }`}
              >
                {hasChat ? (
                  <ChatMessages
                    messages={messages}
                    onUpdateBooking={updateBooking}
                    onConfirmBooking={confirmBooking}
                  />
                ) : (
                  <>
                    <ChatWelcome onSelectSuggestion={handlePrompt} />

                    <div className="mt-7">
                      <ChatComposer
                        value={draft}
                        onChange={setDraft}
                        onSubmit={handleSubmit}
                        disabled={isResponding}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
                        <div className="shrink-0 bg-white px-5 sm:px-8">
              <div className="mx-auto w-full max-w-[640px] pb-3">
                {hasChat && (
                  <ChatComposer
                    value={draft}
                    onChange={setDraft}
                    onSubmit={handleSubmit}
                    disabled={isResponding}
                    compact
                  />
                )}

                <p className="pt-3 text-center text-[11px] text-zinc-400">
                  Prices are estimates. Final quote is confirmed by your
                  provider on site.
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6">
            <div
              className={`mx-auto w-full ${
                section === "services"
                  ? "max-w-7xl"
                  : "max-w-5xl"
              }`}
            >
              {section === "services" ? (
                <ChatServicesPanel onBook={handlePrompt} />
              ) : (
                <ChatBookingsPanel />
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}