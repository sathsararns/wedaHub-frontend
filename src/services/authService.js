import api from "../Utils/api";

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
    localStorage.setItem("token", data.token);
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
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};