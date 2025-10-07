import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import '../../styles/components/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup - for now just log
    console.log('Newsletter signup:', email);
    setEmail('');
    // In a real app, this would send to backend
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="container-custom">
        <div className="footer-grid">
          {/* Company Info */}
          <section className="footer-company-info" aria-labelledby="company-info-heading">
            <div className="footer-logo">
              <Link to="/" className="footer-logo-link">
                <img
                  src="https://res.cloudinary.com/dpzndrhse/image/upload/v1750667944/efieplans_logo_edited_kq1tmo.avif"
                  alt="Efie Plans Logo"
                  className="footer-logo-image"
                  loading="lazy"
                />
              </Link>
            </div>
            <p className="footer-description">
              Efie Plans creates luxury homes and commercial buildings for Ghanaians and Africans worldwide, focusing on personalized design and exceptional quality.
            </p>
            <nav aria-label="Social media links">
              <div className="footer-social">
                <a href="#" className="footer-social-link" aria-label="Visit our Facebook page">
                  <FaFacebook size={20} />
                </a>
                <a href="#" className="footer-social-link" aria-label="Visit our Twitter page">
                  <FaTwitter size={20} />
                </a>
                <a href="#" className="footer-social-link" aria-label="Visit our Instagram page">
                  <FaInstagram size={20} />
                </a>
                <a href="#" className="footer-social-link" aria-label="Visit our LinkedIn page">
                  <FaLinkedin size={20} />
                </a>
              </div>
            </nav>
          </section>

          {/* Quick Links */}
          <nav className="footer-links" aria-labelledby="quick-links-heading">
            <h3 id="quick-links-heading" className="footer-heading">Quick Links</h3>
            <ul className="footer-links-list">
              <li>
                <Link to="/" className="footer-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="footer-link">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="footer-link">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="footer-link">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/contact" className="footer-link">
                  Contact Us
                </Link>
              </li>
            </ul>
          </nav>

          {/* Services */}
          <nav className="footer-services" aria-labelledby="services-heading">
            <h3 id="services-heading" className="footer-heading">Our Services</h3>
            <ul className="footer-links-list">
              <li>
                <Link to="/services/construction" className="footer-link">
                  Building Construction
                </Link>
              </li>
              <li>
                <Link to="/services/design" className="footer-link">
                  Architectural Design
                </Link>
              </li>
              <li>
                <Link to="/services/consultation" className="footer-link">
                  Construction Consultation
                </Link>
              </li>
              <li>
                <Link to="/services/project-management" className="footer-link">
                  Project Management
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact Info */}
          <address className="footer-contact" aria-labelledby="contact-heading">
            <h3 id="contact-heading" className="footer-heading">Contact Us</h3>
            <ul className="footer-contact-list">
              <li className="footer-contact-item">
                <FaMapMarkerAlt className="footer-contact-icon" aria-hidden="true" />
                <span>Accra, Ghana</span>
              </li>
              <li className="footer-contact-item">
                <FaPhone className="footer-contact-icon" aria-hidden="true" />
                <span>+233 123 456 789</span>
              </li>
              <li className="footer-contact-item">
                <FaEnvelope className="footer-contact-icon" aria-hidden="true" />
                <a href="mailto:info@efieplans.com" className="footer-contact-link">
                  info@efieplans.com
                </a>
              </li>
            </ul>
          </address>

          {/* Newsletter Signup */}
          <section className="footer-newsletter" aria-labelledby="newsletter-heading">
            <h3 id="newsletter-heading" className="footer-heading">Stay Updated</h3>
            <p className="footer-newsletter-text">
              Subscribe to our newsletter for the latest design trends and project inspiration.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="footer-newsletter-form" role="form" aria-labelledby="newsletter-heading">
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                type="email"
                id="newsletter-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="footer-newsletter-input"
                required
                aria-describedby="newsletter-description"
              />
              <button type="submit" className="footer-newsletter-button" aria-label="Subscribe to newsletter">
                Subscribe
              </button>
            </form>
            <p id="newsletter-description" className="sr-only">
              We'll send you updates about our design services and projects.
            </p>
          </section>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-container">
            <p className="footer-copyright">
              &copy; {currentYear} Efie Plans. All rights reserved.
            </p>
            <div className="footer-legal">
              <ul className="footer-legal-list">
                <li>
                  <Link to="/privacy" className="footer-legal-link">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="footer-legal-link">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/sitemap" className="footer-legal-link">
                    Sitemap
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;