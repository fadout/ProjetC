import { createContext, useState, useEffect } from "react";
import { getAccessToken, logout } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ isAuthenticated: !!getAccessToken() });

  useEffect(() => {
    if (!getAccessToken()) {
      setUser({ isAuthenticated: false });
    }
  }, []);

  const handleLogout = () => {
    logout();
    setUser({ isAuthenticated: false });
  };

  return (
    <AuthContext.Provider value={{ user, setUser, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};