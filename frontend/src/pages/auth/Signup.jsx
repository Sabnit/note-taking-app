import React from "react";

import AuthLayout from "../../components/templates/AuthLayout";
import SignupForm from "../../components/organisms/auth/SignupForm";

const Signup = () => {
  return (
    <>
      <AuthLayout>
        <SignupForm />
      </AuthLayout>
    </>
  );
};

export default Signup;
