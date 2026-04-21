import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { useAuth } from "./Context/AuthContext";


const inputClass = "w-full bg-[#111] border border-[#222] rounded-lg px-3 py-2.5 text-sm text-[#f5f5f5] outline-none focus:border-[#444] transition placeholder:text-[#444]";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Invalid credentials");
      login(data.user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4">
      <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-2xl p-8 w-full max-w-md">

        <div className="text-center mb-8">
          <div className="w-10 h-10 bg-[#161616] border border-[#222] rounded-xl flex items-center justify-center mx-auto mb-4">
            <FiUser className="text-[#555]" size={16} />
          </div>
          <h2 className="text-xl font-medium text-[#f5f5f5]">Welcome back</h2>
          <p className="text-sm text-[#555] mt-1">Login to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm text-[#555] mb-1.5">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-sm text-[#555] mb-1.5">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className={inputClass}
            />
            <div className="text-right mt-1.5">
              <span className="text-xs text-[#444] hover:text-[#888] cursor-pointer transition">Forgot password?</span>
            </div>
          </div>

          {error && (
            <div className="bg-[#1a0a0a] border border-[#3a1a1a] text-red-400 text-sm px-3 py-2.5 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#f5f5f5] text-[#080808] py-2.5 rounded-lg text-sm font-medium hover:bg-white transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <div className="mt-6 pt-5 border-t border-[#111] text-center">
          <p className="text-sm text-[#444]">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#888] font-medium hover:text-[#f5f5f5] transition">
              Sign up
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Login;