// src/pages/AdminAddProduct.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminAddProduct() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    oldPrice: "",
    image: "",
    description: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!form.name.trim()) return setError("Product name is required");
    if (!form.price || Number(form.price) <= 0)
      return setError("Price must be a positive number");

    const payload = {
      name: form.name.trim(),
      price: Number(form.price),
      oldPrice: form.oldPrice ? Number(form.oldPrice) : undefined,
      image: form.image ? form.image.trim() : "",
      description: form.description.trim(),
      category: form.category.trim(),
    };

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/products", payload, {
        headers: { "Content-Type": "application/json" },
      });

      setSuccessMsg("Product created successfully");
      setForm({
        name: "",
        price: "",
        oldPrice: "",
        image: "",
        description: "",
        category: "",
      });

      // optional: navigate to new product
      // navigate(`/product/${res.data._id}`);
    } catch (err) {
      console.error("Create product error:", err);
      setError(
        err?.response?.data?.message ||
          err.message ||
          "Failed to create product"
      );
    } finally {
      setLoading(false);
    }
  };

  const previewSrc = form.image
    ? form.image.startsWith("http")
      ? form.image
      : `http://localhost:5000${form.image}`
    : null;

  return (
    <main className="section">
      <div className="container" style={{ maxWidth: 1100 }}>
        <h2 className="section-title" style={{ marginBottom: 18 }}>
          Admin — Add Product
        </h2>

        {error && <div className="form-alert error">{error}</div>}
        {successMsg && <div className="form-alert success">{successMsg}</div>}

        <form className="form-card" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Name *</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="form-control"
                placeholder="Product name"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Category</label>
              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g. Shoes"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Price (USD) *</label>
              <input
                name="price"
                type="number"
                step="0.01"
                value={form.price}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g. 49.99"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Old price</label>
              <input
                name="oldPrice"
                type="number"
                step="0.01"
                value={form.oldPrice}
                onChange={handleChange}
                className="form-control"
                placeholder="Optional"
              />
            </div>

            <div className="form-group full">
              <label className="form-label">Image URL or server path</label>
              <input
                name="image"
                value={form.image}
                onChange={handleChange}
                className="form-control"
                placeholder="https://... or /images/your-file.jpg"
              />
              <div className="help-text">
                Tip: paste remote image URL or use <code>/images/filename.jpg</code>{" "}
                for server-hosted images.
              </div>
            </div>

            <div className="form-group full">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={5}
                className="form-control"
                placeholder="Short description"
              />
            </div>
          </div>

          <div className="form-actions">
            <div className="preview-block">
              <div className="preview-label">Preview</div>
              {previewSrc ? (
                <img
                  src={previewSrc}
                  alt="preview"
                  className="preview-image"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200'%3E%3Crect width='400' height='200' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%236b7280' font-size='14'%3EImage not found%3C/text%3E%3C/svg%3E";
                  }}
                />
              ) : (
                <div className="preview-empty">No image</div>
              )}
            </div>

            <div className="actions">
              <button type="submit" className="primary-btn" disabled={loading}>
                {loading ? "Creating..." : "Create Product"}
              </button>
              <button
                type="button"
                className="secondary-btn"
                onClick={() =>
                  setForm({
                    name: "",
                    price: "",
                    oldPrice: "",
                    image: "",
                    description: "",
                    category: "",
                  })
                }
              >
                Reset
              </button>
              <button
                type="button"
                className="secondary-btn"
                onClick={() => navigate("/")}
                style={{ background: "transparent", color: "#4f46e5", border: "1px solid #e5e7eb" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}