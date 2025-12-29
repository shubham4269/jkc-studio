import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import "../css/home.css";
import LeadForm from "../Components/LeadForm/LeadForm";
import API from "../Services/api";
import { getDriveImageUrl } from "../utils/driveHelper";

const Home = () => {
  const [heroModalOpen, setHeroModalOpen] = useState(false);
  const [categoryServices, setCategoryServices] = useState([]);
  const [categoryPortfolios, setCategoryPortfolios] = useState([]);

  const openHeroModal = () => setHeroModalOpen(true);
  const closeHeroModal = () => setHeroModalOpen(false);

  // Fetch services and group by category
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await API.get("/services");
        // Get unique categories and pick one service from each (up to 3)
        const categoryMap = {};
        data.forEach((service) => {
          const cat = service.category || "general";
          if (!categoryMap[cat]) {
            categoryMap[cat] = service;
          }
        });
        // Take up to 3 different category services
        const uniqueServices = Object.values(categoryMap).slice(0, 3);
        setCategoryServices(uniqueServices);
      } catch (err) {
        console.error("Failed to fetch services:", err);
      }
    };
    fetchServices();
  }, []);

  // Fetch portfolios and group by category
  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const { data } = await API.get("/portfolio");
        // Get unique categories and pick one portfolio from each (up to 3)
        const categoryMap = {};
        data.forEach((portfolio) => {
          const cat = portfolio.category || "general";
          if (!categoryMap[cat]) {
            categoryMap[cat] = portfolio;
          }
        });
        // Take up to 3 different category portfolios
        const uniquePortfolios = Object.values(categoryMap).slice(0, 3);
        setCategoryPortfolios(uniquePortfolios);
      } catch (err) {
        console.error("Failed to fetch portfolios:", err);
      }
    };
    fetchPortfolios();
  }, []);

  // Close on Escape
  useEffect(() => {
    if (!heroModalOpen) return;
    const onKey = (e) => { if (e.key === "Escape") closeHeroModal(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [heroModalOpen]);

  // Lock body scroll + autofocus first field when opening
  useEffect(() => {
    if (heroModalOpen) {
      document.body.classList.add("modal-open");
      const firstField = document.querySelector(
        ".lead-modal input, .lead-modal textarea, .lead-modal select"
      );
      if (firstField && typeof firstField.focus === "function") firstField.focus();
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => document.body.classList.remove("modal-open");
  }, [heroModalOpen]);

  return (
    <>
     {/* ================= HERO ================= */}
<section className="hero">
  <div className="container">
    <div className="wrap">

      {/* Left content */}
      <div data-aos="fade-up">
        <span className="eyebrow">Video • Design • Brand Kits</span>

        <h1
          className="headline"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Create. Launch. Scale.
        </h1>

        <p
          className="sub"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          High-impact video and design experiences that drive business growth.
        </p>

        <div
          className="hero-cta"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <button type="button" className="cta-btn" onClick={openHeroModal} aria-label="Open lead form">
            Start a Project
          </button>
          <a href="/portfolio" className="btn-outline">
            view portfolio
          </a>
        </div>
      </div>

      {/* Right visual */}
      <div
        data-aos="fade-left"
        data-aos-delay="400"
      >
        <div className="mock floaty hero-video-wrap">
          <div className="play"></div>
          <video
  className="hero-video"
  src="https://res.cloudinary.com/dcttyefs2/video/upload/v1766924482/Video_Generation_With_Logo_mpiyor.mp4"
  poster="/images/hero-poster.jpg"
  autoPlay
  muted
  loop
  playsInline
  preload="metadata"
/>
        </div>
      </div>

    </div>
  </div>
</section>


     {/* ================= ABOUT ================= */}
<section id="about" className="about-section">
  <div className="container">
    <div className="grid grid-2 about-grid">

      {/* Left media */}
      <div
        className="about-media"
        data-aos="fade-right"
        data-aos-delay="100"
      >
       <div className="about-slideshow">
  <img src="/images/jkc1.jpg" alt="Brand Work 1" />
  <img src="/images/jkc2.jpg" alt="Brand Work 2" />
  <img src="/images/jkc3.jpg" alt="Brand Work 3" />
  <img src="/images/jkc4.jpg" alt="Brand Work 4" />
</div>

      </div>

      {/* Right content */}
      <div
        className="about-copy"
        data-aos="fade-left"
        data-aos-delay="200"
      >
        <div
          className="kicker"
          data-aos="fade-up"
          data-aos-delay="250"
        >
          Who We Are
        </div>

        <h2
          className="title"
          data-aos="fade-up"
          data-aos-delay="320"
        >
          We are storytellers with purpose.
        </h2>

        <p
          className="sub"
          data-aos="fade-up"
          data-aos-delay="400"
        >
            Combining creativity and technology to craft brand experiences that resonate, convert, and scale. Every project is an opportunity to transform how your audience sees your brand.
        </p>

        <div data-aos="fade-up" data-aos-delay="480">
          <a href="/about" className="btn-outline">
            Know More
          </a>
        </div>
      </div>

    </div>
  </div>
</section>

     {/* ================= SERVICES ================= */}
<section id="services">
  <div className="container">

    <div className="section-h">
      <div>
        <div className="kicker" data-aos="fade-up">Our Services</div>
        <h3 className="title" data-aos="fade-up" data-aos-delay="120">
          What we do best
        </h3>
      </div>
      <a
        href="/services"
        className="btn-outline"
        data-aos="fade-left"
      >
        View All Services
      </a>
    </div>

    <div className="grid grid-3">
      {categoryServices.map((service, i) => (
        <article
          key={service._id || i}
          className="card"
          data-aos="fade-up"
          data-aos-delay={i * 120}
        >
          <span className="chip">{service.category || "Service"}</span>
          <div 
            className="thumb" 
            style={{
              backgroundImage: service.heroImage ? `url(${getDriveImageUrl(service.heroImage)})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          ></div>
          <h4>{service.title}</h4>
          <p>{service.shortDescription || service.description?.substring(0, 100) + '...'}</p>
          <a href={`/services/${service.slug}`} className="cta-btn">
            Explore {service.category || "Service"}
          </a>
        </article>
      ))}
    </div>

    <div
      className="band"
      data-aos="fade-up"
      data-aos-delay="320"
    >
      <div className="pill">D2C / E-com</div>
      <div className="pill">SaaS & Tech</div>
      <div className="pill">Real Estate</div>
      <div className="pill">Luxury & Fashion</div>
      <div className="pill">Healthcare</div>
    </div>

  </div>
</section>
{/* ================= PORTFOLIO ================= */}
<section id="portfolio">
  <div className="container">

    <div className="section-h">
      <div>
        <div className="kicker" data-aos="fade-up">Showcase</div>
        <h3 className="title" data-aos="fade-up" data-aos-delay="120">
          Selected Work
        </h3>
      </div>
      <a
        href="/portfolio"
        className="btn-outline"
        data-aos="fade-left"
      >
        Open Full Portfolio
      </a>
    </div>

    <div className="grid grid-3">
      {categoryPortfolios.map((portfolio, i) => (
        <article
          key={portfolio._id || i}
          className="card"
          data-aos="fade-up"
          data-aos-delay={i * 120}
        >
          <span className="chip">{portfolio.category || "Work"}</span>
          <div 
            className="thumb"
            style={{
              backgroundImage: portfolio.thumbnail ? `url(${getDriveImageUrl(portfolio.thumbnail)})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          ></div>
          <h4>{portfolio.title}</h4>
          <p>{portfolio.shortDescription || ''}</p>
          <a href={`/portfolio/${portfolio.slug}`} className="cta-btn">
            View Project
          </a>
        </article>
      ))}
    </div>

  </div>
</section>
{/* ================= TESTIMONIALS ================= */}
<section id="testimonials">
  <div className="container">
    <div className="kicker" data-aos="fade-up">Testimonials</div>
    <h3 className="title" data-aos="fade-up" data-aos-delay="120">
      What clients say
    </h3>

    <div className="grid grid-3 testimonial-grid">
      {[
        {
          initials: "SM",
          gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          quote: "JKC Studios transformed our brand completely. Their attention to detail and creative vision exceeded our expectations.",
          name: "Sarah Mitchell",
          role: "CEO, TechFlow"
        },
        {
          initials: "RK",
          gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
          quote: "The video campaign they created for our product launch generated incredible engagement and drove real results.",
          name: "Raj Kumar",
          role: "Marketing Director, InnovateCorp"
        },
        {
          initials: "EP",
          gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 50%, #d4fc79 100%)",
          quote: "Professional, creative, and results-driven. JKC Studios is our go-to partner for all design and video needs.",
          name: "Emily Parker",
          role: "Founder, GrowthLab"
        }
      ].map((testimonial, i) => (
        <div
          key={i}
          className="testimonial-card"
          data-aos="fade-up"
          data-aos-delay={i * 120}
        >
          <div 
            className="testimonial-avatar"
            style={{ background: testimonial.gradient }}
          >
            {testimonial.initials}
          </div>
          <p className="testimonial-quote">{testimonial.quote}</p>
          <h4 className="testimonial-name">{testimonial.name}</h4>
          <span className="testimonial-role">{testimonial.role}</span>
        </div>
      ))}
    </div>
  </div>
</section>
{/* ================= PROCESS ================= */}
<section id="process">
  <div className="container">

    <div className="kicker" data-aos="fade-up">How we work</div>
    <h3
      className="title"
      data-aos="fade-up"
      data-aos-delay="120"
    >
      A clean, reliable pipeline
    </h3>

    <div className="steps">
      {[
        ["Discovery", "Goals, audience, benchmarks, moodboard."],
        ["Concept", "Script & storyboard / design directions."],
        ["Production", "Shoot, edit, design, iterate with check-ins."],
        ["Launch", "Export kits, thumbnail set, ad-ready masters."]
      ].map(([title, desc], i) => (
        <div
          key={i}
          className="step"
          data-aos="fade-up"
          data-aos-delay={i * 120}
        >
          <div className="n">{i + 1}</div>
          <h5>{title}</h5>
          <p>{desc}</p>
        </div>
      ))}
    </div>

  </div>
</section>


{/* LeadForm modal via Portal for hero CTA */}
{heroModalOpen && createPortal(
  (
    <div className="lead-modal-overlay" onClick={closeHeroModal} role="presentation">
      <div className="lead-modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <button className="lead-modal-close" onClick={closeHeroModal} aria-label="Close lead form">×</button>
        <LeadForm onSuccess={() => closeHeroModal()} />
      </div>
    </div>
  ),
  document.body
)}

</>
 ); 
};
 export default Home;