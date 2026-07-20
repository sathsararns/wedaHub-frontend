import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  ArrowLeft,
  LogOut,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const menu = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/admin-dashboard",
    },
    {
      name: "Manage Users",
      icon: <Users size={20} />,
      path: "/admin/users",
    },
    {
      name: "Manage Bookings",
      icon: <CalendarCheck size={20} />,
      path: "/admin/bookings",
    },
  ];

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <aside className="w-64 h-screen sticky top-0 bg-slate-900 text-white flex flex-col">

      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold text-center">
          WedaHub
        </h1>

        <p className="text-sm text-slate-400 text-center mt-1">
          Admin Panel
        </p>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="mt-auto p-4 border-t border-slate-700">

        <button
          onClick={() => navigate("/")}
          className="w-full flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 py-3 rounded-lg transition mb-3"
        >
          <ArrowLeft size={18} />
          Back to Website
        </button>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 py-3 rounded-lg transition"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </aside>
  );
}