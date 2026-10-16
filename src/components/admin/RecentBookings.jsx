import { useEffect, useState } from "react";
import api from "../../Utils/api";
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
    <div className="min-w-0 bg-white rounded-xl shadow overflow-hidden">

      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold">
          Recent Bookings
        </h2>
      </div>

      {bookings.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          No bookings found
        </div>
      ) : (

        <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Recent bookings table, scroll horizontally to see all columns">
        <table className="w-full min-w-[600px]">

          <thead className="bg-gray-200">

            <tr>

              <th className="p-4 text-left">
                Customer
              </th>

              <th className="p-4 text-left">
                Provider
              </th>

              <th className="p-4 text-left">
                Service
              </th>

              <th className="p-4 text-left">
                Date
              </th>

              <th className="p-4 text-left">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {bookings.map((booking) => (
              <BookingRow
                key={booking._id}
                booking={booking}
              />
            ))}

          </tbody>

        </table>
        </div>

      )}

    </div>
  );
}
