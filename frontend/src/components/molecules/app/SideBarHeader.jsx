import React, { useContext, useState } from "react";
import {
  ChevronDown,
  LogOut,
  PanelLeftClose,
  PanelRightClose,
  Settings,
  User,
} from "lucide-react";

import Button from "../../atoms/Button";

import { AppContext } from "../../../context/AppContext";
import { AuthContext } from "../../../context/AuthContext";

const SideBarHeader = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useContext(AppContext);
  const { user, logout } = useContext(AuthContext);
  const [showProfileBar, setShowProfileBar] = useState(true);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="p-4 flex items-center justify-between border-b border-gray-200">
      <div
        onClick={() => setShowProfileBar((prev) => !prev)}
        className="profile flex items-center gap-2 cursor-pointer hover:bg-gray-200 rounded-md p-1 relative"
      >
        <div className="w-8 h-8 rounded-full bg-orange-300 text-white flex items-center justify-center">
          {user.firstName[0].toUpperCase()}
        </div>
        <span className="font-medium">{user.firstName}</span>
        <ChevronDown size={16} />
        <div
          className={`${
            showProfileBar ? "hidden" : "block"
          } mt-1 absolute bg-gray-200 top-10 left-0 px-4 py-3 rounded-lg w-40`}
        >
          <Button
            variant="none"
            className="flex items-center gap-3 text-gray-400 hover:text-orange-400 transition-colors "
          >
            <User size={16} />
            <span>Profile</span>
          </Button>

          <Button
            onClick={handleLogout}
            variant="none"
            className="flex items-center gap-3 text-gray-400 hover:text-orange-400 transition-colors "
          >
            <LogOut size={16} />
            <span>Logout</span>
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {isSidebarOpen && (
          <PanelLeftClose
            onClick={() => setIsSidebarOpen((prev) => !prev)}
            size={18}
            className="text-gray-500 cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default SideBarHeader;
