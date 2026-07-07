import toast from "react-hot-toast";

import {
  updateBookingStatus,
  completeBooking,
} from "../../services/bookingService";

export default function BookingActions({
  booking,
  onStatusChanged,
}) {
  async function accept() {
    try {
      await updateBookingStatus(
        booking._id,
        "accepted"
      );

      toast.success("Booking Accepted");

      onStatusChanged();

    } catch (err) {
      console.log(err);

      toast.error("Failed");
    }
  }

  async function reject() {
    try {
      await updateBookingStatus(
        booking._id,
        "rejected"
      );

      toast.success("Booking Rejected");

      onStatusChanged();

    } catch (err) {
      console.log(err);

      toast.error("Failed");
    }
  }

  async function complete() {
    try {
      await completeBooking(
        booking._id
      );

      toast.success(
        "Service Completed"
      );

      onStatusChanged();

    } catch (err) {
      console.log(err);

      toast.error("Failed");
    }
  }

  if (booking.status === "pending") {
    return (
      <div className="flex gap-3">

        <button
          onClick={accept}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
        >
          Accept
        </button>

        <button
          onClick={reject}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
        >
          Reject
        </button>

      </div>
    );
  }

  if (booking.status === "accepted") {
    return (
      <button
        onClick={complete}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
      >
        Complete Service
      </button>
    );
  }

  return null;
}