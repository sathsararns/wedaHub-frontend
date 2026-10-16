import { useState } from "react";
import { Link } from "react-router-dom";
import { CalendarX } from "lucide-react";
import BookingStatusBadge from "../providerBookings/BookingStatusBadge";

const AVATAR_COLORS = [
  "bg-blue-100 text-blue-700",
  "bg-green-100 text-green-700",
  "bg-purple-100 text-purple-700",
  "bg-amber-100 text-amber-700",
  "bg-pink-100 text-pink-700",
];

function initialsFor(booking) {
  const first = booking.customerId?.firstName?.[0] || "";
  const last = booking.customerId?.lastName?.[0] || "";
  return (first + last).toUpperCase() || "?";
}

function formatDate(date) {
  if (!date) return "";
  return new Date(date).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function CustomerAvatar({ booking, colorClass }) {
  const [imgError, setImgError] = useState(false);

  const image = booking.customerId?.image;
  const hasPhoto =
    !imgError && image && image.trim() !== "" && !image.includes("default-profile.png");

  if (hasPhoto) {
    return (
      <img
        src={image}
        alt={`${booking.customerId?.firstName || "Customer"}`}
        className="w-10 h-10 rounded-full object-cover shrink-0"
        onError={() => setImgError(true)}
      />
    );
  }

  return (
    <div
      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm shrink-0 ${colorClass}`}
    >
      {initialsFor(booking)}
    </div>
  );
}

export default function RecentBookings({ bookings }) {
  const recent = bookings.slice(0, 5);

  return (
    <div className="bg-white rounded-2xl shadow-sm ring-1 ring-black/5 p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <h2 className="text-lg font-bold text-gray-900">Recent Bookings</h2>

        {bookings.length > 0 && (
          <Link
            to="/provider/requests"
            className="text-sm font-medium text-blue-600 hover:text-blue-800 transition"
          >
            View all
          </Link>
        )}
      </div>

      {recent.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-10">
          <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-3">
            <CalendarX size={22} className="text-gray-300" />
          </div>
          <p className="text-gray-500 text-sm">
            No bookings yet. New requests will show up here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {recent.map((booking, index) => (
            <div
              key={booking._id}
              className="flex items-center gap-4 rounded-xl border border-gray-100 p-3 sm:p-4 hover:bg-gray-50 transition"
            >
              <CustomerAvatar
                booking={booking}
                colorClass={AVATAR_COLORS[index % AVATAR_COLORS.length]}
              />

              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-gray-900 text-sm truncate">
                  {booking.customerId?.firstName} {booking.customerId?.lastName}
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm truncate">
                  {booking.serviceName} &middot; {formatDate(booking.date)}
                </p>
              </div>

              <div className="shrink-0">
                <BookingStatusBadge status={booking.status} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
