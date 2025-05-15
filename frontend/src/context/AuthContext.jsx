import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { logout } from "../services/authService";
import { getCurrentUser } from "../services/user";
import { CLIENT_ROUTES } from "../constants/clientRoutes";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData.data);
        setIsAuthenticated(true);
      } catch (error) {
        if (error?.isAuthError || error?.isRefreshTokenError) {
          setUser(null);
          setIsAuthenticated(false);
        }
      }
    };
    checkAuthStatus();
  }, []);

  // Logout function
  const userLogout = async () => {
    await logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  // Handle token expiration
  const handleTokenExpiration = () => {
    setUser(null);
    setIsAuthenticated(false);
    navigate(CLIENT_ROUTES.AUTH_ROUTES.LOGIN);
  };

  const contextValue = {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    userLogout,
    handleTokenExpiration,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
