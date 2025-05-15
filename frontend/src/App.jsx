import React from "react";
import { Route, Routes } from "react-router-dom";

import ProtectedRoute from "./routes/ProtectedRoute";
import NotProtectedRoute from "./routes/NotProtectedRoute";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Welcome from "./pages/auth/Welcome";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

import { CLIENT_ROUTES } from "./constants/clientRoutes";
import Profile from "./pages/app/Profile";
import Note from "./pages/app/Note";
import Category from "./pages/app/Category";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <div>
      <Routes>
        {/* Public routes */}
        <Route element={<NotProtectedRoute />}>
          <Route path={CLIENT_ROUTES.WELCOME} element={<Welcome />}></Route>
          <Route
            path={CLIENT_ROUTES.AUTH_ROUTES.LOGIN}
            element={<Login />}
          ></Route>
          <Route
            path={CLIENT_ROUTES.AUTH_ROUTES.SIGNUP}
            element={<Signup />}
          ></Route>
          <Route
            path={CLIENT_ROUTES.AUTH_ROUTES.FORGOT_PASSWORD}
            element={<ForgotPassword />}
          ></Route>
          <Route
            path={CLIENT_ROUTES.AUTH_ROUTES.RESET_PASSWORD}
            element={<ResetPassword />}
          ></Route>
        </Route>

        {/* Protected routes */}
        <Route
          path={CLIENT_ROUTES.APP_ROUTE.PROFILE}
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path={CLIENT_ROUTES.APP_ROUTE.NOTES}
          element={
            <ProtectedRoute>
              <Note />
            </ProtectedRoute>
          }
        />

        <Route
          path={CLIENT_ROUTES.APP_ROUTE.CATEGORY}
          element={
            <ProtectedRoute>
              <Category />
            </ProtectedRoute>
          }
        />

        {/* Redirect any unknown routes to NotFound page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
