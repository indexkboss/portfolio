import { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, Home, Folder, Mail } from 'lucide-react';
import { useTheme } from '../context/themeContext';
import "./Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Add this effect to lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      // Add styles to body to prevent scrolling
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflowY = 'scroll'; // Maintain scrollbar width to prevent layout shift
    } else {
      // Restore scroll position when menu closes
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
  }, [isMenuOpen]);

  const scrollToSection = (sectionId) => {
    // Close mobile menu first
    setIsMenuOpen(false);
    
    if (location.pathname !== '/') {
      // If not on home page, navigate to home with state
      navigate("/", { state: { sectionId } });
      return;
    }
    
    // If on home page, scroll to section
    const element = document.getElementById(sectionId);
    if (element) {
      // Add a small delay to ensure the menu is closed
      setTimeout(() => {
        const navbarHeight = 80; // Height of your fixed navbar
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - navbarHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }, 100);
    }
  };

  const closeMenu = () => setIsMenuOpen(false);

  // Handle escape key to close menu
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [isMenuOpen]);

  return (
    <nav className="navbar">
      {/* Logo */}
      <Link to="/" className="navbar-logo" onClick={closeMenu}>
        &lt;Hi/&gt;
      </Link>

      {/* Desktop Navigation */}
      <div className="nav-links desktop-nav">
        <Link to="/projects" className="nav-link">Projects</Link>

        <div className="dropdown">
          <button className="dropbtn">Overview</button>
          <div className="dropdown-content">
            <button onClick={() => scrollToSection('experience')} className="dropdown-link">Experience</button>
            <button onClick={() => scrollToSection('education')} className="dropdown-link">Education</button>
            <button onClick={() => scrollToSection('skills')} className="dropdown-link">Skills</button>
            <button onClick={() => scrollToSection('certifications')} className="dropdown-link">Certifications</button>
          </div>
        </div>

        <Link to="/contact" className="nav-link">Contact</Link>

        <button 
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button 
        className="mobile-menu-btn"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
        aria-expanded={isMenuOpen}
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-content">
          <Link to="/" className="mobile-nav-link" onClick={closeMenu}>
            <Home size={20} />
            <span>Home</span>
          </Link>
          
          <Link to="/projects" className="mobile-nav-link" onClick={closeMenu}>
            <Folder size={20} />
            <span>Projects</span>
          </Link>
          
          <Link to="/contact" className="mobile-nav-link" onClick={closeMenu}>
            <Mail size={20} />
            <span>Contact</span>
          </Link>

          <div className="mobile-divider"></div>

          <button onClick={() => scrollToSection('experience')} className="mobile-nav-link">
            <span className="mobile-icon">💼</span>
            <span>Experience</span>
          </button>
          
          <button onClick={() => scrollToSection('education')} className="mobile-nav-link">
            <span className="mobile-icon">🎓</span>
            <span>Education</span>
          </button>
          
          <button onClick={() => scrollToSection('skills')} className="mobile-nav-link">
            <span className="mobile-icon">⚡</span>
            <span>Skills</span>
          </button>
          
          <button onClick={() => scrollToSection('certifications')} className="mobile-nav-link">
            <span className="mobile-icon">🏆</span>
            <span>Certifications</span>
          </button>

          <div className="mobile-divider"></div>

          <button 
            className="mobile-theme-toggle"
            onClick={() => {
              toggleTheme();
              closeMenu();
            }}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;