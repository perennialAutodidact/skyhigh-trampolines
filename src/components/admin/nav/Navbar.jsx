import React, { useState } from "react";
import Container from "../../helpers/wrapper/Container";
import styled from "./Navbar.module.scss";
import { HiOutlineUserCircle } from "react-icons/hi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => setShowLogout((state) => !state);
  return (
    <div className={styled.nav__container}>
      <Container>
        <nav className={styled.nav}>
          <h3>Sky High</h3>
          <div className={styled.nav__admin}>
            <HiOutlineUserCircle size={30} />
            <p>Admin</p>
            <MdOutlineKeyboardArrowDown size={25} onClick={handleLogout} />
            {showLogout && (
              <button className={styled["nav__admin--button"]}>Logout</button>
            )}
          </div>
        </nav>
      </Container>
    </div>
  );
};

export default Navbar;
