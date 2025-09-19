import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaSun, FaMoon, FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { useTheme } from "../../hooks/useTheme";
import "../../styles/components/Navbar.css";

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleServicesDropdown = () => {
    setIsServicesDropdownOpen(!isServicesDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServicesDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav
      className={`navbar ${
        isScrolled ? "navbar-scrolled" : "navbar-transparent"
      }`}
    >
      <div className="container-custom navbar-container">
        {/* Logo - Far Left */}
        <Link to="/" className="navbar-logo">
          <img
            src="https://res.cloudinary.com/dpzndrhse/image/upload/v1750667944/efieplans_logo_edited_kq1tmo.avif"
            alt="Efie plans Construction Logo"
            className="navbar-logo-image"
          />
        </Link>

        {/* Desktop Navigation - Center */}
        <div className="navbar-desktop">
          <Link to="/" className="navbar-link">
            Home
          </Link>
          <Link to="/about" className="navbar-link">
            About
          </Link>
          <div className="navbar-dropdown" ref={dropdownRef}>
            <button
              className="navbar-link navbar-dropdown-toggle"
              onClick={toggleServicesDropdown}
              aria-expanded={isServicesDropdownOpen}
              aria-haspopup="true"
            >
              Services
              <FaChevronDown
                className={`dropdown-icon ${isServicesDropdownOpen ? 'rotated' : ''}`}
                size={12}
              />
            </button>
            {isServicesDropdownOpen && (
              <div className="navbar-dropdown-menu">
                <Link
                  to="/services/architectural-design"
                  className="navbar-dropdown-item"
                  onClick={() => setIsServicesDropdownOpen(false)}
                >
                  Architectural Design
                </Link>
                <Link
                  to="/services/interior-design"
                  className="navbar-dropdown-item"
                  onClick={() => setIsServicesDropdownOpen(false)}
                >
                  Interior Design
                </Link>
                <Link
                  to="/services/construction"
                  className="navbar-dropdown-item"
                  onClick={() => setIsServicesDropdownOpen(false)}
                >
                  Construction
                </Link>
              </div>
            )}
          </div>
          <Link to="/projects" className="navbar-link">
            Portfolio
          </Link>
          <Link to="/blog" className="navbar-link">
            Blog
          </Link>
          <Link to="/contact" className="navbar-link">
            Contact
          </Link>
        </div>

        {/* Theme Toggle & Mobile Menu - Far Right */}
        <div className="navbar-right">
          

          {/* Mobile Menu Button */}
          <div className="navbar-mobile-controls">
            <button
              onClick={toggleMobileMenu}
              className="mobile-menu-toggle"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`mobile-menu ${
          isMobileMenuOpen ? "mobile-menu-open" : "mobile-menu-closed"
        }`}
      >
        <div className="mobile-menu-container">
          <Link
            to="/"
            className="mobile-menu-link"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="mobile-menu-link"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </Link>
          <div className="mobile-menu-dropdown">
            <button
              className="mobile-menu-link mobile-menu-dropdown-toggle"
              onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
              aria-expanded={isServicesDropdownOpen}
              aria-haspopup="true"
            >
              Services
              <FaChevronDown
                className={`dropdown-icon ${isServicesDropdownOpen ? 'rotated' : ''}`}
                size={12}
              />
            </button>
            {isServicesDropdownOpen && (
              <div className="mobile-menu-dropdown-menu">
                <Link
                  to="/services/architectural-design"
                  className="mobile-menu-dropdown-item"
                  onClick={() => {
                    setIsServicesDropdownOpen(false);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Architectural Design
                </Link>
                <Link
                  to="/services/interior-design"
                  className="mobile-menu-dropdown-item"
                  onClick={() => {
                    setIsServicesDropdownOpen(false);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Interior Design
                </Link>
                <Link
                  to="/services/construction"
                  className="mobile-menu-dropdown-item"
                  onClick={() => {
                    setIsServicesDropdownOpen(false);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Construction
                </Link>
              </div>
            )}
          </div>
          <Link
            to="/projects"
            className="mobile-menu-link"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Portfolio
          </Link>
          <Link
            to="/blog"
            className="mobile-menu-link"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Blog
          </Link>
          <Link
            to="/contact"
            className="mobile-menu-link"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </Link>
          {/* Mobile Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="mobile-menu-link mobile-theme-toggle"
            aria-label="Toggle theme"
          >
            <div className="mobile-theme-content">
              {isDarkMode ? (
                <>
                  <FaSun className="mobile-theme-icon" />
                  Light Mode
                </>
              ) : (
                <>
                  <FaMoon className="mobile-theme-icon" />
                  Dark Mode
                </>
              )}
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
