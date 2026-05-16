import { useState, useRef } from "react";
import Input from "../common/Input";
import Button from "../common/Button";

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
      <Input
        type={field.type === "link" ? "url" : field.type}
        placeholder={field.placeholder || ""}
        required={field.required}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
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
        className="w-full px-3 py-2.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-colors duration-200"
      />
    );
  }

  if (field.type === "boolean") {
    return (
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(!value)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            value ? "bg-blue-600" : "bg-slate-300"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              value ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
        <span className="text-sm text-slate-700">{value ? "On" : "Off"}</span>
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
        {showInstruction && field.instruction && (
          <p className="text-xs text-slate-500 mb-2">{field.instruction}</p>
        )}
        <div className="flex gap-2 mb-3">
          <Input
            type="text"
            placeholder={field.placeholder || "Type and press Enter"}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag();
              }
            }}
            className="flex-1"
          />
          <Button type="button" onClick={addTag} variant="secondary" size="md">
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200 text-blue-700 text-sm px-3 py-1.5 rounded-lg"
            >
              {tag}
              <button
                type="button"
                onClick={() => onChange(tags.filter((_, j) => j !== i))}
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (field.type === "image") {
    const images = value || [];
    const allowedImageTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    const allowedImageExts = [".jpg", ".jpeg", ".png", ".webp"];

    async function handleUpload(e) {
      const files = Array.from(e.target.files);
      if (!files.length) return;
      if (fileInputRef.current) fileInputRef.current.value = "";

      const invalid = files.filter(
        (f) => !allowedImageTypes.includes(f.type) && !allowedImageExts.some((ext) => f.name.toLowerCase().endsWith(ext))
      );
      if (invalid.length > 0) {
        setUploadError(`Unsupported format: ${invalid.map((f) => f.name.split(".").pop()).join(", ")}. Use JPG, PNG, or WebP.`);
        return;
      }

      const oversized = files.filter((f) => f.size > 10 * 1024 * 1024);
      if (oversized.length > 0) {
        setUploadError("Image too large. Maximum 10MB per file.");
        return;
      }

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
        <label
          className={`flex items-center justify-center gap-3 cursor-pointer border-2 border-dashed rounded-lg px-4 py-6 transition ${
            uploading
              ? "border-slate-200 bg-slate-50 cursor-not-allowed"
              : "border-slate-300 hover:border-blue-400 hover:bg-blue-50"
          }`}
        >
          <span className="text-sm text-slate-600">
            {uploading ? "Uploading..." : "Choose image"}
          </span>
          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.webp"
            multiple={field.multiple}
            disabled={uploading}
            onChange={handleUpload}
            className="hidden"
          />
        </label>
        {uploadError && <p className="text-xs text-red-600 mt-2">{uploadError}</p>}
        {uploading && (
          <p className="text-xs text-slate-500 mt-2 animate-pulse">
            Uploading to Cloudinary...
          </p>
        )}
        <div className="flex gap-3 mt-3 flex-wrap">
          {images.map((url, i) => (
            <div key={i} className="relative group">
              <img
                src={url}
                alt={`upload-${i}`}
                className="w-20 h-20 object-cover rounded-lg border border-slate-200"
              />
              <button
                type="button"
                onClick={() => onChange(images.filter((_, j) => j !== i))}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-sm flex items-center justify-center hover:bg-red-600 transition opacity-0 group-hover:opacity-100"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (field.type === "resume") {
    const [resumeUploading, setResumeUploading] = useState(false);
    const [resumeError, setResumeError] = useState("");
    const resumeRef = useRef(null);

    async function handleResumeUpload(e) {
      const file = e.target.files[0];
      if (!file) return;
      if (resumeRef.current) resumeRef.current.value = "";
      if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
        setResumeError("Only PDF files are accepted. Please convert your document to PDF first.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setResumeError("File too large. Maximum 5MB.");
        return;
      }
      setResumeUploading(true);
      setResumeError("");
      try {
        const fd = new FormData();
        fd.append("resume", file);
        const res = await fetch(`${import.meta.env.VITE_API_URL}/upload/resume`, {
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
        onChange(data.url);
      } catch (err) {
        setResumeError(err.message || "Upload failed");
      } finally {
        setResumeUploading(false);
      }
    }

    return (
      <div>
        <div className="flex items-center gap-3">
          <label
            className={`flex-1 flex items-center justify-center gap-2 cursor-pointer border-2 border-dashed rounded-lg px-4 py-4 transition ${
              resumeUploading
                ? "border-slate-200 bg-slate-50 cursor-not-allowed"
                : "border-slate-300 hover:border-blue-400 hover:bg-blue-50"
            }`}
          >
            <span className="text-sm text-slate-600">
              {resumeUploading ? "Uploading..." : value ? "Replace PDF" : "Upload Resume (PDF)"}
            </span>
            <input
              ref={resumeRef}
              type="file"
              accept=".pdf,application/pdf"
              disabled={resumeUploading}
              onChange={handleResumeUpload}
              className="hidden"
            />
          </label>
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="text-xs text-red-600 hover:text-red-700 font-medium"
            >
              Remove
            </button>
          )}
        </div>
        {value && (
          <p className="text-xs text-green-600 mt-2 truncate">Uploaded: {value.split('/').pop()}</p>
        )}
        {resumeError && <p className="text-xs text-red-600 mt-2">{resumeError}</p>}
        {resumeUploading && (
          <p className="text-xs text-slate-500 mt-2 animate-pulse">Uploading to server...</p>
        )}
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
      onChange(
        items.map((item, i) => (i === index ? { ...item, [subField]: subValue } : item))
      );
    }
    function removeItem(index) {
      onChange(items.filter((_, i) => i !== index));
    }
    return (
      <div className="flex flex-col gap-4">
        {showInstruction && field.instruction && (
          <p className="text-xs text-slate-500">{field.instruction}</p>
        )}
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 flex flex-col gap-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">#{index + 1}</span>
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="text-xs text-red-600 hover:text-red-700 font-medium transition"
              >
                Remove
              </button>
            </div>
            {field.item.fields.map((subField) => (
              <div key={subField.name}>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  {subField.label || subField.name}
                </label>
                {subField.instruction && (
                  <p className="text-xs text-slate-500 mb-1.5">{subField.instruction}</p>
                )}
                <FieldRenderer
                  field={subField}
                  value={item[subField.name]}
                  onChange={(val) => updateItem(index, subField.name, val)}
                  showInstruction={false}
                />
              </div>
            ))}
          </div>
        ))}
        {(!field.max || items.length < field.max) && (
          <button
            type="button"
            onClick={addItem}
            className="border-2 border-dashed border-slate-300 text-slate-600 py-3 rounded-lg text-sm font-medium hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition"
          >
            + Add {field.label || field.name}
          </button>
        )}
        {field.min > 0 && items.length < field.min && (
          <p className="text-xs text-slate-500">Add at least {field.min}</p>
        )}
      </div>
    );
  }

  if (field.type === "object") {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 flex flex-col gap-4">
        {field.fields.map((subField) => (
          <div key={subField.name}>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              {subField.label || subField.name}
            </label>
            <FieldRenderer
              field={subField}
              value={value?.[subField.name]}
              onChange={(val) => onChange({ ...value, [subField.name]: val })}
              showInstruction={false}
            />
          </div>
        ))}
      </div>
    );
  }

  return null;
}

export default FieldRenderer;
