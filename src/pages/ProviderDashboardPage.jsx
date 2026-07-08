import DashboardHeader from "../components/providerDashboard/DashboardHeader";
import StatsCards from "../components/providerDashboard/StatsCards";

export default function ProviderDashboardPage() {
  return (
    <section className="min-h-screen bg-gray-100 p-8">
      <DashboardHeader />

      <StatsCards
        pending={5}
        accepted={12}
        completed={48}
        rating={4.8}
      />
    </section>
  );
}