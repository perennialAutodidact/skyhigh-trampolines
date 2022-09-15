import React, { useEffect, useState } from "react";
import styled from "./SidebarItem.module.scss";

const SidebarItem = (props) => {
  const [subNav, setSubNav] = useState(false);
  const { item, toggleSidebar } = props;

  // toggle icon and subnav and open sidebar
  const showSubNav = () => {
    setSubNav((state) => !state);
  };

  // when sidebar is closed, close subnav
  useEffect(() => {
    if (!toggleSidebar) setSubNav(false);
  }, [toggleSidebar]);

  return (
    <>
      {/* //todo change section to different tag */}
      <section
        className={`${styled.item} py-2 px-3 m-0 d-flex align-items-center justify-content-between gap-1`}
        onClick={item.subNav && showSubNav}
      >
        <p className="p-0 m-0 d-flex align-items-center gap-2">
          <span className="p-0 m-0 d-flex align-items-center ">
            {item.icon}
          </span>
          {item.title}
        </p>

        <div>
          {/* determine what icon to show */}
          {item.subNav && subNav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </section>

      {subNav &&
        item.subNav.map((menu) => {
          return (
            //todo change to link and add to routes
            <div className={`${styled.link} ps-5 py-2`} key={menu.id}>
              <p className="p-0 m-0">{menu.title}</p>
            </div>
          );
        })}
    </>
  );
};

export default SidebarItem;
