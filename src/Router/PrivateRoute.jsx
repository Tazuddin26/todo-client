import { Navigate, useLocation } from "react-router-dom";
import UseAuth from "../hooks/useAuth";
import LoadingSpinner from "../Loading/LoadingSpinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = UseAuth();
  const location = useLocation();
  if (loading) {
    return <LoadingSpinner />;
  }
  if (user) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
