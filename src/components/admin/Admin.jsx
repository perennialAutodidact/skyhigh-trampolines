import React from "react";
import { auth } from "../../firebase/client";
import { logout } from "../../redux/authSlice";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import Sidebar from "./nav/Sidebar";

const Admin = (props) => {
  const { toggleSidebar } = props;
  const [user, loading] = useAuthState(auth);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    signOut(auth);
    dispatch(logout());
  };
  return (
    <div className="row">
      {loading ? (
        <div className="col">
          <p>Loading...please wait</p>
        </div>
      ) : (
        <>
          <div className="col-lg-2">
            <Sidebar toggleSidebar={toggleSidebar} />
          </div>
          <div className="col-lg-10">
            <div className="container text-center">
              <p>Hello Admin: {user?.displayName}</p>

              <button onClick={logoutHandler} className="btn btn-secondary">
                Sign Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Admin;
