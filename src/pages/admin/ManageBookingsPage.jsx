import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/admin/Sidebar";
import BookingTable from "../../components/admin/BookingTable";

import { getBookings } from "../../services/adminService";

export default function ManageBookingsPage() {

  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);

  async function loadBookings() {
  try {
    const data = await getBookings();

    setBookings(data);
  } catch (err) {
    console.log(err);
    setBookings([]);
  }
}

  useEffect(() => {
    loadBookings();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex">

      <Sidebar />

      <main className="flex-1 p-8">

        <button
          onClick={() => navigate("/admin-dashboard")}
          className="flex items-center gap-2 text-blue-600 mb-6"
        >
          <ArrowLeft size={20}/>
          Back
        </button>

        <h1 className="text-3xl font-bold mb-6">
          Manage Bookings
        </h1>

        <BookingTable bookings={bookings} />

      </main>

    </div>
  );
}