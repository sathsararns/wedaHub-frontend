import { Link } from "react-router-dom";
import {
  Users,
  CalendarCheck,
  Mail,
} from "lucide-react";

export default function QuickActions() {
  return (
    <div className="mt-6 rounded-xl bg-white p-4 shadow-md sm:mt-8 sm:p-6">

      <h2 className="text-2xl font-bold mb-5">
        Quick Actions
      </h2>

      <div className="grid grid-cols-1 gap-3 xl:grid-cols-3 sm:gap-5">

        <Link
          to="/admin/users"
          className="flex items-center gap-4 p-5 rounded-xl bg-blue-50 hover:bg-blue-100 transition"
        >
          <Users
            className="text-blue-600"
            size={32}
          />

          <div>
            <h3 className="font-bold">
              Manage Users
            </h3>

            <p className="text-sm text-gray-500">
              View all customers and providers
            </p>
          </div>

        </Link>

        <Link
          to="/admin/bookings"
          className="flex items-center gap-4 p-5 rounded-xl bg-green-50 hover:bg-green-100 transition"
        >
          <CalendarCheck
            className="text-green-600"
            size={32}
          />

          <div>
            <h3 className="font-bold">
              Manage Bookings
            </h3>

            <p className="text-sm text-gray-500">
              View all booking requests
            </p>
          </div>

        </Link>

        <Link
          to="/admin/messages"
          className="flex items-center gap-4 p-5 rounded-xl bg-orange-50 hover:bg-orange-100 transition"
        >
          <Mail
            className="text-orange-600"
            size={32}
          />

          <div>
            <h3 className="font-bold">
              Contact Messages
            </h3>

            <p className="text-sm text-gray-500">
              View customer messages
            </p>
          </div>
        </Link>

      </div>

    </div>
  );
}
