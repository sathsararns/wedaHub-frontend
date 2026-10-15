import axios from "axios";
import { resolveAuthToken } from "./authToken.js";

const api = axios.create({
  baseURL: import.meta.env?.VITE_API_URL || "http://localhost:3000/api",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    config.headers = config.headers || {};
    const token = resolveAuthToken({
      token: config.headers.Authorization || config.headers.authorization,
    });
    delete config.headers.authorization;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
