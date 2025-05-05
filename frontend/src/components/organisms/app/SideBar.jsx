import React, { useContext } from "react";

import { AppContext } from "../../../context/AppContext";
import SideBarHeader from "../../molecules/app/SideBarHeader";
import AddNote from "../../molecules/app/note/AddNoteButton";
import SearchBar from "../../molecules/app/SearchBar";
import SideBarNavigation from "../../molecules/app/SideBarNavigation";
import Category from "../../molecules/app/category/CategoryItem";
import CategoryDetails from "./category/CategoryList";
import SideBarMyCategories from "../../molecules/app/SideBarMyCategories";

const SideBar = () => {
  const { isSidebarOpen } = useContext(AppContext);

  return (
    <div
      className={`${
        isSidebarOpen ? "w-64" : "w-0"
      }  border-r border-gray-200 flex flex-col h-screen bg-neutral-50 transition-all duration:300 overflow-hidden`}
    >
      <SideBarHeader />
      <AddNote style={"nav"} />
      <SearchBar />
      <SideBarNavigation />
      <SideBarMyCategories />
    </div>
  );
};

export default SideBar;
