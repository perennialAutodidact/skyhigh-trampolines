import React from "react";
import { auth } from "../../firebase/client";

import { useAuthState } from "react-firebase-hooks/auth";

import Sidebar from "./nav/Sidebar";

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

      <div className="container-fluid">
        <p>Hello </p>
      </div>
    </main>
  );
};

export default Admin;
