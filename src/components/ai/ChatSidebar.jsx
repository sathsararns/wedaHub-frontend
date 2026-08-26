import React from "react";
import {
  CalendarCheckIcon,
  HouseIcon,
  PanelLeftIcon,
  PlusIcon,
  WrenchIcon,
} from "lucide-react";

import ChatLogo from "./ChatLogo";
import BackToSiteButton from "./BackToSiteButton";

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
    label: "My Bookings",
    Icon: CalendarCheckIcon,
  },
];

export default function ChatSidebar({
  active,
  onNavigate,
  onNewChat,
  isOpen,
  onToggle,
  bookings = [],
}) {
  const upcoming = bookings.filter(
    (booking) => booking.status === "Upcoming"
  );

  const handleNewBooking = () => {
    onNewChat();

    if (isOpen) {
      onToggle();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 md:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[248px] shrink-0 flex-col bg-zinc-100 px-4 py-5 transition-transform duration-300 md:static md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between">
          <ChatLogo />

          <button
            type="button"
            onClick={onToggle}
            className="rounded-lg p-2 hover:bg-zinc-200 md:hidden"
          >
            <PanelLeftIcon className="h-5 w-5" />
          </button>
        </div>

        {/* New Booking */}
        <button
          type="button"
          onClick={handleNewBooking}
          className="mt-6 flex items-center justify-center gap-2 rounded-full bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800"
        >
          <PlusIcon className="h-4 w-4" />
          New Booking
        </button>

        {/* Navigation */}
        <nav className="mt-6 space-y-1">
          {NAV.map(({ key, label, Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => {
                onNavigate(key);

                if (isOpen) {
                  onToggle();
                }
              }}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all ${
                active === key
                  ? "bg-zinc-200 font-semibold text-zinc-900"
                  : "text-zinc-600 hover:bg-zinc-200"
              }`}
            >
              <Icon className="h-4 w-4" />

              <span className="flex-1">{label}</span>

              {key === "bookings" && upcoming.length > 0 && (
                <span className="rounded-full bg-zinc-900 px-2 py-0.5 text-xs text-white">
                  {upcoming.length}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div className="mt-auto">
          <BackToSiteButton />
        </div>
      </aside>
    </>
  );
}