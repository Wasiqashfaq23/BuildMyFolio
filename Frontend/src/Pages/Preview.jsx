import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiLink, FiCheck, FiArrowLeft } from "react-icons/fi";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8001";

function Preview() {
  const { state } = useLocation();
  const navigate = useNavigate();
  // const [copied, setCopied] = useState(false);
  const [PortfolioComponent, setPortfolioComponent] = useState(null);
  const [loadError, setLoadError] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [publishError, setPublishError] = useState("");

  useEffect(() => {
    if (!state?.templateComponent) return;
    import(`./Portfolios/${state.templateComponent}.jsx`)
      .then(module => setPortfolioComponent(() => module.default))
      .catch(() => setLoadError(true));
  }, [state?.templateComponent]);

  if (!state) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center">
        <p className="text-[#555] text-sm">No portfolio data found.</p>
      </div>
    );
  }

  const { data, templateComponent, templateId } = state;

  async function handlePublish() {
    if (!templateId) {
      setPublishError("Template ID missing — go back and try again");
      return;
    }
    setPublishing(true);
    setPublishError("");
    try {
      const res = await fetch(`${API_URL}/portfolio`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userData: data, templateId }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to publish");
      sessionStorage.removeItem(`portfolio_${templateId}`);
      navigate(`/p/${result.slug}`);
    } catch (err) {
      setPublishError(err.message);
    } finally {
      setPublishing(false);
    }
  }

  return (
    <div>
      <div className="sticky top-0 z-50 bg-[#080808] border-b border-[#1a1a1a] px-6 py-3 flex items-center justify-between">

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-[#555] hover:text-[#f5f5f5] transition"
        >
          <FiArrowLeft size={14} />
          Back to editor
        </button>

        <span className="text-xs text-[#333]">Preview mode</span>

        <div className="flex items-center gap-3">
          {publishError && (
            <p className="text-red-400 text-xs max-w-48 text-right">{publishError}</p>
          )}
          <button
            onClick={handlePublish}
            disabled={publishing}
            className="bg-[#f5f5f5] text-[#080808] px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-white transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {publishing ? "Publishing..." : "Publish →"}
          </button>
        </div>

      </div>

      {loadError ? (
        <div className="min-h-screen bg-[#080808] flex items-center justify-center">
          <p className="text-[#555] text-sm">Template "{templateComponent}" not found.</p>
        </div>
      ) : !PortfolioComponent ? (
        <div className="min-h-screen bg-[#080808] flex items-center justify-center">
          <p className="text-[#555] text-sm">Loading template...</p>
        </div>
      ) : (
        <PortfolioComponent data={data} />
      )}
    </div>
  );
}

export default Preview;