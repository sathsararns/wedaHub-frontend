// Docker uses the same-origin /api proxy; Vercel and direct Vite development
// can still configure an absolute backend URL.
export function resolveApiUrls(apiUrl, origin = "http://localhost:5173") {
  const api = (apiUrl || "http://localhost:3000/api").replace(/\/+$/, "");
  return { api, socket: new URL(api, origin).origin };
}

const urls = resolveApiUrls(import.meta.env?.VITE_API_URL, globalThis.location?.origin);
export const API_URL = urls.api;
export const SOCKET_URL = urls.socket;
