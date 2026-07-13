import StatCard from "./StatCard";

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      <StatCard
        title="Users"
        value="0"
        color="text-blue-600"
      />

      <StatCard
        title="Customers"
        value="0"
        color="text-green-600"
      />

      <StatCard
        title="Providers"
        value="0"
        color="text-purple-600"
      />

      <StatCard
        title="Bookings"
        value="0"
        color="text-red-600"
      />

    </div>
  );
}