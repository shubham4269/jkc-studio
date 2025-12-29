import React, { useEffect, useState } from "react";
import API from "../../Services/api";
import { extractDriveFileId, getDriveImageUrl } from "../../utils/driveHelper";

const initialState = {
  title: "",
  slug: "",
  category: "branding",
  heroImage: "",
  shortDescription: "",
  description: "",
  process: [{ title: "", description: "" }],
  deliveryTimeline: "",
  pricing: "",
  faqs: [{ q: "", a: "" }],
  isActive: true,
};

export default function ServiceForm({ editService, onSuccess }) {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);

  /* ================= LOAD EDIT DATA ================= */
  useEffect(() => {
    if (editService) {
      setForm({
        ...initialState,
        ...editService,
        heroImage: editService.heroImage || "",
        process:
          Array.isArray(editService.process) && editService.process.length
            ? editService.process
            : [{ title: "", description: "" }],
        faqs:
          Array.isArray(editService.faqs) && editService.faqs.length
            ? editService.faqs
            : [{ q: "", a: "" }],
      });
    }
  }, [editService]);

  /* ================= BASIC HANDLER ================= */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Auto-extract Google Drive file ID from full URL
    if (name === "heroImage" && value) {
      const fileId = extractDriveFileId(value);
      setForm({ ...form, [name]: fileId || value });
    } else {
      setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    }
  };

  /* ================= PROCESS ================= */
  const handleProcessChange = (i, key, value) => {
    const process = [...form.process];
    process[i][key] = value;
    setForm({ ...form, process });
  };

  const addProcessStep = () => {
    setForm({
      ...form,
      process: [...form.process, { title: "", description: "" }],
    });
  };

  const removeProcessStep = (i) => {
    if (form.process.length === 1) return;
    const process = form.process.filter((_, index) => index !== i);
    setForm({ ...form, process });
  };

  /* ================= FAQ ================= */
  const handleFAQChange = (i, key, value) => {
    const faqs = [...form.faqs];
    faqs[i][key] = value;
    setForm({ ...form, faqs });
  };

  const addFAQ = () => {
    setForm({ ...form, faqs: [...form.faqs, { q: "", a: "" }] });
  };

  const removeFAQ = (i) => {
    if (form.faqs.length === 1) return;
    const faqs = form.faqs.filter((_, index) => index !== i);
    setForm({ ...form, faqs });
  };

  /* ================= SUBMIT ================= */
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Debug - check what's being sent
    console.log("Submitting form with heroImage:", form.heroImage);
    console.log("Full form data:", JSON.stringify(form, null, 2));

    try {
      if (editService?._id) {
        await API.put(`/services/${editService._id}`, form);
      } else {
        await API.post("/services", form);
      }

      setForm(initialState);
      onSuccess?.();
    } catch (err) {
      alert(err.response?.data?.message || "Error saving service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="admin-card service-form" onSubmit={submit}>
      <h2>{editService ? "Edit Service" : "Add New Service"}</h2>

      {/* ================= BASIC ================= */}
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Service Title"
        required
      />

      <input
        name="slug"
        value={form.slug}
        onChange={handleChange}
        placeholder="Slug (e.g. brand-kit)"
        required
      />

      <select name="category" value={form.category} onChange={handleChange}>
        <option value="branding">Branding</option>
        <option value="video">Video</option>
        <option value="digital">Digital</option>
        <option value="print">Print</option>
      </select>

      <div className="hero-image-section">
        <label>Hero Background Image (Google Drive ID)</label>
        <input
          name="heroImage"
          value={form.heroImage}
          onChange={handleChange}
          placeholder="Paste Google Drive URL or File ID"
        />
        {form.heroImage && (
          <div className="hero-preview">
            <img 
              src={getDriveImageUrl(form.heroImage)} 
              alt="Hero preview" 
              style={{ maxWidth: '200px', borderRadius: '8px', marginTop: '8px' }}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        )}
      </div>

      <input
        name="categoryLabel"
        value={form.categoryLabel}
        onChange={handleChange}
        placeholder="Category Label (optional)"
      />

      <textarea
        name="shortDescription"
        value={form.shortDescription}
        onChange={handleChange}
        placeholder="Short description (card preview)"
      />

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Full service description"
      />

      {/* ================= PROCESS ================= */}
      <h4>Process</h4>

      {form.process.map((step, i) => (
        <div key={i} className="process-row">
          <div className="process-head">
            <div className="process-badge">{i + 1}</div>
            <strong>Step {i + 1}</strong>

            {form.process.length > 1 && (
              <button
                type="button"
                className="danger-btn"
                onClick={() => removeProcessStep(i)}
              >
                Remove
              </button>
            )}
          </div>

          <input
            placeholder="Heading (e.g. Discover)"
            value={step.title}
            onChange={(e) =>
              handleProcessChange(i, "title", e.target.value)
            }
            required
          />

          <textarea
            placeholder="Description"
            value={step.description}
            onChange={(e) =>
              handleProcessChange(i, "description", e.target.value)
            }
            required
          />
        </div>
      ))}

      <button type="button" className="admin-add-row" onClick={addProcessStep}>
        + Add Process Step
      </button>

      {/* ================= TIMELINE & PRICING ================= */}
      <textarea
        name="deliveryTimeline"
        value={form.deliveryTimeline}
        onChange={handleChange}
        placeholder="Delivery timeline"
      />

      <textarea
        name="pricing"
        value={form.pricing}
        onChange={handleChange}
        placeholder="Pricing details"
      />

      {/* ================= FAQ ================= */}
      <h4>FAQs</h4>

      {form.faqs.map((faq, i) => (
        <div key={i} className="faq-row">
          <input
            placeholder="Question"
            value={faq.q}
            onChange={(e) =>
              handleFAQChange(i, "q", e.target.value)
            }
          />
          <input
            placeholder="Answer"
            value={faq.a}
            onChange={(e) =>
              handleFAQChange(i, "a", e.target.value)
            }
          />

          {form.faqs.length > 1 && (
            <button
              type="button"
              className="danger-btn"
              onClick={() => removeFAQ(i)}
            >
              Remove
            </button>
          )}
        </div>
      ))}

      <button type="button" onClick={addFAQ}>
        + Add FAQ
      </button>

      {/* ================= ACTIVE ================= */}
      <label className="checkbox">
        <input
          type="checkbox"
          name="isActive"
          checked={form.isActive}
          onChange={handleChange}
        />
        Active
      </label>

      <button className="cta-btn" disabled={loading}>
        {loading ? "Saving..." : "Save Service"}
      </button>
    </form>
  );
}


