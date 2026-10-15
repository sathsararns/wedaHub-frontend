import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function BackButton({ onClick, className = "mb-6" }) {
  const navigate = useNavigate();

  return (
    <motion.button
      onClick={onClick || (() => navigate(-1))}
      aria-label="Go back"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      whileTap={{ scale: 0.94 }}
      className={`group flex h-11 w-11 items-center justify-center rounded-full bg-white text-blue-600 shadow-md ring-1 ring-black/5 transition-all hover:w-28 hover:justify-start hover:gap-2 hover:px-4 hover:shadow-lg ${className}`}
    >
      <ArrowLeft size={20} className="shrink-0 transition-transform group-hover:-translate-x-0.5" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all group-hover:max-w-[4rem] group-hover:opacity-100">
        Back
      </span>
    </motion.button>
  );
}
