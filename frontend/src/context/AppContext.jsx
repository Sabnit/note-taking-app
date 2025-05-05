import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const contextValue = {
    isSidebarOpen,
    setIsSidebarOpen,
    isAddNoteModalOpen,
    setIsAddNoteModalOpen,
    isSearchModalOpen,
    setIsSearchModalOpen,
    isAddCategoryModalOpen,
    setIsAddCategoryModalOpen,
    selectedNoteId,
    setSelectedNoteId,
    selectedCategoryId,
    setSelectedCategoryId,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
