import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { CLIENT_ROUTES } from "../constants/clientRoutes";

const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={CLIENT_ROUTES.AUTH_ROUTES.LOGIN} />
  );
};

export default ProtectedRoute;
