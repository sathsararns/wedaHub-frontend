import api from "../utils/api";

// Dashboard
export const getDashboard = async () => {
  const res = await api.get("/admin/dashboard");
  return res.data;
};

// Users
export const getUsers = async () => {
  const res = await api.get("/admin/users");
  return res.data;
};

// Bookings
export const getBookings = async () => {
  const res = await api.get("/admin/bookings");
  return res.data;
};

// Block User
export const blockUser = async (id) => {
  const res = await api.put(`/admin/block/${id}`);
  return res.data;
};

// Unblock User
export const unblockUser = async (id) => {
  const res = await api.put(`/admin/unblock/${id}`);
  return res.data;
};