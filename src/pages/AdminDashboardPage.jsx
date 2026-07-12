import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import DashboardHeader from "../components/adminDashboard/DashboardHeader";
import StatsCards from "../components/adminDashboard/StatsCards";
import QuickActions from "../components/adminDashboard/QuickActions";
import RecentUsers from "../components/adminDashboard/RecentUsers";
import RecentBookings from "../components/adminDashboard/RecentBookings";

import { getDashboardData } from "../services/adminService";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      setLoading(true);

      const data = await getDashboardData();

      setStats(data.stats);
      setRecentUsers(data.recentUsers);
      setRecentBookings(data.recentBookings);

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
        Loading...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-5">

        <DashboardHeader />

        <StatsCards stats={stats} />

        <QuickActions />

        <div className="grid md:grid-cols-2 gap-6 mt-8">

          <RecentUsers users={recentUsers} />

          <RecentBookings bookings={recentBookings} />

        </div>

      </div>
    </section>
  );
}