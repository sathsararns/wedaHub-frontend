import React, { useCallback, useEffect, useState } from "react";
import { CalendarX, RefreshCw } from "lucide-react";

import { getCustomerBookings } from "../../services/bookingService";
import BookingCard from "../bookings/BookingCard";
import socket from "../../lib/socket";
import { useAuth } from "../../context/AuthContext";

const getToken = (authToken, user) =>
  authToken ||
  user?.token ||
  localStorage.getItem("token") ||
  localStorage.getItem("accessToken") ||
  localStorage.getItem("authToken");

export default function ChatBookingsPanel() {
  const { user, token } = useAuth();
  const resolvedToken = getToken(token, user);

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const loadBookings = useCallback(async () => {
    if (!resolvedToken) {
      setBookings([]);
      setError("Please log in first to see your bookings.");
      setLoading(false);
      setRefreshing(false);
      return;
    }

    try {
      setError("");
      setRefreshing(true);

      const data = await getCustomerBookings(resolvedToken);
      const normalized = Array.isArray(data)
        ? data
        : Array.isArray(data?.bookings)
          ? data.bookings
          : [];

      setBookings(normalized);
    } catch (err) {
      console.error("Failed to load bookings:", err);
      setBookings([]);

      if (err?.response?.status === 401) {
        setError("Session expired. Please log in again.");
      } else {
        setError(err?.message || "Failed to load bookings.");
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [resolvedToken]);

  useEffect(() => {
    loadBookings();

    if (!socket.connected) socket.connect();

    const refresh = () => loadBookings();

    socket.on("new-booking", refresh);
    socket.on("booking-status-updated", refresh);

    return () => {
      socket.off("new-booking", refresh);
      socket.off("booking-status-updated", refresh);
    };
  }, [loadBookings]);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-900" />
          <p className="mt-4 text-sm text-zinc-500">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-center">
        <p className="text-sm font-medium text-rose-700">{error}</p>
        <button
          type="button"
          onClick={loadBookings}
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700"
        >
          <RefreshCw className="h-4 w-4" />
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-semibold tracking-tight text-zinc-900">
            My bookings
          </h1>
          <p className="mt-1.5 text-[14px] text-zinc-500">
            Track visits, reschedule, or rebook a provider you liked.
          </p>
        </div>

        <button
          type="button"
          onClick={loadBookings}
          className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
        >
          <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {bookings.length === 0 ? (
        <div className="flex min-h-[40vh] items-center justify-center rounded-3xl border border-dashed border-zinc-200 bg-white p-10 text-center">
          <div>
            <CalendarX className="mx-auto h-12 w-12 text-zinc-300" />
            <h2 className="mt-4 text-lg font-semibold text-zinc-900">
              No bookings yet
            </h2>
            <p className="mt-2 text-sm text-zinc-500">
              Your confirmed bookings will appear here.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          {bookings.map((booking) => (
            <BookingCard key={booking._id || booking.id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );
}