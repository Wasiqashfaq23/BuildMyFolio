import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const inputClass = "w-full bg-[#111] border border-[#222] rounded-lg px-3 py-2.5 text-sm text-[#f5f5f5] outline-none focus:border-[#444] transition placeholder:text-[#333]";

function FieldRenderer({ field, value, onChange }) {
  const [input, setInput] = useState("");

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
        {field.instruction && <p className="text-xs text-[#444] mb-2">{field.instruction}</p>}
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder={field.placeholder || "Type and press Enter"}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
            className={inputClass}
          />
          <button type="button" onClick={addTag} className="border border-[#222] text-[#888] px-3 rounded-lg text-sm hover:border-[#444] transition">
            Add
          </button>
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
    return (
      <div>
        {field.instruction && <p className="text-xs text-[#444] mb-2">{field.instruction}</p>}
        <input
          type="file"
          accept="image/*"
          multiple={field.multiple}
          onChange={(e) => {
            const files = Array.from(e.target.files).map(f => URL.createObjectURL(f));
            onChange(field.multiple ? [...images, ...files].slice(0, field.max || 4) : files);
          }}
          className="text-sm text-[#555] file:mr-3 file:bg-[#161616] file:border file:border-[#222] file:text-[#888] file:text-xs file:px-3 file:py-1.5 file:rounded-lg file:cursor-pointer"
        />
        <div className="flex gap-2 mt-2 flex-wrap">
          {images.map((img, i) => (
            <div key={i} className="relative">
              <img src={img} className="w-16 h-16 object-cover rounded-lg border border-[#222]" />
              <button type="button" onClick={() => onChange(images.filter((_, j) => j !== i))} className="absolute -top-1 -right-1 w-4 h-4 bg-[#222] text-[#888] rounded-full text-xs flex items-center justify-center hover:text-red-400">×</button>
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
        {field.instruction && <p className="text-xs text-[#444]">{field.instruction}</p>}
        {items.map((item, index) => (
          <div key={index} className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl p-4 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#333]">#{index + 1}</span>
              {(!field.min || items.length > field.min) && (
                <button type="button" onClick={() => removeItem(index)} className="text-xs text-[#333] hover:text-red-400 transition">Remove</button>
              )}
            </div>
            {field.item.fields.map((subField) => (
              <div key={subField.name}>
                <label className="block text-xs text-[#444] mb-1.5">{subField.label || subField.name}</label>
                {subField.instruction && <p className="text-xs text-[#333] mb-1.5">{subField.instruction}</p>}
                <FieldRenderer
                  field={subField}
                  value={item[subField.name]}
                  onChange={(val) => updateItem(index, subField.name, val)}
                />
              </div>
            ))}
          </div>
        ))}
        {(!field.max || items.length < field.max) && (
          <button
            type="button"
            onClick={addItem}
            className="border border-dashed border-[#222] text-[#444] py-2.5 rounded-lg text-sm hover:border-[#444] hover:text-[#888] transition"
          >
            + Add {field.label || field.name}
          </button>
        )}
        {field.min > 0 && items.length < field.min && (
          <p className="text-xs text-[#444]">Add at least {field.min}</p>
        )}
      </div>
    );
  }

  if (field.type === "object") {
    return (
      <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl p-4 flex flex-col gap-3">
        {field.fields.map((subField) => (
          <div key={subField.name}>
            <label className="block text-xs text-[#444] mb-1.5">{subField.label || subField.name}</label>
            <FieldRenderer
              field={subField}
              value={value?.[subField.name]}
              onChange={(val) => onChange({ ...value, [subField.name]: val })}
            />
          </div>
        ))}
      </div>
    );
  }

  return null;
}

function CreatePortfolio() {
  const { templateId } = useParams();
  const navigate = useNavigate();

  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

useEffect(() => {
  fetch(`${import.meta.env.VITE_API_URL}/template/${templateId}`, {
    credentials: "include",
  })
    .then(res => res.json())
    .then(data => {
      setTemplate(data);
      return import(`./Data/${data.portfolioType}.json`);
    })
    .then(json => {
      setTemplate(prev => ({ ...prev, sections: json.default }));
      const saved = sessionStorage.getItem(`portfolio_${templateId}`);
      if (saved) setFormData(JSON.parse(saved));
    })
    .catch(err => setError(err.message))
    .finally(() => setLoading(false));
}, [templateId]);

  if (loading) return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center">
      <p className="text-[#555] text-sm">Loading template...</p>
    </div>
  );

  if (error || !template) return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center">
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

  function handleNext() {
    if (!isLast) setCurrentIndex(i => i + 1);
  }

  function handleBack() {
    if (!isFirst) setCurrentIndex(i => i - 1);
  }

  function handleSubmit() {
    navigate("/preview", {
      state: {
        data: formData,
        templateId: templateId,
        templateComponent: template.portfolioType, 
      }
    });
  }

  const sectionData = formData[currentSection.sectionId];

  return (
    <div className="min-h-screen bg-[#080808]">

      <div className="border-b border-[#1a1a1a] px-10 py-4 flex items-center justify-between">
        <span className="text-sm font-bold text-[#f5f5f5] tracking-widest uppercase">Portfolio.</span>
        <div className="flex items-center gap-4">
          <span className="text-xs text-[#444]">Step {currentIndex + 1} of {sections.length}</span>
          <div className="w-32 h-1 bg-[#1a1a1a] rounded-full overflow-hidden">
            <div className="h-full bg-[#f5f5f5] rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
          <button
      onClick={() => navigate("/dashboard")}
      className="text-s text-[#aaa] hover:text-[#f5f5f5] border border-[#222] px-3 py-1.5 rounded-lg transition"
    >
      ← Dashboard
    </button>
        </div>
      </div>

      <div className="flex">

        <aside className="w-52 border-r border-[#1a1a1a] py-8 px-3 flex flex-col gap-1 shrink-0 sticky top-0 h-screen">
          <p className="text-xs text-[#333] uppercase tracking-widest mb-3 px-2">Sections</p>
          {sections.map((section, i) => (
            <button
              key={section.sectionId}
              type="button"
              onClick={() => setCurrentIndex(i)}
              className={`text-left px-3 py-2 rounded-lg text-sm transition flex items-center gap-2 ${currentIndex === i ? "bg-[#161616] text-[#f5f5f5]" : "text-[#555] hover:text-[#888]"}`}
            >
              <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${i <= currentIndex ? "bg-[#f5f5f5]" : "bg-[#333]"}`} />
              {section.label}
            </button>
          ))}
        </aside>

        <main className="flex-1 px-10 py-10 overflow-y-auto">
          <div className="max-w-xl">

            <div className="mb-8">
              <div className="flex gap-1 mb-6">
                {sections.map((_, i) => (
                  <div
                    key={i}
                    className={`h-0.5 flex-1 rounded-full transition-all ${i <= currentIndex ? "bg-[#f5f5f5]" : "bg-[#1a1a1a]"}`}
                  />
                ))}
              </div>
              <h2 className="text-xl font-medium text-[#f5f5f5] mb-1">{currentSection.label}</h2>
              {currentSection.instruction && (
                <p className="text-sm text-[#444]">{currentSection.instruction}</p>
              )}
            </div>

            <div className="flex flex-col gap-5 mb-10">
              {currentSection.type === "array" || currentSection.type === "tags" ? (
                <FieldRenderer
                  field={currentSection}
                  value={sectionData}
                  onChange={handleSectionChange}
                />
              ) : (
                currentSection.fields?.map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm text-[#555] mb-1.5">
                      {field.label || field.name}
                      {field.required && <span className="text-[#444] ml-1">*</span>}
                    </label>
                    {field.instruction && (
                      <p className="text-xs text-[#333] mb-1.5">{field.instruction}</p>
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

            <div className="flex items-center justify-between pt-6 border-t border-[#111]">
              <button
                type="button"
                onClick={handleBack}
                disabled={isFirst}
                className="border border-[#222] text-[#666] px-5 py-2.5 rounded-lg text-sm hover:border-[#444] hover:text-[#f5f5f5] transition disabled:opacity-20 disabled:cursor-not-allowed"
              >
                ← Back
              </button>

              {isLast ? (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="bg-[#f5f5f5] text-[#080808] px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-white transition"
                >
                  Create Portfolio
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-[#f5f5f5] text-[#080808] px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-white transition"
                >
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