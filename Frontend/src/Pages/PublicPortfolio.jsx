import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiCheck, FiLink } from "react-icons/fi";
import { useAuth } from "./Context/AuthContext";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8001";

function PublicPortfolio() {
  const { slug } = useParams();
  const { user } = useAuth();
  const [portfolio, setPortfolio] = useState(null);
  const [PortfolioComponent, setPortfolioComponent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const publicUrl = `${window.location.origin}/p/${slug}`;
  const navigate = useNavigate();


  useEffect(() => {
    fetch(`${API_URL}/portfolio/${slug}`)
      .then(res => {
        if (res.status === 404) throw new Error("not_found");
        if (!res.ok) throw new Error("server_error");
        return res.json();
      })
      .then(data => {
        if (!data.userData) throw new Error("not_found");
        setPortfolio(data);
        const portfolioType = data.templateId?.portfolioType;
        if (!portfolioType) throw new Error("no_template");
        return import(`./Portfolios/${portfolioType}.jsx`);
      })
      .then(module => setPortfolioComponent(() => module.default))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  function handleCopy() {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (loading) return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center">
      <p className="text-[#555] text-sm">Loading...</p>
    </div>
  );

  if (error === "not_found") return (
    <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center gap-3">
      <p className="text-2xl font-medium text-[#f5f5f5]">404</p>
      <p className="text-[#555] text-sm">This portfolio doesn't exist or has been removed.</p>
      <button
        onClick={() => navigate(user ? "/dashboard" : "/")}
        className="text-xs text-[#444] hover:text-[#888] transition mt-2"
      >
        ← {user ? "Go to dashboard" : "Go home"}
      </button>
    </div>
  );

  if (error === "no_template") return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center">
      <p className="text-red-400 text-sm">Template not found for this portfolio.</p>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center">
      <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>
    </div>
  );

  if (!PortfolioComponent) return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center">
      <p className="text-[#555] text-sm">Loading template...</p>
    </div>
  );

  return (
    <div>
      {user && (
        <div className="fixed bottom-5 left-4 right-4 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 z-50 flex items-center gap-2 sm:gap-3 bg-[#111] border border-[#222] rounded-xl px-3 sm:px-4 py-2.5 shadow-xl">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-xs text-[#cbcbcb] hover:text-[#f5f5f5] transition shrink-0"
          >
            ← Dashboard
          </button>
          <span className="text-xs text-[#333] shrink-0">|</span>
          <span className="text-xs text-[#555] truncate min-w-0 flex-1 sm:flex-none sm:max-w-52">{publicUrl}</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 bg-[#f5f5f5] text-[#080808] px-3 py-1 rounded-lg text-xs font-medium hover:bg-white transition shrink-0"
          >
            {copied ? <FiCheck size={11} /> : <FiLink size={11} />}
            {copied ? "Copied!" : "Copy link"}
          </button>
        </div>)}


      <PortfolioComponent data={portfolio.userData} />
    </div>
  );
}

export default PublicPortfolio;