import { NavLink, useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  Mail,
  ArrowLeft,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import { useAuth } from "../../hooks/useAuth.js";
import useMobileDrawer from "../../hooks/useMobileDrawer.js";

export default function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const drawerRef = useMobileDrawer(open, close);

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
    {
      name: "Contact Messages",
      icon: <Mail size={20} />,
      path: "/admin/messages",
    },
  ];

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <>
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between bg-slate-900 px-4 text-white shadow lg:hidden">
      <span className="font-bold">WedaHub Admin</span>
      <button type="button" onClick={() => setOpen(true)} aria-label="Open admin menu" aria-expanded={open} aria-controls="admin-sidebar" className="flex h-11 w-11 items-center justify-center rounded-lg hover:bg-slate-800">
        <Menu size={24} />
      </button>
    </header>
    {open && <button type="button" tabIndex={-1} onClick={close} aria-label="Close admin menu" className="fixed inset-0 z-40 bg-black/40 lg:hidden" />}
    <aside ref={drawerRef} id="admin-sidebar" data-mobile-drawer tabIndex={-1} role={open ? "dialog" : undefined} aria-modal={open || undefined} aria-label="Admin navigation" className={`fixed inset-y-0 left-0 z-50 flex h-dvh w-64 max-w-[85vw] shrink-0 flex-col bg-slate-900 text-white transition-transform duration-200 lg:sticky lg:top-0 lg:visible lg:translate-x-0 ${open ? "visible translate-x-0" : "invisible -translate-x-full"}`}>
      <button type="button" onClick={close} aria-label="Close admin navigation" className="absolute right-2 top-2 flex h-11 w-11 items-center justify-center rounded-lg hover:bg-slate-800 lg:hidden"><X size={20} /></button>

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
            onClick={close}
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
    </>
  );
}
