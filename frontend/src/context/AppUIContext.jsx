import React, { createContext, useState } from "react";

/**
 * Context to manage app UI
 * @typedef {object} AppUIContextType
 * @property {boolean} isSidebarOpen - Indicates whether the Sidebar is open
 * @property {function(boolean): void} setIsSidebarOpen - Setter to control Sidebar state
 * @property {boolean} isSearchModalOpen - Indicates whether the SearchModal is open
 * @property {function(boolean) : void} setIsSearchModalOpen - Setter to control SearchModal state
 */

/**
 * @type {React.Context<AppUIContextType>}
 */
export const AppUIContext = createContext();

/**
 *
 * @param {{children: React.ReactNode}} children
 */
export const AppUIProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const contextValue = {
    isSidebarOpen,
    setIsSidebarOpen,
    isSearchModalOpen,
    setIsSearchModalOpen,
  };

  return (
    <AppUIContext.Provider value={contextValue}>
      {children}
    </AppUIContext.Provider>
  );
};
