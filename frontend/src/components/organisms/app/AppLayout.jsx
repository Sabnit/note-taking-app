import React, { useContext } from "react";
import { PanelRightClose } from "lucide-react";

import { AppContext } from "../../../context/AppContext";
import SideBar from "./SideBar";
import SearchModal from "./SearchModal";
import NoteModal from "./note/NoteModal";
import CategoryModal from "./category/CategoryModal";

const AppLayout = ({ children }) => {
  const {
    isSidebarOpen,
    setIsSidebarOpen,
    isAddNoteModalOpen,
    isSearchModalOpen,
    isAddCategoryModalOpen,
  } = useContext(AppContext);

  return (
    <div className="flex h-screen w-full">
      <SideBar />
      <div className="flex-1 flex flex-col relative">
        {!isSidebarOpen && (
          <div className="p-4 absolute">
            <PanelRightClose
              onClick={() => setIsSidebarOpen(true)}
              size={18}
              className="text-gray-500 cursor-pointer"
            />
          </div>
        )}
        <main className="flex-1 overflow-auto">
          {children}
          {isAddNoteModalOpen && <NoteModal />}
          {isSearchModalOpen && <SearchModal />}
          {isAddCategoryModalOpen && <CategoryModal />}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
