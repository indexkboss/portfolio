import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/themeContext'; // Import useTheme
import "./Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";


const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme(); // Use theme context
  const location = useLocation();
  const navigate = useNavigate();

  // Handle smooth scroll to section
  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate("/", { state: { sectionId } });
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
      {/* <Link to="/" className="logo" >
        &lt;Khadija/&gt;
      </Link> */}
      <Link to="/" className="logo" >
        &lt;welcome/&gt;
      </Link>
      <div className="nav-links">
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