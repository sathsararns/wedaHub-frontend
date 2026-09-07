import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  withCredentials: true,
});

const getStoredToken = () =>
  localStorage.getItem("token") ||
  localStorage.getItem("accessToken") ||
  localStorage.getItem("authToken") ||
  localStorage.getItem("jwt");

api.interceptors.request.use(
  (config) => {
    const token = getStoredToken();

    config.headers = config.headers || {};

    if (
      token &&
      !config.headers.Authorization &&
      !config.headers.authorization
    ) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;