import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../utils/api";

import Sidebar from "../../components/admin/Sidebar";
import DashboardHeader from "../../components/admin/DashboardHeader";
import StatsCards from "../../components/admin/StatsCards";
import QuickActions from "../../components/admin/QuickActions";
import RecentUsers from "../../components/admin/RecentUsers";
import RecentBookings from "../../components/admin/RecentBookings";

export default function AdminDashboardPage() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const res = await api.get("/admin/dashboard");
      setDashboard(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load dashboard");
    }
  }

  if (!dashboard) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
          <h2 className="mt-4 text-xl font-semibold text-gray-700">Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">

      <Sidebar />

      <main className="flex-1 p-8">

        <DashboardHeader />

        <StatsCards stats={dashboard.stats} />

        <QuickActions />

        <div className="grid lg:grid-cols-2 gap-6 mt-8">

          <RecentUsers users={dashboard.recentUsers} />

          <RecentBookings bookings={dashboard.recentBookings} />

        </div>

      </main>

    </div>
  );
}