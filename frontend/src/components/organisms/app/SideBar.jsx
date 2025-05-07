import React, { useContext } from "react";

import SearchBar from "../../molecules/app/SearchBar";
import AddNote from "../../molecules/app/note/AddNoteButton";
import SideBarHeader from "../../molecules/app/SideBarHeader";
import Category from "../../molecules/app/category/CategoryItem";
import SideBarNavigation from "../../molecules/app/SideBarNavigation";
import SideBarMyCategories from "../../molecules/app/SideBarMyCategories";

import { AppContext } from "../../../context/AppContext";

const SideBar = () => {
  const { isSidebarOpen } = useContext(AppContext);

  return (
    <sidebar
      className={`${
        isSidebarOpen ? "w-64" : "w-0"
      }  border-r border-gray-200 flex flex-col h-screen bg-neutral-50 transition-all duration:300 overflow-hidden`}
    >
      <SideBarHeader />
      <AddNote style={"nav"} />
      <SearchBar />
      <SideBarNavigation />
      <SideBarMyCategories />
    </sidebar>
  );
};

export default SideBar;
