import React from "react";

const ErrorMessage = ({ children, className = "" }) => {
  return <p className={`text-sm text-red-600 mt-1 ${className}`}>{children}</p>;
};

export default ErrorMessage;
