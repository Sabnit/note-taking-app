import React, { useContext } from "react";
import { PanelRightClose } from "lucide-react";

import Sidebar from "../organisms/app/sidebar/Sidebar";
import SearchModal from "../organisms/app/SearchModal";
import NoteModal from "../organisms/app/note/NoteModal";
import CategoryModal from "../organisms/app/category/CategoryModal";

import { NoteContext } from "../../context/NoteContext";
import { AppUIContext } from "../../context/AppUIContext";
import { CategoryContext } from "../../context/CategoryContext";

const AppLayout = ({ children }) => {
  const { isAddNoteModalOpen } = useContext(NoteContext);
  const { isAddCategoryModalOpen } = useContext(CategoryContext);
  const { isSidebarOpen, setIsSidebarOpen, isSearchModalOpen } =
    useContext(AppUIContext);

  return (
    <div className="flex h-screen w-full">
      <Sidebar />
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
