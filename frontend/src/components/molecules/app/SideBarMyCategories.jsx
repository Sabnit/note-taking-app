import React, { useState, useContext, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  CirclePlus,
  Hash,
  Search,
  X,
  ChevronsDown,
  ChevronsUp,
} from "lucide-react";

import Button from "../../atoms/Button";
import IconButton from "../../atoms/IconButton";

import { AppContext } from "../../../context/AppContext";
import { CLIENT_ROUTES } from "../../../constants/clientRoutes";
import { useCategories } from "../../../hooks/query/useCategories";

const SideBarMyCategories = () => {
  const { data, isLoading, isError } = useCategories();
  const { setIsAddCategoryModalOpen } = useContext(AppContext);

  // New state for search and collapse functionality
  const [searchQuery, setSearchQuery] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const searchInputRef = useRef(null);

  // Focus search input when search is shown
  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  if (isLoading)
    return (
      <div className="mt-5 mb-10 px-4 text-sm text-gray-500">
        Loading categories...
      </div>
    );
  if (isError)
    return (
      <div className="mt-5 mb-10 px-4 text-sm text-gray-500">
        Error loading categories
      </div>
    );

  if (isError || !data?.categories || data.categories.length === 0) {
    return (
      <div className="mt-5 mb-10 px-4">
        <p className="text-sm text-gray-500">No categories available.</p>
        <Button
          variant="none"
          className="mt-2 text-sm text-gray-400 hover:text-orange-400 flex items-center gap-1"
          onClick={() => setIsAddCategoryModalOpen(true)}
        >
          <CirclePlus size={16} />
          <span>Add a category</span>
        </Button>
      </div>
    );
  }

  const { categories } = data;

  // Filter categories based on search query
  const filteredCategories = categories.filter((category) =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddCategory = () => {
    setIsAddCategoryModalOpen(true);
  };

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
    if (!isCollapsed) {
      setShowSearch(false);
      setSearchQuery("");
    }
  };

  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
    setIsCollapsed((prev) => !prev);
    if (showSearch) {
      setSearchQuery("");
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <div className="mt-5 mb-10 bg-white rounded-lg">
      <div className="relative">
        {/* Header with controls */}
        <div className="flex items-center justify-between px-4 py-2">
          <h2
            className="text-sm font-medium text-gray-500 hover:text-gray-700 cursor-pointer"
            onClick={toggleCollapse}
          >
            My Categories
          </h2>

          <div className="flex items-center gap-2">
            {!showSearch && (
              <IconButton
                className="text-gray-400 hover:text-gray-700 transition-colors"
                onClick={toggleSearch}
                title="Search categories"
              >
                <Search size={16} />
              </IconButton>
            )}

            <IconButton onClick={handleAddCategory} title="Add category">
              <CirclePlus size={16} />
            </IconButton>

            <IconButton
              onClick={toggleCollapse}
              title={isCollapsed ? "Expand categories" : "Collapse categories"}
            >
              {isCollapsed ? (
                <ChevronsDown size={16} />
              ) : (
                <ChevronsUp size={16} />
              )}
            </IconButton>
          </div>
        </div>

        {/* Search input */}
        {showSearch && !isCollapsed && (
          <div className="px-4 py-2 flex items-center gap-2 border-b border-gray-100">
            <div className="relative flex-1">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search categories..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full py-1 px-2 pr-7 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {searchQuery && (
                <IconButton
                  onClick={clearSearch}
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                  <X size={14} />
                </IconButton>
              )}
            </div>
            <IconButton onClick={toggleSearch}>
              <X size={16} />
            </IconButton>
          </div>
        )}
      </div>

      {/* Category list */}
      {!isCollapsed && (
        <div className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
          {filteredCategories.length > 0 ? (
            <ul className="py-1">
              {filteredCategories.map((category) => (
                <NavLink
                  to={CLIENT_ROUTES.APP_ROUTE.getCategoryPath(category.id)}
                  key={category.id}
                  className={({ isActive }) => `
                    block
                    ${isActive ? "bg-gray-100" : "hover:bg-gray-50"}
                  `}
                >
                  <li className="flex items-center gap-3 px-4 py-2">
                    <Hash size={16} className="text-blue-500 flex-shrink-0" />
                    <span className="text-sm text-gray-800 truncate">
                      {category.title}
                    </span>
                  </li>
                </NavLink>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-3 text-sm text-gray-500  w-full">
              {searchQuery ? (
                <div className="flex flex-col items-center justify-center gap-2">
                  <p>No categories match "{searchQuery}"</p>

                  <Button
                    onClick={clearSearch}
                    className="flex items-center  hover:text-orange-300"
                    variant="none"
                  >
                    <span>Clear search</span>
                  </Button>
                </div>
              ) : (
                <p>No categories available</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Show count when collapsed */}
      {isCollapsed && categories.length > 0 && (
        <div className="px-4 py-1 text-xs text-gray-400 italic">
          {categories.length}{" "}
          {categories.length === 1 ? "category" : "categories"}
        </div>
      )}
    </div>
  );
};

export default SideBarMyCategories;
