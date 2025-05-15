import React, { useContext } from "react";
import { AppUIContext } from "../../../context/AppUIContext";

const SidebarWrapper = ({ children }) => {
  const { isSidebarOpen } = useContext(AppUIContext);

  return (
    <aside
      className={`${
        isSidebarOpen ? "w-64" : "w-0"
      }  border-r border-gray-200 flex flex-col h-screen bg-neutral-50 transition-all duration:300 overflow-hidden`}
    >
      {children}
    </aside>
  );
};

export default SidebarWrapper;
