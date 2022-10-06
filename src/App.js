import "./App.scss";

import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import AddOnForm from "./components/AddOnForm";
import Admin from "./components/admin/Admin";
import AllAddOns from "./components/AddOnForm/AllAddOns";
import { AllBookings } from "./components/Booking/AllBookings";
import BookingWizard from "./components/BookingWizard";
import Homepage from "./components/customer/Homepage";
import Login from "./components/login/Login";
import Navbar from "./components/nav/Navbar";
import ProductData from "./components/product/ProductData";
import ProductForm from "./components/ProductForm";
import { ProtectedRoute } from "./components/ProtectedRoute";
import RoomForm from "./components/RoomForm";
import { auth } from "./firebase/client";
import { useAuthState } from "react-firebase-hooks/auth";

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
            <Route path="all-products" element={<ProductData />} />
            <Route path="add-products" element={<ProductForm />} />
            <Route path="add-ons" element={<AddOnForm />} />
            <Route path="all-add-ons" element={<AllAddOns />} />

            {/* bookings */}

            <Route path="all-bookings" element={<AllBookings />} />
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
