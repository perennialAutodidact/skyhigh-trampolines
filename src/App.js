import "./App.scss";

import React, { useState, useRef, useCallback } from "react";
import { Route, Routes } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/client";
import "./App.scss";
import BookingsList from "./components/Admin/Bookings";
import BookingDetail from "./components/Admin/Bookings/BookingDetail";
import { ProtectedRoute } from "./components/Admin/ProtectedRoute";

import Admin from "./components/Admin";
import Login from "./components/Admin/Login/Login";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import About from "./components/About";
import BookingWizard from "./components/BookingWizard";
import ProductData from "./components/Products";
import ProductForm from "./components/Products/ProductForm";
import RoomsList from "./components/Rooms";
import RoomForm from "./components/Rooms/RoomForm";
import AddOnsList from "./components/AddOns";
import AddOnForm from "./components/AddOns/AddOnForm";
import DailyAvailability from "./components/Admin/DailyAvailability";
import { useBreakpoint } from "./hooks/useBreakpoint";
import { useOnClickOutside } from "./hooks/useOnClickOutside";
import { useEffect } from "react";

function App() {
  const [user, loading] = useAuthState(auth);
  const breakpoint = useBreakpoint();
  const [showSidebar, setShowSidebar] = useState(breakpoint === "lg");

  const sidebarRef = useRef(null);
  const hamburgerRef = useRef(null);

  const clickOutsideHandler = useCallback(() => {
    if (breakpoint === "sm") {
      setShowSidebar(false);
    }
  }, [breakpoint, setShowSidebar]);

  useOnClickOutside([sidebarRef, hamburgerRef], () => {
    clickOutsideHandler();
  });

  useEffect(() => {
    setShowSidebar(breakpoint === "lg");
  }, [breakpoint]);

  return (
    <div className="container-fluid bg-light min-vh-100 min-vw-100 p-0">
      <Navbar
        setShowSidebar={setShowSidebar}
        showSidebar={showSidebar}
        hamburgerRef={hamburgerRef}
      />
      <div style={{ paddingTop: "8vh" }} className="position-relative ">
        <Routes>
          <Route
            path="/admin"
            element={
              <ProtectedRoute isAllowed={!!user} loading={loading}>
                <Admin
                  showSidebar={showSidebar}
                  setShowSidebar={setShowSidebar}
                  sidebarRef={sidebarRef}
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

            <Route path="/admin/bookings/:id" element={<BookingDetail />} />
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
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/booking/*" element={<BookingWizard />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
