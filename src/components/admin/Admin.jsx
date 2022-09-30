import { MyOwnCalendar } from "./MyOwnCalendar";
import React from "react";
import Sidebar from "./nav/Sidebar";
import { auth } from "../../firebase/client";
import { useAuthState } from "react-firebase-hooks/auth";

const Admin = (props) => {
  const { toggleSidebar } = props;
  const [user, loading] = useAuthState(auth);

  return (
    <div className="row overflow-hidden">
      {loading ? (
        <div className="col">
          <p>Loading...please wait</p>
        </div>
      ) : user ? (
        <>
          <div className="col-lg-2">
            <Sidebar toggleSidebar={toggleSidebar} />
          </div>
          <div className="col-lg-10">
            <MyOwnCalendar />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Admin;
