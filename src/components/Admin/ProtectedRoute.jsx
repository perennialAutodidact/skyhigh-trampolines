import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({
  isAllowed,
  loading,
  redirectPath = "/login",
  children,
}) => {
  if (!isAllowed && !loading) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};
