import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowDown, PanelLeftIcon } from "lucide-react";

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
  const scrollRef = useRef(null);
  const contentRef = useRef(null);
  const followLatestRef = useRef(true);
  const scrollIntentRef = useRef(0);
  const [showLatest, setShowLatest] = useState(false);
  const toggleSidebar = useCallback(() => setSidebarOpen((open) => !open), []);

  useEffect(() => {
    const viewport = window.visualViewport;
    let frame;
    const resize = () => {
      if (!containerRef.current) return;
      // Follow Safari's visual viewport when the keyboard pans/resizes it.
      // Preserve normal browser zoom rather than resizing the UI during a pinch.
      if (viewport && Math.abs(viewport.scale - 1) > 0.01) return;
      const mobile = window.innerWidth < 1024;
      containerRef.current.style.setProperty("--ai-viewport-height",
        viewport && mobile ? `${viewport.height}px` : "100dvh");
      containerRef.current.style.setProperty("--ai-viewport-top",
        viewport && mobile ? `${Math.max(0, viewport.offsetTop)}px` : "0px");
    };
    const scheduleResize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(resize);
    };
    resize();
    viewport?.addEventListener("resize", scheduleResize);
    viewport?.addEventListener("scroll", scheduleResize);
    window.addEventListener("resize", scheduleResize);
    return () => {
      cancelAnimationFrame(frame);
      viewport?.removeEventListener("resize", scheduleResize);
      viewport?.removeEventListener("scroll", scheduleResize);
      window.removeEventListener("resize", scheduleResize);
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

  const scrollToLatest = useCallback(() => {
    followLatestRef.current = true;
    scrollIntentRef.current = 0;
    setShowLatest(false);
    const scroll = scrollRef.current;
    if (scroll) scroll.scrollTop = scroll.scrollHeight;
  }, []);

  const handleScroll = () => {
    const scroll = scrollRef.current;
    if (!scroll) return;
    const atBottom = scroll.scrollHeight - scroll.scrollTop - scroll.clientHeight < 80;
    if (atBottom) {
      followLatestRef.current = true;
      setShowLatest(false);
    } else if (!followLatestRef.current || Date.now() - scrollIntentRef.current < 1000) {
      // Resize/scroll anchoring can emit scroll events too. Pause following only
      // when the reader deliberately scrolls, rather than when a reply grows.
      followLatestRef.current = false;
      setShowLatest(true);
    }
  };

  const recordScrollIntent = () => { scrollIntentRef.current = Date.now(); };

  const handleScrollKeyDown = (event) => {
    if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(event.key)) {
      recordScrollIntent();
    }
  };

  useEffect(() => {
    const scroll = scrollRef.current;
    const content = contentRef.current;
    if (!scroll || !content) return;
    // Also follow the latest reply as cards load or the mobile keyboard resizes.
    const observer = new ResizeObserver(() => {
      if (followLatestRef.current) scroll.scrollTop = scroll.scrollHeight;
    });
    observer.observe(scroll);
    observer.observe(content);
    return () => observer.disconnect();
  }, [section]);

  const handleSubmit = () => {
    if (!draft.trim() || isResponding) return;

    followLatestRef.current = true;
    scrollIntentRef.current = 0;
    send(draft);
    setDraft("");
    setSection("home");
  };

  const handlePrompt = (prompt) => {
    followLatestRef.current = true;
    scrollIntentRef.current = 0;
    send(prompt);
    setSection("home");
  };

  const handleNewChat = () => {
    followLatestRef.current = true;
    scrollIntentRef.current = 0;
    setShowLatest(false);
    resetAll();
    setDraft("");
    setSection("home");
    setSidebarOpen(false);
  };

  return (
    <div ref={containerRef} className="fixed inset-x-0 top-[var(--ai-viewport-top,0px)] flex h-[var(--ai-viewport-height,100dvh)] min-h-0 w-full overflow-hidden bg-zinc-100 pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] text-zinc-900">
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

      <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-white lg:my-3 lg:mr-3 lg:rounded-2xl lg:border lg:border-zinc-200">
        <header className="flex shrink-0 items-center justify-between gap-3 border-b border-zinc-100 px-3 pb-2 pt-[max(0.5rem,env(safe-area-inset-top))] sm:px-5 lg:border-0 lg:py-4">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
            aria-expanded={sidebarOpen}
            aria-controls="ai-sidebar"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 lg:invisible"
          >
            <PanelLeftIcon className="h-4 w-4" />
          </button>

          <span className="min-w-0 flex-1 font-semibold lg:hidden">WedaHub AI</span>

          <ChatUserAvatar />
        </header>

        {section === "home" ? (
          <>
            <div className="relative min-h-0 flex-1">
              <div
                ref={scrollRef}
                onScroll={handleScroll}
                onWheel={recordScrollIntent}
                onTouchMove={recordScrollIntent}
                onPointerDown={recordScrollIntent}
                onKeyDown={handleScrollKeyDown}
                tabIndex={0}
                aria-label="Chat messages"
                data-chat-scroll
                className="h-full overflow-x-hidden overflow-y-auto overscroll-contain px-3 outline-offset-[-2px] sm:px-6 lg:px-8"
              >
                <div
                  ref={contentRef}
                  className={`mx-auto w-full max-w-[640px] ${
                    hasChat
                      ? "py-4 sm:py-6"
                      : "flex min-h-full flex-col justify-center py-8 sm:py-12"
                  }`}
                >
                  {hasChat ? (
                    <ChatMessages
                      messages={messages}
                      onUpdateBooking={updateBooking}
                    />
                  ) : (
                    <ChatWelcome />
                  )}
                </div>
              </div>
              {hasChat && showLatest && (
                <button
                  type="button"
                  onClick={scrollToLatest}
                  aria-label="Scroll to latest messages"
                  className="absolute bottom-3 left-1/2 inline-flex min-h-11 -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-700 shadow-lg hover:bg-zinc-50"
                >
                  <ArrowDown className="h-4 w-4" />
                  Latest messages
                </button>
              )}
            </div>

            <div className="shrink-0 bg-white px-3 pt-2 sm:px-6 lg:px-8">
              <div className="mx-auto w-full max-w-[640px] pb-[max(0.5rem,env(safe-area-inset-bottom))]">
                <ChatComposer
                  value={draft}
                  onChange={setDraft}
                  onSubmit={handleSubmit}
                  disabled={isResponding}
                />

                <p className="px-1 pt-2 text-center text-[10px] leading-4 text-zinc-400 sm:text-[11px]">
                  Prices are estimates. Final quote is confirmed by your provider on site.
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain px-3 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6 sm:pt-6">
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
