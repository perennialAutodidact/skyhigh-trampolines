import React from "react";
import styled from "./Admin.module.scss";
import { auth } from "../../firebase/client";
import { useAuthState } from "react-firebase-hooks/auth";
import Sidebar from "./nav/Sidebar";
import { Outlet } from "react-router-dom";
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
              <div className="pt-1 col-lg-6 mx-auto">
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
