import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  MessageSquare,
  Star,
  Briefcase,
  MapPin,
  ClipboardList,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

import defaultAvatar from "../assets/images/avatar.png";
import { createBooking } from "../services/bookingService";

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const riseItem = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  const [provider, setProvider] = useState(null);
  const [bookingDate, setBookingDate] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProvider();
  }, []);

  async function loadProvider() {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/users/provider/${id}`
      );

      console.log("📦 Provider Data:", res.data);
      console.log("🔍 Category:", res.data.category);

      setProvider(res.data);
    } catch (err) {
      console.log("❌ Error:", err);
      toast.error("Provider not found");
    }
  }

  async function handleBooking() {
    if (!bookingDate) {
      toast.error("Please select booking date");
      return;
    }

    try {
      setLoading(true);

      const bookingData = {
        providerId: id,
        serviceName: provider.category,
        description: specialInstructions,
        date: bookingDate,
        location: provider.city, // Changed from provider.location to provider.city
      };

      console.log("📝 Booking Data:", bookingData);

      await createBooking(bookingData);

      toast.success("Booking submitted successfully");
      navigate("/my-bookings");
    } catch (err) {
      console.log("❌ Booking Error:", err);
      console.log("❌ Response:", err.response?.data);

      toast.error(err.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  }

  if (!provider) {
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

  const avatar =
    provider.image && !provider.image.includes("default-profile")
      ? provider.image
      : defaultAvatar;

  const fieldFocus = shouldReduceMotion ? undefined : { scale: 1.01 };

  return (
    <section className="min-h-screen bg-[#EAF0FE] py-8 sm:py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">

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
          className="rounded-3xl bg-white p-6 shadow-[0_20px_45px_-25px_rgba(91,52,196,0.35)] sm:p-8"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={riseItem}>
            <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
              Book Service
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Fill in the details below to confirm your booking.
            </p>
          </motion.div>

          {/* Provider */}
          <motion.div
            variants={riseItem}
            className="mt-6 flex items-center gap-5 rounded-2xl bg-gray-50 p-4"
          >
            <img
              src={avatar}
              alt={`${provider.firstName} ${provider.lastName}`}
              className="h-20 w-20 shrink-0 rounded-full object-cover ring-4 ring-blue-100"
            />

            <div className="min-w-0">
              <h2 className="truncate text-lg font-bold text-gray-900 sm:text-xl">
                {provider.firstName} {provider.lastName}
              </h2>

              <div className="mt-1 flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-semibold text-gray-700">
                  {(provider.rating || 0).toFixed(1)}
                </span>
              </div>

              <div className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                <Briefcase className="h-3.5 w-3.5" />
                <span>{provider.category || "No category"}</span>
              </div>
            </div>
          </motion.div>

          {/* Date */}
          <motion.div variants={riseItem} className="mt-6">
            <label className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-gray-700">
              <Calendar className="h-4 w-4 text-blue-600" />
              Booking Date
            </label>

            <motion.input
              type="date"
              value={bookingDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setBookingDate(e.target.value)}
              whileFocus={fieldFocus}
              transition={{ duration: 0.15 }}
              className="w-full rounded-xl border border-gray-200 p-3.5 text-sm text-gray-700 transition-colors focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </motion.div>

          {/* Instructions */}
          <motion.div variants={riseItem} className="mt-5">
            <label className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-gray-700">
              <MessageSquare className="h-4 w-4 text-blue-600" />
              Special Instructions
            </label>

            <motion.textarea
              rows="5"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="Write anything provider should know..."
              whileFocus={fieldFocus}
              transition={{ duration: 0.15 }}
              className="w-full resize-none rounded-xl border border-gray-200 p-3.5 text-sm text-gray-700 placeholder:text-gray-400 transition-colors focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </motion.div>

          {/* Summary */}
          <motion.div variants={riseItem} className="mt-6 rounded-2xl bg-blue-50 p-6">
            <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900">
              <ClipboardList className="h-5 w-5 text-blue-600" />
              Booking Summary
            </h2>

            <dl className="mt-4 space-y-2.5 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-gray-500">Provider</dt>
                <dd className="font-semibold text-gray-800">
                  {provider.firstName} {provider.lastName}
                </dd>
              </div>

              <div className="flex justify-between gap-4">
                <dt className="text-gray-500">Service</dt>
                <dd className="font-semibold text-gray-800">
                  {provider.category || "-"}
                </dd>
              </div>

              {/* Date reflects live form state, so it gets its own small
                  swap animation whenever the picked date changes */}
              <div className="flex justify-between gap-4">
                <dt className="text-gray-500">Date</dt>
                <dd className="font-semibold text-gray-800 overflow-hidden">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={bookingDate || "empty"}
                      initial={shouldReduceMotion ? false : { opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="inline-block"
                    >
                      {bookingDate || "-"}
                    </motion.span>
                  </AnimatePresence>
                </dd>
              </div>

              <div className="flex justify-between gap-4">
                <dt className="flex items-center gap-1 text-gray-500">
                  <MapPin className="h-3.5 w-3.5" />
                  City
                </dt>
                <dd className="text-right font-semibold text-gray-800">
                  {provider.city || "City not specified"} {/* Changed from provider.location to provider.city */}
                </dd>
              </div>
            </dl>
          </motion.div>

          <motion.button
            variants={riseItem}
            onClick={handleBooking}
            disabled={loading}
            whileHover={shouldReduceMotion || loading ? undefined : { scale: 1.01 }}
            whileTap={loading ? undefined : { scale: 0.98 }}
            className="mt-8 w-full rounded-xl bg-blue-600 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-600/20 transition-colors hover:bg-blue-700 hover:shadow-xl disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={loading ? "loading" : "idle"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="inline-block"
              >
                {loading ? "Booking..." : "Confirm Booking"}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}