import React from "react";
import { auth } from "../../firebase/client";
import { useAuthState } from "react-firebase-hooks/auth";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import LoadingSpinner from "../LoadingSpinner";

const Admin = (props) => {
  const { showSidebar, setShowSidebar } = props;
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
              showSidebar={showSidebar}
              setShowSidebar={setShowSidebar}
              sidebarRef={props.sidebarRef}
            />
          </div>

          <div className={`container-fluid pt-3 ${styled.content}`}>
            <div className="row">
              <div className="pt-1 pb-1 col-lg-10 offset-lg-2">
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
