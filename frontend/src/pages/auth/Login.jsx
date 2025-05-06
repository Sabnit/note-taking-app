import React from "react";

import AuthLayout from "../../components/templates/AuthLayout";
import LoginForm from "../../components/organisms/auth/LoginForm";

const Login = () => {
  return (
    <>
      <AuthLayout>
        <LoginForm />
      </AuthLayout>
    </>
  );
};

export default Login;
