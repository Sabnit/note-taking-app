import React, { useContext } from "react";
import { PanelRightClose } from "lucide-react";

import SideBar from "../organisms/app/SideBar";
import SearchModal from "../organisms/app/SearchModal";
import NoteModal from "../organisms/app/note/NoteModal";
import CategoryModal from "../organisms/app/category/CategoryModal";

import { AppContext } from "../../context/AppContext";

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
