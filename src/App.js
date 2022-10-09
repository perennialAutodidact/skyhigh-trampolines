import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/Admin/ProtectedRoute";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/client";
import "./App.scss";

import Admin from "./components/Admin";
import Login from "./components/Admin/Login/Login";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import BookingWizard from "./components/BookingWizard";
import ProductData from "./components/Products";
import ProductForm from "./components/Products/ProductForm";
import RoomsList from "./components/Rooms";
import RoomForm from "./components/Rooms/RoomForm";
import AllAddOns from "./components/AddOns";
import AddOnForm from "./components/AddOns/AddOnForm";

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

            <Route path="all-bookings" element={<p>All Bookings</p>} />
            <Route path="daily-capacity" element={<p>Daily Capacity</p>} />

            {/* rooms */}
            <Route path="all-rooms" element={<RoomsList />} />
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
