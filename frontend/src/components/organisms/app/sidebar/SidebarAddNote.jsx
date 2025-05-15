import React, { useContext } from "react";
import AddNoteButton from "../../../molecules/note/AddNoteButton";
import { NoteContext } from "../../../../context/NoteContext";

const SidebarAddNote = () => {
  const { setIsAddNoteModalOpen } = useContext(NoteContext);

  return (
    <AddNoteButton
      variant="nav"
      onClick={() => setIsAddNoteModalOpen((prev) => !prev)}
    />
  );
};

export default SidebarAddNote;
