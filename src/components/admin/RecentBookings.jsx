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
    <div className="bg-white rounded-xl shadow overflow-hidden">

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

        <table className="w-full">

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

      )}

    </div>
  );
}