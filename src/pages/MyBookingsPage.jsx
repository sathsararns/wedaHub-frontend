import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CalendarClock,
  CalendarX,
  CheckCircle2,
  Clock,
  Trophy,
} from "lucide-react";
import toast from "react-hot-toast";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

import { getCustomerBookings } from "../services/bookingService";
import BookingCard from "../components/bookings/BookingCard";
import socket from "../lib/socket";

const cardVariants = {
  // A card only ever sees "hidden" when it mounts for the first time —
  // in this list that means a genuinely new or newly-updated booking.
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    boxShadow: [
      "0 0 0 4px rgba(59,130,246,0.35)",
      "0 0 0 0px rgba(59,130,246,0)",
    ],
    transition: { duration: 0.4, ease: "easeOut", boxShadow: { duration: 1.6, ease: "easeOut" } },
  },
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.2, ease: "easeIn" } },
};

const FILTERS = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "accepted", label: "Accepted" },
  { key: "completed", label: "Completed" },
  { key: "rejected", label: "Rejected" },
];

const EMPTY_MESSAGES = {
  all: {
    title: "No Bookings Yet",
    subtitle: "Your bookings will appear here once you book a service.",
  },
  pending: {
    title: "No Pending Bookings",
    subtitle: "Requests waiting on a provider's response will show up here.",
  },
  accepted: {
    title: "No Accepted Bookings",
    subtitle: "Bookings a provider has accepted will show up here.",
  },
  completed: {
    title: "No Completed Bookings",
    subtitle: "Finished services will be listed here.",
  },
  rejected: {
    title: "No Rejected Bookings",
    subtitle: "Bookings a provider declined will be listed here.",
  },
};

function BookingCardSkeleton() {
  return (
    <div className="rounded-3xl bg-white p-5 shadow-[0_20px_45px_-25px_rgba(91,52,196,0.35)] sm:p-6 animate-pulse">
      <div className="flex flex-col gap-5 sm:flex-row">
        <div className="h-20 w-20 shrink-0 self-center rounded-full bg-gray-100 sm:self-start" />

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-2">
              <div className="h-4 w-36 rounded bg-gray-100" />
              <div className="h-3 w-24 rounded bg-gray-100" />
            </div>
            <div className="h-6 w-20 rounded-full bg-gray-100" />
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-8 rounded bg-gray-100" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MyBookingsPage() {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  async function loadBookings() {
    try {
      const data = await getCustomerBookings();
      setBookings(data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBookings();

    socket.on("booking-status-updated", () => {
      loadBookings();
    });

    socket.on("new-booking", () => {
      loadBookings();
    });

    return () => {
      socket.off("booking-status-updated");
      socket.off("new-booking");
    };
  }, []);

  const counts = useMemo(
    () => ({
      all: bookings.length,
      pending: bookings.filter((b) => b.status === "pending").length,
      accepted: bookings.filter((b) => b.status === "accepted").length,
      completed: bookings.filter((b) => b.status === "completed").length,
      rejected: bookings.filter((b) => b.status === "rejected").length,
    }),
    [bookings]
  );

  const filteredBookings = useMemo(
    () =>
      filter === "all" ? bookings : bookings.filter((b) => b.status === filter),
    [bookings, filter]
  );

  const statCards = [
    { key: "all", label: "Total Bookings", icon: CalendarClock, color: "text-indigo-600 bg-indigo-50" },
    { key: "pending", label: "Pending", icon: Clock, color: "text-yellow-600 bg-yellow-50" },
    { key: "accepted", label: "Accepted", icon: CheckCircle2, color: "text-blue-600 bg-blue-50" },
    { key: "completed", label: "Completed", icon: Trophy, color: "text-green-600 bg-green-50" },
  ];

  if (loading) {
    return (
      <section className="min-h-screen bg-[#EAF0FE] py-8 sm:py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="mb-6 h-6 w-40 animate-pulse rounded bg-white/60" />
          <div className="space-y-5">
            <BookingCardSkeleton />
            <BookingCardSkeleton />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#EAF0FE] py-8 sm:py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">

        {/* Back Button */}
        <motion.button
          onClick={() => navigate(-1)}
          aria-label="Go back"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          whileTap={{ scale: 0.94 }}
          className="group mb-6 flex h-11 w-11 items-center justify-center rounded-full bg-white text-blue-600 shadow-md ring-1 ring-black/5 transition-all hover:w-28 hover:justify-start hover:gap-2 hover:px-4 hover:shadow-lg"
        >
          <ArrowLeft size={20} className="shrink-0 transition-transform group-hover:-translate-x-0.5" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all group-hover:max-w-[4rem] group-hover:opacity-100">
            Back
          </span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
            My Bookings
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Track and manage all your service bookings.
          </p>
        </motion.div>

        {/* Summary */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {statCards.map(({ key, label, icon: Icon, color }) => (
            <div
              key={key}
              className="rounded-2xl bg-white p-4 shadow-[0_20px_45px_-25px_rgba(91,52,196,0.35)]"
            >
              <div className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${color}`}>
                <Icon size={18} />
              </div>
              <h2 className="mt-3 text-2xl font-bold text-gray-900">{counts[key]}</h2>
              <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">{label}</p>
            </div>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          {FILTERS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition ${
                filter === key
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-white text-gray-600 shadow-sm hover:bg-gray-50"
              }`}
            >
              {label}
              <span
                className={`inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs ${
                  filter === key ? "bg-white/20" : "bg-gray-100 text-gray-500"
                }`}
              >
                {counts[key]}
              </span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {filteredBookings.length === 0 ? (
            <motion.div
              key={`empty-${filter}`}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              className="rounded-3xl bg-white p-8 sm:p-14 text-center shadow-[0_20px_45px_-25px_rgba(91,52,196,0.35)]"
            >
              <CalendarX className="mx-auto h-12 w-12 text-gray-300" />
              <h2 className="mt-4 text-xl font-semibold text-gray-800">
                {EMPTY_MESSAGES[filter].title}
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                {EMPTY_MESSAGES[filter].subtitle}
              </p>
            </motion.div>
          ) : (
            <motion.div key={`list-${filter}`} layout className="space-y-5">
              <AnimatePresence mode="popLayout">
                {filteredBookings.map((booking) => (
                  <motion.div
                    key={booking._id}
                    layout
                    variants={cardVariants}
                    initial={shouldReduceMotion ? false : "hidden"}
                    animate="visible"
                    exit="exit"
                    className="rounded-3xl"
                  >
                    <BookingCard booking={booking} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
