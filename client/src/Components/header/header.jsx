import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./header.css";
import { Link } from "react-router-dom";
import LeadForm from "../LeadForm/LeadForm";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route click
  const closeMenu = () => setMenuOpen(false);

  // Modal state for LeadForm
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
    setMenuOpen(false);
  };
  const closeModal = () => setModalOpen(false);

  // close on Escape key
  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e) => { if (e.key === "Escape") closeModal(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen]);

  // lock body scroll when modal is open and autofocus first input
  useEffect(() => {
    if (modalOpen) {
      document.body.classList.add("modal-open");
      const firstField = document.querySelector(
        ".lead-modal input, .lead-modal textarea, .lead-modal select"
      );
      if (firstField && typeof firstField.focus === "function") firstField.focus();
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => document.body.classList.remove("modal-open");
  }, [modalOpen]);

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`} id="navbar">
      <div className="container">
        <nav className="nav">
          {/* Logo */}
          <Link to="/" className="logo" aria-label="JKC Studios home">
            <img
              src="/Images/jkclogo.png"
              alt="JKC Studios logo"
              className="logo-image"
              loading="lazy"
            />
           
          </Link>

          {/* Desktop Navigation */}
          <ul className="nav-menu desktop-menu">
            <li><Link to="/services" className="nav-link">Services</Link></li>
            <li><Link to="/portfolio" className="nav-link">Portfolio</Link></li>
            <li><Link to="/process" className="nav-link">Process</Link></li>
            <li><Link to="/about" className="nav-link">About</Link></li>
            <li><Link to="/contact" className="nav-link">Contact</Link></li>
            <li>
            <button
                type="button"
                onClick={openModal}
                className="cta-btn header-cta"
                style={{ padding: "10px 18px", fontSize: 14 }}
                aria-label="Open lead form"
              >
                Get Started
              </button>
            </li>
          </ul>

          {/* Mobile Toggle */}
          <button
            className={`mobile-menu-toggle ${menuOpen ? "active" : ""}`}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
            <span />
          </button>
        </nav>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${menuOpen ? "active" : ""}`}>
          <ul className="mobile-nav-list">
            <li><Link to="/services" className="nav-link" onClick={closeMenu}>Services</Link></li>
            <li><Link to="/portfolio" className="nav-link" onClick={closeMenu}>Portfolio</Link></li>
            <li><Link to="/process" className="nav-link" onClick={closeMenu}>Process</Link></li>
            <li><Link to="/about" className="nav-link" onClick={closeMenu}>About</Link></li>
            <li><Link to="/contact" className="nav-link" onClick={closeMenu}>Contact</Link></li>
            <li>
              <button
                type="button"
                className="cta-btn"
                style={{ padding: "12px 18px", display: "inline-block" }}
                onClick={() => { closeMenu(); openModal(); }}
                aria-label="Open lead form"
              >
                Get Started
              </button>
            </li>
          </ul>
        </div>
      </div>
      {/* LeadForm Modal via Portal to avoid header stacking/positioning issues */}
      {modalOpen && createPortal(
        (
          <div className="lead-modal-overlay" onClick={closeModal} role="presentation">
            <div className="lead-modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
              <button className="lead-modal-close" onClick={closeModal} aria-label="Close lead form">×</button>
              <LeadForm onSuccess={(data) => { closeModal(); }} />
            </div>
          </div>
        ),
        document.body
      )}
    </header>
  );
};

export default Header;
