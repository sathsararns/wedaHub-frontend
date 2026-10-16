import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CalendarX, RefreshCw } from "lucide-react";

import { getCustomerBookings } from "../../services/bookingService";
import BookingCard from "../bookings/BookingCard";
import socket from "../../lib/socket";
import { useAuth } from "../../hooks/useAuth.js";
import { resolveAuthToken } from "../../Utils/authToken.js";

export default function ChatBookingsPanel() {
  const { user, token, logout } = useAuth();
  const location = useLocation();
  const requestIdRef = useRef(0);

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [requiresLogin, setRequiresLogin] = useState(false);

  const loadBookings = useCallback(async () => {
    const requestId = ++requestIdRef.current;
    const resolvedToken = resolveAuthToken({ token, user });
    if (!user || !resolvedToken) {
      setBookings([]);
      setError("Please log in first to see your bookings.");
      setRequiresLogin(true);
      setLoading(false);
      setRefreshing(false);
      if (user) logout();
      return;
    }

    try {
      setError("");
      setRequiresLogin(false);
      setRefreshing(true);

      const data = await getCustomerBookings(resolvedToken);
      if (requestId !== requestIdRef.current) return;
      const normalized = Array.isArray(data)
        ? data
        : Array.isArray(data?.bookings)
          ? data.bookings
          : [];

      setBookings(normalized);
    } catch (err) {
      if (requestId !== requestIdRef.current) return;
      console.error("Failed to load bookings:", err?.response?.status || err?.message);
      setBookings([]);

      if (err?.response?.status === 401) {
        setRequiresLogin(true);
        setError("Session expired. Please log in again.");
        logout();
      } else {
        setError(err?.response?.data?.message || err?.message || "Failed to load bookings.");
      }
    } finally {
      if (requestId === requestIdRef.current) {
        setLoading(false);
        setRefreshing(false);
      }
    }
  }, [token, user, logout]);

  useEffect(() => {
    let active = true;
    queueMicrotask(() => {
      if (active) void loadBookings();
    });

    if (user && !socket.connected) socket.connect();

    const refresh = () => loadBookings();

    socket.on("new-booking", refresh);
    socket.on("booking-status-updated", refresh);

    return () => {
      active = false;
      requestIdRef.current += 1;
      socket.off("new-booking", refresh);
      socket.off("booking-status-updated", refresh);
    };
  }, [loadBookings, user]);

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
        {requiresLogin ? (
          <Link
            to="/login"
            state={{ from: location.pathname + location.search }}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700"
          >
            Log in
          </Link>
        ) : <button
          type="button"
          onClick={loadBookings}
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700"
        >
          <RefreshCw className="h-4 w-4" />
          Try again
        </button>}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
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
