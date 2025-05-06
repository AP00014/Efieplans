// Navbar.tsx
import { useState, useEffect, FC } from 'react';
import { Link } from 'react-router-dom';
import { FiSun, FiMoon, FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import './Navbar.css'; // Create this CSS file
import imageLogo from '../../public/Images/logo.avif';


interface NavbarProps {
  darkTheme: boolean;
  setDarkTheme: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ServiceLink {
  name: string;
  link: string;
}




const Navbar: FC<NavbarProps> = ({ darkTheme, setDarkTheme }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const servicesLinks: ServiceLink[] = [
    { name: 'Architectural Design', link: '/Architectural' },
    { name: 'Construction', link: '/Contruction' },
    { name: 'Interior Design', link: 'Interior' },
    { name: 'Renovations', link: '/Renovation' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${darkTheme ? 'dark' : ''} ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container"> 
        <Link to="/" className="navbar-logo">
          <img src={imageLogo} alt="Efie Plans" />
         
        </Link>

        <div className="navbar-menu desktop">
          <Link to="/" className="nav-item">Home</Link>
          <Link to="/about" className="nav-item">About</Link>
          <Link to="/projects" className="nav-item">Projects</Link>
          
          <div 
            className="dropdown-container"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <button className="nav-item dropdown-toggle">
              Services <FiChevronDown className="dropdown-icon" />
            </button>
            <div className={`dropdown-menu ${isServicesOpen ? 'open' : ''}`}>
              {servicesLinks.map((service) => (
                <Link key={service.link} to={service.link} className="dropdown-item">
                  {service.name}
                </Link>
              ))}
            </div>
          </div>

          <Link to="/contact" className="nav-item">Contact Us</Link>
          

          <Link to="/blog" className="nav-item">Blog</Link>
        </div>

        <div className="navbar-controls">
          <button 
            onClick={() => setDarkTheme(!darkTheme)} 
            className="theme-toggle"
          >
            {darkTheme ? <FiSun /> : <FiMoon />}
          </button>
          
         
          
          <button 
            className="mobile-menu-button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <Link to="/" className="mobile-nav-item" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
        <Link to="/about" className="mobile-nav-item" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
        <Link to="/projects" className="mobile-nav-item" onClick={() => setIsMobileMenuOpen(false)}>Projects</Link>
        
        <div 
          className="mobile-dropdown-container"
          onClick={() => setIsServicesOpen(!isServicesOpen)}
        >
          <div className="mobile-dropdown-header">
            Services <FiChevronDown className={`dropdown-icon ${isServicesOpen ? 'open' : ''}`} />
          </div>
          <div className={`mobile-dropdown-menu ${isServicesOpen ? 'open' : ''}`}>
            {servicesLinks.map((service) => (
              <Link key={service.link} to={service.link} className="mobile-dropdown-item">
                {service.name}
              </Link>
            ))}
          </div>
        </div>
        <Link to="/contact" className="mobile-nav-item"onClick={() => setIsMobileMenuOpen(false)}>Contact Us</Link>
        <Link to="/blog" className="mobile-nav-item"onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
      </div>
    </nav>
  );
};

export default Navbar;