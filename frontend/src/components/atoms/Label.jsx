import React from "react";

const Label = ({ children, id }) => {
  return (
    <label htmlFor={id} className="block text-sm/6 font-medium text-gray-900">
      {children}
    </label>
  );
};

export default Label;
