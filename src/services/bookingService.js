import api from "../utils/api";

const authConfig = (authToken) =>
  authToken
    ? {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    : undefined;

// ===============================
// Create Booking
// ===============================
export const createBooking = async (bookingData, authToken = null) => {
  const res = await api.post("/bookings", bookingData, authConfig(authToken));
  return res.data;
};

// ===============================
// Customer Bookings
// ===============================
export async function getCustomerBookings(authToken = null) {
  const { data } = await api.get("/bookings/customer", authConfig(authToken));
  return data;
}

// ===============================
// Provider Bookings
// ===============================
export const getProviderBookings = async (authToken = null) => {
  const res = await api.get("/bookings/provider", authConfig(authToken));
  return res.data;
};

// Accept / Reject / Complete Booking
export const updateBookingStatus = async (id, status, authToken = null) => {
  const res = await api.put(
    `/bookings/${id}`,
    { status },
    authConfig(authToken)
  );
  return res.data;
};

// Cancel Booking
export const cancelBooking = async (id, authToken = null) => {
  const res = await api.delete(`/bookings/${id}`, authConfig(authToken));
  return res.data;
};

// Rate Booking
export const rateBooking = async (id, data, authToken = null) => {
  const res = await api.put(`/bookings/rate/${id}`, data, authConfig(authToken));
  return res.data;
};

// Provider Rating
export const getProviderRating = async (id, authToken = null) => {
  const res = await api.get(`/bookings/rating/${id}`, authConfig(authToken));
  return res.data;
};

export const completeBooking = async (id, authToken = null) => {
  const res = await api.put(
    `/bookings/complete/${id}`,
    {},
    authConfig(authToken)
  );
  return res.data;
};