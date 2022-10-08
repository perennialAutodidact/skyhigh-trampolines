import { login } from "../../../redux/authSlice";

import { GrGoogle, GrGithub } from "react-icons/gr";
import { auth } from "../../../firebase/client";
import { useDispatch } from "react-redux";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  useSignInWithGoogle,
  useSignInWithGithub,
} from "react-firebase-hooks/auth";
import LoadingSpinner from "../../LoadingSpinner";

const Login = () => {
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);
  const [signInWithGithub, githubUser, githubLoading, githubError] =
    useSignInWithGithub(auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useMemo(
    () => googleUser || githubUser || null,
    [googleUser, githubUser]
  );

  const loading = useMemo(
    () => googleLoading || githubLoading,
    [googleLoading, githubLoading]
  );

  const error = useMemo(
    () => googleError || githubError,
    [googleError, githubError]
  );

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

  return loading ? (
    <div className="mt-5 d-flex flex-column align-items-center">
      <LoadingSpinner />
      <p className="mt-3">Wait a moment please...authenticating the user</p>
    </div>
  ) : (
    <div className="container mt-5 d-flex justify-content-center align-items-center">
      <div className="card col-12 col-lg-6">
        <img
          src="https://images.unsplash.com/photo-1507836127377-5757cd3e6e6b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8dHJhbXBvbGluZSUyMHBhcmt8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
          className="card-img-top"
          alt="..."
        />
        <div className="card-body container">
          <h5 className="card-title mt-3">Admin Log In</h5>
          <p className="card-text">This page is only for site admins.</p>
          <div className="row mt-4 mb-3">
            <div className="col-12 mt-3">
              {error && (
                <p className="text-danger">
                  {error.name}: {error.code}
                </p>
              )}
            </div>
            <div className="col-6 d-flex justify-content-center">
              <button
                onClick={() => signInWithGoogle()}
                className="btn btn-primary d-flex align-items-center justify-content-center gap-2 text-white w-100"
              >
                <GrGoogle />
                <span className="">Sign In</span>
              </button>
            </div>
            <div className="col-6 d-flex justify-content-center">
              <button
                onClick={() => signInWithGithub()}
                className="btn btn-secondary d-flex align-items-center justify-content-center gap-2 text-white w-100"
              >
                <GrGithub />
                <span className="">Sign In</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
