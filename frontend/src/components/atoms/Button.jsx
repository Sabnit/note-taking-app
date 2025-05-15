import clsx from "clsx";
import React from "react";

/**
 * Custom Button component
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - Button content
 * @param {function} [props.onClick] - Click handler function, triggered when the button is clicked.
 * @param {boolean} [props.disabled] - Disable the button
 * @param {'primary' | 'secondary' | 'danger' | 'simple' | 'none'} [props.variant] - Visual style of the button
 * @param {'sm' | 'md' | 'lg'} [props.size] - Font size
 * @param {boolean} [props.stretch] - Stretch button
 * @param {string} [props.className] - Additional class names
 * @param {'button' | 'submit' | 'reset'} [props.type] - Type of the button
 */
const Button = ({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  size = "md",
  stretch = false,
  className = "",
  type = "button",
}) => {
  const baseStyles =
    "font-medium focus:outline-none focus:ring-1 transition-colors cursor-pointer rounded ";

  const variants = {
    primary:
      "bg-orange-400 hover:bg-orange-500 text-white focus:ring-blue-300 ",
    secondary:
      "bg-gray-200 hover:bg-gray-300 text-gray-600 focus:ring-gray-300 ",
    danger: "bg-red-400 hover:bg-red-500 text-white focus:ring-red-300",
    simple:
      "flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all",
    none: "",
  };

  const sizes = {
    sm: "text-sm px-3 py-1.5",
    md: "text-base px-4 py-2",
    lg: "text-lg px-5 py-3",
  };

  const buttonClass = clsx(
    baseStyles,
    variants[variant],
    sizes[size],
    stretch && "w-full",
    className,
    disabled && "disabled:opacity-50 disabled:cursor-not-allowed"
  );

  return (
    <button
      type={type}
      className={buttonClass}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
