import React from "react";
import { Link, useLocation } from "react-router-dom";

import { assets } from "../../../assets/assets";
import Button from "../../atoms/Button";
import { CLIENT_ROUTES } from "../../../constants/clientRoutes";

const NavBar = () => {
  const location = useLocation();
  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0">
      <Link to="/">
        <img
          src={assets.logo}
          alt="logo"
          className="w-28 sm:w-32 cursor-pointer"
        />
      </Link>
      {location.pathname == "/" && (
        <Link to={CLIENT_ROUTES.AUTH_ROUTES.LOGIN}>
          <Button variant="simple" className="">
            Login
            <img src={assets.arrow_icon} alt="arrow_icon" />
          </Button>
        </Link>
      )}
    </div>
  );
};

export default NavBar;
