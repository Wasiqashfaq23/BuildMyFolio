import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Templates() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/template`, { credentials: "include" })
      .then(res => res.json())
      .then(data => setTemplates(Array.isArray(data) ? data : []))
      .catch(() => setError("Failed to load templates"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center">
      <p className="text-[#555] text-sm">Loading templates...</p>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center">
      <p className="text-red-400 text-sm">{error}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#080808] px-4 sm:px-6 py-8 sm:py-12">
      <div className="max-w-5xl mx-auto">

        <button
          onClick={() => navigate("/dashboard")}
          className="text-xs text-[#aaa] hover:text-[#f5f5f5] border border-[#222] px-3 py-1.5 rounded-lg transition mb-8"
        >
          ← Dashboard
        </button>

        <div className="mb-8 sm:mb-10">
          <h1 className="text-xl sm:text-2xl font-medium text-[#f5f5f5]">Choose a template</h1>
          <p className="text-sm text-[#555] mt-1">Pick a style that fits you — customize everything after.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((t) => (
            <div key={t._id} className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-2xl overflow-hidden hover:border-[#333] transition group">

              {/* Image — padded so it never touches the card edges */}
              <div className="p-3 pb-0">
                <div className="w-full h-44 sm:h-48 rounded-xl overflow-hidden bg-[#161616]">
                  <img
                    src={t.image}
                    alt={t.templateName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  <div className="w-full h-full items-center justify-center text-[#333] text-sm" style={{ display: "none" }}>
                    No preview available
                  </div>
                </div>
              </div>

              <div className="p-4">
                <span className="text-xs font-medium text-[#555] bg-[#161616] border border-[#222] px-2 py-1 rounded-md capitalize">
                  {t.category}
                </span>
                <p className="text-[#f5f5f5] font-medium mt-2 mb-1">{t.templateName}</p>
                {t.description && (
                  <p className="text-[#444] text-xs mb-3">{t.description}</p>
                )}
                <button
                  onClick={() => navigate(`/create/${t._id}`)}
                  className="w-full py-2 text-sm border border-[#222] rounded-lg text-[#888] hover:text-[#f5f5f5] hover:border-[#444] transition mt-2"
                >
                  Use this template →
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}