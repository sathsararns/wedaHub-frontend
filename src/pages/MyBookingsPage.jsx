import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CalendarX } from "lucide-react";
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

export default function MyBookingsPage() {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadBookings() {
    try {
      const data = await getCustomerBookings();
      console.log("📦 Bookings Data:", data);

      // Log city data for each booking
      data.forEach((booking, index) => {
        console.log(`📝 Booking ${index + 1}:`);
        console.log(`  - Provider:`, booking.providerId);
        console.log(`  - Provider City:`, booking.providerId?.city);
        console.log(`  - Provider Location:`, booking.providerId?.location);
        console.log(`  - Booking City:`, booking.city);
        console.log(`  - Booking Location:`, booking.location);
      });

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

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#EAF0FE] px-4">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
          <motion.h2
            className="mt-4 text-lg sm:text-xl font-semibold text-gray-700"
            animate={shouldReduceMotion ? undefined : { opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            Loading...
          </motion.h2>
        </div>
      </div>
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
          className="mb-6 flex items-center justify-between"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
        >
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
              My Bookings
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Track and manage all your service bookings.
            </p>
          </div>
          <AnimatePresence>
            {bookings.length > 0 && (
              <motion.span
                key={bookings.length}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="hidden rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-blue-600 shadow-sm sm:inline-block"
              >
                {bookings.length} total
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence mode="wait">
          {bookings.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              className="rounded-3xl bg-white p-8 sm:p-14 text-center shadow-[0_20px_45px_-25px_rgba(91,52,196,0.35)]"
            >
              <CalendarX className="mx-auto h-12 w-12 text-gray-300" />
              <h2 className="mt-4 text-xl font-semibold text-gray-800">
                No Bookings Yet
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Your bookings will appear here once you book a service.
              </p>
            </motion.div>
          ) : (
            <motion.div key="list" layout className="space-y-5">
              <AnimatePresence mode="popLayout">
                {bookings.map((booking) => (
                  <motion.div
                    key={booking._id}
                    layout
                    variants={cardVariants}
                    initial={shouldReduceMotion ? false : "hidden"}
                    animate="visible"
                    exit="exit"
                    className="rounded-xl"
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