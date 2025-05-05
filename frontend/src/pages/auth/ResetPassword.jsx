import React from "react";
import { useParams } from "react-router-dom";

import NavBar from "../../components/organisms/auth/NavBar";
import ResetPasswordForm from "../../components/organisms/auth/ResetPasswordForm";

const ResetPassword = () => {
  const { token } = useParams();
  return (
    <>
      <NavBar />
      <ResetPasswordForm />
    </>
  );
};

export default ResetPassword;
