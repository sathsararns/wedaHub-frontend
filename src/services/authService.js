import api from "../utils/api";
import { clearStoredAuth, storeToken } from "../Utils/authToken.js";

// =============================
// Register
// =============================

export const register = async (userData) => {
  const { data } = await api.post("/users/register", userData);
  return data;
};

// =============================
// Login
// =============================

export const login = async (userData) => {
  const { data } = await api.post("/users/login", userData);

  // save immediately
  if (data.token) {
    storeToken(data.token);
  }

  if (data._id) {
    localStorage.setItem(
      "user",
      JSON.stringify({
        _id: data._id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        role: data.role,
        image: data.image,
      })
    );
  }

  return data;
};

// =============================
// Profile
// =============================

export const getProfile = async () => {
  const { data } = await api.get("/users/profile");
  return data;
};

// =============================
// Logout
// =============================

export const logout = () => {
  clearStoredAuth();
};
