import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faYoutube,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import "./footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="foot">
          {/* Brand Summary */}
          <div className="foot-brand">
            <div className="foot-brand-img">
              <img
                src="/Images/logowhite.png"
                alt="JKC Studios Logo"
                style={{ maxWidth: "160px", height: "auto" }}
              />
            </div>
            <p className="foot-copy">
              High-impact video & design studio crafting conversion-first visuals
              for brands that want to win. From high-gloss launch campaigns to
              complete brand kits, we plug in as your end-to-end creative partner.
            </p>
          </div>

          {/* Quick Links */}
          <div className="foot-links">
            <h5>Quick Links</h5>
            <div className="foot-links-single">
              <a href="/services/">Services</a>
              <a href="/portfolio">Portfolio</a>
              <a href="/process">Process</a>
              <a href="/about">About</a>
              <a href="/contact">Contact</a>
            </div>
          </div>

          {/* Social + Contact */}
          <div className="foot-social">
            <h5>Connect</h5>

            {/* Social Icons */}
            <div className="social-links">

              <a
                className="social-link"
                href="https://facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FontAwesomeIcon icon={faFacebookF} />
              </a>

              <a
                className="social-link"
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>

              <a
                className="social-link"
                href="https://youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <FontAwesomeIcon icon={faYoutube} />
              </a>

              <a
                className="social-link"
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            </div>


            {/* Address + Contact */}
            <div className="foot-contact-grid">
              <div>
                <span className="foot-label">Studio</span>
                <address>
                  Kumar Commercial Complex, Exhibition Road, Patna, BR – 800001
                </address>
              </div>

              <div>
                <span className="foot-label">Talk to us</span>
                <a href="tel:+917322005500">+91 73 22 00 55 00</a>
                <a href="mailto:hello@jkcstudios.in">hello@jkcstudios.in</a>
                <a
                  href="https://wa.me/917322005500"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp us
                </a>
              </div>
            </div>

            <p className="foot-hours">Mon–Sat: 9:00 AM – 7:00 PM IST</p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="foot-bottom">
          <div className="foot-bottom-left">
            © {new Date().getFullYear()} JKC Studios. All rights reserved.
          </div>

          <div className="foot-bottom-right">
            <a href="/privacy">Privacy & Refund Policy</a>
            <span>•</span>
            <a href="/terms">Terms</a>

            <span className="foot-status">
              <span className="foot-dot"></span>
              Booking new projects for january
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
