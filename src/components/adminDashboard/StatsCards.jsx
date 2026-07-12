export default function StatsCards({ stats }) {
  const cards = [
    {
      title: "Total Users",
      value: stats?.totalUsers || 0,
      color: "bg-blue-500",
    },
    {
      title: "Customers",
      value: stats?.totalCustomers || 0,
      color: "bg-green-500",
    },
    {
      title: "Providers",
      value: stats?.totalProviders || 0,
      color: "bg-purple-500",
    },
    {
      title: "Bookings",
      value: stats?.totalBookings || 0,
      color: "bg-orange-500",
    },
    {
      title: "Pending",
      value: stats?.pendingBookings || 0,
      color: "bg-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-8">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
        >
          <div
            className={`w-12 h-12 rounded-full ${card.color} mb-4`}
          />

          <h3 className="text-gray-500 text-sm">
            {card.title}
          </h3>

          <h2 className="text-3xl font-bold mt-2">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}