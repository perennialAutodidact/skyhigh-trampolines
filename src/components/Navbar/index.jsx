import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation, Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/client";
import { logout } from "../../redux/authSlice";
import { HiOutlineUserCircle } from "react-icons/hi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { VscThreeBars } from "react-icons/vsc";
import { BsClouds } from "react-icons/bs";
import styled from "./Navbar.module.scss";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";

const Navbar = (props) => {
  const dispatch = useDispatch();
  const { setToggleSidebar } = props;
  const [user] = useAuthState(auth);
  const location = useLocation();
  const [showLogout, setShowLogout] = useState(false);

  // toggle logout button
  const toggleShowLogout = () => setShowLogout((state) => !state);

  const userDropdownRef = useRef(null);
  useOnClickOutside(userDropdownRef, () =>
    setShowLogout(showLogout ? !showLogout : showLogout)
  );

  // logout user
  const logoutHandler = () => {
    signOut(auth);
    dispatch(logout());
    setShowLogout(false);
  };
  // toggle sidebar state
  const handleSidebar = () => setToggleSidebar((state) => !state);

  return (
    <div
      className="border-bottom position-fixed w-100  bg-white"
      style={{ zIndex: "1" }}
    >
      <div className="container-fluid px-3">
        <nav className="d-flex justify-content-between align-items-center ">
          <div className="d-flex gap-3 align-content-center">
            {user && (
              <VscThreeBars
                size={22}
                onClick={handleSidebar}
                className={`${styled.icon} d-md-none`}
              />
            )}
            <Link to={"/"} className="text-decoration-none link-dark">
              <h3 className="p-0 m-0 d-flex align-items-center gap-1">
                <span>Sky High</span>
                <BsClouds />
              </h3>
            </Link>
          </div>

          {user && location.pathname.startsWith("/admin") && (
            <div
              className={`${styled.logout} d-none d-lg-flex justify-content-between align-items-center gap-1`}
              onClick={toggleShowLogout}
              ref={userDropdownRef}
            >
              <HiOutlineUserCircle size={30} />
              <p className="p-0 m-0">{user?.displayName}</p>
              <MdOutlineKeyboardArrowDown size={25} />
              {showLogout && (
                <button onClick={logoutHandler} className="btn btn-secondary">
                  Log Out
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
