import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaCog,
  FaSignOutAlt,
  FaEnvelopeOpenText,
  FaBriefcase,
  FaLayerGroup,
} from "react-icons/fa";
import "../css/admin.css";

export default function AdminLayout() {
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminEmail");
    window.location.href = "/login";
  };

  return (
    <div className="admin-layout">
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
            <FaTachometerAlt className="menu-icon" />
            Dashboard
          </Link>

          <Link
            to="/admin/leads"
            className={`menu-item ${location.pathname.startsWith("/admin/leads") ? "active" : ""}`}
          >
            <FaEnvelopeOpenText className="menu-icon" />
            Leads
          </Link>

          <Link
            to="/admin/services"
            className={`menu-item ${location.pathname.startsWith("/admin/services") ? "active" : ""}`}
          >
            <FaLayerGroup className="menu-icon" />
            Services
          </Link>

          <Link
            to="/admin/portfolio"
            className={`menu-item ${location.pathname.startsWith("/admin/portfolio") ? "active" : ""}`}
          >
            <FaBriefcase className="menu-icon" />
            Portfolio
          </Link>

          <Link
            to="/admin/settings"
            className={`menu-item ${location.pathname === "/admin/settings" ? "active" : ""}`}
          >
            <FaCog className="menu-icon" />
            Settings
          </Link>
        </nav>

        <div className="logout-section">
          <button className="menu-item logout-btn" onClick={logout}>
            <FaSignOutAlt className="menu-icon" />
            Logout
          </button>
        </div>
      </aside>

      {/* main content rendered by nested routes */}
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
