import { auth } from "../firebase/client";
import { logout } from "../redux/authSlice";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
//
export const Admin = () => {
  const [user, loading] = useAuthState(auth);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    signOut(auth);
    dispatch(logout());
  };

  return (
    <div className="container">
      <div className="row">
        {loading ? (
          <div className="col">
            <p>Loading...please wait</p>
          </div>
        ) : (
          <>
            <div className="col">
              <p>Hello Admin: {user?.displayName}</p>
            </div>

            <div className="col">
              <button onClick={logoutHandler} className="btn btn-secondary">
                Sign Out
              </button>
            </div>
          </>
        )}
      </div>
      ;
    </div>
  );
};
