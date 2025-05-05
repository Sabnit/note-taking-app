import React from "react";
import { NavLink } from "react-router-dom";
import { Calendar1, CalendarDays, CheckCircle, Layers } from "lucide-react";
import { CLIENT_ROUTES } from "../../../constants/clientRoutes";

const SideBarNavigation = () => {
  const navLinks = [
    {
      title: "Notes",
      icon: <Calendar1 size={18} />,
      link: `${CLIENT_ROUTES.APP_ROUTE.NOTES}`,
    },
  ];

  return (
    <nav className="mt-4 flex note">
      <ul className="w-full">
        {navLinks.map((navLink) => (
          <li key={navLink.link} className="w-full">
            <NavLink
              to={navLink.link}
              className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 w-full"
            >
              {navLink.icon}
              <span>{navLink.title}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideBarNavigation;
