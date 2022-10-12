import "./App.scss";

import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/client";
import "./App.scss";
import BookingsList from "./components/Admin/Bookings";
import { ProtectedRoute } from "./components/Admin/ProtectedRoute";

import Admin from "./components/Admin";
import Login from "./components/Admin/Login/Login";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import BookingWizard from "./components/BookingWizard";
import ProductData from "./components/Products";
import ProductForm from "./components/Products/ProductForm";
import RoomsList from "./components/Rooms";
import RoomForm from "./components/Rooms/RoomForm";
import AddOnsList from "./components/AddOns";
import AddOnForm from "./components/AddOns/AddOnForm";
import DailyAvailability from "./components/Admin/DailyAvailability";
import { useBreakpoint } from "./hooks/useBreakpoint";

function App() {
  const [user, loading] = useAuthState(auth);
  // state to toggle sidebar in admin

  const [toggleSidebar, setToggleSidebar] = useState(false);
  //

  const breakpoint = useBreakpoint();
  useEffect(() => {
    if (["md", "lg"].includes(breakpoint)) {
      setToggleSidebar(true);
    } else {
      setToggleSidebar(false);
    }
  }, [breakpoint]);
  return (
    <div className="container-fluid p-0 overflow-hidden">
      <Navbar setToggleSidebar={setToggleSidebar} />
      <div style={{ paddingTop: "8vh" }}>
        <Routes>
          <Route
            path="/admin"
            element={
              <ProtectedRoute isAllowed={!!user} loading={loading}>
                <Admin
                  toggleSidebar={toggleSidebar}
                  setToggleSidebar={setToggleSidebar}
                />
              </ProtectedRoute>
            }
          >
            {/* products */}
            <Route path="/admin/products" element={<ProductData />} />
            <Route path="/admin/products/add" element={<ProductForm />} />
            <Route path="/admin/add-ons" element={<AddOnsList />} />
            <Route path="/admin/add-ons/add" element={<AddOnForm />} />

            {/* bookings */}

            <Route path="/admin" element={<BookingsList />} />
            <Route
              path="/admin/daily-capacity"
              element={<DailyAvailability />}
            />

            {/* rooms */}
            <Route path="/admin/rooms" element={<RoomsList />} />
            <Route path="/admin/rooms/add" element={<RoomForm />} />
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
