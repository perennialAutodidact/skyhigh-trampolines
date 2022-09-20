import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/client";
import "./App.scss";

import Admin from "./components/admin/Admin";
import Login from "./components/login/Login";
import Navbar from "./components/nav/Navbar";
import Homepage from "./components/customer/Homepage";
import BookingWizard from "./components/BookingWizard";

function App() {
  const [user, loading] = useAuthState(auth);
  // state to toggle sidebar in admin

  const [toggleSidebar, setToggleSidebar] = useState(false);
  //

  return (
    <div className="container-fluid p-0">
      <Navbar setToggleSidebar={setToggleSidebar} />
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
  );
}

export default App;
