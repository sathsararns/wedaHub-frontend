import { NavLink } from "react-router-dom";

export default function NavLinks({ onNavigate }) {
  const navItems = [
    { name: "HOME", path: "/" },
    { name: "ABOUT", path: "/about" },
    { name: "SERVICES", path: "/services" },
    { name: "CONTACT", path: "/contact" },
  ];

  return (
    <div className="flex flex-col items-stretch gap-2 lg:flex-row lg:items-center lg:gap-8">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.path === "/"}
          onClick={onNavigate}
          className={({ isActive }) =>
            `relative flex min-h-11 items-center py-2 text-sm font-medium transition duration-300 ${
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
                <span className="absolute bottom-0 left-0 h-[2px] w-8 bg-[#D4AF37] lg:w-full" />
              )}
            </>
          )}
        </NavLink>
      ))}
    </div>
  );
}
