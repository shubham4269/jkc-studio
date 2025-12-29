import React, { useEffect, useState } from "react";
import API from "../../Services/api";
import ServiceForm from "./serviceForm";
import "./services.css";

export default function ServiceList() {
  const [services, setServices] = useState([]);
  const [editService, setEditService] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const load = async () => {
    const res = await API.get("/services/admin/all");
    setServices(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id) => {
    if (!window.confirm("Delete this service?")) return;
    await API.delete(`/services/${id}`);
    load();
  };

  const openAdd = () => {
    setEditService(null);
    setShowForm(true);
  };

  const openEdit = (service) => {
    setEditService(service);
    setShowForm(true);
  };

  const closeForm = () => {
    setEditService(null);
    setShowForm(false);
  };

  return (
    <div className="admin-page admin-services-page">
      {!showForm ? (
        <>
          <div className="admin-page-head">
            <h2 className="page-title" style={{ margin: 0 }}>Services</h2>
            <button className="cta-btn admin-add-btn" type="button" onClick={openAdd}>
              + Add Service
            </button>
          </div>

          <div className="admin-table">
            <div className="admin-row admin-head">
              <span>Title</span>
              <span>Category</span>
              <span>Status</span>
              <span>Actions</span>
            </div>

            {services.map((s) => (
              <div className="admin-row" key={s._id}>
                <span>{s.title}</span>
                <span>{s.category}</span>
                <span>{s.isActive ? "Active" : "Hidden"}</span>
                <span>
                  <button type="button" onClick={() => openEdit(s)}>Edit</button>
                  <button type="button" onClick={() => remove(s._id)} className="danger">Delete</button>
                </span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="admin-page-head">
            <h2 className="page-title" style={{ margin: 0 }}>{editService ? "Edit Service" : "Add Service"}</h2>
            <button className="admin-back-btn" type="button" onClick={closeForm}>
              ← Back
            </button>
          </div>

          <ServiceForm
            editService={editService}
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
