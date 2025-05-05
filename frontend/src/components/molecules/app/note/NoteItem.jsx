import React, { Fragment } from "react";
import { CheckCircle, Hash, NotebookText, Plus } from "lucide-react";
import { noteDescriptionFormatter } from "../../../../utils/formatter";

const NoteItem = ({ title, categories = [], description }) => {
  return (
    <div className="flex py-3 border-b-1 border-gray-200 flex-col cursor-pointer">
      <div className="flex items-center justify-between gap-3 ">
        <div className="flex items-center justify-between gap-3">
          <NotebookText />
          <span className=" text-gray-700">{title}</span>
        </div>
        {categories && (
          <div className="flex gap-3 text-gray-400">
            {categories.map((category, index) => (
              <div key={index} className="flex justify-between items-center">
                <Hash size={13} className="text-blue-500" />
                <span className="text-md">{category.title}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="pt-4 w-4/5 ">
        <span className=" text-gray-500">
          {noteDescriptionFormatter(description)}
        </span>
      </div>
    </div>
  );
};

export default NoteItem;
