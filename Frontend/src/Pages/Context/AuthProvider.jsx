import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8001";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/me`, { credentials: "include" })
      .then(res => { return res.ok ? res.json() : null; })
      .then(data =>
        setUser(data?.user || null)
      )
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  function login(userData) { setUser(userData); }

  function logout() {
    fetch(`${API_URL}/logout`, {
      method: "POST",
      credentials: "include",
    }).finally(() => {
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