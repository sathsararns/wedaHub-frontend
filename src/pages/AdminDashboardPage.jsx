import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import DashboardHeader from "../components/adminDashboard/DashboardHeader";
import StatsCards from "../components/adminDashboard/StatsCards";
import QuickActions from "../components/adminDashboard/QuickActions";
import RecentUsers from "../components/adminDashboard/RecentUsers";
import RecentBookings from "../components/adminDashboard/RecentBookings";

export default function AdminDashboardPage() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-5">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 transition"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <DashboardHeader />

        <StatsCards />

        <QuickActions />

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <RecentUsers />
          <RecentBookings />
        </div>

      </div>
    </section>
  );
}