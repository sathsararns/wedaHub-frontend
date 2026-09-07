import { Calendar, MapPin, Phone, MessageSquare } from "lucide-react";

import defaultAvatar from "../../assets/images/avatar.png";
import StatusBadge from "./StatusBadge";

const pick = (...values) =>
  values.find(
    (value) =>
      value !== undefined &&
      value !== null &&
      String(value).trim() !== ""
  ) ?? "";

const formatDate = (value) => {
  const raw = pick(value);
  if (!raw) return "-";

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

const resolveProvider = (booking) => {
  if (booking?.providerId && typeof booking.providerId === "object") {
    return booking.providerId;
  }

  if (booking?.provider && typeof booking.provider === "object") {
    return booking.provider;
  }

  if (booking?.providerData && typeof booking.providerData === "object") {
    return booking.providerData;
  }

  return {};
};

const resolveProviderName = (booking) => {
  const provider = resolveProvider(booking);
  const fullName = [provider?.firstName, provider?.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();

  return pick(
    booking?.provider_name,
    booking?.providerName,
    booking?.business_name,
    booking?.businessName,
    provider?.businessName,
    fullName,
    "Provider"
  );
};

const resolveProviderCategory = (booking) => {
  const provider = resolveProvider(booking);
  return pick(provider?.category, booking?.category, "-");
};

const resolveCity = (booking) => {
  const provider = resolveProvider(booking);

  return pick(
    provider?.city,
    provider?.location,
    provider?.district,
    booking?.city,
    booking?.location,
    "-"
  );
};

const resolvePhone = (booking) => {
  const provider = resolveProvider(booking);
  return pick(provider?.phone, booking?.phone, "-");
};

const resolveDescription = (booking) =>
  pick(booking?.description, booking?.instructions, booking?.note, "-");

export default function BookingCard({ booking }) {
  const provider = resolveProvider(booking);

  const avatar =
    provider?.image && !provider.image.includes("default-profile")
      ? provider.image
      : defaultAvatar;

  const details = [
    {
      icon: Calendar,
      label: "Date",
      value: formatDate(
        pick(booking?.date, booking?.bookingDate, booking?.scheduledDate)
      ),
    },
    { icon: MapPin, label: "City", value: resolveCity(booking) },
    { icon: Phone, label: "Phone", value: resolvePhone(booking) },
    { icon: MessageSquare, label: "Instructions", value: resolveDescription(booking) },
  ];

  const statusLabel = normalizeStatus(booking?.status);

  return (
    <div className="rounded-3xl bg-white p-5 shadow-[0_20px_45px_-25px_rgba(91,52,196,0.35)] transition-shadow hover:shadow-lg sm:p-6">
      <div className="flex flex-col gap-5 sm:flex-row">
        <img
          src={avatar}
          alt={resolveProviderName(booking)}
          className="h-20 w-20 shrink-0 self-center rounded-full object-cover ring-4 ring-blue-100 sm:self-start"
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="truncate text-lg font-bold text-gray-900">
                {resolveProviderName(booking)}
              </h2>
              <p className="text-sm text-gray-500">
                {resolveProviderCategory(booking)}
              </p>
            </div>

            <StatusBadge status={statusLabel} />
          </div>

          <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
            {details.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-2 text-sm">
                <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-500" />
                <div className="min-w-0">
                  <dt className="text-xs text-gray-400">{label}</dt>
                  <dd className="truncate font-medium text-gray-700">
                    {value}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}