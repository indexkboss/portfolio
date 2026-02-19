import { FaJsfiddle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Sun, Moon } from 'lucide-react';
import "./Navbar.css";
import { useState } from "react";
import { useEffect } from "react";

const Navbar = () => {
      const [isDarkMode, setIsDarkMode] = useState(true);
      
      // Toggle dark/light mode
      useEffect(() => {
        document.body.classList.toggle('light-mode', !isDarkMode);
      }, [isDarkMode]);
      
    
  return (
    <nav className="navbar">
       <div className="logo"  style={{ fontFamily: "'Courier New', Courier, monospace", fontWeight: 'bold', fontSize: '24px',   color: '#fff' }}
        >Hi there!</div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/experience">Experience</Link>
        <Link to="/education">Education</Link>
        <Link to="/skills">Skills</Link>
        <Link to="/certifications">Certifications</Link>
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
