import React from "react";

import AuthLayout from "../../components/templates/AuthLayout";
import ForgotPasswordForm from "../../components/organisms/auth/ForgotPasswordForm";

const ForgotPassword = () => {
  return (
    <>
      <AuthLayout>
        <ForgotPasswordForm />
      </AuthLayout>
    </>
  );
};

export default ForgotPassword;
