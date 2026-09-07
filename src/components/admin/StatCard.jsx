import {
  Users,
  UserCheck,
  Briefcase,
  CalendarCheck,
  Clock,
} from "lucide-react";

const icons = {
  users: Users,
  customers: UserCheck,
  providers: Briefcase,
  bookings: CalendarCheck,
  pending: Clock,
};

export default function StatCard({
  title,
  value,
  icon,
  color,
}) {
  const Icon = icons[icon];

  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex justify-between items-center">

      <div>

        <p className="text-gray-500 text-sm">
          {title}
        </p>

        <h2 className="text-3xl font-bold mt-2">
          {value}
        </h2>

      </div>

      <div
        className={`w-14 h-14 rounded-xl flex justify-center items-center ${color}`}
      >
        <Icon className="text-white" size={28} />
      </div>

    </div>
  );
}