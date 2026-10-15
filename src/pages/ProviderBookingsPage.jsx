import { useEffect, useMemo, useState } from "react";
import { CalendarX, Inbox } from "lucide-react";
import toast from "react-hot-toast";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

import { getProviderBookings } from "../services/bookingService";
import BackButton from "../components/common/BackButton";
import BookingRequestCard from "../components/providerBookings/BookingRequestCard";
import socket from "../lib/socket";

const cardVariants = {
  // Cards that are already on screen when the list re-renders just hold still —
  // this "hidden" state is only ever seen by a card mounting for the first
  // time, which in practice means a genuinely new booking just arrived.
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    boxShadow: [
      "0 0 0 4px rgba(251,191,36,0.45)",
      "0 0 0 0px rgba(251,191,36,0)",
    ],
    transition: { duration: 0.4, ease: "easeOut", boxShadow: { duration: 1.8, ease: "easeOut" } },
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

function BookingCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-sm ring-1 ring-black/5 p-5 sm:p-6 animate-pulse">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-gray-100" />
          <div className="space-y-2">
            <div className="h-4 w-32 bg-gray-100 rounded" />
            <div className="h-3 w-40 bg-gray-100 rounded" />
          </div>
        </div>
        <div className="h-7 w-20 bg-gray-100 rounded-full" />
      </div>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-8 bg-gray-100 rounded" />
        ))}
      </div>

      <div className="mt-5 h-9 w-40 bg-gray-100 rounded-lg" />
    </div>
  );
}

export default function ProviderBookingsPage() {
  const shouldReduceMotion = useReducedMotion();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  async function loadBookings() {
    try {
      setLoading(true);

      const data = await getProviderBookings();

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

  const emptyMessages = {
    all: {
      title: "No Booking Requests",
      subtitle: "New customer bookings will appear here.",
      icon: Inbox,
    },
    pending: {
      title: "No Pending Requests",
      subtitle: "You're all caught up — new requests will show up here.",
      icon: CalendarX,
    },
    accepted: {
      title: "No Accepted Bookings",
      subtitle: "Bookings you accept will appear here.",
      icon: CalendarX,
    },
    completed: {
      title: "No Completed Bookings",
      subtitle: "Finished jobs will be listed here.",
      icon: CalendarX,
    },
    rejected: {
      title: "No Rejected Bookings",
      subtitle: "Bookings you decline will be listed here.",
      icon: CalendarX,
    },
  };

  return (
    <section className="min-h-screen bg-gray-50 py-8 sm:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-5">
        <BackButton className="mb-5 sm:mb-6" />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mb-6 sm:mb-8"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Incoming Bookings
          </h1>
          <p className="text-gray-500 mt-1 text-sm sm:text-base">
            Review and respond to your service requests
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1 -mx-1 px-1">
          {FILTERS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition ${
                filter === key
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-white text-gray-600 ring-1 ring-black/5 hover:bg-gray-50"
              }`}
            >
              {label}
              <span
                className={`inline-flex items-center justify-center min-w-5 h-5 px-1 rounded-full text-xs ${
                  filter === key ? "bg-white/20" : "bg-gray-100 text-gray-500"
                }`}
              >
                {counts[key]}
              </span>
            </button>
          ))}
        </div>

        {loading ? (
          <div className="space-y-5 sm:space-y-6">
            <BookingCardSkeleton />
            <BookingCardSkeleton />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {filteredBookings.length === 0 ? (
              <motion.div
                key={`empty-${filter}`}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-2xl shadow-sm ring-1 ring-black/5 p-10 sm:p-14 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-4">
                  {(() => {
                    const Icon = emptyMessages[filter].icon;
                    return <Icon size={26} className="text-gray-300" />;
                  })()}
                </div>

                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
                  {emptyMessages[filter].title}
                </h2>

                <p className="text-gray-500 mt-2 text-sm sm:text-base">
                  {emptyMessages[filter].subtitle}
                </p>
              </motion.div>
            ) : (
              <motion.div key={`list-${filter}`} layout className="space-y-5 sm:space-y-6">
                <AnimatePresence mode="popLayout">
                  {filteredBookings.map((booking) => (
                    <motion.div
                      key={booking._id}
                      layout
                      variants={cardVariants}
                      initial={shouldReduceMotion ? false : "hidden"}
                      animate="visible"
                      exit="exit"
                      className="rounded-2xl"
                    >
                      <BookingRequestCard
                        booking={booking}
                        onStatusChanged={loadBookings}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
