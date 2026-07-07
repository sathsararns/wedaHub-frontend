import api from "../utils/api";

// ===============================
// Create Booking
// ===============================
export const createBooking = async (bookingData) => {
  const res = await api.post("/bookings", bookingData);
  return res.data;
};

// ===============================
// Customer Bookings
// ===============================
export const getCustomerBookings = async () => {
  const res = await api.get("/bookings/customer");
  return res.data;
};

// ===============================
// Provider Bookings
// ===============================
export const getProviderBookings = async () => {
  const res = await api.get("/bookings/provider");
  return res.data;
};

// ===============================
// (Coming in next parts)
// ===============================

// Accept / Reject / Complete Booking
export const updateBookingStatus = async (id, status) => {
  const res = await api.put(`/bookings/${id}`, { status });
  return res.data;
};

// Cancel Booking
export const cancelBooking = async (id) => {
  const res = await api.delete(`/bookings/${id}`);
  return res.data;
};

// Rate Booking
export const rateBooking = async (id, data) => {
  const res = await api.put(`/bookings/rate/${id}`, data);
  return res.data;
};

// Provider Rating
export const getProviderRating = async (id) => {
  const res = await api.get(`/bookings/rating/${id}`);
  return res.data;
};

export const completeBooking = async (id) => {
  const res = await api.put(`/bookings/complete/${id}`);
  return res.data;
};