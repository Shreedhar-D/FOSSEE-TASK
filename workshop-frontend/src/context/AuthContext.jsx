import { createContext, useState, useEffect } from "react";
import api from "../services/api";

export const AuthContext = createContext();

// to handle ESLint warning about props validation
// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // updating checkAuth, acc to the API response structure
  const checkAuth = async () => {
    try {
      const response = await api.get("/api/user/");
      if (response.data.success) {
        setUser(response.data.user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      // user is not authenticated, that's ok
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // updating login to handle API response correctly
  const login = async (credentials) => {
    const response = await api.post("/api/login/", credentials);
    if (response.data.success) {
      setUser(response.data.user);
      setIsAuthenticated(true);
    } else {
      throw new Error(response.data.error);
    }
  };

  // logout should call the API to invalidate the session, but we clear state regardless of API response
  const logout = async () => {
    try {
      await api.post("/api/logout/");
    } catch (error) {
      // logout error, but clear anyway
    }
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
