import { Navigate } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";
import { useAuth as useClerkAuth } from "@clerk/clerk-react";

function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading } = useAuth();
  const { isSignedIn, isLoaded } = useClerkAuth();

  if (loading || !isLoaded) return null;

  if (!isSignedIn && !user) return <Navigate to="/login" replace />;

  if (adminOnly && !user.isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;