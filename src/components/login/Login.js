import { login, logout } from "../../redux/authSlice";

import { GrGoogle } from "react-icons/gr";
import { auth } from "../../firebase/client";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

const Login = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      dispatch(
        login({
          displayName: user.user.displayName,
          email: user.user.email,
          accessToken: user.user.accessToken,
        })
      );
      navigate(`/admin`);
    }
  }, [user, dispatch, navigate]);

  const logoutHandler = () => {
    signOut(auth);
    dispatch(logout());
  };

  return loading ? (
    <div>Wait a moment please...authenticating the user</div>
  ) : error ? (
    <div>You are not allowed to access this system {error}</div>
  ) : (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="card" style={{ width: "18rem" }}>
        <img
          src="https://images.unsplash.com/photo-1507836127377-5757cd3e6e6b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8dHJhbXBvbGluZSUyMHBhcmt8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">Log In to Admin</h5>
          <p className="card-text">This page is only for site admins.</p>
          <div className="row">
            <div className="col">
              <button
                onClick={() => signInWithGoogle()}
                className="btn btn-primary d-flex align-items-center justify-content-lg-between text-white"
              >
                <GrGoogle />
                <span className="px-2"> Sign In</span>
              </button>
            </div>
            <div className="col">
              <button onClick={logoutHandler} className="btn btn-secondary">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
