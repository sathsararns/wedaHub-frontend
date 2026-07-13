import { useEffect, useState } from "react";
import api from "../../utils/api";
import BookingRow from "./BookingRow";

export default function RecentBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadBookings();
  }, []);

  async function loadBookings() {
    try {
      const res = await api.get("/admin/bookings");

      const sorted = res.data.sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      );

      setBookings(sorted.slice(0, 5));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-bold mb-5">
        Recent Bookings
      </h2>

      {bookings.length === 0 ? (
        <p className="text-gray-500">
          No bookings found
        </p>
      ) : (
        bookings.map((booking) => (
          <BookingRow
            key={booking._id}
            booking={booking}
          />
        ))
      )}

    </div>
  );
}