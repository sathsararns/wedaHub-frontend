import { CalendarClock, CheckCircle2, Clock, Star, Trophy } from "lucide-react";

export default function StatsCards({ bookings, provider }) {
  const total = bookings.length;

  const pending = bookings.filter((b) => b.status === "pending").length;
  const accepted = bookings.filter((b) => b.status === "accepted").length;
  const completed = bookings.filter((b) => b.status === "completed").length;

  const cards = [
    {
      title: "Total Bookings",
      value: total,
      icon: CalendarClock,
      color: "text-blue-600 bg-blue-50",
    },
    {
      title: "Pending",
      value: pending,
      icon: Clock,
      color: "text-yellow-600 bg-yellow-50",
    },
    {
      title: "Accepted",
      value: accepted,
      icon: CheckCircle2,
      color: "text-green-600 bg-green-50",
    },
    {
      title: "Completed",
      value: completed,
      icon: Trophy,
      color: "text-indigo-600 bg-indigo-50",
    },
    {
      title: "Rating",
      value: provider?.rating ? provider.rating.toFixed(1) : "0.0",
      icon: Star,
      color: "text-amber-600 bg-amber-50",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 mb-6 sm:mb-8">
      {cards.map(({ title, value, icon: Icon, color }) => (
        <div
          key={title}
          className="bg-white rounded-2xl shadow-sm ring-1 ring-black/5 p-4 sm:p-5"
        >
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${color}`}>
            <Icon size={18} />
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold mt-3 text-gray-900">
            {value}
          </h2>

          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{title}</p>
        </div>
      ))}
    </div>
  );
}
