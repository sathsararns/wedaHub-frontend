import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/admin/Sidebar";
import UserTable from "../../components/admin/UserTable";

import { getUsers } from "../../services/adminService";

export default function ManageUsersPage() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  async function loadUsers() {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      // Search
      const keyword = search.toLowerCase();

      const fullName =
        `${user.firstName} ${user.lastName}`.toLowerCase();

      const matchesSearch =
        fullName.includes(keyword) ||
        user.email.toLowerCase().includes(keyword);

      // Role
      const matchesRole =
        roleFilter === "all"
          ? true
          : user.role === roleFilter;

      // Status
      const matchesStatus =
        statusFilter === "all"
          ? true
          : statusFilter === "active"
          ? !user.isBlocked
          : user.isBlocked;

      return (
        matchesSearch &&
        matchesRole &&
        matchesStatus
      );
    });
  }, [users, search, roleFilter, statusFilter]);

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

        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Manage Users
        </h1>

        {/* Filters */}

        <div className="flex flex-col lg:flex-row gap-4 mb-8">

          {/* Search */}

          <div className="flex-1">

            <div className="relative">

              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              />

            </div>

          </div>

          {/* Role Filter */}

          <select
            value={roleFilter}
            onChange={(e) =>
              setRoleFilter(e.target.value)
            }
            className="px-4 py-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="all">
              All Roles
            </option>

            <option value="customer">
              Customer
            </option>

            <option value="provider">
              Provider
            </option>

            <option value="admin">
              Admin
            </option>

          </select>

          {/* Status Filter */}

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="px-4 py-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="all">
              All Status
            </option>

            <option value="active">
              Active
            </option>

            <option value="blocked">
              Blocked
            </option>

          </select>

        </div>

        <UserTable
          users={filteredUsers}
          refresh={loadUsers}
        />

      </main>

    </div>
  );
}