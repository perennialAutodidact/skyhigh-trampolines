import React, { useState } from "react";
import styled from "./Navbar.module.scss";
import { HiOutlineUserCircle } from "react-icons/hi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { VscThreeBars } from "react-icons/vsc";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/client";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";

const Navbar = (props) => {
  const { setToggleSidebar } = props;
  const [showLogout, setShowLogout] = useState(false);
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();

  // toggle sidebar state
  const handleSidebar = () => setToggleSidebar((state) => !state);

  // toggle logout button
  const handleLogout = () => setShowLogout((state) => !state);

  // logout user
  const logoutHandler = () => {
    signOut(auth);
    dispatch(logout());
  };

  return (
    <div
      className="border-bottom position-fixed w-100  bg-white"
      style={{ zIndex: "1" }}
    >
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

          {user && (
            <div
              className={`${styled.logout} d-flex justify-content-between align-items-center gap-1`}
            >
              <HiOutlineUserCircle size={30} />
              <p className="p-0 m-0">{user?.displayName}</p>
              <MdOutlineKeyboardArrowDown size={25} onClick={handleLogout} />
              {showLogout && (
                <button onClick={logoutHandler} className="btn btn-secondary">
                  Logout
                </button>
              )}
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
