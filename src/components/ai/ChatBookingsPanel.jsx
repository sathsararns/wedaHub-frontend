import { useEffect, useState } from "react";
import { CalendarX } from "lucide-react";
import toast from "react-hot-toast";

import { getCustomerBookings } from "../../services/bookingService";
import BookingCard from "../bookings/BookingCard";
import socket from "../../lib/socket";

export default function ChatBookingsPanel() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadBookings() {
    try {
      const data = await getCustomerBookings();
      setBookings(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBookings();

    socket.on("booking-status-updated", loadBookings);
    socket.on("new-booking", loadBookings);

    return () => {
      socket.off("booking-status-updated", loadBookings);
      socket.off("new-booking", loadBookings);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex h-[500px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-b-2 border-zinc-900"></div>

          <p className="mt-4 text-zinc-500">
            Loading bookings...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl">

      <div className="mb-8 flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold text-zinc-900">
            My Bookings
          </h1>

          <p className="mt-2 text-zinc-500">
            Track and manage all your service bookings.
          </p>
        </div>

        {bookings.length > 0 && (
          <span className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white">
            {bookings.length} Total
          </span>
        )}

      </div>

      {bookings.length === 0 ? (

        <div className="rounded-3xl border border-zinc-200 bg-white p-14 text-center shadow-sm">

          <CalendarX className="mx-auto h-14 w-14 text-zinc-300" />

          <h2 className="mt-5 text-2xl font-bold text-zinc-900">
            No Bookings Yet
          </h2>

          <p className="mt-2 text-zinc-500">
            Your bookings will appear here once you book a service.
          </p>

        </div>

      ) : (

        <div className="space-y-5">

          {bookings.map((booking) => (
            <BookingCard
              key={booking._id}
              booking={booking}
            />
          ))}

        </div>

      )}

    </div>
  );
}