import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiCheck, FiChevronLeft, FiChevronRight, FiEdit2, FiAlertCircle } from "react-icons/fi";
import AppNavbar from "../components/common/AppNavbar";
import Spinner from "../components/common/Spinner";
import FieldRenderer from "../components/forms/FieldRenderer";
import { PageLoading, PageError } from "../components/common/PageShell";

function pruneEmptyValue(value) {
  if (Array.isArray(value)) {
    return value.map(pruneEmptyValue).filter((item) => item !== undefined);
  }
  if (value && typeof value === "object" && !(value instanceof File)) {
    const entries = Object.entries(value)
      .map(([key, val]) => [key, pruneEmptyValue(val)])
      .filter(([, val]) => val !== undefined);
    if (entries.length === 0) return undefined;
    return Object.fromEntries(entries);
  }
  if (typeof value === "string") return value.trim() === "" ? undefined : value;
  return value === undefined || value === null ? undefined : value;
}

function isFieldEmpty(value, field) {
  if (value === undefined || value === null || value === "") return true;
  if (field.type === "tags" && Array.isArray(value) && value.length === 0) return true;
  if (field.type === "image" && Array.isArray(value) && value.length === 0) return true;
  if (field.type === "array" && Array.isArray(value) && value.length === 0) return true;
  return false;
}

function getMissingRequired(sections, formData) {
  const missing = [];
  sections.forEach((sec, secIndex) => {
    if (sec.type === "array") {
      const items = formData[sec.sectionId] || [];
      if (sec.min && items.length < sec.min) {
        missing.push({ sectionIndex: secIndex, sectionLabel: sec.label, fieldLabel: sec.label, message: `Add at least ${sec.min}` });
      }
      if (sec.item?.fields) {
        items.forEach((item, itemIndex) => {
          sec.item.fields.forEach((f) => {
            if (f.required && isFieldEmpty(item[f.name], f)) {
              missing.push({ sectionIndex: secIndex, sectionLabel: sec.label, fieldLabel: `${f.label || f.name} (item #${itemIndex + 1})`, message: "Required" });
            }
          });
        });
      }
    } else if (sec.type === "tags") {
      if (sec.required && isFieldEmpty(formData[sec.sectionId], sec)) {
        missing.push({ sectionIndex: secIndex, sectionLabel: sec.label, fieldLabel: sec.label, message: "Required" });
      }
    } else if (sec.fields) {
      sec.fields.forEach((f) => {
        const val = formData[sec.sectionId]?.[f.name];
        if (f.required && isFieldEmpty(val, f)) {
          missing.push({ sectionIndex: secIndex, sectionLabel: sec.label, fieldLabel: f.label || f.name, message: "Required" });
        }
      });
    }
  });
  return missing;
}

function getDisplayValue(value, field) {
  if (value === undefined || value === null || value === "") return null;
  if (field.type === "boolean") return value ? "Yes" : "No";
  if (field.type === "tags" && Array.isArray(value)) return value.length ? value.join(", ") : null;
  if (field.type === "image" && Array.isArray(value)) return value.length ? `${value.length} image(s)` : null;
  if (field.type === "resume") return value ? value.split("/").pop() : null;
  if (typeof value === "string") return value;
  return JSON.stringify(value);
}

function EditPortfolio() {
  const { portfolioId } = useParams();
  const navigate = useNavigate();

  const [template, setTemplate] = useState(null);
  const [portfolio, setPortfolio] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saveError, setSaveError] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/portfolio/id/${portfolioId}`, { credentials: "include" })
      .then(async (res) => {
        const contentType = res.headers.get("content-type");
        if (!contentType?.includes("application/json")) {
          const text = await res.text();
          throw new Error(`Server error: ${res.status} — ${text.slice(0, 100)}`);
        }
        return res.json();
      })
      .then((data) => {
        setPortfolio(data);
        setFormData(data.userData || {});
        return import(`./Data/${data.templateId.portfolioType}.json`);
      })
      .then((json) => setTemplate(json.default))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [portfolioId]);

  async function handleSave() {
    setSaving(true);
    setSaveError("");
    try {
      const payload = pruneEmptyValue(formData) || {};
      const res = await fetch(`${import.meta.env.VITE_API_URL}/portfolio/${portfolioId}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userData: payload }),
      });
      const contentType = res.headers.get("content-type");
      if (!contentType?.includes("application/json")) {
        const text = await res.text();
        throw new Error(`Server error: ${res.status} — ${text.slice(0, 100)}`);
      }
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to save");
      navigate(`/p/${portfolio.slug}`);
    } catch (err) {
      setSaveError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <PageLoading message="Loading portfolio..." />;
  if (error || !template || !portfolio) return <PageError message={error || "Portfolio not found."} onRetry={() => window.location.reload()} />;

  const sections = template.sections;
  const currentSection = sections[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === sections.length - 1;
  const sectionData = formData[currentSection.sectionId];

  function isSectionFilled(index) {
    const sec = sections[index];
    return formData[sec.sectionId] !== undefined && formData[sec.sectionId] !== null;
  }

  function handleSectionChange(value) {
    setFormData((prev) => ({ ...prev, [currentSection.sectionId]: value }));
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <AppNavbar backTo="/dashboard" backLabel="Dashboard" />

      <div className="flex-1 flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 fixed lg:static inset-y-0 left-0 top-14 z-30 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700/60 overflow-y-auto transition-transform lg:transition-none`}>
          <nav className="p-4" aria-label="Form sections">
            <p className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-3 px-2">Sections</p>
            <ul className="space-y-1">
              {sections.map((sec, i) => {
                const filled = isSectionFilled(i);
                const active = i === currentIndex;
                return (
                  <li key={sec.sectionId}>
                    <button
                      onClick={() => { setCurrentIndex(i); setSidebarOpen(false); }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${
                        active
                          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 font-medium"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                      }`}
                      aria-current={active ? "step" : undefined}
                    >
                      <span className={`w-5 h-5 flex items-center justify-center rounded-full shrink-0 ${
                        active ? "bg-blue-600 text-white" : filled ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400" : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500"
                      }`}>
                        {filled && !active ? <FiCheck size={11} /> : <span className="text-[10px] font-bold">{i + 1}</span>}
                      </span>
                      <span className="truncate">{sec.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {sidebarOpen && (
          <div className="fixed inset-0 top-14 z-20 bg-black/30 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        <main className="flex-1 min-w-0">
          {/* Mobile section indicator */}
          <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700/60 px-4 py-3 flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              aria-label="Open section list"
            >
              {currentIndex + 1}/{sections.length}
            </button>
            <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full transition-all duration-300" style={{ width: `${Math.round(((currentIndex + 1) / sections.length) * 100)}%` }} />
            </div>
          </div>

          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div className="mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">{currentSection.label}</h2>
              {currentSection.instruction && (
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{currentSection.instruction}</p>
              )}
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700/60 p-5 sm:p-6 mb-6">
              <div className="space-y-5">
                {currentSection.type === "array" || currentSection.type === "tags" ? (
                  <FieldRenderer field={currentSection} value={sectionData} onChange={handleSectionChange} />
                ) : (
                  currentSection.fields?.map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        {field.label || field.name}
                        {field.required && <span className="text-red-500 ml-0.5" aria-label="required">*</span>}
                      </label>
                      {field.instruction && (
                        <p className="text-xs text-slate-400 dark:text-slate-500 mb-2">{field.instruction}</p>
                      )}
                      <FieldRenderer
                        field={field}
                        value={sectionData?.[field.name] ?? field.default}
                        onChange={(val) => handleSectionChange({ ...sectionData, [field.name]: val })}
                      />
                    </div>
                  ))
                )}
              </div>
            </div>

            {saveError && (
              <div role="alert" className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/50 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-sm mb-6">
                {saveError}
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700/60">
              <button
                type="button"
                onClick={() => setCurrentIndex((i) => i - 1)}
                disabled={isFirst}
                className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-40"
              >
                <FiChevronLeft size={14} aria-hidden="true" />
                Back
              </button>

              {isLast ? (
                <button
                  type="button"
                  onClick={() => {
                    const errors = getMissingRequired(sections, formData);
                    if (errors.length > 0) {
                      setValidationErrors(errors);
                    } else {
                      setValidationErrors([]);
                      setShowPreview(true);
                    }
                  }}
                  className="flex items-center gap-1.5 px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Review & Save
                  <FiChevronRight size={14} aria-hidden="true" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setCurrentIndex((i) => i + 1)}
                  className="flex items-center gap-1.5 px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Next
                  <FiChevronRight size={14} aria-hidden="true" />
                </button>
              )}
            </div>

            {validationErrors.length > 0 && (
              <div className="mt-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <FiAlertCircle className="text-red-600 dark:text-red-400" size={16} />
                  <p className="text-sm font-medium text-red-700 dark:text-red-400">Please fill in all required fields</p>
                </div>
                <ul className="space-y-1">
                  {validationErrors.map((err, i) => (
                    <li key={i} className="text-xs text-red-600 dark:text-red-400 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => { setCurrentIndex(err.sectionIndex); setValidationErrors([]); }}
                        className="underline hover:text-red-800 dark:hover:text-red-300"
                      >
                        {err.sectionLabel}
                      </button>
                      <span className="text-red-400">—</span>
                      <span>{err.fieldLabel}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Preview / Review step */}
      {showPreview && (
        <div className="fixed inset-0 z-50 bg-slate-50 dark:bg-slate-950 overflow-y-auto">
          <div className="sticky top-0 z-10 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700/60 px-4 sm:px-6 py-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Review Your Changes</h2>
            <button
              onClick={() => setShowPreview(false)}
              className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              Back to Editing
            </button>
          </div>

          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-6">
            {sections.map((sec, secIndex) => (
              <div key={sec.sectionId} className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700/60 overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700/60">
                  <h3 className="text-sm font-semibold text-slate-800 dark:text-white">{sec.label}</h3>
                  <button
                    onClick={() => { setCurrentIndex(secIndex); setShowPreview(false); }}
                    className="flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  >
                    <FiEdit2 size={12} />
                    Edit
                  </button>
                </div>
                <div className="px-5 py-4">
                  {sec.type === "array" ? (
                    <div className="space-y-3">
                      {(formData[sec.sectionId] || []).length === 0 ? (
                        <p className="text-sm text-slate-400 dark:text-slate-500 italic">No items added</p>
                      ) : (
                        (formData[sec.sectionId] || []).map((item, itemIdx) => (
                          <div key={itemIdx} className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 border border-slate-100 dark:border-slate-700/50">
                            <p className="text-xs font-medium text-slate-400 dark:text-slate-500 mb-2">#{itemIdx + 1}</p>
                            <dl className="grid gap-1.5">
                              {sec.item.fields.map((f) => {
                                const display = getDisplayValue(item[f.name], f);
                                if (!display) return null;
                                return (
                                  <div key={f.name} className="flex gap-2">
                                    <dt className="text-xs font-medium text-slate-500 dark:text-slate-400 min-w-25">{f.label || f.name}:</dt>
                                    <dd className="text-xs text-slate-700 dark:text-slate-300">{display}</dd>
                                  </div>
                                );
                              })}
                            </dl>
                          </div>
                        ))
                      )}
                    </div>
                  ) : sec.type === "tags" ? (
                    <div className="flex flex-wrap gap-1.5">
                      {(formData[sec.sectionId] || []).length === 0 ? (
                        <p className="text-sm text-slate-400 dark:text-slate-500 italic">No items added</p>
                      ) : (
                        (formData[sec.sectionId] || []).map((tag, i) => (
                          <span key={i} className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700/50 text-blue-700 dark:text-blue-400 text-xs px-2.5 py-1 rounded-md">{tag}</span>
                        ))
                      )}
                    </div>
                  ) : (
                    <dl className="grid gap-2">
                      {(sec.fields || []).map((f) => {
                        const val = formData[sec.sectionId]?.[f.name];
                        const display = getDisplayValue(val, f);
                        return (
                          <div key={f.name} className="flex flex-col sm:flex-row sm:gap-3">
                            <dt className="text-xs font-medium text-slate-500 dark:text-slate-400 sm:min-w-35">
                              {f.label || f.name}
                              {f.required && <span className="text-red-500 ml-0.5">*</span>}
                            </dt>
                            <dd className="text-sm text-slate-800 dark:text-slate-200">
                              {display || <span className="text-slate-300 dark:text-slate-600 italic">Not provided</span>}
                            </dd>
                          </div>
                        );
                      })}
                    </dl>
                  )}
                </div>
              </div>
            ))}

            {saveError && (
              <div role="alert" className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/50 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
                {saveError}
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700/60">
              <button
                onClick={() => setShowPreview(false)}
                className="px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                Back to Editing
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:hover:bg-blue-600"
              >
                {saving && <Spinner size="sm" className="border-white/30 border-t-white" />}
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditPortfolio;
