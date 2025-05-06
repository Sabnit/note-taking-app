import React from "react";

import AuthLayout from "../../components/templates/AuthLayout";
import WelcomeScreen from "../../components/organisms/auth/WelcomeScreen";

const Welcome = () => {
  return (
    <>
      <AuthLayout>
        <WelcomeScreen />
      </AuthLayout>
    </>
  );
};

export default Welcome;
