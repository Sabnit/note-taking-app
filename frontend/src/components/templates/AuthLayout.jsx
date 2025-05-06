import React from "react";
import NavBar from "../organisms/auth/NavBar";

const AuthLayout = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

export default AuthLayout;
