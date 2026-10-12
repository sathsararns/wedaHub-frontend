import { useCallback, useEffect, useState } from "react";
import defaultAvatar from "../assets/images/avatar.png";
import socket from "../lib/socket";
import { clearStoredAuth, readStoredSession, resolveAuthToken, storeToken, TOKEN_KEYS } from "../Utils/authToken.js";
import { AuthContext } from "./authState.js";

const DEFAULT_IMAGE = defaultAvatar;

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
  const [initialSession] = useState(() => readStoredSession());
  const [user, setUser] = useState(() => initialSession.user && {
    ...initialSession.user,
    image: normalizeImage(initialSession.user.image),
  });
  const [token, setToken] = useState(initialSession.token);

  useEffect(() => {
    const restoreSession = (event) => {
      if (event.key !== null && event.key !== "user" && !TOKEN_KEYS.includes(event.key)) return;
      const saved = readStoredSession();
      setToken(saved.token);
      setUser(saved.user && { ...saved.user, image: normalizeImage(saved.user.image) });
    };
    window.addEventListener("storage", restoreSession);
    return () => window.removeEventListener("storage", restoreSession);
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
    const userId = data._id || data.id || data.user?._id || null;
    const resolvedToken = resolveAuthToken({
      token: data.token || data.accessToken || data.authToken || data.jwt,
      user: { _id: userId },
      storage: null,
    });
    if (!resolvedToken) throw new Error("Login did not return a valid session. Please try again.");

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
      storeToken(resolvedToken);
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

  const logout = useCallback(() => {
    socket.disconnect();

    setToken(null);
    setUser(null);

    clearStoredAuth();
  }, []);

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
