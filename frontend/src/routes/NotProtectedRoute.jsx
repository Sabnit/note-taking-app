import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { CLIENT_ROUTES } from "../constants/clientRoutes";

const NotProtectedRoute = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation();

  return isAuthenticated &&
    (location.pathname.includes("/auth") || location.pathname === "/") ? (
    <Navigate to={CLIENT_ROUTES.APP_ROUTE.NOTES} />
  ) : (
    <Outlet />
  );
};

export default NotProtectedRoute;
