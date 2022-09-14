import React, { useEffect, useState } from "react";
import styled from "./SidebarItem.module.scss";

const SidebarItem = (props) => {
  const [subNav, setSubNav] = useState(false);
  const { item, showSidebar, setShowSidebar } = props;

  // toggle icon and subnav and open sidebar
  const showSubNav = () => {
    setSubNav((state) => !state);
    setShowSidebar(true);
  };

  // when sidebar is closed, close subnav
  useEffect(() => {
    if (!showSidebar) setSubNav(false);
  }, [showSidebar, setShowSidebar]);

  return (
    <>
      {/* //todo change section to different tag */}
      <section className={styled.item} onClick={item.subNav && showSubNav}>
        <p className={styled.item__title}>
          <span> {item.icon} </span>
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
            <div className={styled.link} key={menu.id}>
              <p>{menu.title}</p>
            </div>
          );
        })}
    </>
  );
};

export default SidebarItem;
