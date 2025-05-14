import React, { createContext, useState } from "react";

/**
 * Context to manage note-related state.
 * @typedef {Object} NoteContextType
 * @property {boolean} isAddNoteModalOpen - Indicates whether the Add Note modal is open.
 * @property {function(boolean): void} setIsAddNoteModalOpen - Setter to control Add Note modal state.
 * @property {string|null} selectedNoteId - Currently selected note's ID.
 * @property {function(string|null): void} setSelectedNoteId - Setter for selected note ID.
 */

/**
 * @type {React.Context<NoteContextType>}
 */
export const NoteContext = createContext();

/**
 * NoteProvider wraps children with NoteContext and provides note-related state.
 *
 * @param {{ children: React.ReactNode }} children
 */
export const NoteProvider = ({ children }) => {
  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  const contextValue = {
    isAddNoteModalOpen,
    setIsAddNoteModalOpen,
    selectedNoteId,
    setSelectedNoteId,
  };

  return (
    <NoteContext.Provider value={contextValue}>{children}</NoteContext.Provider>
  );
};
