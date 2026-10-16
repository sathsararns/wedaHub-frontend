import { useCallback } from "react";
import {
  CalendarCheckIcon,
  HouseIcon,
  PanelLeftIcon,
  PlusIcon,
  WrenchIcon,
} from "lucide-react";

import ChatLogo from "./ChatLogo";
import BackToSiteButton from "./BackToSiteButton";
import useMobileDrawer from "../../hooks/useMobileDrawer.js";

const NAV = [
  {
    key: "home",
    label: "Home",
    Icon: HouseIcon,
  },
  {
    key: "services",
    label: "Services",
    Icon: WrenchIcon,
  },
  {
    key: "bookings",
    label: "My bookings",
    Icon: CalendarCheckIcon,
  },
];

export default function ChatSidebar({
  active,
  onNavigate,
  onNewChat,
  isOpen,
  onToggle,
}) {
  const close = useCallback(() => {
    if (isOpen) onToggle();
  }, [isOpen, onToggle]);
  const drawerRef = useMobileDrawer(isOpen, close, 1024);

  return (
    <>
      {isOpen && (
        <button
          type="button"
          tabIndex={-1}
          aria-label="Close AI menu"
          className="fixed inset-0 z-30 bg-black/30 lg:hidden"
          onClick={onToggle}
        />
      )}

      <aside
        id="ai-sidebar"
        ref={drawerRef}
        data-mobile-drawer
        tabIndex={-1}
        role={isOpen ? "dialog" : undefined}
        aria-modal={isOpen || undefined}
        className={`fixed left-0 top-[var(--ai-viewport-top,0px)] z-40 flex h-[var(--ai-viewport-height,100dvh)] w-[280px] max-w-[85vw] shrink-0 flex-col overflow-y-auto overscroll-contain bg-[#EBF3FF] pl-[max(1rem,env(safe-area-inset-left))] pr-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-4 transition-transform duration-300 lg:static lg:h-full lg:w-[248px] lg:visible lg:translate-x-0 ${
          isOpen ? "visible translate-x-0" : "invisible -translate-x-full"
        }`}
        aria-label="AI assistant sidebar"
      >
        <div className="flex items-center justify-between">
          <ChatLogo />

          <button
            type="button"
            onClick={onToggle}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg hover:bg-zinc-200 lg:hidden"
            aria-label="Close sidebar"
          >
            <PanelLeftIcon className="h-5 w-5" />
          </button>
        </div>

        <button
          type="button"
          onClick={onNewChat}
          className="mt-4 flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 lg:mt-6"
        >
          <PlusIcon className="h-4 w-4" />
          New booking
        </button>

        <nav className="mt-4 space-y-1 lg:mt-6" aria-label="AI assistant navigation">
          {NAV.map(({ key, label, Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => onNavigate(key)}
              aria-current={active === key ? "page" : undefined}
              className={`flex min-h-11 w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition ${
                active === key
                  ? "bg-zinc-200 font-semibold text-zinc-900"
                  : "text-zinc-600 hover:bg-zinc-200"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="flex-1">{label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 pb-[env(safe-area-inset-bottom)]">
          <BackToSiteButton />
        </div>
      </aside>
    </>
  );
}
