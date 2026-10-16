import { useState } from "react";
import { Link } from "react-router-dom";
import { Ban, Calendar, ExternalLink, FileText, MapPin, Phone } from "lucide-react";
import toast from "react-hot-toast";

import defaultAvatar from "../../assets/images/avatar.png";
import StatusBadge from "./StatusBadge";
import { cancelBooking } from "../../services/bookingService";
import { getBookingLocation } from "../../Utils/bookingLocation.js";

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

const resolvePhone = (booking) => {
  const provider = resolveProvider(booking);
  return pick(provider?.phone, booking?.phone, "-");
};

const resolveDescription = (booking) =>
  pick(booking?.description, booking?.instructions, booking?.note, "");

export default function BookingCard({ booking, onCancelled, allowCancel = true }) {
  const [cancelling, setCancelling] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  const provider = resolveProvider(booking);
  const providerId = provider?._id;

  const avatar =
    !avatarError && provider?.image && !provider.image.includes("default-profile")
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
    { icon: MapPin, label: "City", value: getBookingLocation(booking) },
    { icon: Phone, label: "Phone", value: resolvePhone(booking) },
  ];

  const description = resolveDescription(booking);
  const statusLabel = normalizeStatus(booking?.status);
  const canCancel = allowCancel && statusLabel === "Pending";

  async function handleCancel() {
    if (!window.confirm("Cancel this booking request?")) return;

    try {
      setCancelling(true);
      await cancelBooking(booking._id);
      toast.success("Booking cancelled");
      onCancelled?.();
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Failed to cancel booking");
    } finally {
      setCancelling(false);
    }
  }

  return (
    <div className="rounded-3xl bg-white p-5 shadow-[0_20px_45px_-25px_rgba(91,52,196,0.35)] transition-shadow hover:shadow-lg sm:p-6">
      <div className="flex flex-col gap-5 sm:flex-row">
        <img
          src={avatar}
          alt={resolveProviderName(booking)}
          className="h-20 w-20 shrink-0 self-center rounded-full object-cover ring-4 ring-blue-100 sm:self-start"
          onError={() => setAvatarError(true)}
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

          <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-3">
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

          {description && (
            <div className="mt-4 rounded-xl bg-gray-50 p-4">
              <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                <FileText size={13} />
                Your Instructions
              </div>
              <p className="text-sm leading-relaxed text-gray-700">
                {description}
              </p>
            </div>
          )}

          {(providerId || canCancel) && (
            <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-gray-100 pt-4">
              {providerId && (
                <Link
                  to={`/provider/${providerId}`}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  <ExternalLink size={14} />
                  View Provider
                </Link>
              )}

              {canCancel && (
                <button
                  onClick={handleCancel}
                  disabled={cancelling}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Ban size={14} />
                  {cancelling ? "Cancelling..." : "Cancel Booking"}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
