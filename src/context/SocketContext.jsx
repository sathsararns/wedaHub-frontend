import { createContext, useContext, useEffect } from "react";
import socket from "../lib/socket";
import { useAuth } from "./AuthContext";

const SocketContext = createContext();

export function SocketProvider({ children }) {
  const { user } = useAuth();

  useEffect(() => {
    if (!user?._id) return;

    socket.connect();

    socket.emit("join-room", user._id);

    console.log("Socket Connected:", user._id);

    return () => {
      socket.disconnect();
    };
  }, [user]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}