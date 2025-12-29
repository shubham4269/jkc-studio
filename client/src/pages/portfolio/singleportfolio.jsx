import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../../Services/api";
import { getYoutubeEmbedUrl, getDrivePreviewUrl, getDriveImageUrl } from "../../utils/driveHelper";
import "./portfolio.css";

// Helper function to get video embed URL based on type
const getVideoEmbed = (url, type) => {
  if (!url) return null;
  
  switch (type) {
    case "youtube":
      return getYoutubeEmbedUrl(url);
    case "drive":
      return getDrivePreviewUrl(url);
    case "mp4":
      return getDriveImageUrl(url);
    default:
      return url;
  }
};

// Icons as SVG components
const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const ProblemIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="12" y1="16" x2="12.01" y2="16"></line>
  </svg>
);

const ApproachIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 16v-4"></path>
    <path d="M12 8h.01"></path>
  </svg>
);

const ProcessIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
  </svg>
);

const ResultIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const TagIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
    <line x1="7" y1="7" x2="7.01" y2="7"></line>
  </svg>
);

const GalleryIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <circle cx="8.5" cy="8.5" r="1.5"></circle>
    <polyline points="21 15 16 10 5 21"></polyline>
  </svg>
);

const PlayIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="5 3 19 12 5 21 5 3"></polygon>
  </svg>
);

const ArrowLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);

export default function SinglePortfolio() {
  const { slug } = useParams();
  const [item, setItem] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    API.get(`/portfolio/${slug}`).then(res => setItem(res.data));
  }, [slug]);

  if (!item) return (
    <div className="portfolio-loading">
      <div className="loading-spinner"></div>
      <p>Loading project...</p>
    </div>
  );

  const videoSrc = getVideoEmbed(item.videos?.[0], item.videoType);

  return (
    <main className="single-portfolio">

      {/* ================= HERO ================= */}
      <section className="portfolio-single-hero">
        <div className="hero-backdrop"></div>
        <div className="container">
          {/* Back link and branding removed on single portfolio page as requested */}
          
          <h1 className="fade-in-up delay-1">{item.title}</h1>
          <p className="hero-description fade-in-up delay-2">{item.shortDescription}</p>

          <div className="meta fade-in-up delay-3">
            {item.clientName && (
              <span className="meta-item">
                <UserIcon /> {item.clientName}
              </span>
            )}
            {item.date && (
              <span className="meta-item">
                <CalendarIcon /> {new Date(item.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ================= MEDIA ================= */}
      <section className="portfolio-media">
        <div className="container">

          {/* VIDEO */}
          {videoSrc && (
            <div className="media-section fade-in-up">
              <div className="section-header">
                <PlayIcon />
                <h3>Project Showcase</h3>
              </div>
              
              {item.videoType !== "mp4" ? (
                <div className="video-wrapper">
                  <iframe
                    src={videoSrc}
                    title={item.title}
                    allow="autoplay; fullscreen"
                  />
                </div>
              ) : (
                <div className="video-wrapper">
                  <video src={videoSrc} controls />
                </div>
              )}
            </div>
          )}

          {/* THUMBNAIL - Show if no video */}
          {!videoSrc && item.thumbnail && (
            <div className="media-section fade-in-up">
              <div className="section-header">
                <PlayIcon />
                <h3>Project Showcase</h3>
              </div>
              
              <div className="thumbnail-hero">
                <img src={getDriveImageUrl(item.thumbnail)} alt={item.title} />
              </div>
            </div>
          )}

          {/* GALLERY */}
          {item.images?.length > 0 && (
            <div className="gallery-section fade-in-up">
              <div className="section-header">
                <GalleryIcon />
                <h3>Project Gallery</h3>
              </div>
              
              <div className="gallery">
                {item.images.map((img, i) => (
                  <div 
                    key={i} 
                    className="gallery-item"
                    onClick={() => setSelectedImage(getDriveImageUrl(img.url))}
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <img src={getDriveImageUrl(img.url)} alt={`${item.title} - ${i + 1}`} />
                    <div className="gallery-overlay">
                      <span>View</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* ================= CASE STUDY ================= */}
      {item.isCaseStudy && item.caseStudy && (
        <section className="case-study-section">
          <div className="container">
            <div className="section-title fade-in-up">
              <span className="label">Deep Dive</span>
              <h2>Case Study</h2>
              <p>An in-depth look at how we approached and solved the challenge</p>
            </div>

            <div className="case-study-grid">
              {item.caseStudy.problem && (
                <div className="case-card fade-in-up">
                  <div className="case-card-icon problem">
                    <ProblemIcon />
                  </div>
                  <div className="case-card-content">
                    <h4>The Challenge</h4>
                    <p>{item.caseStudy.problem}</p>
                  </div>
                </div>
              )}

              {item.caseStudy.approach && (
                <div className="case-card fade-in-up delay-1">
                  <div className="case-card-icon approach">
                    <ApproachIcon />
                  </div>
                  <div className="case-card-content">
                    <h4>Our Approach</h4>
                    <p>{item.caseStudy.approach}</p>
                  </div>
                </div>
              )}

              {item.caseStudy.process && (
                <div className="case-card fade-in-up delay-2">
                  <div className="case-card-icon process">
                    <ProcessIcon />
                  </div>
                  <div className="case-card-content">
                    <h4>The Process</h4>
                    <p>{item.caseStudy.process}</p>
                  </div>
                </div>
              )}

              {item.caseStudy.result && (
                <div className="case-card fade-in-up delay-3">
                  <div className="case-card-icon result">
                    <ResultIcon />
                  </div>
                  <div className="case-card-content">
                    <h4>The Results</h4>
                    <p>{item.caseStudy.result}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ================= TAGS ================= */}
      {item.tags?.length > 0 && (
        <section className="tags-section">
          <div className="container">
            <div className="tags-header fade-in-up">
              <TagIcon />
              <h3>Technologies & Skills</h3>
            </div>
            <div className="tags-list fade-in-up delay-1">
              {item.tags.map((t, i) => (
                <span key={i} className="tag-pill" style={{ animationDelay: `${i * 0.05}s` }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= CTA ================= */}
      <section className="portfolio-cta fade-in-up">
        <div className="container">
          <h2>Interested in working together?</h2>
          <p>Let's create something amazing for your brand</p>
          <div className="cta-buttons">
            <Link to="/contact" className="cta-btn primary">Start a Project</Link>
            <Link to="/portfolio" className="cta-btn secondary">View More Work</Link>
          </div>
        </div>
      </section>

      {/* ================= LIGHTBOX ================= */}
      {selectedImage && (
        <div className="lightbox" onClick={() => setSelectedImage(null)}>
          <button className="lightbox-close">&times;</button>
          <img src={selectedImage} alt="Full size" />
        </div>
      )}

    </main>
  );
}

