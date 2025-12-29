import React, { useState } from "react";
import API from "../Services/api";
import "../css/admin.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/admin/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("adminEmail", res.data.admin.email);

      window.location.href = "/admin/dashboard";
    } catch (err) {
      alert(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleLogin}>

        {/* HEADER WITH NAVBAR COLOR */}
        <div className="login-header">
          <img src="/Images/jkclogo.png" alt="JKC Studios" className="login-logo" />
          <h1>Admin Login</h1>
        </div>

        {/* FORM SECTION */}
        <div className="login-body login-form">"

          <label className="input-label">Email</label>
          <input
            className="input"
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="input-label">Password</label>
          <input
            className="input"
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="cta-btn">Login</button>
        </div>

      </form>
    </div>
  );
}
