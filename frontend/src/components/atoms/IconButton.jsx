import React from "react";
import clsx from "clsx";

/**
 * Custom Button component
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - Button content
 * @param {string} [props.title] - Button title
 * @param {function} [props.onClick] - Click handler
 * @param {boolean} [props.disabled] - Disable the button
 * @param {'normal' | 'iconText' | 'pagination'} [props.variant] - Visual style of the button
 * @param {boolean} [props.stretch] - Stretch button
 * @param {string} [props.className] - Additional class names
 */

const IconButton = ({
  type = "button",
  title,
  children,
  onClick,
  variant = "normal",
  className = "",
  disabled,
}) => {
  const baseStyles = "cursor-pointer text-gray-400 hover:text-gray-700 ";

  const variants = {
    normal: "",
    iconText: "flex items-center gap-2 ",
    pagination:
      "flex items-center justify-center h-8 w-8 rounded-full border border-gray-200 bg-white  hover:bg-gray-50 active:bg-gray-100",
  };

  const iconButtonClass = clsx(
    variants[variant],
    baseStyles,
    disabled && "disabled:opacity-50 disabled:cursor-not-allowed",
    className
  );

  return (
    <button
      title={title}
      type={type}
      onClick={onClick}
      className={iconButtonClass}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default IconButton;
