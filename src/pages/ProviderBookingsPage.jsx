import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

import { getProviderBookings } from "../services/bookingService";
import BookingRequestCard from "../components/providerBookings/BookingRequestCard";
import socket from "../lib/socket";

export default function ProviderBookingsPage() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadBookings() {
    try {
      setLoading(true);

      const data = await getProviderBookings();

      setBookings(data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBookings();

    socket.on("booking-status-updated", () => {
      loadBookings();
    });

    socket.on("new-booking", () => {
      loadBookings();
    });

    return () => {
      socket.off("booking-status-updated");
      socket.off("new-booking");
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-xl font-semibold">
          Loading Bookings...
        </h2>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-5">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 transition"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <h1 className="text-4xl font-bold mb-8">
          Incoming Bookings
        </h1>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-10 text-center">
            <h2 className="text-2xl font-semibold">
              No Booking Requests
            </h2>

            <p className="text-gray-500 mt-2">
              New customer bookings will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <BookingRequestCard
                key={booking._id}
                booking={booking}
                onStatusChanged={loadBookings}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}