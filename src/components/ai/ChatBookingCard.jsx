import React from "react";
import {
  CalendarDays,
  User,
  Receipt,
  FileText,
  CheckCircle2,
} from "lucide-react";

const pick = (...values) =>
  values.find(
    (value) =>
      value !== undefined &&
      value !== null &&
      String(value).trim() !== ""
  ) ?? "";

const formatDate = (value) => {
  const raw = pick(value);
  if (!raw) return "Not provided";

  if (raw instanceof Date && !Number.isNaN(raw.getTime())) {
    return raw.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  const parsed = new Date(raw);
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  return String(raw);
};

const normalizeStatus = (status) => {
  const value = String(pick(status, "pending")).toLowerCase();
  if (value === "accepted") return "Accepted";
  if (value === "rejected") return "Rejected";
  if (value === "completed") return "Completed";
  if (value === "cancelled" || value === "canceled") return "Cancelled";
  return "Pending";
};

const resolveProviderName = (booking) => {
  const providerObj =
    (booking?.providerId &&
      typeof booking.providerId === "object" &&
      booking.providerId) ||
    booking?.provider ||
    booking?.providerData ||
    null;

  const fromObject = [
    providerObj?.firstName,
    providerObj?.lastName,
  ]
    .filter(Boolean)
    .join(" ")
    .trim();

  return pick(
    booking?.provider_name,
    booking?.providerName,
    booking?.business_name,
    booking?.businessName,
    fromObject,
    providerObj?.firstName,
    "Not provided"
  );
};

const resolveService = (booking) =>
  pick(
    booking?.service,
    booking?.serviceName,
    booking?.service_name,
    "Not provided"
  );

const resolveDescription = (booking) =>
  pick(
    booking?.description,
    booking?.instructions,
    booking?.note,
    "Not provided"
  );

export default function ChatBookingCard({ booking }) {
  if (!booking) return null;

  const rows = [
    { icon: User, label: "Provider", value: resolveProviderName(booking) },
    { icon: Receipt, label: "Service", value: resolveService(booking) },
    {
      icon: CalendarDays,
      label: "Booking date",
      value: formatDate(
        pick(booking?.date, booking?.bookingDate, booking?.booking_date)
      ),
    },
    { icon: FileText, label: "Description", value: resolveDescription(booking) },
  ];

  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
      <div className="border-b border-zinc-100 bg-zinc-50 px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-zinc-900">
              Booking Created
            </p>
            <p className="text-xs text-zinc-500">
              Your request has been submitted successfully.
            </p>
          </div>

          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
            <CheckCircle2 className="h-3.5 w-3.5" />
            {normalizeStatus(booking.status)}
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="grid gap-3 sm:grid-cols-2">
          {rows.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="rounded-xl border border-zinc-100 bg-zinc-50 p-3"
            >
              <div className="mb-1 flex items-center gap-2 text-zinc-500">
                <Icon className="h-4 w-4" />
                <span className="text-[11px] font-medium uppercase tracking-wide">
                  {label}
                </span>
              </div>
              <p className="text-sm font-medium text-zinc-900">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}