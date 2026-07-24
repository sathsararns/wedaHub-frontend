import { Clock, CheckCircle2, XCircle, CheckCheck, Ban } from "lucide-react";

export default function StatusBadge({ status }) {
  const config = {
    Pending: {
      classes: "bg-yellow-50 text-yellow-700 ring-yellow-200",
      icon: Clock,
    },
    Accepted: {
      classes: "bg-blue-50 text-blue-700 ring-blue-200",
      icon: CheckCircle2,
    },
    Rejected: {
      classes: "bg-red-50 text-red-700 ring-red-200",
      icon: XCircle,
    },
    Completed: {
      classes: "bg-green-50 text-green-700 ring-green-200",
      icon: CheckCheck,
    },
    Cancelled: {
      classes: "bg-gray-100 text-gray-600 ring-gray-200",
      icon: Ban,
    },
  };

  const { classes, icon: Icon } = config[status] || {
    classes: "bg-gray-100 text-gray-700 ring-gray-200",
    icon: Clock,
  };

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${classes}`}
    >
      <Icon size={12} />
      {status}
    </span>
  );
}