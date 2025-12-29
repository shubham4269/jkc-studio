import React, { useState, useEffect } from "react";
import { FaCalendarDay, FaEnvelopeOpenText, FaLayerGroup, FaBriefcase } from "react-icons/fa";
import "../css/admin.css";
import API from "../Services/api";

// --- Small stats widgets for the admin dashboard ---
const StatCard = ({ icon, label, value }) => (
  <div className="stat-card">
    <div className="stat-icon">{icon}</div>
    <div>
      <h3 className="stat-value">{value}</h3>
      <p className="stat-label">{label}</p>
    </div>
  </div>
);

const DashboardStats = () => {
  const [stats, setStats] = useState({
    leadsToday: 0,
    totalLeads: 0,
    totalServices: 0,
    totalPortfolio: 0,
  });

  useEffect(() => {
    let mounted = true;
    const fetchStats = async () => {
      try {
        // use allSettled so a single failing endpoint doesn't cancel the others
        const results = await Promise.allSettled([
          API.get("/leads"),
          API.get("/services"),
          API.get("/portfolio"),
        ]);

        const [leadsRes, servicesRes, portfolioRes] = results;

        let leads = [];
        if (leadsRes.status === "fulfilled") {
          leads = leadsRes.value.data || [];
        } else {
          console.warn("Leads fetch failed:", leadsRes.reason);
        }

        const today = new Date().toDateString();
        const leadsToday = leads.filter(
          (l) => l.createdAt && new Date(l.createdAt).toDateString() === today
        ).length;

        const totalServices = servicesRes.status === "fulfilled" ? (servicesRes.value.data?.length || 0) : 0;
        const totalPortfolio = portfolioRes.status === "fulfilled" ? (portfolioRes.value.data?.length || 0) : 0;

        if (!mounted) return;
        setStats({
          leadsToday,
          totalLeads: leads.length,
          totalServices,
          totalPortfolio,
        });
      } catch (err) {
        console.error("Dashboard stats unexpected error:", err);
      }
    };

    fetchStats();
    return () => (mounted = false);
  }, []);

  return (
    <div className="stats-grid">
      <StatCard
        icon={<FaCalendarDay />}
        label="Leads Today"
        value={stats.leadsToday}
      />
      <StatCard
        icon={<FaEnvelopeOpenText />}
        label="Total Leads"
        value={stats.totalLeads}
      />
      <StatCard
        icon={<FaLayerGroup />}
        label="Services"
        value={stats.totalServices}
      />
      <StatCard
        icon={<FaBriefcase />}
        label="Portfolio"
        value={stats.totalPortfolio}
      />
    </div>
  );
};

export default function Dashboard() {
  return (
    <>
      <div className="topbar">
        <h1 className="page-title">Dashboard</h1>
        <span className="admin-badge">Admin</span>
      </div>

      <div className="settings-card">
        <h2>Welcome back 👋</h2>
        <p className="admin-subtext">Manage leads, services, and portfolio content from here.</p>
      </div>
      <DashboardStats />
    </>
  );
}



