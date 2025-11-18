import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSun, FaMoon, FaShieldAlt } from "react-icons/fa";
import { useTheme } from "../../hooks/useTheme";
import { useAuth } from "../../hooks/useAuth";
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
    const { isDarkMode, toggleTheme } = useTheme();
    const { isAdmin } = useAuth();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  // Close mobile menu when clicking outside
  const handleMobileMenuClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      setIsMobileMenuOpen(false);
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

           <Link to="/#services" className="navbar-link">
             Services
           </Link>
           <Link to="/#contact" className="navbar-link">
             Contact
           </Link>

           {isAdmin && (
             <Link to="/admin" className="navbar-link">
               <FaShieldAlt className="admin-icon" />
               Admin Dashboard
             </Link>
           )}
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

              {/* <Link
                to="/#services"
                className="fast-menu-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </Link> */}

              <Link
                to="/#contact"
                className="fast-menu-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>

              {isAdmin && (
                <Link
                  to="/admin"
                  className="fast-menu-link admin-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="fast-theme-content">
                    <FaShieldAlt className="fast-theme-icon" />
                    Admin Dashboard
                  </div>
                </Link>
              )}

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
