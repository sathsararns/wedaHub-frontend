import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { motion, useReducedMotion } from "framer-motion";

import api from "../utils/api";
import { getProviderBookings } from "../services/bookingService";

import BackButton from "../components/common/BackButton";
import DashboardHeader from "../components/providerDashboard/DashboardHeader";
import StatsCards from "../components/providerDashboard/StatsCards";
import QuickActions from "../components/providerDashboard/QuickActions";
import RecentBookings from "../components/providerDashboard/RecentBookings";
import LatestReviews from "../components/providerDashboard/LatestReviews";
import WorkGalleryPreview from "../components/providerDashboard/WorkGalleryPreview";

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const riseItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function ProviderDashboardPage() {
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

  const pendingCount = bookings.filter((b) => b.status === "pending").length;

  return (
    <section className="min-h-screen bg-gray-50 py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-5">

        <BackButton className="mb-5 sm:mb-6" />

        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          <motion.div variants={riseItem}>
            <DashboardHeader provider={provider} />
          </motion.div>

          <motion.div variants={riseItem}>
            <StatsCards bookings={bookings} provider={provider} />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Main column */}
            <div className="lg:col-span-2 flex flex-col gap-6 sm:gap-8">
              <motion.div variants={riseItem}>
                <RecentBookings bookings={bookings} />
              </motion.div>

              <motion.div variants={riseItem}>
                <LatestReviews providerId={provider?._id} />
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-6 sm:gap-8">
              <motion.div variants={riseItem}>
                <QuickActions
                  pendingCount={pendingCount}
                  providerId={provider?._id}
                />
              </motion.div>

              <motion.div variants={riseItem}>
                <WorkGalleryPreview images={provider?.workImages} />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}