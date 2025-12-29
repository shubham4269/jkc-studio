import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../Services/api";
import { getDriveImageUrl } from "../../utils/driveHelper";
import "./portfolio.css";

export default function PortfolioHub() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    API.get("/portfolio")
      .then((res) => setItems(res.data))
      .catch(() => {});
  }, []);

  const categories = ["All", ...new Set(items.map((i) => i.category))];

  const visibleItems =
    filter === "All"
      ? items
      : items.filter((i) => i.category === filter);

  return (
    <main>
      {/* HERO */}
      <section className="portfolio-hero">
        <div className="container">
          <h1>Our Work</h1>
          <p>Selected projects, campaigns, and case studies.</p>
        </div>
      </section>

      {/* FILTERS */}
      <section className="portfolio-filters">
        <div className="container">
          {categories.map((cat) => (
            <button
              key={cat}
              className={filter === cat ? "active" : ""}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* GRID */}
      <section className="portfolio-grid">
        <div className="container grid">
          {visibleItems.map((item) => (
            <Link
              key={item._id}
              to={`/portfolio/${item.slug}`}
              className="portfolio-card"
            >
              <div className="portfolio-card-media">
                {item.thumbnail && (
                  <img src={getDriveImageUrl(item.thumbnail)} alt={item.title} />
                )}
              </div>

              <div className="portfolio-card-body">
                <div className="portfolio-card-top">
                  {item.category ? (
                    <span className="portfolio-pill">{item.category}</span>
                  ) : null}
                </div>

                <h3 className="portfolio-card-title">{item.title}</h3>

                {item.clientName ? (
                  <div className="portfolio-meta">
                    <span className="portfolio-client">{item.clientName}</span>
                  </div>
                ) : null}

                {item.shortDescription ? (
                  <div className="portfolio-excerpt">
                    <div className="portfolio-excerpt-label">Description</div>
                    <p className="portfolio-excerpt-text">{item.shortDescription}</p>
                  </div>
                ) : null}

                <div className="portfolio-card-footer">
                  <span className="portfolio-read">
                    Read Full Story <span aria-hidden="true">→</span>
                  </span>

                  {item.isCaseStudy ? (
                    <span className="portfolio-case-flag">Case Study</span>
                  ) : null}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
