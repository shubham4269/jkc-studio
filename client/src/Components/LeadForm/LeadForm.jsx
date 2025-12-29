import React, { useState, useEffect } from "react";
import API from "../../Services/api";

const LeadForm = ({ onSuccess, adminMode = false }) => {
  const [success, setSuccess] = useState(false);
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    service: "",
    message: "",
    followUp: true,
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  // Fetch services from backend
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await API.get("/services");
        setServices(data);
        if (data.length > 0 && !form.service) {
          setForm(prev => ({ ...prev, service: data[0].title }));
        }
      } catch (err) {
        console.error("Failed to fetch services:", err);
        // Fallback to default options
        setServices([
          { title: "Design Retainer" },
          { title: "Video Production" },
          { title: "Brand Kits" }
        ]);
        setForm(prev => ({ ...prev, service: "Design Retainer" }));
      }
    };
    fetchServices();
  }, []);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setLoading(true);
    try {
      const payload = {
        name: form.name,
        phone: form.phone,
        email: form.email,
        company: form.company,
        service: form.service,
        message: form.message,
        followUp: form.followUp,
      };

      const res = await API.post("/leads", payload);
      setStatus({ type: "success", message: "Thanks —" });
      setForm({ 
        name: "", 
        phone: "", 
        email: "", 
        company: "", 
        service: services.length > 0 ? services[0].title : "", 
        message: "", 
        followUp: true 
      });
      setSuccess(true);
setStatus(null);
setTimeout(() => {
  onSuccess && onSuccess(res.data);
}, 3000);
    } catch (err) {
      console.error(err);
      setStatus({ type: "error", message: err?.response?.data?.message || "Submission failed — please try again." });
    } finally {
      setLoading(false);
    }
  };
  return (
  <div className="cta-box">

    {!success ? (
      <>
        {/* Header */}
        <div className="cta-header">
          <h3>Get a fast quote</h3>
          <p className="cta-sub">
            Answer a few essentials. We'll send a tailored plan plus next steps.
          </p>
        </div>

        {/* Form */}
        <form className="cta-form" onSubmit={handleSubmit}>
          <input name="name" className="input" placeholder="Your name" value={form.name} onChange={handleChange} required />
          <input name="phone" className="input" placeholder="Phone" value={form.phone} onChange={handleChange} />
          <input name="email" className="input" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input name="company" className="input" placeholder="Company or brand" value={form.company} onChange={handleChange} />

          <select name="service" className="input" value={form.service} onChange={handleChange}>
            {services.map((service, i) => (
              <option key={i} value={service.title}>{service.title}</option>
            ))}
          </select>

          <textarea
            name="message"
            className="input input-textarea"
            placeholder="Project goals, launch date, links (optional)"
            rows={4}
            value={form.message}
            onChange={handleChange}
          />

          <label className="cta-check">
            <input name="followUp" type="checkbox" checked={form.followUp} onChange={handleChange} />
            <span>I'd like a follow-up call to review the plan.</span>
          </label>

          <button className="cta-btn" style={{ width: "100%" }} disabled={loading}>
            {loading ? "Sending…" : "Send my project outline"}
          </button>
        </form>
      </>
    ) : (
      /* ✅ SUCCESS STATE */
      <div className="cta-success">
        <div className="success-icon">✓</div>
        <h3>Request received</h3>
        <p>
          Thanks for reaching out. We’ll review your project and get back to you
          within one business day.
        </p>
      </div>
    )}

  </div>
);

};

export default LeadForm;
