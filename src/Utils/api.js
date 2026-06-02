//axios interceptor


import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL  // Use environment variable or fallback to localhost
});

export default api; 