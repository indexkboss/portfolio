import { useState } from 'react';
import { motion } from 'framer-motion';
import './Projects.css';
import { useEffect } from 'react';
import { Link } from "react-router-dom";
import Navbar from '../components/Navbar';
import { ChevronLeft, ChevronRight, CheckCircle, Star, Sun, Moon, Award, Calendar, ExternalLink } from 'lucide-react';
import {  Github, Linkedin, Mail, ArrowUp, Code2, Heart } from 'lucide-react';


const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');


  const allProjects = [
    { 
      title: "Driving In The Rain", 
      icon: "🌧️", 
      description: "A beautiful weather app with real-time data",
      category: "dev",
      tech: ["React", "OpenWeather API", "Chart.js"],
      bgGradient: "linear-gradient(135deg, #4a90e2 0%, #6b8cff 100%)"
    },
    { 
      title: "I Like Turtles", 
      icon: "🐢", 
      description: "Interactive turtle animation game",
      category: "games",
      tech: ["Canvas API", "Matter.js", "React"],
      bgGradient: "linear-gradient(135deg, #6b8e23 0%, #8cb045 100%)"
    },
    { 
      title: "NBA Draft", 
      icon: "🏀", 
      description: "NBA stats tracker and analytics dashboard",
      category: "data",
      tech: ["Python", "Pandas", "React", "D3.js"],
      bgGradient: "linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%)"
    },
    { 
      title: "Task Master Pro", 
      icon: "✅", 
      description: "Advanced task management with AI prioritization",
      category: "dev",
      tech: ["Next.js", "TypeScript", "PostgreSQL"],
      bgGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    { 
      title: "Crypto Tracker", 
      icon: "💰", 
      description: "Real-time cryptocurrency portfolio tracker",
      category: "data",
      tech: ["React", "CoinGecko API", "Firebase"],
      bgGradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    { 
      title: "Fitness Journey", 
      icon: "💪", 
      description: "Personal fitness tracker with workout plans",
      category: "dev",
      tech: ["React Native", "Redux", "MongoDB"],
      bgGradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    },
    { 
      title: "Space Invaders Redux", 
      icon: "👾", 
      description: "Classic arcade game with modern twist",
      category: "games",
      tech: ["Phaser.js", "WebGL", "Socket.io"],
      bgGradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
    },
    { 
      title: "Recipe Finder", 
      icon: "🍳", 
      description: "Discover recipes based on ingredients",
      category: "dev",
      tech: ["Vue.js", "Spoonacular API", "Tailwind"],
      bgGradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
    },
    { 
      title: "Code Snippet Manager", 
      icon: "📝", 
      description: "Organize and share code snippets easily",
      category: "dev",
      tech: ["React", "Node.js", "Monaco Editor"],
      bgGradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)"
    },
    { 
      title: "AI Image Generator", 
      icon: "🎨", 
      description: "Generate images using AI models",
      category: "data",
      tech: ["Python", "Stable Diffusion", "Flask"],
      bgGradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)"
    },
    { 
      title: "Maze Runner", 
      icon: "🎮", 
      description: "Procedurally generated maze puzzle game",
      category: "games",
      tech: ["JavaScript", "Canvas", "A* Algorithm"],
      bgGradient: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)"
    },
    { 
      title: "Music Visualizer", 
      icon: "🎵", 
      description: "Audio reactive visual effects",
      category: "dev",
      tech: ["Web Audio API", "Three.js", "GLSL"],
      bgGradient: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)"
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? allProjects 
    : allProjects.filter(p => p.category === activeFilter);

  const categories = [
    { id: 'all', label: 'All Projects', icon: '📁' },
    { id: 'dev', label: 'Development', icon: '💻' },
    { id: 'data', label: 'Data Science', icon: '📊' },
    { id: 'games', label: 'Games', icon: '🎮' },
  ];

  return (
    <div className="projects-page">
         {/*<nav className="navbar">
       <Link to="/" className="logo" style={{ fontFamily: "'Courier New', Courier, monospace", fontWeight: 'bold', fontSize: '24px', color: '#fff', textDecoration: 'none' }}>
        Hi there!
      </Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/contact">Contact</Link>

        {/* Theme Toggle Button 
        <button 
          className="theme-toggle"
          onClick={() => setIsDarkMode(!isDarkMode)}
          aria-label="Toggle theme"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </nav> */}

    <Navbar/>





      {/* Header */}
      <div className="projects-header">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Comming soon 
          {/* My Projects instead of comming soon! */}
        </motion.h1>
        {/* <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          Explore my work across different domains
        </motion.p> */}
      </div>

      {/* Filters */}
      <div className="projects-filters">
       {/* {categories.map((cat) => (
          <button
            key={cat.id}
            className={`filter-btn ${activeFilter === cat.id ? 'active' : ''}`}
            onClick={() => setActiveFilter(cat.id)}
          >
            <span className="filter-icon">{cat.icon}</span>
            {cat.label}
          </button>
        ))} */}
      </div>

      {/* Projects Grid */}
      <div className="projects-grid">
       {/* {filteredProjects.map((project, i) => (
          <motion.div
            key={i}
            className="project-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -8 }}
          >
            <div 
              className="project-preview"
              style={{ background: project.bgGradient }}
            >
              <div className="project-category-badge">
                {project.category === 'dev' && '💻'}
                {project.category === 'data' && '📊'}
                {project.category === 'games' && '🎮'}
              </div>
              <span className="project-icon">{project.icon}</span>
            </div>
            
            <div className="project-content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tech">
                {project.tech.map((tech, idx) => (
                  <span key={idx}>{tech}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}*/}
      </div> 
            {/* Footer */}

<footer className="footer-main">
  <div className="footer-gradient-line" />

  <div className="footer-inner">
    {/* Brand */}
    <motion.div
      className="footer-brand"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <span className="footer-logo">BK</span>
      <div>
        <p className="footer-name">BOSSONY Khadija</p>
        <p className="footer-tagline">AI &amp; Big Data Engineering</p>
      </div>
    </motion.div>

    {/* Nav */}
    <motion.nav
      className="footer-nav"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <a href="#experience" className="footer-nav-link">Experience</a>
      <a href="#education" className="footer-nav-link">Education</a>
      <a href="#skills" className="footer-nav-link">Skills</a>
      <a href="#certifications" className="footer-nav-link">Certifications</a>
      <Link to="/Contact" className="footer-nav-link">Contact</Link>
    </motion.nav>

    {/* Socials + Back to top */}
    <motion.div
      className="footer-right"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="footer-socials">
        <a href="https://github.com/indexkboss" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="GitHub">
          <Github size={18} />
        </a>
        <a href="https://linkedin.com/in/khadijabossony" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="LinkedIn">
          <Linkedin size={18} />
        </a>
        <a href="mailto:bossonykhadijae@gmail.com" className="footer-social-btn" aria-label="Email">
          <Mail size={18} />
        </a>
      </div>
      <button
        className="footer-top-btn"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        <ArrowUp size={16} />
      </button>
    </motion.div>
  </div>

  {/* Bottom bar */}
  <div className="footer-bottom">
    <span className="footer-copy">
      © 2026 BOSSONY Khadija — Built with <Heart size={12} className="footer-heart" /> and <Code2 size={12} className="footer-code" />
    </span>
    <a href="/CVPortfolio.pdf" download className="footer-cv-link">
      Download CV <ExternalLink size={12} />
    </a>
  </div>
</footer>

    </div>
  );
};

export default Projects;