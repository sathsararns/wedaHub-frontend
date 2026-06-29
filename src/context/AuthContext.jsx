import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const DEFAULT_IMAGE =
  "https://YOUR-DEFAULT-IMAGE-LINK.png"; // 👈 ඔයාගේ online PNG link එක

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (data) => {
    const userData = {
      token: data.token,
      role: data.role,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      image: data.image || DEFAULT_IMAGE,
    };

    setToken(data.token);
    setUser(userData);

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // 🔥 Profile update එකෙන් පස්සේ මේක call කරන්න
  const updateUser = (updatedUser) => {
    setUser((prev) => {
      const newUser = {
        ...prev,
        ...updatedUser,
      };

      localStorage.setItem("user", JSON.stringify(newUser));

      return newUser;
    });
  };

  const logout = () => {
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