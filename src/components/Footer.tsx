import { useState, useEffect } from 'react';
import { FaLinkedin, FaTwitter, FaInstagram, FaGithub, FaChevronUp, FaSatellite, FaTerminal, FaMapMarkerAlt, FaShieldAlt } from 'react-icons/fa';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <footer className="cyber-footer">
      <div className="footer-grid">
        {/* Company Info */}
        <div className="footer-section">
          <div className="holographic-logo">
            <span className="cyber-glitch">EFIE</span>PLANS
          </div>
          <p className="footer-description">
            Pushing architectural boundaries through innovative design and cutting-edge technology
          </p>
          <div className="neon-divider"></div>
        </div>

        {/* Navigation Links */}
        <div className="footer-section">
  <h4 className="footer-heading">Navigations</h4>
  <ul className="cyber-links">
    <li className="nav-item">
      <Link to="/Architectural" className="link-hover">
        Architectural Designs
      </Link>
    </li>
    <li className="nav-item">
      <Link to="/Construction" className="link-hover">
        Construction
      </Link>
    </li>
    <li className="nav-item">
      <Link to="/Interior" className="link-hover">
        Interiors
      </Link>
    </li>
    <li className="nav-item">
      <Link to="/Renovations" className="link-hover">
       Renovations
      </Link>
    </li>
  </ul>
</div>

        {/* Contact Info */}
        <div className="footer-section">
          <h4 className="footer-heading">Contact Info</h4>
          <div className="contact-grid">
            <div className="contact-item">
              <FaSatellite className="icon" />
              <span>+233 55 123 4567</span>
            </div>
            <div className="contact-item">
              <FaTerminal className="icon" />
              <span>contact@efieplans.arch</span>
            </div>
            <div className="contact-item">
              <FaMapMarkerAlt className="icon" />
              <span>Digital Hub 42.0<br />Accra, Ghana</span>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="footer-section">
          <h4 className="footer-heading">Social Links</h4>
          <div className="social-matrix">
            <a href="#" className="social-link" aria-label="LinkedIn">
              <FaLinkedin />
              <span className="link-pulse"></span>
            </a>
            <a href="#" className="social-linke" aria-label="Twitter">
              <FaTwitter />
              <span className="link-pulse"></span>
            </a>
            <a href="#" className="social-link" aria-label="Instagram">
              <FaInstagram />
              <span className="link-pulse"></span>
            </a>
            <a href="#" className="social-link" aria-label="GitHub">
              <FaGithub />
              <span className="link-pulse"></span>
            </a>
          </div>
          <div className="newsletter-form">
            <input type="email" placeholder="Enter Neural Address" className="cyber-input" />
            <button className="quantum-button">Subscribe</button>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="cyber-copyright">
        <p>© 2025 EFIE PLANS. All rights encrypted.</p>
        <div className="crypto-badge">
          <FaShieldAlt className="icon" />
          <span> Verified Architecture</span>
        </div>
      </div>

      {/* Back to Top */}
      <button 
        className={`cyber-scroll-top ${isVisible ? 'visible' : ''}`} 
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <FaChevronUp className="icon" />
        <div className="scanline"></div>
      </button>
    </footer>
  );
};

export default Footer;