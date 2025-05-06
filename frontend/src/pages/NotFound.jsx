import React from "react";
import { Link } from "react-router-dom";

import Button from "../components/atoms/Button";
import { CLIENT_ROUTES } from "../constants/clientRoutes";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-6">Oops! Page not found.</p>
      <>
        <Link to={CLIENT_ROUTES.WELCOME}>
          <Button>Back to Welcome Page</Button>
        </Link>
      </>
    </div>
  );
};

export default NotFound;
