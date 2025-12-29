import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import API from "../Services/api";
import "../css/admin.css";

export default function Settings() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminEmail");
    window.location.href = "/login";
  };

  const changePass = async (e) => {
    e.preventDefault();

    try {
      await API.post("/admin/change-password", {
        oldPassword,
        newPassword,
      });

      alert("Password updated successfully!");
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      alert(err?.response?.data?.message || "Error updating password");
    }
  };

  return (
    <div className="admin-layout">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <span className="logo-mark"></span>
          <h2>JKC Studio</h2>
        </div>

        <nav className="menu">

          <Link 
            to="/admin/dashboard"
            className={`menu-item ${location.pathname === "/admin/dashboard" ? "active" : ""}`}
          >
            Dashboard
          </Link>

          <Link 
            to="/admin/settings"
            className={`menu-item ${location.pathname === "/admin/settings" ? "active" : ""}`}
          >
            Settings
          </Link>

          <button className="menu-item logout-btn" onClick={logout}>
            Logout
          </button>

        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main">

        <div className="topbar">
          <h1 className="page-title">Settings</h1>
        </div>

        <div className="settings-card">
          <h2>Change Password</h2>

          <form onSubmit={changePass}>
            <input
              className="input"
              type="password"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />

            <input
              className="input"
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <button className="cta-btn">Update Password</button>
          </form>
        </div>

      </main>
    </div>
  );
}

