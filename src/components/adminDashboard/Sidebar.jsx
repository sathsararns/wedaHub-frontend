import { Link, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  ArrowLeft,
} from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="w-64 bg-white shadow-lg flex flex-col">

      {/* Logo */}

      <div className="h-20 flex items-center justify-center border-b">

        <h1 className="text-2xl font-bold text-[#07184B]">
          WedaHub
        </h1>

      </div>

      {/* Menu */}

      <nav className="flex-1 p-5 space-y-2">

        <Link
          to="/admin-dashboard"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 text-gray-700"
        >
          <LayoutDashboard size={20} />

          Dashboard
        </Link>

        <Link
          to="/admin/users"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 text-gray-700"
        >
          <Users size={20} />

          Manage Users
        </Link>

        <Link
          to="/admin/bookings"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 text-gray-700"
        >
          <CalendarCheck size={20} />

          Manage Bookings
        </Link>

      </nav>

      {/* Back */}

      <div className="p-5 border-t">

        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center gap-2 w-full bg-[#07184B] text-white py-3 rounded-lg hover:bg-blue-900"
        >
          <ArrowLeft size={18} />

          Back
        </button>

      </div>

    </aside>
  );
}