import { format } from "date-fns";

// Show maximum 150 description characters
export const noteDescriptionFormatter = (description) => {
  if (!description) return;
  if (description.length > 150) {
    return description.slice(0, 150) + "......";
  } else {
    return description;
  }
};

// Group similar notes by data
export function groupNotesByDate(notes) {
  return notes.reduce((acc, note) => {
    const formattedDate = format(new Date(note.date), "d MMMM yyyy");
    if (!acc[formattedDate]) {
      acc[formattedDate] = [];
    }
    acc[formattedDate].push(note);
    return acc;
  }, {});
}
