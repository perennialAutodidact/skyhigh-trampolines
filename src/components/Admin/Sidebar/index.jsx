import React, { useCallback, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/client";
import styled from "./Sidebar.module.scss";
import { sidebarData } from "./sidebarData";
import SidebarItem from "./SidebarItem";
import { HiOutlineUserCircle } from "react-icons/hi";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
import { useBreakpoint } from "../../../hooks/useBreakpoint";
import { VscChromeClose } from "react-icons/vsc";

const Sidebar = (props) => {
  const { toggleSidebar, setToggleSidebar } = props;
  const [user] = useAuthState(auth);
  const sidebarRef = useRef(null);

  const breakpoint = useBreakpoint();
  const clickOutsideHandler = useCallback(() => {
    if (!["md", "lg"].includes(breakpoint)) {
      setToggleSidebar(false);
    }
  }, [breakpoint, setToggleSidebar]);

  useOnClickOutside(sidebarRef, () => {
    clickOutsideHandler();
  });
  // apply styles to sidebar based on showSidebar state
  const visibility = toggleSidebar ? "sidebar__show" : "sidebar__hide";

  return (
    <>
      <aside
        className={`${styled.sidebar} nav flex-column border-end bg-white ${styled[visibility]}`}
        ref={sidebarRef}
      >
        {!["md", "lg"].includes(breakpoint) && (
          <div className="px-3 py-4">
            <VscChromeClose
              size={22}
              onClick={() => setToggleSidebar(false)}
              className={`${styled.icon} d-md-none`}
            />
          </div>
        )}
        <div>
          {sidebarData.map((item, index) => (
            <SidebarItem
              key={index}
              item={item}
              toggleSidebar={toggleSidebar}
              setToggleSidebar={setToggleSidebar}
            />
          ))}
        </div>

        <div className="mt-5 px-3 d-flex d-lg-none flex-column align-items-center">
          <HiOutlineUserCircle size={30} />

          <p className="p-0 m-0">{user?.displayName}</p>
          <button className="btn btn-sm btn-secondary mt-3 text-light">
            Log Out
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
