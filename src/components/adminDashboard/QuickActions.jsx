import { Link } from "react-router-dom";

export default function QuickActions() {
  return (
    <div className="grid md:grid-cols-2 gap-6 mt-8">

      <Link
        to="/admin/users"
        className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition"
      >
        <h2 className="text-xl font-bold">
          👥 Manage Users
        </h2>

        <p className="text-gray-500 mt-2">
          View, edit and manage all users.
        </p>
      </Link>

      <Link
        to="/admin/bookings"
        className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition"
      >
        <h2 className="text-xl font-bold">
          📅 Manage Bookings
        </h2>

        <p className="text-gray-500 mt-2">
          View and manage all bookings.
        </p>
      </Link>

    </div>
  );
}