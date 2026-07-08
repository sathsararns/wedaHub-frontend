import { useAuth } from "../../context/AuthContext";

export default function DashboardHeader() {
  const { user } = useAuth();

  return (
    <div className="bg-white rounded-xl shadow-md p-8 mb-8">
      <h1 className="text-3xl font-bold text-gray-800">
        Welcome Back, {user?.firstName} 👋
      </h1>

      <p className="text-gray-500 mt-2">
        Manage your bookings and customer requests.
      </p>
    </div>
  );
}