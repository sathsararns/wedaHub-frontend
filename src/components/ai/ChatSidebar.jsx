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
  const drawerRef = useMobileDrawer(isOpen, close, 768);

  return (
    <>
      {isOpen && (
        <button
          type="button"
          tabIndex={-1}
          aria-label="Close AI menu"
          className="fixed inset-0 z-30 bg-black/30 md:hidden"
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
        className={`fixed inset-y-0 left-0 z-40 flex h-dvh w-[248px] max-w-[85vw] shrink-0 flex-col overflow-y-auto bg-[#EBF3FF] px-4 py-5 transition-transform duration-300 md:static md:h-full md:visible md:translate-x-0 ${
          isOpen ? "visible translate-x-0" : "invisible -translate-x-full"
        }`}
        aria-label="AI assistant sidebar"
      >
        <div className="flex items-center justify-between">
          <ChatLogo />

          <button
            type="button"
            onClick={onToggle}
            className="flex h-11 w-11 items-center justify-center rounded-lg hover:bg-zinc-200 md:hidden"
            aria-label="Close sidebar"
          >
            <PanelLeftIcon className="h-5 w-5" />
          </button>
        </div>

        <button
          type="button"
          onClick={onNewChat}
          className="mt-6 flex items-center justify-center gap-2 rounded-full bg-zinc-900 px-4 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-zinc-800"
        >
          <PlusIcon className="h-4 w-4" />
          New booking
        </button>

        <nav className="mt-6 space-y-1">
          {NAV.map(({ key, label, Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => onNavigate(key)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition ${
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
