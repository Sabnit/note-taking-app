import React, { createContext, useState } from "react";

/**
 * Context to manage category-related state.
 * @typedef {Object} CategoryContextType
 * @property {boolean} isAddCategoryModalOpen - Indicates whether the Add Category modal is open.
 * @property {function(boolean): void} setIsAddCategoryModalOpen - Setter to control Add Category modal state.
 * @property {number|null} selectedCategoryId - Currently selected category's ID.
 * @property {function(string|null): void} setSelectedCategoryId - Setter for selected category ID.
 */

/**
 * @type {React.Context<CategoryContextType>}
 */
export const CategoryContext = createContext();

/**
 *
 * @param {{children: React.ReactNode}} children
 */
export const CategoryProvider = ({ children }) => {
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const contextValue = {
    isAddCategoryModalOpen,
    setIsAddCategoryModalOpen,
    selectedCategoryId,
    setSelectedCategoryId,
  };

  return (
    <CategoryContext.Provider value={contextValue}>
      {children}
    </CategoryContext.Provider>
  );
};
