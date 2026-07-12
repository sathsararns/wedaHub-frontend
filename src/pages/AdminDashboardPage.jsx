import DashboardHeader from "../components/adminDashboard/DashboardHeader";
import StatsCards from "../components/adminDashboard/StatsCards";
import QuickActions from "../components/adminDashboard/QuickActions";
import RecentUsers from "../components/adminDashboard/RecentUsers";
import RecentBookings from "../components/adminDashboard/RecentBookings";

export default function AdminDashboardPage() {
  return (
    <section className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-5">

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