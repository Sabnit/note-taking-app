import { createContext, useEffect, useState } from "react";
import { getCurrentUser } from "../services/user";

import { API_ENDPOINTS } from "../constants/apiEndpoints";
import api from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData.data);
        setIsAuthenticated(true);
      } catch (error) {
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuthStatus();
  }, []);

  // Logout function
  const logout = async () => {
    await api.post(API_ENDPOINTS.AUTH_ROUTES.LOGOUT);
    setUser(null);
    setIsAuthenticated(false);
  };

  const contextValue = {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    loading,
    setLoading,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
