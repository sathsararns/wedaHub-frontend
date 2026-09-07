import { createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import socket from "../lib/socket";
import { useAuth } from "./AuthContext";

const SocketContext = createContext();

export function SocketProvider({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?._id) return;

    socket.connect();

    socket.emit("join-room", user._id);

    console.log("Socket Connected:", user._id);

    // ==========================
    // FORCE LOGOUT
    // ==========================

    socket.on("force-logout", (data) => {
      toast.error(
        data.message ||
          "Your account has been blocked."
      );

      logout();

      navigate("/login");
    });

    socket.on("user-unblocked", (data) => {
      toast.success(
        data.message ||
          "Your account has been activated."
      );
    });

    return () => {
      socket.off("force-logout");
      socket.off("user-unblocked");

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