import React, { useContext, useRef } from "react";
import { useState } from "react";
import { Calendar, ChevronDown, Search } from "lucide-react";

import { AppContext } from "../../../context/AppContext";

const SearchModal = () => {
  const [searchValue, setSearchValue] = useState("");

  const inputRef = useRef(null);
  const { setIsSearchModalOpen } = useContext(AppContext);

  const handleClose = () => {
    setIsSearchModalOpen((prev) => !prev);
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/20"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative bottom-10 z-10 w-full max-w-2xl bg-white rounded-lg shadow-lg h-1/2">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="p-3 pb-2">
            <div className="flex gap-3 justify-center items-center">
              <Search size={18} />
              <input
                ref={inputRef}
                type="search"
                value={searchValue}
                onChange={handleChange}
                placeholder="Search"
                className="w-full text-lg font-medium text-neutral-800 outline-none border-none placeholder:text-neutral-400"
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border-t border-neutral-200"></div>
        </form>
      </div>
    </div>
  );
};

export default SearchModal;
