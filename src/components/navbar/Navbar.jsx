import logo from "../../assets/images/logo.png";
import NavLinks from "./NavLinks";
import AuthButtons from "./AuthButtons";
import ProfileDropdown from "./ProfileDropdown";
import { useAuth } from "../../context/AuthContext";
import { NavLink } from "react-router-dom";

function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="bg-[#07184B] h-[70px] w-full shadow-md">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">

        {/* LOGO */}
        <NavLink to="/">
          <img src={logo} className="h-12" alt="logo" />
        </NavLink>

        {/* NAV LINKS */}
        <NavLinks />

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          {user ? (
            <ProfileDropdown />
          ) : (
            <AuthButtons />
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;