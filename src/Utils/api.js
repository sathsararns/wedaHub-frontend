import axios from "axios";
import { resolveAuthToken } from "./authToken.js";
import { API_URL } from "./config.js";

const api = axios.create({
  baseURL: API_URL,
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
