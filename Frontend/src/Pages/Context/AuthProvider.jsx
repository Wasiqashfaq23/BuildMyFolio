import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { useUser, useAuth as useClerkAuth, useClerk } from '@clerk/clerk-react'


const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8001";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isSignedIn, isLoaded } = useClerkAuth()
  const { user: clerkUser } = useUser()
  const { signOut } = useClerk()
  
  useEffect(() => {
    fetch(`${API_URL}/me`, { credentials: "include" })
      .then(res => { return res.ok ? res.json() : null; })
      .then(data =>
        setUser(data?.user || null)
      )
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);


  useEffect(() => {
    const syncUser = async () => {
      if (isLoaded && isSignedIn && clerkUser && !user) {
        try {
          const res = await fetch(`${API_URL}/auth/clerk-sync`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              clerkId: clerkUser.id,
              email: clerkUser.emailAddresses[0].emailAddress,
              authType: 'google'
            })
          })
          const data = await res.json()
          if (res.ok) setUser(data.user)
        } catch (err) {
          console.error(err)
        }
      }
    }
    syncUser()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, isSignedIn, clerkUser])


  function login(userData) { setUser(userData); }

  function logout() {
    fetch(`${API_URL}/logout`, {
      method: "POST",
      credentials: "include",
    }).finally(async () => {
      await signOut()
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