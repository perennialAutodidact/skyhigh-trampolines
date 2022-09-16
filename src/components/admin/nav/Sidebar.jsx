import React from "react";
import styled from "./Sidebar.module.scss";
import { sidebarData } from "./sidebarData";
import SidebarItem from "./SidebarItem";

const Sidebar = (props) => {
  const { toggleSidebar } = props;

  // map through sidebarData and render SidebarItem
  const data = sidebarData.map((item, index) => {
    return (
      <SidebarItem key={index} item={item} toggleSidebar={toggleSidebar} />
    );
  });

  // apply styles to sidebar based on showSidebar state
  const visibility = toggleSidebar ? "sidebar__show" : "sidebar__hide";

  return (
    <>
      <aside
        className={`${styled.sidebar} border-end bg-white ${styled[visibility]}`}
      >
        <>{data}</>
      </aside>
    </>
  );
};

export default Sidebar;
