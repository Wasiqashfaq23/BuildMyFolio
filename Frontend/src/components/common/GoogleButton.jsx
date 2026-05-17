import { useEffect, useRef } from "react";
import { useAuth } from "../../Pages/Context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8001";
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function initGoogle(btnEl, callback) {
  if (!CLIENT_ID) {
    console.error("VITE_GOOGLE_CLIENT_ID is not set");
    return;
  }
  window.google.accounts.id.initialize({
    client_id: CLIENT_ID,
    callback,
  });
  window.google.accounts.id.renderButton(btnEl, {
    theme: "outline",
    size: "large",
    width: btnEl.offsetWidth || 400,
    text: "continue_with",
  });
}

function GoogleButton({ onError }) {
  const btnRef = useRef(null);
  const { login } = useAuth();

  useEffect(() => {
    if (!btnRef.current) return;

    const callback = async (response) => {
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
    };

    if (window.google) {
      initGoogle(btnRef.current, callback);
    } else {
      // Script still loading — wait for it
      const script = document.querySelector('script[src*="accounts.google.com/gsi/client"]');
      if (script) {
        script.addEventListener("load", () => initGoogle(btnRef.current, callback));
      }
    }
  }, []);

  return <div ref={btnRef} className="w-full" />;
}

export default GoogleButton;
