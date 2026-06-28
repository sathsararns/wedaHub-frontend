import { io } from "socket.io-client";

// backend URL
export const socket = io("http://localhost:3000", {
  transports: ["websocket"],
});