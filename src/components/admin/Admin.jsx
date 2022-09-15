import React from "react";

import Sidebar from "./nav/Sidebar";

const Admin = (props) => {
  const { toggleSidebar } = props;

  return (
    <main className="d-flex">
      <div>
        <Sidebar toggleSidebar={toggleSidebar} />
      </div>

      <div>
        <p className="p-2">Admin</p>
      </div>
    </main>
  );
};

export default Admin;
