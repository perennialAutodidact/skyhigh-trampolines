import "./App.scss";

import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Admin from "./components/admin/Admin";
import BookingWizard from "./components/BookingWizard";
import Homepage from "./components/customer/Homepage";
import Login from "./components/login/Login";
import Navbar from "./components/nav/Navbar";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { auth } from "./firebase/client";
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const [user, loading] = useAuthState(auth);
  // state to toggle sidebar in admin

  const [toggleSidebar, setToggleSidebar] = useState(false);
  //

  return (
    <div className="container-fluid p-0 overflow-hidden">
      <Navbar setToggleSidebar={setToggleSidebar} />
      <div className="row">
        <div className="col-12">
          <Routes>
            <Route
              path="/admin"
              element={
                <ProtectedRoute isAllowed={!!user} loading={loading}>
                  <Admin toggleSidebar={toggleSidebar} />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/booking/*" element={<BookingWizard />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
