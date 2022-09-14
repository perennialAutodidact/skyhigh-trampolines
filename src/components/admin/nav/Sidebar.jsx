import React, { useState } from "react";
import styled from "./Sidebar.module.scss";
import { sidebarData } from "./sidebarData";
import SidebarItem from "./SidebarItem";
import { VscThreeBars } from "react-icons/vsc";
import { IoCloseSharp } from "react-icons/io5";
import { useEffect } from "react";

const Sidebar = () => {
  const [subNav, setSubNav] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const handleSidebar = () => setShowSidebar((state) => !state);

  //when sidebar is closed, close subnav
  useEffect(() => {
    if (!showSidebar) setSubNav(false);
  }, [showSidebar]);

  // map through sidebarData and render SidebarItem
  const data = sidebarData.map((item, index) => {
    return (
      <SidebarItem
        key={index}
        item={item}
        setShowSidebar={setShowSidebar}
        subNav={subNav}
        setSubNav={setSubNav}
      />
    );
  });

  const size = showSidebar ? "sidebar__show" : "sidebar__hide";
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
