import Sidebar from "../../components/adminDashboard/Sidebar";
import DashboardHeader from "../../components/adminDashboard/DashboardHeader";
import StatsCards from "../../components/adminDashboard/StatsCards";
import QuickActions from "../../components/adminDashboard/QuickActions";
import RecentUsers from "../../components/adminDashboard/RecentUsers";
import RecentBookings from "../../components/adminDashboard/RecentBookings";

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