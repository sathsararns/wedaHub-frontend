import Sidebar from "../../components/admin/Sidebar";
import DashboardHeader from "../../components/admin/DashboardHeader";
import StatsCards from "../../components/admin/StatsCards";
import QuickActions from "../../components/admin/QuickActions";
import RecentUsers from "../../components/admin/RecentUsers";
import RecentBookings from "../../components/admin/RecentBookings";

export default function AdminDashboardPage() {
  return (
    <div className="flex bg-gray-100">

      <Sidebar />

      <main className="flex-1 p-8">

        <DashboardHeader />

        <StatsCards />

        <QuickActions />

        <div className="grid lg:grid-cols-2 gap-6 mt-8">

          <RecentUsers />

          <RecentBookings />

        </div>

      </main>

    </div>
  );
}