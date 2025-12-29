import React, { useState, useEffect } from "react";
import API from "../../Services/api";
import "./portfolio.css";

const initialState = {
  title: "",
  slug: "",
  category: "branding",
  thumbnail: "",
  images: [],
  videoUrl: "",
  videoType: "",
  shortDescription: "",
  tags: "",
  clientName: "",
  date: "",
  isCaseStudy: false,
  problem: "",
  approach: "",
  process: "",
  result: "",
  isPublished: true,
};

export default function PortfolioForm({ editItem, onSuccess }) {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);

  /* ================= LOAD EDIT DATA ================= */
  useEffect(() => {
    if (editItem) {
      setForm({
        ...initialState,
        title: editItem.title || "",
        slug: editItem.slug || "",
        category: editItem.category || "branding",
        thumbnail: editItem.thumbnail || "",
        images: Array.isArray(editItem.images)
          ? editItem.images.map((img) => (typeof img === "string" ? img : img?.url)).filter(Boolean)
          : [],
        videoUrl: Array.isArray(editItem.videos) ? editItem.videos[0] || "" : "",
        videoType: editItem.videoType || "",
        shortDescription: editItem.shortDescription || "",
        tags: Array.isArray(editItem.tags) ? editItem.tags.join(", ") : "",
        clientName: editItem.clientName || "",
        date: editItem.date ? String(editItem.date).slice(0, 10) : "",
        isCaseStudy: Boolean(editItem.isCaseStudy),
        problem: editItem.caseStudy?.problem || "",
        approach: editItem.caseStudy?.approach || "",
        process: editItem.caseStudy?.process || "",
        result: editItem.caseStudy?.result || "",
        isPublished: editItem.isPublished !== undefined ? Boolean(editItem.isPublished) : true,
      });
    } else {
      setForm(initialState);
    }
  }, [editItem]);

  /* ================= BASIC HANDLER ================= */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  /* ================= SUBMIT ================= */
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const tags = (form.tags || "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const images = (form.images || [])
      .map((url) => String(url || "").trim())
      .filter(Boolean)
      .map((url) => ({ url }));

    const videos = form.videoUrl ? [String(form.videoUrl).trim()].filter(Boolean) : [];

    const payload = {
      title: form.title,
      slug: form.slug,
      category: form.category,
      thumbnail: form.thumbnail,
      shortDescription: form.shortDescription,
      clientName: form.clientName,
      date: form.date,
      tags,
      images,
      videos,
      videoType: form.videoType || undefined,
      isCaseStudy: form.isCaseStudy,
      caseStudy: form.isCaseStudy
        ? {
            problem: form.problem,
            approach: form.approach,
            process: form.process,
            result: form.result,
          }
        : undefined,
      isPublished: form.isPublished,
    };

    try {
      if (editItem?._id) {
        await API.put(`/portfolio/${editItem._id}`, payload);
      } else {
        await API.post("/portfolio", payload);
      }
      setForm(initialState);
      onSuccess?.();
    } catch (err) {
      alert(err.response?.data?.message || "Error saving portfolio");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="portfolio-form" onSubmit={submit}>
      <h2>{editItem ? "Edit Project" : "Create New Project"}</h2>

      {/* ================= BASIC INFO ================= */}
      <div className="form-section">
        <h4 className="form-section-title">
          <span className="section-icon">📋</span>
          Basic Information
        </h4>
      </div>

      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Project Title"
        required
      />

      <input
        name="slug"
        value={form.slug}
        onChange={handleChange}
        placeholder="URL Slug (e.g. my-project)"
        required
      />

      <select name="category" value={form.category} onChange={handleChange}>
        <option value="branding">Branding</option>
        <option value="video">Video</option>
        <option value="digital">Digital</option>
        <option value="print">Print</option>
      </select>

      <textarea
        name="shortDescription"
        value={form.shortDescription}
        onChange={handleChange}
        placeholder="Short description (displayed on cards)"
      />

      {/* ================= MEDIA ================= */}
      <div className="form-section">
        <h4 className="form-section-title">
          <span className="section-icon">🎨</span>
          Media & Assets
        </h4>
      </div>

      <input
        name="thumbnail"
        value={form.thumbnail}
        onChange={handleChange}
        placeholder="Thumbnail URL (main cover image)"
      />

      <div className="gallery-input-wrapper">
        <label>Gallery Images (one URL per line)</label>
        <textarea
          placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
          value={form.images.join("\n")}
          onChange={(e) =>
            setForm({ ...form, images: e.target.value.split("\n") })
          }
        />
      </div>

      <input
        name="videoUrl"
        value={form.videoUrl}
        onChange={handleChange}
        placeholder="Video URL (YouTube / Vimeo / MP4)"
      />

      <select name="videoType" value={form.videoType} onChange={handleChange}>
        <option value="">Select Video Type</option>
        <option value="youtube">YouTube</option>
        <option value="vimeo">Vimeo</option>
        <option value="mp4">MP4 / Direct Link</option>
      </select>

      {/* ================= PROJECT DETAILS ================= */}
      <div className="form-section">
        <h4 className="form-section-title">
          <span className="section-icon">📝</span>
          Project Details
        </h4>
      </div>

      <input
        name="tags"
        value={form.tags}
        onChange={handleChange}
        placeholder="Tags (comma separated)"
      />

      <input
        name="clientName"
        value={form.clientName}
        onChange={handleChange}
        placeholder="Client Name"
      />

      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
      />

      {/* ================= CASE STUDY TOGGLE ================= */}
      <div className="form-section">
        <h4 className="form-section-title">
          <span className="section-icon">📖</span>
          Case Study
        </h4>
      </div>

      <label className="form-checkbox">
        <input
          type="checkbox"
          name="isCaseStudy"
          checked={form.isCaseStudy}
          onChange={handleChange}
        />
        <div>
          <span className="checkbox-label">Enable Case Study</span>
          <p className="checkbox-hint">Add detailed problem-solution narrative</p>
        </div>
      </label>

      {form.isCaseStudy && (
        <div className="case-study-section">
          <div className="section-header">
            <span>✨ Case Study Details</span>
          </div>

          <textarea
            name="problem"
            value={form.problem}
            onChange={handleChange}
            placeholder="The Problem — What challenge did the client face?"
          />

          <textarea
            name="approach"
            value={form.approach}
            onChange={handleChange}
            placeholder="The Approach — How did you tackle it?"
          />

          <textarea
            name="process"
            value={form.process}
            onChange={handleChange}
            placeholder="The Process — Step-by-step methodology"
          />

          <textarea
            name="result"
            value={form.result}
            onChange={handleChange}
            placeholder="The Result — What was the outcome?"
          />
        </div>
      )}

      {/* ================= PUBLISH STATUS ================= */}
      <div className="form-section">
        <h4 className="form-section-title">
          <span className="section-icon">⚙️</span>
          Visibility
        </h4>
      </div>

      <label className="form-checkbox">
        <input
          type="checkbox"
          name="isPublished"
          checked={form.isPublished}
          onChange={handleChange}
        />
        <div>
          <span className="checkbox-label">Published</span>
          <p className="checkbox-hint">Make this project visible on the website</p>
        </div>
      </label>

      {/* ================= SUBMIT ================= */}
      <button className="submit-btn" type="submit" disabled={loading}>
        {loading ? "Saving..." : editItem ? "Update Project" : "Create Project"}
      </button>
    </form>
  );
}
