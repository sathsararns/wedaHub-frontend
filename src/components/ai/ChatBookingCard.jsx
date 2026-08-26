import React from "react";

import {
  CalendarIcon,
  CheckCircle2Icon,
  FileTextIcon,
  MapPinIcon,
  UserRoundIcon,
  WrenchIcon,
} from "lucide-react";

export default function ChatBookingCard({
  booking,
  bookingRef,
}) {
  // =====================================================
  // SAFETY
  // =====================================================

  if (!booking) {
    return null;
  }

  // =====================================================
  // BOOKING VALUES
  // =====================================================

  const serviceName =
    booking.serviceName ||
    booking.service ||
    "Service";

  const description =
    booking.description ||
    "No description provided";

  const city =
    booking.city ||
    booking.location ||
    "";

  const bookingId =
    bookingRef ||
    booking._id ||
    booking.id ||
    "";

  const status =
    booking.status ||
    "pending";

  // =====================================================
  // PROVIDER NAME
  // =====================================================

  let providerName =
    booking.providerName ||
    booking.pro ||
    "";

  // providerId may be populated object
  if (
    !providerName &&
    booking.providerId &&
    typeof booking.providerId === "object"
  ) {
    providerName =
      `${booking.providerId.firstName || ""} ${
        booking.providerId.lastName || ""
      }`.trim();
  }

  if (!providerName) {
    providerName = "Provider";
  }

  // =====================================================
  // DATE FORMATTER
  // =====================================================

  const formatDate = (value) => {
    if (!value) {
      return "Date not available";
    }

    // ---------------------------------------------
    // JavaScript Date
    // ---------------------------------------------

    if (value instanceof Date) {
      if (isNaN(value.getTime())) {
        return "Date not available";
      }

      return value.toLocaleDateString(
        "en-GB",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      );
    }

    // ---------------------------------------------
    // String
    // ---------------------------------------------

    if (typeof value === "string") {
      const trimmed =
        value.trim();

      if (!trimmed) {
        return "Date not available";
      }

      // MongoDB ISO date
      const parsed =
        new Date(trimmed);

      if (
        !isNaN(parsed.getTime()) &&
        (
          trimmed.includes("T") ||
          /^\d{4}-\d{2}-\d{2}$/.test(
            trimmed
          )
        )
      ) {
        return parsed.toLocaleDateString(
          "en-GB",
          {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }
        );
      }

      // Natural language date
      return trimmed;
    }

    return String(value);
  };

  const formattedDate =
    formatDate(booking.date);

  // =====================================================
  // STATUS
  // =====================================================

  const formattedStatus =
    status.charAt(0).toUpperCase() +
    status.slice(1);

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="mt-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-5">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="flex items-start justify-between gap-4">

        <div className="min-w-0">

          <div className="flex items-center gap-2">

            <CheckCircle2Icon
              className="h-5 w-5 text-emerald-600"
            />

            <h3 className="text-sm font-semibold text-zinc-900">
              Booking Created
            </h3>

          </div>

          <p className="mt-2 text-lg font-semibold capitalize text-zinc-900">
            {serviceName}
          </p>

        </div>

        {/* STATUS */}

        <span
          className="
            shrink-0
            rounded-full
            bg-amber-100
            px-3
            py-1
            text-xs
            font-medium
            capitalize
            text-amber-700
          "
        >
          {formattedStatus}
        </span>

      </div>


      {/* =================================================
          BOOKING DETAILS
      ================================================= */}

      <dl className="mt-5 space-y-4">

        {/* =================================================
            SERVICE
        ================================================= */}

        <div className="flex items-start gap-3">

          <WrenchIcon
            className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400"
          />

          <div className="min-w-0 flex-1">

            <dt className="text-xs text-zinc-500">
              Service
            </dt>

            <dd className="mt-0.5 text-sm font-medium capitalize text-zinc-900">
              {serviceName}
            </dd>

          </div>

        </div>


        {/* =================================================
            DATE
        ================================================= */}

        <div className="flex items-start gap-3">

          <CalendarIcon
            className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400"
          />

          <div className="min-w-0 flex-1">

            <dt className="text-xs text-zinc-500">
              Booking date
            </dt>

            <dd className="mt-0.5 text-sm font-medium text-zinc-900">
              {formattedDate}
            </dd>

          </div>

        </div>


        {/* =================================================
            LOCATION
        ================================================= */}

        {city && (
          <div className="flex items-start gap-3">

            <MapPinIcon
              className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400"
            />

            <div className="min-w-0 flex-1">

              <dt className="text-xs text-zinc-500">
                Service location
              </dt>

              <dd className="mt-0.5 text-sm font-medium text-zinc-900">
                {city}
              </dd>

            </div>

          </div>
        )}


        {/* =================================================
            PROVIDER
        ================================================= */}

        <div className="flex items-start gap-3">

          <UserRoundIcon
            className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400"
          />

          <div className="min-w-0 flex-1">

            <dt className="text-xs text-zinc-500">
              Assigned provider
            </dt>

            <dd className="mt-0.5 text-sm font-medium text-zinc-900">
              {providerName}

              <span className="ml-1 font-normal text-zinc-500">
                · verified provider
              </span>
            </dd>

          </div>

        </div>


        {/* =================================================
            DESCRIPTION
        ================================================= */}

        <div className="flex items-start gap-3">

          <FileTextIcon
            className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400"
          />

          <div className="min-w-0 flex-1">

            <dt className="text-xs text-zinc-500">
              Description
            </dt>

            <dd className="mt-1 rounded-lg bg-white px-3 py-2.5 text-sm leading-relaxed text-zinc-700">
              {description}
            </dd>

          </div>

        </div>

      </dl>


      {/* =================================================
          BOOKING REFERENCE
      ================================================= */}

      {bookingId && (
        <div className="mt-5 rounded-xl border border-zinc-200 bg-white px-4 py-3">

          <p className="text-xs text-zinc-500">
            Booking reference
          </p>

          <p className="mt-1 break-all font-mono text-xs font-medium text-zinc-900">
            {bookingId}
          </p>

        </div>
      )}


      {/* =================================================
          STATUS MESSAGE
      ================================================= */}

      <div className="mt-4 flex items-start gap-2 rounded-lg bg-white px-3 py-2.5">

        <CheckCircle2Icon
          className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
        />

        <p className="text-xs leading-relaxed text-zinc-600">

          Your booking has been submitted successfully.
          The provider can now review and respond to
          your booking request.

        </p>

      </div>

    </div>
  );
}