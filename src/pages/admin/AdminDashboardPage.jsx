import DashboardLayout from "../../components/adminDashboard/DashboardLayout";
import Sidebar from "../../components/adminDashboard/Sidebar";
import DashboardHeader from "../../components/adminDashboard/DashboardHeader";

export default function AdminDashboardPage() {
  return (
    <DashboardLayout>

      <Sidebar />

      <main className="flex-1 p-8">

        <DashboardHeader />

      </main>

    </DashboardLayout>
  );
}