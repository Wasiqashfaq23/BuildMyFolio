import { Navigate } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center">
      <p className="text-[#555] text-sm">.</p>
    </div>
  );

  if (!user) return <Navigate to="/login" replace />;

  return children;
}

export default ProtectedRoute;