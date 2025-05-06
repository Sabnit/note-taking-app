import React from "react";

import AuthLayout from "../../components/templates/AuthLayout";
import ResetPasswordForm from "../../components/organisms/auth/ResetPasswordForm";

const ResetPassword = () => {
  return (
    <>
      <AuthLayout>
        <ResetPasswordForm />
      </AuthLayout>
    </>
  );
};

export default ResetPassword;
