import {
  Clock3,
  CheckCircle,
  BadgeCheck,
  Star,
} from "lucide-react";

export default function StatsCards({
  pending = 0,
  accepted = 0,
  completed = 0,
  rating = 0,
}) {
  const stats = [
    {
      title: "Pending Bookings",
      value: pending,
      icon: <Clock3 size={28} />,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Accepted",
      value: accepted,
      icon: <CheckCircle size={28} />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Completed",
      value: completed,
      icon: <BadgeCheck size={28} />,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Average Rating",
      value: `${rating} ⭐`,
      icon: <Star size={28} />,
      color: "bg-orange-100 text-orange-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {stats.map((item) => (
        <div
          key={item.title}
          className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between hover:shadow-lg transition"
        >
          <div>
            <p className="text-gray-500 text-sm">
              {item.title}
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {item.value}
            </h2>
          </div>

          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center ${item.color}`}
          >
            {item.icon}
          </div>
        </div>
      ))}
    </div>
  );
}