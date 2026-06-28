import api from "../utils/api";

export const getUsers = () => api.get("/admin/users");

export const getBookings = () => api.get("/admin/bookings");

export const blockUser = (id) => api.put(`/admin/block/${id}`);

export const unblockUser = (id) => api.put(`/admin/unblock/${id}`);