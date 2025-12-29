import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../Services/api";
import { getDriveImageUrl } from "../../utils/driveHelper";
import ServiceCard from "./ServiceCard";
import "./ServiceHub.css";


/* ================= SHORT LABELS (FILTER PILLS) ================= */
const CATEGORY_SHORT_LABELS = {
  branding: "Branding",
  print: "Print & Collateral",
  digital: "Digital & Social",
  video: "Video Production",
};

export default function ServiceHub() {
  const [services, setServices] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");

  /* ================= FETCH SERVICES ================= */
  useEffect(() => {
    API.get("/services")
      .then((res) => setServices(res.data))
      .catch(() => setServices([]));
  }, []);

  /* ================= FETCH PORTFOLIO ================= */
  useEffect(() => {
    API.get("/portfolio")
      .then((res) => {
        // Get first 4 portfolio items for featured work
        setPortfolio(res.data.slice(0, 4));
      })
      .catch(() => setPortfolio([]));
  }, []);

  /* ================= GROUP SERVICES ================= */
  const grouped = services.reduce((acc, service) => {
    const key = service.category || "other";

    if (!acc[key]) {
      acc[key] = {
        key,
        shortLabel: CATEGORY_SHORT_LABELS[key] || key,
        longLabel: "",
        items: [],
      };
    }

    // Take FIRST valid categoryLabel only (long label)
    if (
      !acc[key].longLabel &&
      typeof service.categoryLabel === "string" &&
      service.categoryLabel.trim()
    ) {
      acc[key].longLabel = service.categoryLabel.trim();
    }

    acc[key].items.push(service);
    return acc;
  }, {});

  const groups = Object.values(grouped);

  return (
    <main>

      {/* ================= HERO ================= */}
      <section className="sec-services-hero">
        <div className="container">
          <h1>Explore Our Creative Universe.</h1>
          <p>
            From branding to motion, we craft stories that move people and grow
            businesses.
          </p>

          <div className="hero-cta">
            <Link to="/contact" className="cta-btn">
              Start a Project
            </Link>
            <Link to="/portfolio" className="btn-outline">
              View Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* ================= FILTER PILLS ================= */}
      <section className="sec-services-filters">
        <div className="container">
          <div className="filter-pills">

            {/* All */}
            <button
              className={`filter-pill ${
                activeFilter === "all" ? "active" : ""
              }`}
              onClick={() => setActiveFilter("all")}
            >
              All Services
              <span className="count">{services.length}</span>
            </button>

            {/* Categories */}
            {groups.map((group) => (
              <button
                key={group.key}
                className={`filter-pill ${
                  activeFilter === group.key ? "active" : ""
                }`}
                onClick={() => setActiveFilter(group.key)}
              >
                {group.shortLabel}
                <span className="count">{group.items.length}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SERVICES GRID ================= */}
      <section className="services-grid">
        <div className="container">
          {groups.map((group) => {
            if (activeFilter !== "all" && activeFilter !== group.key) {
              return null;
            }

            return (
              <div key={group.key} className="service-group">
                {/* Show heading always (long label) */}
                <h2>{group.longLabel || group.shortLabel}</h2>

                <div className="service-cards">
                  {group.items.map((service) => (
                    <ServiceCard
                      key={service._id}
                      service={service}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= SERVICE COMPARISON (STATIC) ================= */}
      <section className="comparison-table">
        <div className="container">
          <h2>Service Comparison</h2>

          <div className="table-responsive">
            <table className="compare-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Ideal For</th>
                  <th>Typical Turnaround</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Branding & Identity</td>
                  <td>New businesses, rebrands, launches</td>
                  <td>7–14 days</td>
                </tr>
                <tr>
                  <td>Print & Collateral</td>
                  <td>Marketing campaigns, events</td>
                  <td>2–5 days</td>
                </tr>
                <tr>
                  <td>Digital & Social</td>
                  <td>Ads, presentations, social media</td>
                  <td>2–5 days</td>
                </tr>
                <tr>
                  <td>Video Production</td>
                  <td>Brand films, ads, product demos</td>
                  <td>2–21 days</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ================= FEATURED WORK (STATIC) ================= */}
      <section className="featured-work">
        <div className="container">
          <h2>Featured Work</h2>

          <div className="featured-grid">
            {portfolio.map((item) => (
              <Link
                to={`/portfolio/${item.slug}`}
                className="featured-card"
                key={item._id}
              >
                {item.thumbnail && (
                  <div className="featured-card-media">
                    <img src={getDriveImageUrl(item.thumbnail)} alt={item.title} />
                  </div>
                )}
                <div className="featured-card-content">
                  <h4>{item.title}</h4>
                  <span>View Case Study →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
