import { NotepadText } from "lucide-react";
import React from "react";

const Header = ({ title, count, unit, icon }) => {
  return (
    <>
      <div className="flex items-center gap-5">
        <h1 className="text-3xl font-bold mb-2 text-gray-600">{title}</h1>
        {icon}
      </div>
      <div className="flex items-center gap-2 text-gray-500 mb-3 mt-2 pb-3 border-b-1 border-gray-200">
        <NotepadText size={18} />
        <span>{count} </span> {unit}
      </div>
    </>
  );
};

export default Header;
