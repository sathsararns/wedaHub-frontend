import api from "../utils/api";

// Register User
export const register = async (userData) => {
  const response = await api.post("/users/register", userData);
  return response.data;
};

// Login User
export const login = async (userData) => {
  const response = await api.post("/users/login", userData);
  return response.data;
};

// Get Logged-in User
export const getProfile = async () => {
  const response = await api.get("/users/profile");
  return response.data;
};

// Logout (Frontend)
export const logout = () => {
  localStorage.removeItem("token");
};