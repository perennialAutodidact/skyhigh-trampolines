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
import ProductForm from "./components/ProductForm";
import RoomForm from "./components/RoomForm";

function App() {
  const [user, loading] = useAuthState(auth);
  // state to toggle sidebar in admin

  const [toggleSidebar, setToggleSidebar] = useState(false);
  //

  return (
    <div className="container-fluid p-0">
      <Navbar setToggleSidebar={setToggleSidebar} />
      <div style={{ paddingTop: "8vh" }}>
        <Routes>
          <Route
            path="/admin"
            element={
              <ProtectedRoute isAllowed={!!user} loading={loading}>
                <Admin toggleSidebar={toggleSidebar} />
              </ProtectedRoute>
            }
          >
            {/* products */}
            <Route path="all-products" element={<p>All Products</p>} />
            <Route path="add-products" element={<ProductForm />} />

            {/* bookings */}

            <Route path="all-bookings" element={<p>All Bookings</p>} />
            <Route path="daily-capacity" element={<p>Daily Capacity</p>} />

            {/* rooms */}
            <Route path="all-rooms" element={<p>All Rooms</p>} />
            <Route path="add-rooms" element={<RoomForm />} />
          </Route>

          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/booking/*" element={<BookingWizard />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
