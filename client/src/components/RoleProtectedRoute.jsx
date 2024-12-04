import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";

export function RoleProtectedRoute({ children, role }) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!user?.roles?.includes(role)) {
    return <Navigate to="/" />;
  }

  return children;
}

export default RoleProtectedRoute;
