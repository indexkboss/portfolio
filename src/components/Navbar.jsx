import { Link, useLocation } from "react-router-dom";
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/themeContext'; // Import useTheme
import "./Navbar.css";

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme(); // Use theme context
  const location = useLocation();

  // Remove the local useState and useEffect for theme

  // Handle smooth scroll to section
  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo" >
        &lt;Khadija/&gt;
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/projects">Projects</Link>

        <div className="dropdown">
          <button className="dropbtn">Overview</button>
          <div className="dropdown-content">
            <button onClick={() => scrollToSection('experience')} className="dropdown-link">Experience</button>
            <button onClick={() => scrollToSection('education')} className="dropdown-link">Education</button>
            <button onClick={() => scrollToSection('skills')} className="dropdown-link">Skills</button>
            <button onClick={() => scrollToSection('certifications')} className="dropdown-link">Certifications</button>
          </div>
        </div>

        <Link to="/contact">Contact</Link>

        {/* Theme Toggle Button - now using context */}
        <button 
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;