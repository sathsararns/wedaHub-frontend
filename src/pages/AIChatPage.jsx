import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
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
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedSection = searchParams.get("section");
  const section = ["home", "services", "bookings"].includes(requestedSection) ? requestedSection : "home";
  const setSection = (value) => setSearchParams((current) => {
    const next = new URLSearchParams(current);
    if (value === "home") next.delete("section");
    else next.set("section", value);
    return next;
  }, { replace: true });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const containerRef = useRef(null);
  const toggleSidebar = useCallback(() => setSidebarOpen((open) => !open), []);

  useEffect(() => {
    const viewport = window.visualViewport;
    const resize = () => {
      if (!containerRef.current) return;
      containerRef.current.style.height = viewport && window.innerWidth < 768
        ? `${viewport.height}px`
        : "";
    };
    resize();
    viewport?.addEventListener("resize", resize);
    window.addEventListener("resize", resize);
    return () => {
      viewport?.removeEventListener("resize", resize);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const {
    messages,
    isResponding,
    send,
    updateBooking,
    resetAll,
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
    resetAll();
    setDraft("");
    setSection("home");
    setSidebarOpen(false);
  };

  return (
    <div ref={containerRef} className="flex h-dvh min-h-0 w-full overflow-hidden bg-zinc-100 text-zinc-900">
      <ChatSidebar
        active={section}
        onNavigate={(key) => {
          setSection(key);
          setSidebarOpen(false);
        }}
        onNewChat={handleNewChat}
        isOpen={sidebarOpen}
        onToggle={toggleSidebar}
      />

      <main className="flex min-w-0 flex-1 flex-col overflow-hidden bg-white md:my-3 md:mr-3 md:rounded-2xl md:border md:border-zinc-200">
        <header className="flex shrink-0 items-center justify-between gap-3 px-3 py-2 sm:px-5 sm:py-4">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
            aria-expanded={sidebarOpen}
            aria-controls="ai-sidebar"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-zinc-500 transition hover:text-zinc-900 md:invisible"
          >
            <PanelLeftIcon className="h-4 w-4" />
          </button>

          <span className="min-w-0 flex-1 font-semibold md:hidden">WedaHub AI</span>

          <ChatUserAvatar />
        </header>

        {section === "home" ? (
          <>
            <div className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain px-4 sm:px-8">
              <div
                className={`mx-auto w-full max-w-[640px] ${
                  hasChat
                    ? "py-6"
                    : "flex min-h-full flex-col justify-center py-6 sm:py-10"
                }`}
              >
                {hasChat ? (
                  <ChatMessages
                    messages={messages}
                    onUpdateBooking={updateBooking}
                  />
                ) : (
                  <>
                    <ChatWelcome />

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

            <div className="shrink-0 bg-white px-4 sm:px-8">
              <div className="mx-auto w-full max-w-[640px] pb-[max(0.75rem,env(safe-area-inset-bottom))]">
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
                  Prices are estimates. Final quote is confirmed by your provider on site.
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain px-4 py-4 sm:px-6 sm:py-6">
            <div
              className={`mx-auto w-full ${
                section === "services" ? "max-w-3xl" : "max-w-5xl"
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
