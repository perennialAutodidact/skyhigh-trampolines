import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/client";
import styled from "./Sidebar.module.scss";
import { sidebarData } from "./sidebarData";
import SidebarItem from "./SidebarItem";
import { HiOutlineUserCircle } from "react-icons/hi";

const Sidebar = (props) => {
  const [user] = useAuthState(auth);
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
