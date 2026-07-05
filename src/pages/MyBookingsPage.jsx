import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import {
  getCustomerBookings,
} from "../services/bookingService";

import BookingCard from "../components/bookings/BookingCard";

export default function MyBookingsPage() {

  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadBookings();

  }, []);

  async function loadBookings() {

    try {

      const data =
        await getCustomerBookings();

      setBookings(data);

    } catch (err) {

      console.log(err);

      toast.error(
        "Failed to load bookings"
      );

    } finally {

      setLoading(false);

    }
  }

  if (loading) {

    return (
      <div className="min-h-screen flex justify-center items-center">

        <h2 className="text-xl font-semibold">
          Loading...
        </h2>

      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-6xl mx-auto px-5">

        <h1 className="text-4xl font-bold mb-8">

          My Bookings

        </h1>

        {bookings.length === 0 ? (

          <div className="bg-white rounded-xl shadow p-10 text-center">

            <h2 className="text-2xl font-semibold">

              No Bookings Yet

            </h2>

            <p className="text-gray-500 mt-2">

              Your bookings will appear here.

            </p>

          </div>

        ) : (

          <div className="space-y-6">

            {bookings.map((booking) => (

              <BookingCard
                key={booking._id}
                booking={booking}
              />

            ))}

          </div>

        )}

      </div>

    </section>
  );
}