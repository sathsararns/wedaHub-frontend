export default function StatsCards({ bookings }) {
  const total = bookings.length;

  const pending = bookings.filter(
    (b) => b.status === "pending"
  ).length;

  const accepted = bookings.filter(
    (b) => b.status === "accepted"
  ).length;

  const completed = bookings.filter(
    (b) => b.status === "completed"
  ).length;

  const cards = [
    {
      title: "Total Bookings",
      value: total,
    },
    {
      title: "Pending",
      value: pending,
    },
    {
      title: "Accepted",
      value: accepted,
    },
    {
      title: "Completed",
      value: completed,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-xl shadow p-6"
        >
          <p className="text-gray-500">
            {card.title}
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}