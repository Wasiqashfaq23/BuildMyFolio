import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiLink, FiCheck, FiArrowLeft } from "react-icons/fi";
import Developer from "./Portfolios/Developer";

const templateMap = {
  "Developer": Developer,
};

function Preview() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  if (!state) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center">
        <p className="text-[#555] text-sm">No portfolio data found.</p>
      </div>
    );
  }

  const { data, templateComponent } = state;
  const PortfolioComponent = templateMap[templateComponent];

  const name = data?.hero?.fullName?.toLowerCase().replace(/\s+/g, "-") || "portfolio";
  const publicUrl = `${window.location.origin}/p/${name}`;

  function handleCopy() {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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

        <div className="flex items-center gap-2 bg-[#111] border border-[#222] rounded-lg px-3 py-1.5">
          <span className="text-xs text-[#444] max-w-60 truncate">{publicUrl}</span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-2 bg-[#f5f5f5] text-[#080808] px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-white transition"
        >
          {copied ? <FiCheck size={13} /> : <FiLink size={13} />}
          {copied ? "Copied!" : "Copy link"}
        </button>
      </div>

      {PortfolioComponent ? (
        <PortfolioComponent data={data} />
      ) : (
        <div className="min-h-screen bg-[#080808] flex items-center justify-center">
          <p className="text-[#555] text-sm">Template not found: {templateComponent}</p>
        </div>
      )}
    </div>
  );
}

export default Preview;