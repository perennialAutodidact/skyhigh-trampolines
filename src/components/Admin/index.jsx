import React from "react";
import { auth } from "../../firebase/client";
import { useAuthState } from "react-firebase-hooks/auth";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import LoadingSpinner from "../LoadingSpinner";
import styled from "./Admin.module.scss";

const Admin = (props) => {
  const { toggleSidebar, setToggleSidebar } = props;
  // eslint-disable-next-line
  const [user, loading] = useAuthState(auth);
  return (
    <div>
      {loading ? (
        <div className="text-center pt-3">
          <LoadingSpinner />
        </div>
      ) : (
        <main className="d-flex">
          <div>
            <Sidebar
              toggleSidebar={toggleSidebar}
              setToggleSidebar={setToggleSidebar}
            />
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
