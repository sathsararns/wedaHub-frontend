import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

import api from "../utils/api";
import { getProviderBookings } from "../services/bookingService";

import DashboardHeader from "../components/providerDashboard/DashboardHeader";
import StatsCards from "../components/providerDashboard/StatsCards";
import QuickActions from "../components/providerDashboard/QuickActions";
import RecentBookings from "../components/providerDashboard/RecentBookings";
import LatestReviews from "../components/providerDashboard/LatestReviews";

export default function ProviderDashboardPage() {
  const navigate = useNavigate();

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
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-xl font-semibold">
          Loading Dashboard...
        </h2>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-5">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 font-medium"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <DashboardHeader provider={provider} />

        <StatsCards bookings={bookings} />

        <QuickActions />

        <RecentBookings bookings={bookings} />

        <LatestReviews />

      </div>
    </section>
  );
}