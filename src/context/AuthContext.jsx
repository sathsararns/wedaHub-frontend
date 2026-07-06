import { createContext, useContext, useState, useEffect } from "react";
import defaultAvatar from "../assets/images/avatar.png";
import socket from "../lib/socket";

const AuthContext = createContext();

const DEFAULT_IMAGE = defaultAvatar;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Load saved login
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      const parsedUser = JSON.parse(savedUser);

      setToken(savedToken);

      setUser({
        ...parsedUser,
        image:
          parsedUser.image &&
          parsedUser.image.trim() !== "" &&
          !parsedUser.image.includes("default-profile.png")
            ? parsedUser.image
            : DEFAULT_IMAGE,
      });
    }
  }, []);

  // Socket connection
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

  // Login
  const login = (data) => {
    const userData = {
      _id: data._id,
      token: data.token,
      role: data.role,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      image:
        data.image &&
        data.image.trim() !== "" &&
        !data.image.includes("default-profile.png")
          ? data.image
          : DEFAULT_IMAGE,
    };

    setToken(data.token);
    setUser(userData);

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Update profile
  const updateUser = (updatedUser) => {
    setUser((prev) => {
      const newUser = {
        ...prev,
        ...updatedUser,
        image:
          updatedUser.image &&
          updatedUser.image.trim() !== "" &&
          !updatedUser.image.includes("default-profile.png")
            ? updatedUser.image
            : DEFAULT_IMAGE,
      };

      localStorage.setItem("user", JSON.stringify(newUser));

      return newUser;
    });
  };

  // Logout
  const logout = () => {
    socket.disconnect();

    setToken(null);
    setUser(null);

    localStorage.removeItem("token");
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