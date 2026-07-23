import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import api from "../../utils/api";

import Sidebar from "../../components/admin/Sidebar";
import DashboardHeader from "../../components/admin/DashboardHeader";

export default function ManageMessagesPage() {

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

        <DashboardHeader />

        <div className="bg-white rounded-xl shadow overflow-hidden">

          <table className="w-full">

            <thead className="bg-gray-200">

              <tr>

                <th className="p-4 text-left">Name</th>

                <th className="p-4 text-left">Email</th>

                <th className="p-4 text-left">Phone</th>

                <th className="p-4 text-left">Message</th>

                <th className="p-4 text-left">Date</th>

              </tr>

            </thead>

            <tbody>

              {messages.map((msg) => (

                <tr
                  key={msg._id}
                  className="border-b"
                >

                  <td className="p-4">

                    {msg.name}

                  </td>

                  <td className="p-4">

                    {msg.email}

                  </td>

                  <td className="p-4">

                    {msg.phone}

                  </td>

                  <td className="p-4">

                    {msg.message}

                  </td>

                  <td className="p-4">

                    {new Date(msg.createdAt).toLocaleString()}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </main>

    </div>
  );
}