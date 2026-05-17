import { useEffect, useRef } from "react";
import { useAuth } from "../../Pages/Context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8001";
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function GoogleButton({ onError }) {
  const btnRef = useRef(null);
  const { login } = useAuth();

  useEffect(() => {
    if (!window.google || !btnRef.current) return;

    window.google.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: async (response) => {
        try {
          const res = await fetch(`${API_URL}/auth/google`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ credential: response.credential }),
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.message || "Google sign-in failed");
          login(data.user);
          window.location.replace("/dashboard");
        } catch (err) {
          onError?.(err.message);
        }
      },
    });

    window.google.accounts.id.renderButton(btnRef.current, {
      theme: "outline",
      size: "large",
      width: btnRef.current.offsetWidth || 400,
      text: "continue_with",
    });
  }, []);

  return <div ref={btnRef} className="w-full" />;
}

export default GoogleButton;
