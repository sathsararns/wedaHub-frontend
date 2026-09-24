import { useState } from "react";
import toast from "react-hot-toast";
import { Check, CheckCheck, X } from "lucide-react";

import {
  updateBookingStatus,
  completeBooking,
} from "../../services/bookingService";

export default function BookingActions({ booking, onStatusChanged }) {
  const [actionLoading, setActionLoading] = useState(null);

  async function accept() {
    try {
      setActionLoading("accept");
      await updateBookingStatus(booking._id, "accepted");
      toast.success("Booking Accepted");
      onStatusChanged();
    } catch (err) {
      console.log(err);
      toast.error("Failed");
    } finally {
      setActionLoading(null);
    }
  }

  async function reject() {
    try {
      setActionLoading("reject");
      await updateBookingStatus(booking._id, "rejected");
      toast.success("Booking Rejected");
      onStatusChanged();
    } catch (err) {
      console.log(err);
      toast.error("Failed");
    } finally {
      setActionLoading(null);
    }
  }

  async function complete() {
    try {
      setActionLoading("complete");
      await completeBooking(booking._id);
      toast.success("Service Completed");
      onStatusChanged();
    } catch (err) {
      console.log(err);
      toast.error("Failed");
    } finally {
      setActionLoading(null);
    }
  }

  if (booking.status === "pending") {
    const isBusy = actionLoading !== null;

    return (
      <div className="flex gap-3">
        <button
          onClick={accept}
          disabled={isBusy}
          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-5 py-2.5 rounded-lg transition shadow-sm"
        >
          <Check size={16} />
          {actionLoading === "accept" ? "Accepting..." : "Accept"}
        </button>

        <button
          onClick={reject}
          disabled={isBusy}
          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 border border-red-200 bg-red-50 hover:bg-red-100 disabled:opacity-60 disabled:cursor-not-allowed text-red-700 font-semibold px-5 py-2.5 rounded-lg transition"
        >
          <X size={16} />
          {actionLoading === "reject" ? "Rejecting..." : "Reject"}
        </button>
      </div>
    );
  }

  if (booking.status === "accepted") {
    return (
      <button
        onClick={complete}
        disabled={actionLoading !== null}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-5 py-2.5 rounded-lg transition shadow-sm"
      >
        <CheckCheck size={16} />
        {actionLoading === "complete" ? "Completing..." : "Mark as Completed"}
      </button>
    );
  }

  return null;
}
