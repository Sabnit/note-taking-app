import React from "react";

const Label = ({ children, id, className }) => {
  return (
    <label
      htmlFor={id}
      className={`block text-sm/6 font-medium text-gray-900 ${className}`}
    >
      {children}
    </label>
  );
};

export default Label;
