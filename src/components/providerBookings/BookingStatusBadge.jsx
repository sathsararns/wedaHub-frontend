import { CheckCircle2, Clock, Trophy, XCircle } from "lucide-react";

const CONFIG = {
  pending: {
    label: "Pending",
    icon: Clock,
    classes: "bg-yellow-50 text-yellow-700 border-yellow-200",
  },
  accepted: {
    label: "Accepted",
    icon: CheckCircle2,
    classes: "bg-green-50 text-green-700 border-green-200",
  },
  rejected: {
    label: "Rejected",
    icon: XCircle,
    classes: "bg-red-50 text-red-700 border-red-200",
  },
  completed: {
    label: "Completed",
    icon: Trophy,
    classes: "bg-blue-50 text-blue-700 border-blue-200",
  },
};

export default function BookingStatusBadge({ status, size = "md" }) {
  const config = CONFIG[status] || {
    label: status,
    icon: Clock,
    classes: "bg-gray-50 text-gray-700 border-gray-200",
  };

  const Icon = config.icon;
  const isSmall = size === "sm";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-semibold ${
        config.classes
      } ${isSmall ? "px-2.5 py-1 text-xs" : "px-3.5 py-1.5 text-sm"}`}
    >
      <Icon size={isSmall ? 12 : 14} />
      {config.label}
    </span>
  );
}
