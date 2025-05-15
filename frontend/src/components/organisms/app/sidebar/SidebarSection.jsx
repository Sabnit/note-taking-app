import React from "react";

const SidebarSection = ({ children, className }) => {
  return <div className={`my-2 ${className}`}>{children}</div>;
};

export default SidebarSection;
