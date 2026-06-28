import { useEffect, useState } from "react";
import {
  getUsers,
  blockUser,
  unblockUser,
} from "../../services/adminService";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    const res = await getUsers();
    setUsers(res.data);
  }

  async function handleBlock(id) {
    await blockUser(id);
    loadUsers();
  }

  async function handleUnblock(id) {
    await unblockUser(id);
    loadUsers();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Admin Dashboard
      </h1>

      <div className="space-y-3">
        {users.map((u) => (
          <div
            key={u._id}
            className="border p-4 rounded bg-white"
          >
            <p>
              <b>{u.firstName} {u.lastName}</b>
            </p>

            <p>{u.email}</p>
            <p>Role: {u.role}</p>

            <p>
              Status:{" "}
              {u.isBlocked ? "Blocked" : "Active"}
            </p>

            {!u.isBlocked ? (
              <button
                onClick={() => handleBlock(u._id)}
                className="bg-red-600 text-white px-3 py-1 rounded mt-2"
              >
                Block
              </button>
            ) : (
              <button
                onClick={() => handleUnblock(u._id)}
                className="bg-green-600 text-white px-3 py-1 rounded mt-2"
              >
                Unblock
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}