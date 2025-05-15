import React, { useContext } from "react";
import { Search } from "lucide-react";
import { AppUIContext } from "../../context/AppUIContext";

const SearchBar = () => {
  const { setIsSearchModalOpen } = useContext(AppUIContext);
  return (
    <div
      onClick={() => setIsSearchModalOpen((prev) => !prev)}
      className="mx-4 mt-4 flex items-center gap-2 text-gray-500 cursor-pointer"
    >
      <Search size={18} />
      <span>Search</span>
    </div>
  );
};

export default SearchBar;
