import { Link } from "react-router-dom";
import { ChevronRight, Eye, Inbox, UserCog } from "lucide-react";

export default function QuickActions({ pendingCount = 0, providerId }) {
  const actions = [
    {
      to: "/provider/requests",
      icon: Inbox,
      label: "Booking Requests",
      subtitle:
        pendingCount > 0
          ? `${pendingCount} awaiting your response`
          : "Review incoming requests",
      color: "text-blue-600 bg-blue-50",
      badge: pendingCount > 0 ? pendingCount : null,
    },
    {
      to: "/profile",
      icon: UserCog,
      label: "Edit Profile",
      subtitle: "Update details & photos",
      color: "text-indigo-600 bg-indigo-50",
    },
    ...(providerId
      ? [
          {
            to: `/provider/${providerId}`,
            icon: Eye,
            label: "View Public Listing",
            subtitle: "See what customers see",
            color: "text-green-600 bg-green-50",
          },
        ]
      : []),
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm ring-1 ring-black/5 p-5 sm:p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>

      <div className="flex flex-col gap-2">
        {actions.map(({ to, icon: Icon, label, subtitle, color, badge }) => (
          <Link
            key={to}
            to={to}
            className="flex items-center gap-3 rounded-xl p-3 hover:bg-gray-50 transition group"
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${color}`}>
              <Icon size={18} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="font-semibold text-gray-900 text-sm">{label}</p>
              <p className="text-xs text-gray-500 truncate">{subtitle}</p>
            </div>

            {badge ? (
              <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-red-500 text-white text-xs font-semibold">
                {badge}
              </span>
            ) : (
              <ChevronRight
                size={16}
                className="text-gray-300 group-hover:text-gray-400 transition shrink-0"
              />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
