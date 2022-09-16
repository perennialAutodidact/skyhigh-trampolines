import React, { useState } from "react";
import styled from "./Navbar.module.scss";
import { HiOutlineUserCircle } from "react-icons/hi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { VscThreeBars } from "react-icons/vsc";

const Navbar = (props) => {
  const { setToggleSidebar } = props;
  const [showLogout, setShowLogout] = useState(false);

  // toggle sidebar state
  const handleSidebar = () => setToggleSidebar((state) => !state);

  // toggle logout button
  const handleLogout = () => setShowLogout((state) => !state);

  return (
    <div className="border-bottom h-50">
      <div className="container-fluid px-3">
        <nav className="d-flex justify-content-between align-items-center ">
          <div className="d-flex gap-3 align-content-center">
            <VscThreeBars
              size={22}
              onClick={handleSidebar}
              className={`${styled.icon} d-md-none`}
            />
            <h3 className="p-0 m-0 ">Sky High</h3>
          </div>

          <div
            className={`${styled.logout} d-flex justify-content-between align-items-center gap-1`}
          >
            <HiOutlineUserCircle size={30} />
            <p className="p-0 m-0">Admin</p>
            <MdOutlineKeyboardArrowDown size={25} onClick={handleLogout} />
            {showLogout && <button className="bg-light">Logout</button>}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
