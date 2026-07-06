import toast from "react-hot-toast";

import {
  updateBookingStatus,
} from "../../services/bookingService";

export default function BookingActions({
  booking,
  onStatusChanged,
}) {

  async function changeStatus(status) {

    try {

      await updateBookingStatus(
        booking._id,
        status
      );

      toast.success(
        `Booking ${status}`
      );

      if (onStatusChanged) {
        onStatusChanged();
      }

    } catch (err) {

      console.log(err);

      toast.error(
        "Failed to update booking"
      );

    }

  }

  if (booking.status === "pending") {

    return (

      <div className="flex gap-3">

        <button
          onClick={() =>
            changeStatus("accepted")
          }
          className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
        >
          Accept
        </button>

        <button
          onClick={() =>
            changeStatus("rejected")
          }
          className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
        >
          Reject
        </button>

      </div>

    );

  }

  if (booking.status === "accepted") {

    return (

      <button
        onClick={() =>
          changeStatus("completed")
        }
        className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
      >
        Complete Service
      </button>

    );

  }

  return null;
}