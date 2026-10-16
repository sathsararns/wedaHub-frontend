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
    <div className="flex min-w-0 flex-col-reverse items-start gap-3 rounded-xl bg-white p-4 shadow-md sm:flex-row sm:items-center sm:justify-between sm:p-5">

      <div>

        <p className="text-gray-500 text-sm">
          {title}
        </p>

        <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
          {value}
        </h2>

      </div>

      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl sm:h-12 sm:w-12 ${color}`}
      >
        <Icon className="text-white" size={28} />
      </div>

    </div>
  );
}
