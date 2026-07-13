import {
  Users,
  UserRound,
  Briefcase,
  CalendarCheck,
} from "lucide-react";

import StatCard from "./StatCard";

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

      <StatCard
        title="Total Users"
        value="0"
        icon={<Users size={28} />}
        color="bg-blue-600"
      />

      <StatCard
        title="Customers"
        value="0"
        icon={<UserRound size={28} />}
        color="bg-green-600"
      />

      <StatCard
        title="Providers"
        value="0"
        icon={<Briefcase size={28} />}
        color="bg-purple-600"
      />

      <StatCard
        title="Bookings"
        value="0"
        icon={<CalendarCheck size={28} />}
        color="bg-red-600"
      />

    </div>
  );
}