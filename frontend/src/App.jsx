import React from "react";
import { Route, Routes } from "react-router-dom";

import ProtectedRoute from "./routes/ProtectedRoute";
import NotProtectedRoute from "./routes/NotProtectedRoute";

import Home from "./pages/auth/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
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
          <Route path={CLIENT_ROUTES.HOME} element={<Home />}></Route>
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
        <Route element={<ProtectedRoute />}>
          <Route path={CLIENT_ROUTES.APP_ROUTE.PROFILE} element={<Profile />} />
          <Route path={CLIENT_ROUTES.APP_ROUTE.NOTES} element={<Note />} />

          <Route
            path={CLIENT_ROUTES.APP_ROUTE.CATEGORY}
            element={<Category />}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
