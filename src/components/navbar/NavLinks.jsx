import { NavLink } from "react-router-dom";

export default function NavLinks() {
  const navItems = [
    { name: "HOME", path: "/" },
    { name: "ABOUT", path: "/about" },
    { name: "SERVICES", path: "/services" },
    { name: "CONTACT", path: "/contact" },
  ];

  return (
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
                <span className="absolute left-0 -bottom-2 w-full h-[2px] bg-[#D4AF37]" />
              )}
            </>
          )}
        </NavLink>
      ))}
    </div>
  );
}