import React, { useState } from "react";
import styled from "./Sidebar.module.scss";
import { sidebarData } from "./sidebarData";
import SidebarItem from "./SidebarItem";
import { VscThreeBars } from "react-icons/vsc";
import { IoCloseSharp } from "react-icons/io5";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const handleSidebar = () => setShowSidebar((state) => !state);

  // map through sidebarData and render SidebarItem
  const data = sidebarData.map((item, index) => {
    return (
      <SidebarItem
        key={index}
        item={item}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />
    );
  });

  // apply styles to sidebar based on showSidebar state
  const size = showSidebar ? "sidebar__show" : "sidebar__hide";

  // show icon based on showSidebar state
  const icon = showSidebar ? (
    <IoCloseSharp size={25} />
  ) : (
    <VscThreeBars size={22} />
  );

  return (
    <aside className={`${styled.sidebar} ${styled[size]}`}>
      <div className={styled.sidebar__icon} onClick={handleSidebar}>
        {icon}
      </div>

      <>{data}</>
    </aside>
  );
};

export default Sidebar;
