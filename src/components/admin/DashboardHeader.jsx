import { useAuth } from "../../context/AuthContext";
import UserAvatar from "../navbar/UserAvatar";

export default function DashboardHeader() {
  const { user } = useAuth();

  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex justify-between items-center">

      <div>

        <h1 className="text-3xl font-bold text-[#07184B]">
          Admin Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome back, {user?.firstName}
        </p>

      </div>

      <div className="flex items-center gap-4">

        <div className="text-right">

          <p className="font-semibold">
            {user?.firstName} {user?.lastName}
          </p>

          <p className="text-sm text-gray-500">
            Administrator
          </p>

        </div>

        <UserAvatar />

      </div>

    </div>
  );
}