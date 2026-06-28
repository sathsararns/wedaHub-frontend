import api from "../utils/api";

export const createBooking = (data) =>
  api.post("/bookings", data);

export const getProviderBookings = () =>
  api.get("/bookings");

export const updateBookingStatus = (id, status) =>
  api.put(`/bookings/${id}`, { status });

export const cancelBooking = (id) =>
  api.delete(`/bookings/${id}`);

export const rateBooking = (id, data) =>
  api.put(`/bookings/rate/${id}`, data);

export const getProviderRating = (id) =>
  api.get(`/bookings/rating/${id}`);