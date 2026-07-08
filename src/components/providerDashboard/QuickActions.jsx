import { Link } from "react-router-dom";

export default function QuickActions() {
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-8">

      <h2 className="text-xl font-bold mb-5">
        Quick Actions
      </h2>

      <div className="flex flex-wrap gap-4">

        <Link
          to="/provider/requests"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Booking Requests
        </Link>

        <Link
          to="/profile"
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
        >
          View Profile
        </Link>

      </div>

    </div>
  );
}