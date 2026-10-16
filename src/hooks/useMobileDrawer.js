import { useEffect, useRef } from "react";

// Contain keyboard focus and page scrolling while a mobile drawer is open.
export default function useMobileDrawer(open, onClose, breakpoint = 1024) {
  const drawerRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const desktop = window.matchMedia(`(min-width: ${breakpoint}px)`);
    if (desktop.matches) {
      onClose();
      return;
    }

    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const drawer = drawerRef.current;
    const focusable = () => [...(drawer?.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), [tabindex="0"]'
    ) || [])].filter((element) => element.getClientRects().length > 0);
    (focusable()[0] || drawer)?.focus();

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab") return;
      const elements = focusable();
      const first = elements[0];
      const last = elements.at(-1);
      if (!first) {
        event.preventDefault();
        return;
      }
      if (event.shiftKey && (document.activeElement === first || !drawer.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !drawer.contains(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    };
    const onResize = () => { if (desktop.matches) onClose(); };
    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onResize);
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, [open, onClose, breakpoint]);

  return drawerRef;
}
