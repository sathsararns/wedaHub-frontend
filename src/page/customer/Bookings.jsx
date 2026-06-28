import { useEffect, useState } from "react";
import { getCustomerBookings } from "../../services/bookingService";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    const res = await getCustomerBookings();
    setBookings(res.data);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        My Bookings
      </h1>

      <div className="space-y-4">
        {bookings.map((b) => (
          <div key={b._id} className="p-4 bg-white shadow rounded">
            <h2 className="font-bold">{b.serviceName}</h2>
            <p>Status: {b.status}</p>
            <p>Provider: {b.providerId?.firstName}</p>
          </div>
        ))}
      </div>
    </div>
  );
}