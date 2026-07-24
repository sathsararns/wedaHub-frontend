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

        {/* ✨ NEW: Reimagined Back Button - Floating Circular with Hover-Expand */}
        <button
          onClick={() => navigate("/admin-dashboard")}
          aria-label="Go back to dashboard"
          className="group mb-6 flex h-11 w-11 items-center justify-center rounded-full bg-white text-blue-600 shadow-md ring-1 ring-black/5 transition-all hover:w-36 hover:justify-start hover:gap-2 hover:px-4 hover:shadow-lg"
        >
          <ArrowLeft size={20} className="shrink-0 transition-transform group-hover:-translate-x-0.5" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all group-hover:max-w-[8rem] group-hover:opacity-100">
            Dashboard
          </span>
        </button>

        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Manage Bookings
        </h1>

        <BookingTable bookings={bookings} />

      </main>

    </div>
  );
}