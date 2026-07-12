import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AuthButtons() {
  const { user } = useAuth();

  // if user logged in → hide buttons
  if (user) return null;

  return (
    <div className="flex items-center gap-4">

      {/* Login */}
      <NavLink
        to="/login"
        className="px-6 py-2 border border-white text-white rounded-md hover:bg-white hover:text-[#07184B] transition"
      >
        Log In
      </NavLink>

      {/* Sign Up */}
      <NavLink
        to="/signup"
        className="px-6 py-2 bg-[#FFC107] text-black rounded-md hover:bg-yellow-500 transition"
      >
        Sign Up
      </NavLink>

    </div>
  );
}