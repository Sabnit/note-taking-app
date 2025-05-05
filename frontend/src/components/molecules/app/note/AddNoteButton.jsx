import { Plus } from "lucide-react";
import React, { useContext } from "react";
import { AppContext } from "../../../../context/AppContext";
import Button from "../../../atoms/Button";

const AddNoteButton = ({ style }) => {
  const { setIsAddNoteModalOpen } = useContext(AppContext);
  function handleClick() {
    setIsAddNoteModalOpen((prev) => !prev);
  }

  const styles = {
    nav: "px-4 py-2 mt-4 flex items-center  gap-2 text-red-500 font-medium cursor-pointer w-full ",
    normal:
      " py-1  px-0 flex items-center  gap-2 text-gray-500 font-medium cursor-pointer w-fit ",
  };

  return (
    <button
      onClick={handleClick}
      className={`${styles[style]} hover:bg-gray-200 `}
    >
      <Plus size={20} className="text-red-500" />
      Add note
    </button>
  );
};

export default AddNoteButton;
