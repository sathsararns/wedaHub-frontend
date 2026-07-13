import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  ArrowLeft,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-lg min-h-screen flex flex-col">

      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-blue-700">
          Admin Panel
        </h1>
      </div>

      <nav className="flex-1 mt-6">

        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-6 py-4 ${
              isActive
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100"
            }`
          }
        >
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `flex items-center gap-3 px-6 py-4 ${
              isActive
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100"
            }`
          }
        >
          <Users size={20} />
          Manage Users
        </NavLink>

        <NavLink
          to="/admin/bookings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-6 py-4 ${
              isActive
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100"
            }`
          }
        >
          <CalendarCheck size={20} />
          Manage Bookings
        </NavLink>

      </nav>

      <div className="p-5 border-t">

        <NavLink
          to="/"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-lg justify-center hover:bg-blue-700"
        >
          <ArrowLeft size={18} />
          Back Home
        </NavLink>

      </div>

    </aside>
  );
}