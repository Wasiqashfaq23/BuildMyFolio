import { useState } from "react";
import { FiUpload, FiImage } from "react-icons/fi";
import AppNavbar from "../components/common/AppNavbar";
import Spinner from "../components/common/Spinner";

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

    if (!form.templateName.trim()) return setError("Template name is required");
    if (!form.category) return setError("Please select a category");
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
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <AppNavbar backTo="/dashboard" backLabel="Dashboard" />

      <main className="flex-1 max-w-2xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Upload Template</h1>
          <p className="text-sm text-slate-500 mt-0.5">Add a new portfolio template to the platform</p>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-5 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label htmlFor="templateName" className="block text-sm font-medium text-slate-700 mb-1.5">
                Template name <span className="text-red-500 ml-0.5" aria-label="required">*</span>
              </label>
              <input
                id="templateName"
                name="templateName"
                type="text"
                value={form.templateName}
                onChange={handleChange}
                placeholder="Developer Portfolio"
                required
                className="w-full px-3 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
              />
              <p className="text-xs text-slate-400 mt-1.5">
                Maps to {form.templateName ? form.templateName.replace(/\s+/g, "") + ".jsx" : "....jsx"}
              </p>
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-1.5">
                Category <span className="text-red-500 ml-0.5" aria-label="required">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                aria-describedby={error && !form.category ? "upload-error" : undefined}
                className="w-full px-3 py-2.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
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
              <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1.5">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="A clean minimal portfolio for developers..."
                rows={3}
                className="w-full px-3 py-2.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-shadow"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Preview image <span className="text-red-500 ml-0.5" aria-label="required">*</span>
              </label>
              <button
                type="button"
                onClick={() => document.getElementById("imageInput").click()}
                className="w-full border-2 border-dashed border-slate-300 rounded-lg p-4 text-center hover:border-blue-400 hover:bg-blue-50/50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                aria-label="Upload preview image"
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="Template preview" className="w-full h-48 object-cover rounded-lg" />
                ) : (
                  <div className="py-8 flex flex-col items-center gap-2">
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center" aria-hidden="true">
                      <FiImage className="text-slate-400" size={18} />
                    </div>
                    <p className="text-sm font-medium text-slate-600">Click to upload image</p>
                    <p className="text-xs text-slate-400">PNG, JPG, WEBP</p>
                  </div>
                )}
              </button>
              <input id="imageInput" type="file" accept="image/*" onChange={handleImage} className="hidden" aria-hidden="true" />
            </div>

            <div className="flex items-center gap-3 py-1">
              <input
                type="checkbox"
                name="isActive"
                id="isActive"
                checked={form.isActive}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="isActive" className="text-sm text-slate-700 cursor-pointer select-none">
                Active — visible to users immediately
              </label>
            </div>

            {error && (
              <div id="upload-error" role="alert" className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            {success && (
              <div role="status" className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:hover:bg-blue-600 flex items-center justify-center gap-2"
            >
              {loading && <Spinner size="sm" className="border-white/30 border-t-white" />}
              {loading ? "Uploading..." : (
                <>
                  <FiUpload size={14} aria-hidden="true" />
                  Upload Template
                </>
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
