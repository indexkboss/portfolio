import { FaJsfiddle } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { Sun, Moon } from 'lucide-react';
import "./Navbar.css";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const location = useLocation();

  // Toggle dark/light mode
  useEffect(() => {
    document.body.classList.toggle('light-mode', !isDarkMode);
  }, [isDarkMode]);

  // Handle smooth scroll to section
  const scrollToSection = (sectionId) => {
    // If we're not on the home page, navigate to home first
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
      return;
    }

    // If we're already on home page, scroll to the section
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
      <Link to="/" className="logo" style={{ fontFamily: "'Courier New', Courier, monospace", fontWeight: 'bold', fontSize: '24px', color: '#fff', textDecoration: 'none' }}>
        Hi there!
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/projects">Projects</Link>

        {/* Dropdown for Experience, Education, Skills, Certifications */}
        <div className="dropdown">
          <button className="dropbtn">About Me</button>
          <div className="dropdown-content">
            <button 
              onClick={() => scrollToSection('experience')}
              className="dropdown-link"
            >
              Experience
            </button>
            <button 
              onClick={() => scrollToSection('education')}
              className="dropdown-link"
            >
              Education
            </button>
            <button 
              onClick={() => scrollToSection('skills')}
              className="dropdown-link"
            >
              Skills
            </button>
            <button 
              onClick={() => scrollToSection('certifications')}
              className="dropdown-link"
            >
              Certifications
            </button>
          </div>
        </div>

        <Link to="/contact">Contact</Link>

        {/* Theme Toggle Button */}
        <button 
          className="theme-toggle"
          onClick={() => setIsDarkMode(!isDarkMode)}
          aria-label="Toggle theme"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;