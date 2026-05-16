import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiGrid, FiArrowRight } from "react-icons/fi";
import AppNavbar from "../components/common/AppNavbar";
import Spinner from "../components/common/Spinner";

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

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <AppNavbar backTo="/dashboard" backLabel="Dashboard" />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Choose a Template</h1>
          <p className="text-sm text-slate-500 mt-0.5">Pick a design and customize it with your content</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Spinner size="md" />
          </div>
        ) : error ? (
          <div role="alert" className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        ) : templates.length === 0 ? (
          <div className="bg-white rounded-lg border border-slate-200 text-center py-16 px-4">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3" aria-hidden="true">
              <FiGrid className="text-slate-400" size={22} />
            </div>
            <h3 className="text-base font-semibold text-slate-900 mb-1">No templates available</h3>
            <p className="text-sm text-slate-500">Check back soon for new templates</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5" role="list" aria-label="Available templates">
            {templates.map((template) => (
              <article
                key={template._id}
                className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:border-blue-200 hover:shadow-sm transition-all"
                role="listitem"
              >
                <div className="aspect-video bg-slate-100 overflow-hidden">
                  <img
                    src={template.image}
                    alt={`Preview of ${template.templateName}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextElementSibling.style.display = "flex";
                    }}
                  />
                  <div className="w-full h-full items-center justify-center text-slate-400 text-xs hidden">
                    No preview
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  <span className="inline-block px-2 py-0.5 text-[11px] font-medium text-blue-700 bg-blue-50 border border-blue-100 rounded capitalize mb-2">
                    {template.category}
                  </span>
                  <h3 className="text-sm font-semibold text-slate-900 mb-1">{template.templateName}</h3>
                  {template.description && (
                    <p className="text-xs text-slate-500 line-clamp-2 mb-3">{template.description}</p>
                  )}
                  <button
                    onClick={() => navigate(`/create/${template._id}`)}
                    className="w-full py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-1.5"
                    aria-label={`Use ${template.templateName} template`}
                  >
                    Use Template
                    <FiArrowRight size={13} aria-hidden="true" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
