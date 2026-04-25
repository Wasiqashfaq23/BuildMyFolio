import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const inputClass =
  "w-full bg-[#111] border border-[#222] rounded-lg px-3 py-2.5 text-sm text-[#f5f5f5] outline-none focus:border-[#444] transition placeholder:text-[#333]";

async function uploadToCloudinary(file) {
  const fd = new FormData();
  fd.append("image", file);
  const res = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
    method: "POST",
    credentials: "include",
    body: fd,
  });
  const contentType = res.headers.get("content-type");
  if (!contentType?.includes("application/json")) {
    const text = await res.text();
    throw new Error(`Server error: ${res.status} — ${text.slice(0, 100)}`);
  }
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Upload failed");
  return data.url;
}

function FieldRenderer({ field, value, onChange, showInstruction = true }) {
  const [input, setInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef(null);

  if (field.type === "text" || field.type === "email" || field.type === "link") {
    return (
      <input
        type={field.type === "link" ? "url" : field.type}
        placeholder={field.placeholder || ""}
        required={field.required}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
      />
    );
  }

  if (field.type === "textarea") {
    return (
      <textarea
        placeholder={field.placeholder || ""}
        required={field.required}
        rows={3}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass + " resize-none"}
      />
    );
  }

  if (field.type === "boolean") {
    return (
      <div className="flex items-center gap-3">
        <div
          onClick={() => onChange(!value)}
          className={`w-10 h-5 rounded-full cursor-pointer transition relative ${value ? "bg-[#f5f5f5]" : "bg-[#222]"}`}
        >
          <div className={`absolute top-0.5 w-4 h-4 rounded-full transition-all ${value ? "bg-[#080808] left-5" : "bg-[#555] left-0.5"}`} />
        </div>
        <span className="text-sm text-[#555]">{value ? "On" : "Off"}</span>
      </div>
    );
  }

  if (field.type === "tags") {
    const tags = value || [];
    function addTag() {
      if (input.trim() && !tags.includes(input.trim())) {
        onChange([...tags, input.trim()]);
        setInput("");
      }
    }
    return (
      <div>
        {showInstruction && field.instruction && <p className="text-xs text-[#444] mb-2">{field.instruction}</p>}
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder={field.placeholder || "Type and press Enter"}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
            className={inputClass}
          />
          <button type="button" onClick={addTag} className="border border-[#222] text-[#888] px-3 rounded-lg text-sm hover:border-[#444] transition shrink-0">Add</button>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <span key={i} className="flex items-center gap-1.5 bg-[#161616] border border-[#222] text-[#888] text-xs px-2.5 py-1 rounded-full">
              {tag}
              <button type="button" onClick={() => onChange(tags.filter((_, j) => j !== i))} className="text-[#444] hover:text-red-400">×</button>
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (field.type === "image") {
    const images = value || [];

    async function handleUpload(e) {
      const files = Array.from(e.target.files);
      if (!files.length) return;
      if (fileInputRef.current) fileInputRef.current.value = "";
      setUploading(true);
      setUploadError("");
      try {
        const urls = await Promise.all(files.map((f) => uploadToCloudinary(f)));
        onChange(
          field.multiple
            ? [...images, ...urls].slice(0, field.max || 4)
            : [urls[0]]
        );
      } catch (err) {
        setUploadError(err.message || "Upload failed");
      } finally {
        setUploading(false);
      }
    }

    return (
      <div>
        {showInstruction && field.instruction && <p className="text-xs text-[#444] mb-2">{field.instruction}</p>}
        <label className={`flex items-center gap-3 cursor-pointer border border-dashed border-[#222] rounded-lg px-4 py-3 transition ${uploading ? "opacity-50 cursor-not-allowed" : "hover:border-[#444]"}`}>
          <span className="text-xs text-[#555]">{uploading ? "Uploading..." : "Choose image"}</span>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple={field.multiple}
            disabled={uploading}
            onChange={handleUpload}
            className="hidden"
          />
        </label>
        {uploadError && <p className="text-xs text-red-400 mt-1.5">{uploadError}</p>}
        {uploading && <p className="text-xs text-[#555] mt-1.5 animate-pulse">Uploading to Cloudinary...</p>}
        <div className="flex gap-2 mt-2 flex-wrap">
          {images.map((url, i) => (
            <div key={i} className="relative group">
              <img src={url} alt={`upload-${i}`} className="w-16 h-16 object-cover rounded-lg border border-[#222]" />
              <button
                type="button"
                onClick={() => onChange(images.filter((_, j) => j !== i))}
                className="absolute -top-1 -right-1 w-4 h-4 bg-[#222] text-[#888] rounded-full text-xs flex items-center justify-center hover:text-red-400 opacity-0 group-hover:opacity-100 transition"
              >×</button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (field.type === "array") {
    const items = value || [];
    function addItem() {
      if (field.max && items.length >= field.max) return;
      onChange([...items, {}]);
    }
    function updateItem(index, subField, subValue) {
      onChange(items.map((item, i) => i === index ? { ...item, [subField]: subValue } : item));
    }
    function removeItem(index) {
      onChange(items.filter((_, i) => i !== index));
    }
    return (
      <div className="flex flex-col gap-3">
        {showInstruction && field.instruction && <p className="text-xs text-[#444]">{field.instruction}</p>}
        {items.map((item, index) => (
          <div key={index} className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl p-3 sm:p-4 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#333]">#{index + 1}</span>
              <button type="button" onClick={() => removeItem(index)} className="text-xs text-[#333] hover:text-red-400 transition">Remove</button>
            </div>
            {field.item.fields.map((subField) => (
              <div key={subField.name}>
                <label className="block text-xs text-[#444] mb-1.5">{subField.label || subField.name}</label>
                {subField.instruction && <p className="text-xs text-[#333] mb-1.5">{subField.instruction}</p>}
                <FieldRenderer field={subField} value={item[subField.name]} onChange={(val) => updateItem(index, subField.name, val)} showInstruction={false} />
              </div>
            ))}
          </div>
        ))}
        {(!field.max || items.length < field.max) && (
          <button type="button" onClick={addItem} className="border border-dashed border-[#222] text-[#444] py-2.5 rounded-lg text-sm hover:border-[#444] hover:text-[#888] transition">
            + Add {field.label || field.name}
          </button>
        )}
        {field.min > 0 && items.length < field.min && <p className="text-xs text-[#444]">Add at least {field.min}</p>}
      </div>
    );
  }

  if (field.type === "object") {
    return (
      <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl p-3 sm:p-4 flex flex-col gap-3">
        {field.fields.map((subField) => (
          <div key={subField.name}>
            <label className="block text-xs text-[#444] mb-1.5">{subField.label || subField.name}</label>
            <FieldRenderer field={subField} value={value?.[subField.name]} onChange={(val) => onChange({ ...value, [subField.name]: val })} showInstruction={false} />
          </div>
        ))}
      </div>
    );
  }

  return null;
}

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

  if (typeof value === "string") {
    return value.trim() === "" ? undefined : value;
  }

  return value === undefined || value === null ? undefined : value;
}

function CreatePortfolio() {
  const { templateId } = useParams();
  const navigate = useNavigate();

  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/template/${templateId}`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setTemplate(data);
        return import(`./Data/${data.portfolioType}.json`);
      })
      .then((json) => {
        setTemplate((prev) => ({ ...prev, sections: json.default }));
        const saved = sessionStorage.getItem(`portfolio_${templateId}`);
        if (saved) setFormData(JSON.parse(saved));
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [templateId]);

  if (loading) return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4">
      <p className="text-[#555] text-sm">Loading template...</p>
    </div>
  );

  if (error || !template) return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4">
      <p className="text-red-400 text-sm">{error || "Template not found."}</p>
    </div>
  );

  const sections = template.sections.sections;
  const currentSection = sections[currentIndex];
  const isLast = currentIndex === sections.length - 1;
  const isFirst = currentIndex === 0;
  const progress = Math.round(((currentIndex + 1) / sections.length) * 100);

  function handleSectionChange(value) {
    const updated = { ...formData, [currentSection.sectionId]: value };
    setFormData(updated);
    sessionStorage.setItem(`portfolio_${templateId}`, JSON.stringify(updated));
  }

  async function handleSubmit() {
    NProgress.start()
    setSubmitError("");
    try {
      const payload = pruneEmptyValue(formData) || {};
      const res = await fetch(`${import.meta.env.VITE_API_URL}/portfolio`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateId, userData: payload }),
      });
      const contentType = res.headers.get("content-type");
      if (!contentType?.includes("application/json")) {
        const text = await res.text();
        throw new Error(`Server error: ${res.status} — ${text.slice(0, 100)}`);
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Submit failed");
      if (data.slug) {
        sessionStorage.removeItem(`portfolio_${templateId}`);
        navigate(`/p/${data.slug}`);
      }
    } catch (err) {
      setSubmitError(err.message);
    }
    finally {
      NProgress.done()
    }
  }

  const sectionData = formData[currentSection.sectionId];

  return (
    <div className="min-h-screen bg-[#080808]">
      <div className="border-b border-[#1a1a1a] px-4 sm:px-6 lg:px-10 py-3 sm:py-4 flex items-center justify-between gap-3">
        <span className="text-sm font-bold text-[#f5f5f5] tracking-widest uppercase shrink-0">Portfolio.</span>
        <div className="flex items-center gap-2 sm:gap-4 flex-wrap justify-end">
          <span className="hidden sm:inline text-xs text-[#444]">Step {currentIndex + 1} of {sections.length}</span>
          <div className="hidden sm:block w-24 lg:w-32 h-1 bg-[#1a1a1a] rounded-full overflow-hidden">
            <div className="h-full bg-[#f5f5f5] rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
          <button onClick={() => setSidebarOpen((v) => !v)} className="md:hidden text-xs text-[#888] border border-[#222] px-2.5 py-1.5 rounded-lg transition hover:border-[#444]">☰ Sections</button>
          <button onClick={() => navigate("/dashboard")} className="text-xs text-[#aaa] hover:text-[#f5f5f5] border border-[#222] px-3 py-1.5 rounded-lg transition">← Dashboard</button>
        </div>
      </div>

      <div className="sm:hidden px-4 pt-3 pb-1 flex items-center gap-3">
        <span className="text-xs text-[#444] shrink-0">{currentIndex + 1}/{sections.length}</span>
        <div className="flex-1 h-1 bg-[#1a1a1a] rounded-full overflow-hidden">
          <div className="h-full bg-[#f5f5f5] rounded-full transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {sidebarOpen && <div className="fixed inset-0 z-40 bg-black/60 md:hidden" onClick={() => setSidebarOpen(false)} />}

      <aside className={`fixed top-0 left-0 z-50 h-full w-64 bg-[#0d0d0d] border-r border-[#1a1a1a] py-6 px-3 flex flex-col gap-1 transition-transform duration-300 md:hidden ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between px-2 mb-4">
          <p className="text-xs text-[#333] uppercase tracking-widest">Sections</p>
          <button onClick={() => setSidebarOpen(false)} className="text-[#555] hover:text-[#f5f5f5] text-lg leading-none">×</button>
        </div>
        {sections.map((section, i) => (
          <button key={section.sectionId} type="button" onClick={() => { setCurrentIndex(i); setSidebarOpen(false); }}
            className={`text-left px-3 py-2 rounded-lg text-sm transition flex items-center gap-2 ${currentIndex === i ? "bg-[#161616] text-[#f5f5f5]" : "text-[#555] hover:text-[#888]"}`}>
            <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${i <= currentIndex ? "bg-[#f5f5f5]" : "bg-[#333]"}`} />
            {section.label}
          </button>
        ))}
      </aside>

      <div className="flex">
        <aside className="hidden md:flex w-44 lg:w-52 border-r border-[#1a1a1a] py-8 px-3 flex-col gap-1 shrink-0 sticky top-0 h-screen overflow-y-auto">
          <p className="text-xs text-[#333] uppercase tracking-widest mb-3 px-2">Sections</p>
          {sections.map((section, i) => (
            <button key={section.sectionId} type="button" onClick={() => setCurrentIndex(i)}
              className={`text-left px-3 py-2 rounded-lg text-sm transition flex items-center gap-2 ${currentIndex === i ? "bg-[#161616] text-[#f5f5f5]" : "text-[#555] hover:text-[#888]"}`}>
              <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${i <= currentIndex ? "bg-[#f5f5f5]" : "bg-[#333]"}`} />
              {section.label}
            </button>
          ))}
        </aside>

        <main className="flex-1 px-4 sm:px-6 lg:px-10 py-6 sm:py-8 lg:py-10 overflow-y-auto">
          <div className="w-full max-w-xl mx-auto md:mx-0">
            <div className="mb-6 sm:mb-8">
              <div className="flex gap-1 mb-4 sm:mb-6">
                {sections.map((_, i) => (
                  <div key={i} className={`h-0.5 flex-1 rounded-full transition-all ${i <= currentIndex ? "bg-[#f5f5f5]" : "bg-[#1a1a1a]"}`} />
                ))}
              </div>
              <h2 className="text-lg sm:text-xl font-medium text-[#f5f5f5] mb-1">{currentSection.label}</h2>
              {currentSection.instruction && <p className="text-sm text-[#444]">{currentSection.instruction}</p>}
            </div>

            <div className="flex flex-col gap-4 sm:gap-5 mb-8 sm:mb-10">
              {currentSection.type === "array" || currentSection.type === "tags" ? (
                <FieldRenderer field={currentSection} value={sectionData} onChange={handleSectionChange} />
              ) : (
                currentSection.fields?.map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm text-[#555] mb-1.5">
                      {field.label || field.name}
                      {field.required && <span className="text-[#444] ml-1">*</span>}
                    </label>
                    {field.instruction && <p className="text-xs text-[#333] mb-1.5">{field.instruction}</p>}
                    <FieldRenderer
                      field={field}
                      value={sectionData?.[field.name] ?? field.default}
                      onChange={(val) => handleSectionChange({ ...sectionData, [field.name]: val })}
                    />
                  </div>
                ))
              )}
            </div>

            {submitError && <p className="text-xs text-red-400 mb-4">{submitError}</p>}

            <div className="flex items-center justify-between pt-5 sm:pt-6 border-t border-[#111]">
              <button type="button" onClick={() => setCurrentIndex((i) => i - 1)} disabled={isFirst}
                className="border border-[#222] text-[#666] px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-sm hover:border-[#444] hover:text-[#f5f5f5] transition disabled:opacity-20 disabled:cursor-not-allowed">
                ← Back
              </button>
              {isLast ? (
                <button type="button" onClick={handleSubmit}
                  className="bg-[#f5f5f5] text-[#080808] px-5 sm:px-6 py-2 sm:py-2.5 rounded-lg text-sm font-medium hover:bg-white transition">
                  Create Portfolio
                </button>
              ) : (
                <button type="button" onClick={() => setCurrentIndex((i) => i + 1)}
                  className="bg-[#f5f5f5] text-[#080808] px-5 sm:px-6 py-2 sm:py-2.5 rounded-lg text-sm font-medium hover:bg-white transition">
                  Next →
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default CreatePortfolio;