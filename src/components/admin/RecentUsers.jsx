import { useEffect, useState } from "react";
import api from "../../utils/api";
import UserRow from "./UserRow";

export default function RecentUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      const res = await api.get("/admin/users");

      const sorted = res.data.sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      );

      setUsers(sorted.slice(0, 5));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-bold mb-5">
        Recent Users
      </h2>

      {users.length === 0 ? (
        <p className="text-gray-500">
          No users found
        </p>
      ) : (
        users.map((user) => (
          <UserRow
            key={user._id}
            user={user}
          />
        ))
      )}

    </div>
  );
}