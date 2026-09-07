import { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import useClickOutside from "../../hooks/useClickOutside";
import UserAvatar from "./UserAvatar";

export default function ProfileDropdown() {
  const { user, logout } = useAuth();

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const ref = useRef();

  useClickOutside(ref, () => setOpen(false));

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="relative" ref={ref}>
      {/* Avatar */}
      <UserAvatar onClick={() => setOpen(!open)} />

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-56 bg-white rounded-md shadow-xl overflow-hidden z-50 animate-fadeIn">
          {/* Profile */}
          <Link
            to="/profile"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 hover:bg-gray-100"
          >
            My Profile
          </Link>

          {/* CUSTOMER */}
          {user.role === "customer" && (
            <>
              <Link
                to="/my-bookings"
                onClick={() => setOpen(false)}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                My Bookings
              </Link>

              <Link
                to="/ai-support"
                onClick={() => setOpen(false)}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                AI Assistant
              </Link>
            </>
          )}

          {/* PROVIDER */}
          {user.role === "provider" && (
            <>
              <Link
                to="/provider-dashboard"
                onClick={() => setOpen(false)}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Provider Dashboard
              </Link>

              <Link
                to="/provider/requests"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                Booking Requests
              </Link>
            </>
          )}

          {/* ADMIN */}
          {user.role === "admin" && (
            <>
              <Link
                to="/admin-dashboard"
                onClick={() => setOpen(false)}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Admin Dashboard
              </Link>

              {/* <Link
                to="/admin/users"
                onClick={() => setOpen(false)}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Manage Users
              </Link>

              <Link
                to="/admin/bookings"
                onClick={() => setOpen(false)}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Manage Bookings
              </Link> */}
            </>
          )}

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}