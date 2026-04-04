import { createContext, useState, useEffect } from "react";
import api from "../services/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      if (token) {
        const response = await api.get("/auth/user/");
        setUser(response.data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      localStorage.removeItem("auth_token");
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    const response = await api.post("/auth/login/", credentials);
    localStorage.setItem("auth_token", response.data.token);
    setUser(response.data.user);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await api.post("/auth/logout/");
    localStorage.removeItem("auth_token");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
