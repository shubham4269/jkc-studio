import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../../Services/api";
import { getDriveImageUrl } from "../../utils/driveHelper";
import "./singleServices.css";


export default function SingleService() {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(-1);

  /* ---------------- Fetch Service ---------------- */
  useEffect(() => {
    API.get(`/services/${slug}`)
      .then((res) => {
        setService(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  /* ---------------- Fetch Portfolio by Category ---------------- */
  useEffect(() => {
    if (service?.category) {
      API.get("/portfolio")
        .then((res) => {
          // Filter portfolio items by service category
          const filtered = res.data.filter(
            (item) => item.category?.toLowerCase() === service.category.toLowerCase()
          );
          setPortfolio(filtered.slice(0, 4)); // Get first 4 items
        })
        .catch(() => setPortfolio([]));
    }
  }, [service]);

  if (loading) {
    return (
      <main className="single-service">
        <div className="container" style={{ padding: "80px 0" }}>
          Loading...
        </div>
      </main>
    );
  }

  if (!service) {
    return (
      <main className="single-service">
        <div className="container" style={{ padding: "80px 0" }}>
          <h2>Service not found</h2>
        </div>
      </main>
    );
  }

  const heroTitle = service.title;
  const heroSubtitle =
    service.shortDescription ||
    (typeof service.description === "string"
      ? service.description.slice(0, 140)
      : "");

  /* ---------------- Process ---------------- */
  const processSteps = Array.isArray(service.process)
    ? service.process.filter((s) => s?.title || s?.description || s?.text)
    : typeof service.process === "string"
      ? service.process
          .split(/\r?\n/)
          .map((s) => s.trim())
          .filter(Boolean)
          .map((line) => {
            const idx = line.indexOf(":");
            if (idx > 0) {
              return { title: line.slice(0, idx).trim(), description: line.slice(idx + 1).trim() };
            }
            return { title: line, description: "" };
          })
      : [];

  /* ---------------- Hero Background Image ---------------- */
  const heroBackgroundUrl = service.heroImage 
    ? getDriveImageUrl(service.heroImage) 
    : "";

  return (
    <main className="single-service">

      {/* ================= HERO ================= */}
      <section className="single-service-hero hero-centered">
        <div className="container hero-center-wrap">
          <h1 className="hero-title" data-aos="fade-up">
            {service.title}
          </h1>

          {heroSubtitle && (
            <p className="hero-subtitle" data-aos="fade-up" data-aos-delay="120">
              {heroSubtitle}
            </p>
          )}

          <div className="hero-cta-group" data-aos="fade-up" data-aos-delay="220">
            <Link to="/contact" className="cta-btn">
              Start a Project
            </Link>
            <Link to="/portfolio" className="btn-outline">
              View Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* ================= HERO IMAGE ================= */}
      {heroBackgroundUrl && (
        <section className="service-hero-image-section">
          <div className="container">
            <div className="hero-image-wrapper" data-aos="fade-up">
              <img 
                src={heroBackgroundUrl} 
                alt={service.title} 
                className="service-hero-img"
              />
            </div>
          </div>
        </section>
      )}

      {/* ================= ABOUT ================= */}
      {service.description && (
        <section
          className="single-service-about"
        >
          <div className="container">
            <div className="single-section-card" data-aos="fade-up">
              <h2>About This Service</h2>
              <p>{service.description}</p>
            </div>
          </div>
        </section>
      )}
      {/* ================= PROCESS ================= */}
      {processSteps.length > 0 && (
        <section
          className="single-service-process"
        >
          <div className="container">
            <div className="single-section-card" data-aos="fade-up">
              <h2>Our Process</h2>

              <div className="process-stack">
                {processSteps.map((step, i) => (
                  <div
                    className="process-row"
                    key={i}
                    data-aos="fade-up"
                    data-aos-delay={Math.min(i * 80, 320)}
                  >
                    <div className="process-index">{i + 1}</div>
                    <div className="process-content">
                        {step.title ? <h5>{step.title}</h5> : null}
                        {(step.description || step.text) ? <p>{step.description || step.text}</p> : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
      {/* ================= TIMELINE ================= */}
      {service.deliveryTimeline && (
        <section
          className="single-service-timeline"
        >
          <div className="container">
            <div className="single-section-card" data-aos="fade-up">
              <h2>Delivery & Timeline</h2>
              <p>{service.deliveryTimeline}</p>
            </div>
          </div>
        </section>
      )}
      {/* ================= PRICING ================= */}
      {Array.isArray(service.pricing) && service.pricing.length > 0 ? (
        <section
          className="single-service-pricing"
        >
          <div className="container">
            <div className="single-section-card" data-aos="fade-up">
              <h2>Pricing</h2>
              <p className="pricing-sub">
                Transparent plans designed to fit different needs.
              </p>

              <div className="pricing-grid">
                {service.pricing.map((tier, i) => {
                  const featured = i === 1;
                  return (
                    <div
                      key={i}
                      className={`pricing-card ${
                        featured ? "featured" : ""
                      }`}
                      data-aos="fade-up"
                      data-aos-delay={Math.min(i * 90, 300)}
                    >
                      {featured && <div className="badge">Most Popular</div>}

                      <h4 className="tier-name">{tier.name}</h4>
                      <div className="tier-price">{tier.price}</div>

                      <ul className="tier-features">
                        {tier.features?.map((f, idx) => (
                          <li key={idx}>{f}</li>
                        ))}
                      </ul>

                      <Link to="/start-project" className="pricing-cta">
                        Get Started
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      ) : (
        service.pricing && (
          <section
            className="single-service-pricing"
          >
            <div className="container">
              <div className="single-section-card" data-aos="fade-up">
                <h2>Pricing</h2>
                <p>{service.pricing}</p>
              </div>
            </div>
          </section>
        )
      )}

      {/* ================= RELATED PORTFOLIO ================= */}
      {portfolio.length > 0 && (
        <section className="related-portfolio">
          <div className="container">
            <div className="single-section-card">
              <h2>Related Work</h2>
              <p className="portfolio-subtitle">
                Explore our {service.category} projects
              </p>

              <div className="portfolio-grid">
                {portfolio.map((item) => (
                  <Link
                    to={`/portfolio/${item.slug}`}
                    className="portfolio-card"
                    key={item._id}
                  >
                    {item.thumbnail && (
                      <div className="portfolio-card-media">
                        <img src={getDriveImageUrl(item.thumbnail)} alt={item.title} />
                      </div>
                    )}
                    <div className="portfolio-card-content">
                      <h4>{item.title}</h4>
                      {item.shortDescription && (
                        <p>{item.shortDescription}</p>
                      )}
                      <span className="view-link">View Case Study →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ================= FAQ ================= */}
      {Array.isArray(service.faqs) && service.faqs.length > 0 && (
        <section
          className="single-service-faq"
        >
          <div className="container">
            <div className="single-section-card" data-aos="fade-up">
              <h2>FAQs</h2>

              <div className="faq-list">
                {service.faqs.map((faq, i) => {
                  const isOpen = openFaq === i;
                  return (
                    <div
                      key={i}
                      className={`faq-item ${isOpen ? "open" : ""}`}
                    >
                      <button
                        className="faq-q"
                        onClick={() =>
                          setOpenFaq(isOpen ? -1 : i)
                        }
                      >
                        <span className="faq-q-text">{faq.q}</span>
                        <span className="faq-icon">
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>

                      <div className="faq-a">
                        <div className="faq-a-inner">
                          <p>{faq.a}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
