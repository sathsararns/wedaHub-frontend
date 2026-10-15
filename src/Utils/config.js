// Vite embeds these public URLs at build time; no server secrets belong here.
export const API_URL = (
  import.meta.env?.VITE_API_URL || "http://localhost:3000/api"
).replace(/\/+$/, "");

export const SOCKET_URL = new URL(API_URL).origin;
