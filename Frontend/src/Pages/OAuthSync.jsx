import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { useAuth } from "./Context/AuthContext";
import Spinner from "../components/common/Spinner";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8001";

function OAuthSync() {
  const { user: clerkUser, isLoaded } = useUser();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoaded) return;
    if (!clerkUser) {
      navigate("/login", { replace: true });
      return;
    }

    const email = clerkUser.primaryEmailAddress?.emailAddress;
    if (!email) {
      setError("No email found on your account. Please try a different sign-in method.");
      return;
    }

    const provider = clerkUser.externalAccounts?.[0]?.provider || "google";
    const authType = provider.includes("github") ? "github" : "google";

    fetch(`${API_URL}/auth/clerk-sync`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clerkId: clerkUser.id,
        email,
        authType,
      }),
    })
      .then(async (res) => {
        const contentType = res.headers.get("content-type");
        if (!contentType?.includes("application/json")) {
          throw new Error("Server error. Please try again.");
        }
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Sync failed");
        login(data.user);
        window.location.replace("/dashboard");
      })
      .catch((err) => {
        setError(err.message || "Something went wrong. Please try again.");
      });
  }, [isLoaded, clerkUser]);

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <p className="text-red-600 text-sm mb-4">{error}</p>
          <button
            onClick={() => navigate("/login", { replace: true })}
            className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Back to sign in
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <Spinner size="md" />
        <p className="text-sm text-slate-500">Signing you in...</p>
      </div>
    </div>
  );
}

export default OAuthSync;
