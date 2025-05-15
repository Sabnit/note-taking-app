import React from "react";

import SidebarWrapper from "../../../molecules/sidebar/SidebarWrapper";
import SidebarSection from "./SidebarSection";
import SidebarAddNote from "./SidebarAddNote";
import SearchBar from "../../../molecules/SearchBar";
import SidebarHeader from "../../../molecules/sidebar/SidebarHeader";
import SidebarNavigation from "../../../molecules/sidebar/SidebarNavigation";
import SideBarMyCategories from "../../../molecules/sidebar/SidebarMyCategories";

const Sidebar = () => {
  return (
    <SidebarWrapper>
      <SidebarHeader />

      <SidebarSection>
        <SidebarAddNote />
      </SidebarSection>

      <SidebarSection>
        <SearchBar />
      </SidebarSection>

      <SidebarSection>
        <SidebarNavigation />
      </SidebarSection>

      <SidebarSection>
        <SideBarMyCategories />
      </SidebarSection>
    </SidebarWrapper>
  );
};

export default Sidebar;
