import React, { useEffect, useState } from "react";
import API from "../../Services/api";
import PortfolioForm from "./portfolioForm";
import { getEmbeddableImageUrl } from "../../utils/driveHelper";
import "./portfolio.css";

export default function PortfolioList() {
  const [items, setItems] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await API.get("/portfolio/admin/all");
      setItems(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to load portfolio list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id) => {
    if (!window.confirm("Delete this portfolio item?")) return;
    await API.delete(`/portfolio/${id}`);
    load();
  };

  const openAdd = () => {
    setEditItem(null);
    setShowForm(true);
  };

  const openEdit = (item) => {
    setEditItem(item);
    setShowForm(true);
  };

  const closeForm = () => {
    setEditItem(null);
    setShowForm(false);
  };

  return (
    <div className="admin-page admin-portfolio-page">
      {!showForm ? (
        <>
          <div className="admin-page-head">
            <h2 className="page-title" style={{ margin: 0 }}>Portfolio</h2>
            <button className="cta-btn admin-add-btn" type="button" onClick={openAdd}>
              + Add Project
            </button>
          </div>

          <div className="admin-table">
            <div className="admin-row admin-head">
              <span>Thumbnail</span>
              <span>Project</span>
              <span>Category</span>
              <span>Media</span>
              <span>Actions</span>
            </div>

            {loading ? (
              <div className="loading-state">
                <div className="loading-spinner"></div>
                Loading portfolio...
              </div>
            ) : items.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📂</div>
                <p>No portfolio items yet. Add your first project!</p>
              </div>
            ) : (
              items.map((item) => (
                <div className="admin-row" key={item._id}>
                  {/* Thumbnail Column */}
                  <span className="project-thumb">
                    {item.thumbnail ? (
                      <img 
                        src={getEmbeddableImageUrl(item.thumbnail)} 
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          if (e.target.nextElementSibling) e.target.nextElementSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <span className="thumb-placeholder" style={{ display: item.thumbnail ? 'none' : 'flex' }}>
                      🖼
                    </span>
                  </span>
                  {/* Project Title Column */}
                  <span>{item.title}</span>
                  {/* Category Column */}
                  <span>{item.category || "—"}</span>
                  {/* Media Column */}
                  <span>
                    <span className="media-badge">
                      {item.videos?.length ? "🎬 Video" : "🖼 Images"}
                    </span>
                  </span>
                  {/* Actions Column */}
                  <span className="actions">
                    <button type="button" onClick={() => openEdit(item)}>Edit</button>
                    <button type="button" onClick={() => remove(item._id)} className="danger">Delete</button>
                  </span>
                </div>
              ))
            )}
          </div>
        </>
      ) : (
        <>
          <div className="admin-page-head">
            <h2 className="page-title" style={{ margin: 0 }}>
              {editItem ? "Edit Project" : "Add Project"}
            </h2>
            <button className="admin-back-btn" type="button" onClick={closeForm}>
              ← Back to List
            </button>
          </div>

          <PortfolioForm
            editItem={editItem}
            onSuccess={() => {
              load();
              closeForm();
            }}
          />
        </>
      )}
    </div>
  );
}
