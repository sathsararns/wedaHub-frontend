import { NavLink } from "react-router-dom";
import logo from "../assets/images/logo.png";

function Navbar() {
  const navItems = [
    { name: "HOME", path: "/" },
    { name: "ABOUT", path: "/about" },
    { name: "SERVICES", path: "/services" },
    { name: "CONTACT", path: "/contact" },
  ];

  return (
    <nav className="bg-[#07184B] h-[70px] w-full">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">

        {/* Logo */}
        <NavLink to="/">
          <img
            src={logo}
            alt="WedaHub Logo"
            className="h-12 object-contain"
          />
        </NavLink>

        {/* Navigation Links */}
        <div className="flex items-center gap-10">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `relative text-sm font-medium transition duration-300 ${
                  isActive
                    ? "text-[#D4AF37]"
                    : "text-white hover:text-[#D4AF37]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.name}

                  {isActive && (
                    <span className="absolute left-0 -bottom-2 w-full h-[2px] bg-[#D4AF37]"></span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4">

          {/* Login */}
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `px-8 py-2 border rounded-md transition duration-300 ${
                isActive
                  ? "bg-white text-[#07184B] border-white"
                  : "border-white text-white hover:bg-white hover:text-[#07184B]"
              }`
            }
          >
            Log In
          </NavLink>

          {/* Signup */}
          <NavLink
            to="/signup"
            className={({ isActive }) =>
              `px-8 py-2 rounded-md font-medium transition duration-300 ${
                isActive
                  ? "bg-yellow-500 text-black"
                  : "bg-[#FFC107] text-black hover:bg-yellow-500"
              }`
            }
          >
            Sign Up
          </NavLink>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;