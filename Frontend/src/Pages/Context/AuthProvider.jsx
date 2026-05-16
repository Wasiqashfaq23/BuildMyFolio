import { useState, useEffect } from "react";
import { useClerk } from "@clerk/clerk-react";
import { AuthContext } from "./AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8001";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { signOut: clerkSignOut } = useClerk();

  useEffect(() => {
    fetch(`${API_URL}/me`, { credentials: "include" })
      .then(res => { return res.ok ? res.json() : null; })
      .then(data => setUser(data?.user || null))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  function login(userData) {
    setUser(userData);
  }

  function logout() {
    Promise.all([
      fetch(`${API_URL}/logout`, { method: "POST", credentials: "include" }),
      clerkSignOut({ redirectUrl: "/login" }).catch(() => {}),
    ]).finally(() => {
      setUser(null);
      window.location.href = "/login";
    });
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}