import React from "react";

const IconButton = ({ children, onClick, className = "", title, disabled }) => {
  const baseStyles =
    "cursor-pointer text-gray-400 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <button
      title={title}
      onClick={onClick}
      className={`${baseStyles} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default IconButton;
