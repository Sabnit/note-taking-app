// import React from "react";

// const Button = ({
//   children,
//   type = "button",
//   variant = "primary",
//   className = "",
//   disabled = false,
//   onClick,
// }) => {
//   const baseStyles =
//     " font-medium focus:outline-none focus:ring-1 transition-colors cursor-pointer";

//   const variants = {
//     primary:
//       "py-2 px-4 bg-orange-400 hover:bg-orange-500 text-white focus:ring-blue-300 rounded",
//     secondary:
//       "py-2 px-4 bg-gray-200 hover:bg-gray-300 text-white focus:ring-gray-300 rounded",
//     danger:
//       "py-2 px-4 bg-red-600 hover:bg-red-700 text-white focus:ring-red-300",
//     simple:
//       "py-2 px-4 flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all",
//     note: "hover:bg-gray-200 flex items-center gap-2 font-medium cursor-pointer",
//   };

//   return (
//     <button
//       type={type}
//       className={`${baseStyles} ${variants[variant]} ${className}
//       ${disabled ? "opacity-50 cursor-not-allowed" : ""} `}
//       disabled={disabled}
//       onClick={onClick}
//     >
//       {children}
//     </button>
//   );
// };

// export default Button;

import React from "react";

/**
 * Reusable Button component with multiple variants
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.type - Button type (button, submit, reset)
 * @param {string} props.variant - Button style variant
 * @param {string} props.size - Button size
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.disabled - Disabled state
 * @param {boolean} props.fullWidth - Whether button should take full width
 * @param {Function} props.onClick - Click handler
 * @param {React.ReactNode} props.leftIcon - Icon to display before text
 * @param {React.ReactNode} props.rightIcon - Icon to display after text
 */
const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  fullWidth = false,
  onClick,
  leftIcon,
  rightIcon,
}) => {
  // Base styles applied to all buttons
  const baseStyles = "font-medium focus:outline-none transition-colors rounded";

  // Size variations
  const sizeStyles = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3",
  };

  // Style variations
  const variants = {
    // Main CTAs
    primary:
      "bg-orange-400 hover:bg-orange-500 text-white focus:ring-1 focus:ring-orange-300",
    secondary:
      "bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-1 focus:ring-gray-300",
    danger:
      "bg-red-600 hover:bg-red-700 text-white focus:ring-1 focus:ring-red-300",

    // Special styles
    simple:
      "border border-gray-500 rounded-full text-gray-800 hover:bg-gray-100",

    // Navigation & utility buttons
    note: "hover:bg-gray-200 text-gray-800",
    link: "text-gray-800 hover:bg-gray-300 text-left ",
    outline: "border border-gray-300 text-gray-800 hover:bg-gray-50",

    // Form actions
    task: "bg-[#f1c98b] hover:bg-[#e2bc82] text-white",
    ghost: "text-neutral-600 hover:bg-neutral-50",
  };

  // Construct the final className
  const buttonClasses = [
    baseStyles,
    variants[variant] || variants.primary,
    sizeStyles[size] || sizeStyles.md,
    fullWidth ? "w-full" : "",
    disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Check for icon alignment
  const hasIcons = leftIcon || rightIcon;
  const contentClasses = hasIcons
    ? "flex items-center gap-2 justify-center"
    : "";

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
    >
      <span className={contentClasses}>
        {leftIcon && leftIcon}
        {children}
        {rightIcon && rightIcon}
      </span>
    </button>
  );
};

export default Button;
