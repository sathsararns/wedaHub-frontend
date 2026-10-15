import { io } from "socket.io-client";
import { SOCKET_URL } from "../Utils/config.js";

const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  autoConnect: false,
});

export default socket;
