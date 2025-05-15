import React, { useContext } from "react";

import NoteItem from "../organisms/app/note/NoteItem";

import { NoteContext } from "../../context/NoteContext";

const NotesLayout = ({ notes }) => {
  const { setIsAddNoteModalOpen, setSelectedNoteId } = useContext(NoteContext);

  const handleClick = (noteId) => {
    setSelectedNoteId(noteId);
    setIsAddNoteModalOpen((prev) => !prev);
  };

  return (
    <div className="space-y-5 mt-3">
      {notes.map(([date, notes]) => (
        <div key={date}>
          <h2 className="text-xl font-semibold text-gray-500 mb-2">{date}</h2>
          <ul className="space-y-1">
            {notes.map((note) => (
              <li
                key={note.id}
                className=" hover:bg-gray-300 p-2 rounded"
                onClick={() => handleClick(note.id)}
              >
                <NoteItem
                  title={note.title}
                  description={note.description}
                  categories={note.categories}
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default NotesLayout;
