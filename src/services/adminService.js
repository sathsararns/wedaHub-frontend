import api from "../utils/api";

export const getAdminStats = async () => {
  const res = await api.get("/admin/stats");
  return res.data;
};

export const getUsers = async () => {
  const res = await api.get("/admin/users");
  return res.data;
};

export const getBookings = async () => {
  const res = await api.get("/admin/bookings");
  return res.data;
};

export const blockUser = async (id) => {
  const res = await api.put(`/admin/block/${id}`);
  return res.data;
};

export const unblockUser = async (id) => {
  const res = await api.put(`/admin/unblock/${id}`);
  return res.data;
};