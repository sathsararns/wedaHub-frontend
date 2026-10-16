import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";

export default function AuthButtons({ onNavigate }) {
  const { user } = useAuth();

  // if user logged in → hide buttons
  if (user) return null;

  return (
    <div className="flex items-center gap-3">

      {/* Login */}
      <NavLink
        to="/login"
        onClick={onNavigate}
        className="flex min-h-11 flex-1 items-center justify-center whitespace-nowrap rounded-md border border-white px-5 py-2 text-white transition hover:bg-white hover:text-[#07184B] lg:flex-none"
      >
        Log In
      </NavLink>

      {/* Sign Up */}
      <NavLink
        to="/signup"
        onClick={onNavigate}
        className="flex min-h-11 flex-1 items-center justify-center whitespace-nowrap rounded-md bg-[#FFC107] px-5 py-2 text-black transition hover:bg-yellow-500 lg:flex-none"
      >
        Sign Up
      </NavLink>

    </div>
  );
}
