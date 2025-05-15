import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { CLIENT_ROUTES } from "../constants/clientRoutes";
import { showToast } from "../utils/toast";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, handleTokenExpiration } = useContext(AuthContext);

  useEffect(() => {
    const handleAuthErrors = (event) => {
      const error = event.detail;
      console.log(event);
      // Check if this is an auth-related error
      if (error?.isRefreshTokenError || error?.status === 401) {
        showToast.error(error.message);
        handleTokenExpiration();
      }
    };

    // Add event listener for custom auth error events
    window.addEventListener("auth-error", handleAuthErrors);

    return () => {
      window.removeEventListener("auth-error", handleAuthErrors);
    };
  }, [handleTokenExpiration]);

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={CLIENT_ROUTES.AUTH_ROUTES.LOGIN} replace />;
  }

  // Render children if authenticated
  return children;
};

export default ProtectedRoute;
