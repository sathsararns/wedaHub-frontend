import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/admin/Sidebar";
import UserTable from "../../components/admin/UserTable";

import { getUsers } from "../../services/adminService";

export default function ManageUsersPage() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  async function loadUsers() {
  try {
    const data = await getUsers();

    console.log("Users :", data);

    setUsers(data);
  } catch (err) {
    console.log(err);
  }
}

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />

      <main className="flex-1 p-8">
        <button
          onClick={() => navigate("/admin-dashboard")}
          className="flex items-center gap-2 text-blue-600 mb-6"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <h1 className="text-3xl font-bold mb-6">
          Manage Users
        </h1>

        <UserTable
          users={users}
          refresh={loadUsers}
        />
      </main>
    </div>
  );
}