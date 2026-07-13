import StatCard from "./StatCard";

export default function StatsCards({ stats }) {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-6">

      <StatCard
        title="Total Users"
        value={stats.totalUsers}
        icon="users"
        color="bg-blue-600"
      />

      <StatCard
        title="Customers"
        value={stats.totalCustomers}
        icon="customers"
        color="bg-green-600"
      />

      <StatCard
        title="Providers"
        value={stats.totalProviders}
        icon="providers"
        color="bg-orange-500"
      />

      <StatCard
        title="Bookings"
        value={stats.totalBookings}
        icon="bookings"
        color="bg-purple-600"
      />

      <StatCard
        title="Pending"
        value={stats.pendingBookings}
        icon="pending"
        color="bg-red-500"
      />

    </div>
  );
}