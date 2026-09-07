import { createContext, useContext, useEffect, useState } from "react";
import defaultAvatar from "../assets/images/avatar.png";
import socket from "../lib/socket";

const AuthContext = createContext();

const DEFAULT_IMAGE = defaultAvatar;
const TOKEN_KEYS = ["token", "accessToken", "authToken", "jwt"];

const readStoredToken = () => {
  for (const key of TOKEN_KEYS) {
    const value = localStorage.getItem(key);
    if (value) return value;
  }
  return null;
};

const normalizeImage = (image) => {
  if (
    image &&
    image.trim() !== "" &&
    !image.includes("default-profile.png")
  ) {
    return image;
  }
  return DEFAULT_IMAGE;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = readStoredToken();
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);

        setToken(savedToken);
        setUser({
          ...parsedUser,
          image: normalizeImage(parsedUser.image),
        });
      } catch (err) {
        console.error("Failed to restore auth state:", err);
        localStorage.removeItem("user");
        TOKEN_KEYS.forEach((key) => localStorage.removeItem(key));
      }
    }
  }, []);

  useEffect(() => {
    if (user?._id) {
      socket.connect();
      socket.emit("join", user._id);
      console.log("Socket Joined :", user._id);
    }

    return () => {
      socket.disconnect();
    };
  }, [user]);

  const login = (data = {}) => {
    const resolvedToken =
      data.token || data.accessToken || data.authToken || data.jwt || null;

    const userId = data._id || data.id || data.user?._id || null;

    const userData = {
      _id: userId,
      token: resolvedToken,
      role: data.role || "",
      email: data.email || "",
      firstName: data.firstName || "",
      lastName: data.lastName || "",
      image: normalizeImage(data.image),
    };

    setToken(resolvedToken);
    setUser(userData);

    if (resolvedToken) {
      TOKEN_KEYS.forEach((key) => localStorage.setItem(key, resolvedToken));
    }

    localStorage.setItem("user", JSON.stringify(userData));
  };

  const updateUser = (updatedUser) => {
    setUser((prev) => {
      const newUser = {
        ...prev,
        ...updatedUser,
        image: normalizeImage(updatedUser?.image),
      };

      localStorage.setItem("user", JSON.stringify(newUser));
      return newUser;
    });
  };

  const logout = () => {
    socket.disconnect();

    setToken(null);
    setUser(null);

    TOKEN_KEYS.forEach((key) => localStorage.removeItem(key));
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);