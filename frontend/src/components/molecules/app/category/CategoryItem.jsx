import { Hash } from "lucide-react";
import React from "react";

const CategoryItem = ({ category }) => {
  return (
    <div className="flex items-center gap-2 text-gray-600 py-2 px-5 mt-3 hover:bg-gray-200 rounded-sm cursor-pointer">
      <Hash size={16} className="text-blue-500" />
      <span className="text-lg">{category}</span>
    </div>
  );
};

export default CategoryItem;
