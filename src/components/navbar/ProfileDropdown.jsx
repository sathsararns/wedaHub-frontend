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

  if (!user) return null; // safety fix

  return (
    <div className="relative" ref={ref}>

      {/* AVATAR */}
      <UserAvatar onClick={() => setOpen(!open)} />

      {/* DROPDOWN */}
      {open && (
        <div className="absolute right-0 mt-3 w-56 bg-white shadow-xl rounded-md overflow-hidden z-50 animate-fadeIn">

          {/* PROFILE */}
          <Link
            to="/profile"
            className="block px-4 py-2 hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            My Profile
          </Link>

          {/* CUSTOMER */}
          {user?.role === "customer" && (
            <Link
              to="/customer"
              className="block px-4 py-2 hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              My Bookings
            </Link>
          )}

          {/* PROVIDER */}
          {user?.role === "provider" && (
            <>
              <Link
                to="/provider"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setOpen(false)}
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
          {user?.role === "admin" && (
            <>
              <Link
                to="/admin"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                Admin Dashboard
              </Link>

              <Link
                to="/admin/users"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                Manage Users
              </Link>

              <Link
                to="/admin/bookings"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                Manage Bookings
              </Link>
            </>
          )}

          {/* LOGOUT */}
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