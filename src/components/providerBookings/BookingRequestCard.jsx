import { Briefcase, Calendar, FileText, MapPin, Phone } from "lucide-react";

import CustomerAvatar from "../common/CustomerAvatar";
import BookingStatusBadge from "./BookingStatusBadge";
import BookingActions from "./BookingActions";

function formatDate(date) {
  if (!date) return "-";
  return new Date(date).toLocaleDateString(undefined, {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function timeAgo(date) {
  if (!date) return "";
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);

  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return formatDate(date);
}

export default function BookingRequestCard({ booking, onStatusChanged }) {
  const customer = booking.customerId;

  const details = [
    { icon: Briefcase, label: "Service", value: booking.serviceName },
    {
      icon: Calendar,
      label: "Date",
      value: `${formatDate(booking.date)}${booking.time ? ` · ${booking.time}` : ""}`,
    },
    { icon: MapPin, label: "Location", value: booking.city || "Not specified" },
    { icon: Phone, label: "Phone", value: customer?.phone || "-" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm ring-1 ring-black/5 p-5 sm:p-6 hover:shadow-md transition">
      {/* Header: customer + status */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <CustomerAvatar
            customer={customer}
            size="w-14 h-14"
            textSize="text-lg"
          />

          <div className="min-w-0">
            <h2 className="text-lg font-bold text-gray-900 truncate">
              {customer?.firstName} {customer?.lastName}
            </h2>
            <p className="text-sm text-gray-500 truncate">{customer?.email}</p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <BookingStatusBadge status={booking.status} />
          {booking.createdAt && (
            <span className="text-xs text-gray-400">{timeAgo(booking.createdAt)}</span>
          )}
        </div>
      </div>

      {/* Details grid */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
        {details.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-2.5 text-sm min-w-0">
            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
              <Icon size={15} className="text-gray-400" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-gray-400">{label}</p>
              <p className="font-medium text-gray-800 truncate">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Description */}
      {booking.description && (
        <div className="mt-4 rounded-xl bg-gray-50 p-4">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 mb-1.5">
            <FileText size={13} />
            Customer's Note
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">{booking.description}</p>
        </div>
      )}

      {/* Actions */}
      {booking.status !== "rejected" && booking.status !== "completed" && (
        <div className="mt-5 pt-5 border-t border-gray-100">
          <BookingActions booking={booking} onStatusChanged={onStatusChanged} />
        </div>
      )}
    </div>
  );
}
