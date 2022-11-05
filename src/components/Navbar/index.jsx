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
import { useCallback } from "react";

const Navbar = (props) => {
  const dispatch = useDispatch();
  const { showSidebar, setShowSidebar, hamburgerRef } = props;
  const [user] = useAuthState(auth);
  const location = useLocation();
  const [showLogout, setShowLogout] = useState(false);

  // toggle logout button
  const toggleShowLogout = () => setShowLogout((state) => !state);

  const userDropdownRef = useRef(null);
  useOnClickOutside([userDropdownRef], () =>
    setShowLogout(showLogout ? !showLogout : showLogout)
  );

  // logout user
  const logoutHandler = () => {
    signOut(auth);
    dispatch(logout());
    setShowLogout(false);
  };
  // toggle sidebar state
  const toggleSidebar = useCallback(() => {
    setShowSidebar((showSidebar) => !showSidebar);
  }, [setShowSidebar, showSidebar]);

  return (
    <nav className="border-bottom position-fixed  bg-white container-fluid d-flex flex-column justify-content-center">
      <div className="row">
        <div className="col-12 col-lg-6 d-flex justify-content-between justify-content-lg-start align-items-center">
          <div className=" d-flex align-items-center gap-2">
            {user && location.pathname.startsWith("/admin") && (
              <div
                className="d-lg-none mb-1"
                ref={hamburgerRef}
                onClick={toggleSidebar}
              >
                <VscThreeBars size={22} className={`${styled.icon}`} />
              </div>
            )}
            <Link to={"/"} className="text-decoration-none link-dark">
              <h3 className="p-0 m-0 d-flex align-items-center gap-1">
                <span>Sky High</span>
                <BsClouds />
              </h3>
            </Link>
          </div>
          
          <div className="d-flex gap-2">
            <Link to={"/about"} className="ps-3 text-decoration-none link-dark">
              <div className="p-0 m-0 d-flex align-items-center gap-1 fs-5">
                About
              </div>
            </Link>
            <Link to={"/admin"} className="ps-3 text-decoration-none link-dark">
              <div className="p-0 m-0 d-flex align-items-center gap-1 fs-5">
                Admin
              </div>
            </Link>
          </div>
        </div>

        <div className="col-6 d-none d-lg-flex justify-content-lg-end align-items-center">
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
