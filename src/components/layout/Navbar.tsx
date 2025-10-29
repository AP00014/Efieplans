import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaSun, FaMoon, FaChevronDown } from "react-icons/fa";
import { useTheme } from "../../hooks/useTheme";
import "../../styles/components/Navbar.css";

// Simple, Fast Hamburger Menu Component
const FastHamburger = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className={`fast-menu-toggle ${isOpen ? 'open' : ''}`}
      aria-label="Toggle mobile menu"
      type="button"
    >
      <div className="hamburger-lines">
        <span className="line line1"></span>
        <span className="line line2"></span>
        <span className="line line3"></span>
      </div>
    </button>
  );
};

const Navbar = () => {
  console.log('Navbar component rendering');
  const { isDarkMode, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isMobileServicesDropdownOpen, setIsMobileServicesDropdownOpen] = useState(false);
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
    // Close mobile services dropdown when mobile menu is closed
    if (isMobileMenuOpen) {
      setIsMobileServicesDropdownOpen(false);
    }
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

  // Close mobile menu when clicking outside
  const handleMobileMenuClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      setIsMobileMenuOpen(false);
      setIsMobileServicesDropdownOpen(false);
    }
  };

  return (
    <nav
      className={`navbar ${
        isScrolled ? "navbar-scrolled" : "navbar-transparent"
      } ${isDarkMode ? "dark" : ""}`}
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
          <Link to="/#home" className="navbar-link">
            Home
          </Link>
          <Link to="/#about" className="navbar-link">
            About
          </Link>

          <Link to="/projects" className="navbar-link">
            Projects
          </Link>
          <Link to="/blog" className="navbar-link">
            Blog
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
                  onClick={() => {
                    setIsServicesDropdownOpen(false);
                  }}
                >
                  Architectural Design
                </Link>
                <Link
                  to="/services/interior-design"
                  className="navbar-dropdown-item"
                  onClick={() => {
                    setIsServicesDropdownOpen(false);
                  }}
                >
                  Interior Design
                </Link>
                <Link
                  to="/services/construction"
                  className="navbar-dropdown-item"
                  onClick={() => {
                    setIsServicesDropdownOpen(false);
                  }}
                >
                  Construction
                </Link>
              </div>
            )}
          </div>
          <Link to="/#contact" className="navbar-link">
            Contact
          </Link>
        </div>

        {/* Controls - Far Right */}
        <div className="navbar-right">
          {/* Desktop Theme Toggle */}
          <div className="hidden md:flex items-center">
            <button
              onClick={toggleTheme}
              className="desktop-theme-toggle"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="navbar-mobile-controls md:hidden">
            <FastHamburger isOpen={isMobileMenuOpen} onClick={toggleMobileMenu} />
          </div>
        </div>
      </div>

      {/* Fast Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fast-mobile-overlay" onClick={handleMobileMenuClick}>
          <div className="fast-mobile-menu" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="fast-menu-header">
              <Link to="/" className="fast-menu-logo" onClick={() => setIsMobileMenuOpen(false)}>
                <img
                  src="https://res.cloudinary.com/dpzndrhse/image/upload/v1750667944/efieplans_logo_edited_kq1tmo.avif"
                  alt="Efie plans Construction Logo"
                  className="fast-menu-logo-img"
                />
              </Link>
            </div>

            {/* Navigation Links */}
            <nav className="fast-menu-nav">
              <Link
                to="/#home"
                className="fast-menu-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/#about"
                className="fast-menu-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/projects"
                className="fast-menu-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Projects
              </Link>
              <Link
                to="/blog"
                className="fast-menu-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>

              <div className="fast-menu-dropdown">
                <button
                  className="fast-menu-link fast-dropdown-toggle"
                  onClick={() => setIsMobileServicesDropdownOpen(!isMobileServicesDropdownOpen)}
                  aria-expanded={isMobileServicesDropdownOpen}
                  aria-haspopup="true"
                >
                  Services
                  <FaChevronDown
                    className={`fast-dropdown-icon ${isMobileServicesDropdownOpen ? 'rotated' : ''}`}
                    size={12}
                  />
                </button>
                {isMobileServicesDropdownOpen && (
                  <div className="fast-dropdown-menu">
                    <Link
                      to="/services/architectural-design"
                      className="fast-dropdown-item"
                      onClick={() => {
                        setIsMobileServicesDropdownOpen(false);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Architectural Design
                    </Link>
                    <Link
                      to="/services/interior-design"
                      className="fast-dropdown-item"
                      onClick={() => {
                        setIsMobileServicesDropdownOpen(false);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Interior Design
                    </Link>
                    <Link
                      to="/services/construction"
                      className="fast-dropdown-item"
                      onClick={() => {
                        setIsMobileServicesDropdownOpen(false);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Construction
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to="/#contact"
                className="fast-menu-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>

              {/* Mobile Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="fast-menu-link fast-theme-toggle"
                aria-label="Toggle theme"
              >
                <div className="fast-theme-content">
                  {isDarkMode ? (
                    <>
                      <FaSun className="fast-theme-icon" />
                      Light Mode
                    </>
                  ) : (
                    <>
                      <FaMoon className="fast-theme-icon" />
                      Dark Mode
                    </>
                  )}
                </div>
              </button>
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
