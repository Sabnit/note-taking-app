import React from "react";
import { Link } from "react-router-dom";

import Button from "../../atoms/Button";
import { CLIENT_ROUTES } from "../../../constants/clientRoutes";

const HomeContent = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen px-6 text-center bg-gray-200 text-gray-800">
      <h1 className="text-3xl sm:text-5xl font-bold text-orange-400 mb-4">
        Welcome to <span className="text-gray-600">Notezy</span>
      </h1>

      <h2 className="text-lg sm:text-2xl font-medium text-gray-400 mb-6">
        Your personal note taking app to stay organized and in control.
      </h2>

      <p className="max-w-xl text-gray-400 text-base sm:text-lg mb-8">
        Let’s take a quick tour and get you started on a more productive day.
      </p>

      <Link to={CLIENT_ROUTES.AUTH_ROUTES.SIGNUP}>
        <Button className="rounded-full px-8 py-3"> Get Started</Button>
      </Link>
    </div>
  );
};

export default HomeContent;
