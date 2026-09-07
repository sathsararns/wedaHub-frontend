import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { motion, useReducedMotion } from "framer-motion";

import api from "../utils/api";
import { getProviderBookings } from "../services/bookingService";

import DashboardHeader from "../components/providerDashboard/DashboardHeader";
import StatsCards from "../components/providerDashboard/StatsCards";
import QuickActions from "../components/providerDashboard/QuickActions";
import RecentBookings from "../components/providerDashboard/RecentBookings";
import LatestReviews from "../components/providerDashboard/LatestReviews";

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const riseItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function ProviderDashboardPage() {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  const [provider, setProvider] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      setLoading(true);

      // Provider Profile
      const profileRes = await api.get("/users/profile");
      setProvider(profileRes.data);

      // Provider Bookings
      const bookingData = await getProviderBookings();
      setBookings(bookingData);

    } catch (err) {
      console.log(err);
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center px-4">
        <motion.h2
          className="text-lg sm:text-xl font-semibold text-center"
          animate={shouldReduceMotion ? undefined : { opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        >
          Loading Dashboard...
        </motion.h2>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-100 py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-5">

        {/* Back Button */}
        <motion.button
          onClick={() => navigate(-1)}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          whileHover={shouldReduceMotion ? undefined : { x: -4 }}
          whileTap={{ scale: 0.96 }}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-5 sm:mb-6 font-medium"
        >
          <ArrowLeft size={20} />
          Back
        </motion.button>

        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          <motion.div variants={riseItem}>
            <DashboardHeader provider={provider} />
          </motion.div>

          <motion.div variants={riseItem}>
            <StatsCards bookings={bookings} />
          </motion.div>

          <motion.div variants={riseItem}>
            <QuickActions />
          </motion.div>

          <motion.div variants={riseItem}>
            <RecentBookings bookings={bookings} />
          </motion.div>

          <motion.div variants={riseItem}>
            <LatestReviews />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}