import React from "react";

const Input = ({
  type = "text",
  id,
  name,
  value,
  placeholder,
  onChange,
  onBlur,
  className = "",
  error = false,
}) => {
  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
      className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-1 ${
        error
          ? "border-red-500 focus:border-red-500 focus:ring-red-200"
          : "border-gray-300 focus:border-orange-500 focus:ring-blue-200"
      } ${className} `}
    />
  );
};

export default Input;
