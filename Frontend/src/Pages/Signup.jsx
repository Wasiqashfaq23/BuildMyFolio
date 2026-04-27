import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiUserPlus } from "react-icons/fi";
import { useAuth } from "./Context/AuthContext"
import { useSignIn } from '@clerk/clerk-react'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const inputClass = "w-full bg-[#111] border border-[#222] rounded-lg px-3 py-2.5 text-sm text-[#f5f5f5] outline-none focus:border-[#444] transition placeholder:text-[#444]";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { signIn } = useSignIn()
  const { user } = useAuth()
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true })
    }
//eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const handleGithub = async () => {
    NProgress.start()
    try {

      await signIn.authenticateWithRedirect({
        strategy: "oauth_github",
        redirectUrl: "/dashboard",
        redirectUrlComplete: "/dashboard"
      })
    }
    finally {
      NProgress.done()
    }

  }


  const handleGoogle = async () => {
    NProgress.start()
    try {

      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/dashboard",
        redirectUrlComplete: "/dashboard"
      })
    } finally {
      NProgress.done()
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/signup`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");
      login(data.user)
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
            <FiUserPlus className="text-[#555]" size={16} />
          </div>
          <h2 className="text-xl font-medium text-[#f5f5f5]">Create account</h2>
          <p className="text-sm text-[#555] mt-1">Start building your portfolio</p>
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
              minLength={8}
              className={inputClass}
            />
            <p className="text-xs text-[#333] mt-1.5">At least 8 characters</p>
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
            {loading ? "Creating account..." : "Create account"}
          </button>

        </form>

        <div className="mt-6 pt-5 border-t border-[#111] text-center">
          <p className="text-sm text-[#444]">
            Already have an account?{" "}
            <Link to="/login" className="text-[#888] font-medium hover:text-[#f5f5f5] transition">
              Login
            </Link>
          </p>
          <div className="flex justify-center space-x-4 mt-4 border-t border-[#111] pt-4">
            <button onClick={handleGoogle} className="bg-[#111] hover:bg-[#222] text-[#f5f5f5] py-2 px-4 rounded-lg transition">
              <FcGoogle size={30} />
            </button>
            <button onClick={handleGithub} className="bg-[#111] hover:bg-[#222] text-[#f5f5f5] py-2 px-4 rounded-lg transition">
              <FaGithub size={30} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;