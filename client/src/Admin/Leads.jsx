import React, { useEffect, useState } from "react";
import API from "../Services/api";
import { FaEye, FaTrashAlt } from "react-icons/fa";
import "../css/admin.css";

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await API.get("/leads");
      setLeads(res.data || []);
    } catch (err) {
      console.error("Failed to fetch leads", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this lead?")) return;
    try {
      await API.delete(`/leads/${id}`);
      setLeads((s) => s.filter((l) => l._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
      alert("Delete failed");
    }
  };

  const handleStatus = async (id, status) => {
    try {
      await API.put(`/leads/${id}`, { status });
      setLeads((s) => s.map((l) => (l._id === id ? { ...l, status } : l)));
    } catch (err) {
      console.error("Status update failed", err);
      alert("Update failed");
    }
  };

  const [selectedLead, setSelectedLead] = useState(null);

  return (
    <div className="admin-page leads-page">
      <div className="page-header">
        <h2>Leads</h2>
        <div className="page-actions">
          <button className="cta-btn" onClick={fetchLeads} disabled={loading}>
            {loading ? "Refreshing…" : "Refresh"}
          </button>
        </div>
      </div>

      <div className="table-wrap">
        <table className="leads-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Message</th>
              <th>Source</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: "center", padding: 30 }}>
                  No leads yet
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead._id || lead.id}>
                  <td>{new Date(lead.createdAt).toLocaleString()}</td>
                  <td>{lead.name}</td>
                  <td>{lead.phone}</td>
                  <td>{lead.email}</td>
                  <td className="lead-message">{lead.message}</td>
                  <td>{lead.source || "Website"}</td>
                  <td>
                    <select
                      value={lead.status || "new"}
                      onChange={(e) => handleStatus(lead._id, e.target.value)}
                    >
                      <option value="new">🟡 New</option>
                      <option value="contacted">🔵 Contacted</option>
                      <option value="closed">🔴 Closed</option>
                    </select>
                  </td>
                  <td className="actions">
                    <button title="View" className="icon-btn" onClick={() => setSelectedLead(lead)}>
                      <FaEye />
                    </button>
                    <button title="Delete" className="icon-btn danger" onClick={() => handleDelete(lead._id)}>
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* VIEW POPUP */}
      {selectedLead && (
        <div className="modal-overlay" onClick={() => setSelectedLead(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h2 style={{ marginBottom: "15px" }}>Lead Details</h2>

            <p><strong>Name:</strong> {selectedLead.name}</p>
            <p><strong>Date:</strong> {selectedLead.createdAt ? new Date(selectedLead.createdAt).toLocaleString() : "—"}</p>
            <p><strong>Phone:</strong> {selectedLead.phone}</p>
            <p><strong>Email:</strong> {selectedLead.email}</p>
            <p><strong>Message:</strong> {selectedLead.message}</p>
            <p><strong>Source:</strong> {selectedLead.source}</p>
            <p><strong>Status:</strong> {selectedLead.status}</p>

            <div style={{ marginTop: 16, display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button className="cta-btn" onClick={() => setSelectedLead(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
