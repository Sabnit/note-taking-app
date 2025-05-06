import React from "react";

/**
 * Custom Button component
 *
 * @param {object} props
 * @param {'primary' | 'secondary' | 'danger' | 'simple' | 'note'} [props.variant] - Visual style of the button
 * @param {'button' | 'submit' | 'reset'} [props.type] - Type of the button
 * @param {string} [props.className] - Additional class names
 * @param {boolean} [props.disabled] - Disable the button
 * @param {function} [props.onClick] - Click handler
 * @param {React.ReactNode} props.children - Button content
 */
const Button = ({
  children,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
  onClick,
}) => {
  const baseStyles =
    "py-2 px-4 font-medium focus:outline-none focus:ring-1 transition-colors cursor-pointer";

  const variants = {
    primary:
      "bg-orange-400 hover:bg-orange-500 text-white focus:ring-blue-300 rounded",
    secondary:
      "bg-gray-200 hover:bg-gray-300 text-white focus:ring-gray-300 rounded",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-300",
    simple:
      "flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all",
    note: "hover:bg-gray-200 flex items-center gap-2 font-medium cursor-pointer",
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${className}
      ${disabled ? "opacity-50 cursor-not-allowed" : ""} `}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
