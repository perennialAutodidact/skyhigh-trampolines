import { Outlet } from "react-router-dom";
import React from "react";
import Sidebar from "./nav/Sidebar";
import { auth } from "../../firebase/client";
import styled from "./Admin.module.scss";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

const Admin = (props) => {
  const { toggleSidebar } = props;
  const [user, loading] = useAuthState(auth);

  // if user is logged in and the route is /admin, redirect to /admin/all-products
  useEffect(() => {
    if (user?.email && window.location.pathname === "/admin") {
      window.location.pathname = "/admin/all-products";
    }
  }, [user]);

  return (
    <div>
      {loading ? (
        <div className="text-center pt-3">
          <p>Loading...please wait</p>
        </div>
      ) : (
        <main className="d-flex">
          <div>
            <Sidebar toggleSidebar={toggleSidebar} />
          </div>

          <div className={`container-fluid pt-3 ${styled.content}`}>
            <div className="row">
              <div className="pt-1 pb-1 pr-1 pl-1 col-lg-12 mx-auto">
                {/* outlet to display nested routes */}
                <Outlet />
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default Admin;
