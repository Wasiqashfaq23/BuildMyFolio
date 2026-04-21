import { useState } from "react";

const inputClass = "w-full bg-[#111] border border-[#222] rounded-lg px-3 py-2.5 text-sm text-[#f5f5f5] outline-none focus:border-[#444] transition placeholder:text-[#444]";
const labelClass = "block text-sm text-[#555] mb-1.5";

export default function AdminUploadTemplate() {
  const [form, setForm] = useState({
    templateName: "",
    category: "",
    description: "",
    isActive: true,
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleImage(e) {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!imageFile) return setError("Please upload a preview image");

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("templateName", form.templateName);
      formData.append("category", form.category);
      formData.append("description", form.description);
      formData.append("isActive", form.isActive);
      formData.append("image", imageFile);

      const res = await fetch(`${import.meta.env.VITE_API_URL}/template`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create template");

      setSuccess(`Template "${form.templateName}" uploaded successfully!`);
      setForm({ templateName: "", category: "", description: "", isActive: true });
      setImageFile(null);
      setImagePreview("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#080808] px-6 py-12">
      <div className="max-w-2xl mx-auto">

        <div className="mb-8">
          <h1 className="text-2xl font-medium text-[#f5f5f5]">Upload template</h1>
          <p className="text-sm text-[#555] mt-1">Add a new portfolio template to the platform.</p>
        </div>

        <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className={labelClass}>Template name <span className="text-red-500">*</span></label>
              <input
                name="templateName"
                value={form.templateName}
                onChange={handleChange}
                placeholder="Developer Portfolio"
                required
                className={inputClass}
              />
              <p className="text-xs text-[#333] mt-1">
                Maps to{" "}
                <span className="text-[#555]">
                  {form.templateName ? form.templateName.replace(/\s+/g, "") + ".jsx" : "....jsx"}
                </span>
              </p>
            </div>

            <div>
              <label className={labelClass}>Category <span className="text-red-500">*</span></label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className={inputClass}
              >
                <option value="" disabled>Select category</option>
                <option value="developer">Developer</option>
                <option value="designer">Designer</option>
                <option value="freelancer">Freelancer</option>
                <option value="photographer">Photographer</option>
                <option value="writer">Writer</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="A clean minimal portfolio for developers..."
                rows={3}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Preview image <span className="text-red-500">*</span></label>
              <div
                className="border border-dashed border-[#222] rounded-lg p-4 text-center hover:border-[#444] transition cursor-pointer"
                onClick={() => document.getElementById("imageInput").click()}
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="preview" className="w-full h-40 object-cover rounded-lg" />
                ) : (
                  <div className="py-6">
                    <p className="text-[#444] text-sm">Click to upload image</p>
                    <p className="text-[#333] text-xs mt-1">PNG, JPG, WEBP</p>
                  </div>
                )}
              </div>
              <input id="imageInput" type="file" accept="image/*" onChange={handleImage} className="hidden" />
            </div>

            <div className="flex items-center gap-3 py-2">
              <input
                type="checkbox"
                name="isActive"
                id="isActive"
                checked={form.isActive}
                onChange={handleChange}
                className="w-4 h-4 accent-white"
              />
              <label htmlFor="isActive" className="text-sm text-[#555] cursor-pointer">
                Active — visible to users immediately
              </label>
            </div>

            {error && (
              <div className="bg-[#1a0a0a] border border-[#3a1a1a] text-red-400 text-sm px-3 py-2.5 rounded-lg">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-[#0a1a0a] border border-[#1a3a1a] text-green-400 text-sm px-3 py-2.5 rounded-lg">
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#f5f5f5] text-[#080808] py-2.5 rounded-lg text-sm font-medium hover:bg-white transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? "Uploading..." : "Upload template"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}