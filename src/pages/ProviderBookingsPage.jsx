import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

import { getProviderBookings } from "../services/bookingService";
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

export default function ProviderBookingsPage() {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center px-4">
        <motion.h2
          className="text-lg sm:text-xl font-semibold text-center"
          animate={shouldReduceMotion ? undefined : { opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        >
          Loading Bookings...
        </motion.h2>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-100 py-8 sm:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-5">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate(-1)}
          whileHover={shouldReduceMotion ? undefined : { x: -4 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-5 sm:mb-6 transition"
        >
          <ArrowLeft size={20} />
          Back
        </motion.button>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8"
        >
          Incoming Bookings
        </motion.h1>

        <AnimatePresence mode="wait">
          {bookings.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-xl shadow p-8 sm:p-10 text-center"
            >
              <h2 className="text-xl sm:text-2xl font-semibold">
                No Booking Requests
              </h2>

              <p className="text-gray-500 mt-2 text-sm sm:text-base">
                New customer bookings will appear here.
              </p>
            </motion.div>
          ) : (
            <motion.div key="list" layout className="space-y-5 sm:space-y-6">
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
      </div>
    </section>
  );
}