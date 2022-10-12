import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import styled from "./SidebarItem.module.scss";

const SidebarItem = (props) => {
  const { item, setToggleSidebar } = props;
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="nav-item">
      {/* //todo change section to different tag */}
      <div className={`py-2 px-3 m-0 d-flex align-items-center gap-1 bg-light`}>
        <p className="p-0 m-0 d-flex align-items-center gap-2">
          <span className="p-0 m-0 d-flex align-items-center ">
            {item.icon}
          </span>
          {item.title}
        </p>
      </div>

      <div className="flex flex-column mb-2">
        {item.subNav.map((menu) => {
          return (
            //todo change to link and add to routes
            <div
              className="nav-item"
              key={menu.id}
              onClick={() => {
                navigate(`${menu.path}`);
                setToggleSidebar(false);
              }}
            >
              <Link
                className={`nav-link link-dark ${
                  location.pathname === menu.path
                    ? "fw-bolder ms-3 border-start border-5 border-primary"
                    : ""
                }`}
              >
                {menu.title}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SidebarItem;
