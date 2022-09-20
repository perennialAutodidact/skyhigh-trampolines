import React from "react";
import styled from "./Admin.module.scss";
import { auth } from "../../firebase/client";

import { useAuthState } from "react-firebase-hooks/auth";

import Sidebar from "./nav/Sidebar";

import { Outlet } from "react-router-dom";

const Admin = (props) => {
  const { toggleSidebar } = props;
  const [user, loading] = useAuthState(auth);

  if (loading)
    return <p className="text-center pt-2">Loading... please wait</p>;

  return (
    <main className="d-flex">
      <div>
        <Sidebar toggleSidebar={toggleSidebar} />
      </div>

      <div className={`container-fluid pt-3 ${styled.content}`}>
        <div className="row">
          <div className="pt-1 col-lg-8 mx-auto">
            {/* outlet to display nested routes */}
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Admin;
