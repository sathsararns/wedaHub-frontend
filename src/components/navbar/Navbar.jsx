import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import logo from "../../assets/images/logo.png";
import NavLinks from "./NavLinks";
import AuthButtons from "./AuthButtons";
import ProfileDropdown from "./ProfileDropdown";
import { useAuth } from "../../hooks/useAuth.js";
import { NavLink } from "react-router-dom";

const topBarVariants = {
  open: { rotate: 45, y: 0 },
  closed: { rotate: 0, y: -7 },
};
const middleBarVariants = {
  open: { opacity: 0 },
  closed: { opacity: 1 },
};
const bottomBarVariants = {
  open: { rotate: -45, y: 0 },
  closed: { rotate: 0, y: 7 },
};

function Navbar() {
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Close the mobile panel if the viewport grows back to desktop width.
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  return (
    <motion.nav
      className="bg-[#07184B] w-full shadow-md relative z-50"
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[70px] flex items-center justify-between">
        {/* LOGO */}
        <NavLink to="/" onClick={() => setMobileOpen(false)} className="min-w-0">
          <motion.img
            src={logo}
            className="h-9 w-auto max-w-[55vw] object-contain sm:h-11 lg:h-12"
            alt="logo"
            whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          />
        </NavLink>

        {/* NAV LINKS — desktop only */}
        <div className="hidden lg:flex">
          <NavLinks />
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3 sm:gap-4">
          {user ? <ProfileDropdown /> : <div className="hidden lg:block"><AuthButtons /></div>}

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:hidden"
          >
            <motion.span
              className="absolute w-6 h-0.5 bg-white rounded-full"
              variants={topBarVariants}
              animate={mobileOpen ? "open" : "closed"}
              transition={{ duration: 0.25 }}
            />
            <motion.span
              className="absolute w-6 h-0.5 bg-white rounded-full"
              variants={middleBarVariants}
              animate={mobileOpen ? "open" : "closed"}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="absolute w-6 h-0.5 bg-white rounded-full"
              variants={bottomBarVariants}
              animate={mobileOpen ? "open" : "closed"}
              transition={{ duration: 0.25 }}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            id="mobile-navigation"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-white/10 bg-[#07184B] lg:hidden"
          >
            <div className="px-4 sm:px-6 py-4 flex flex-col gap-4">
              <NavLinks onNavigate={() => setMobileOpen(false)} />
              {!user && <AuthButtons onNavigate={() => setMobileOpen(false)} />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;
