import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import api from "../../utils/api";

import Sidebar from "../../components/admin/Sidebar";

export default function ManageMessagesPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    loadMessages();
  }, []);

  async function loadMessages() {
    try {
      const res = await api.get("/admin/messages");
      setMessages(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load messages");
    }
  }

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
          Messages
        </h1>

        <div className="bg-white rounded-xl shadow overflow-hidden">

          <table className="w-full">

            <thead className="bg-gray-200">

              <tr>

                <th className="p-4 text-left text-sm font-semibold text-gray-600">Name</th>

                <th className="p-4 text-left text-sm font-semibold text-gray-600">Email</th>

                <th className="p-4 text-left text-sm font-semibold text-gray-600">Phone</th>

                <th className="p-4 text-left text-sm font-semibold text-gray-600">Message</th>

                <th className="p-4 text-left text-sm font-semibold text-gray-600">Date</th>

              </tr>

            </thead>

            <tbody>

              {messages.map((msg) => (

                <tr key={msg._id} className="border-b hover:bg-gray-50">

                  <td className="p-4 text-sm">{msg.name}</td>

                  <td className="p-4 text-sm">{msg.email}</td>

                  <td className="p-4 text-sm">{msg.phone}</td>

                  <td className="p-4 text-sm">{msg.message}</td>

                  <td className="p-4 text-sm">{new Date(msg.createdAt).toLocaleString()}</td>

                </tr>

              ))}

              {messages.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-500">
                    No messages found
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </main>

    </div>
  );
}