import { useTypewriter } from 'react-simple-typewriter';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import DemoModal from '../components/DemoModal';
import CertificateModal from '../components/CertificateModal'; 
import './Home.css';
import { ChevronLeft, ChevronRight, CheckCircle, Star, Sun, Moon, Award, Calendar, ExternalLink } from 'lucide-react';
import ProjectCarousel from '../components/ProjectCarousel';
import ProjectCard from '../components/ProjectCard';
import Navbar from "../components/Navbar";
import { allProjectsData } from "../data/allProjectsData";
import { experiencesData } from "../data/experiencesData";
import { educationData } from "../data/educationData";
import { websiteDemosData } from "../data/websiteDemosData";
import { allCertificatesData } from "../data/allCertificatesData";
import { Link } from "react-router-dom";
import {  Github, Linkedin, Mail, ArrowUp, Code2, Heart } from 'lucide-react';

const Home = () => {
  const [text] = useTypewriter({
    words: ['a Creative Thinker', 'a Problem Solver', 'an Innovator', 'a Lifelong Learner', 'a Tech Enthusiast', 'a Team Player', 'a Passionate Coder', 'a Continuous Improver'],
    loop: true,
    delaySpeed: 2000,
  });
  
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState([]);
  
  // Add this state with your other useState declarations
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);


  // Set filtered projects when component mounts or category changes
  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredProjects(allProjectsData);
    } else {
      setFilteredProjects(allProjectsData.filter(project => project.category === activeCategory));
    }
  }, [activeCategory]);

  // Listen for category changes from sidebar
  useEffect(() => {
    const handleCategoryChange = (event) => {
      setActiveCategory(event.detail);
    };

    window.addEventListener('categoryChange', handleCategoryChange);
    return () => window.removeEventListener('categoryChange', handleCategoryChange);
  }, []);

  const [selectedDemo, setSelectedDemo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentDemoIndex, setCurrentDemoIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDirection(1);
      setCurrentDemoIndex((prev) => (prev + 1) % websiteDemosData.length);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [currentDemoIndex]);


//canvas:
// Replace your current useEffect with this one
useEffect(() => {
  const canvas = document.getElementById("light-bg-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let animationId;
  let particles = [];

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  resize();
  window.addEventListener("resize", resize);

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 4 + 2;
      this.speedX = (Math.random() - 0.5) * 0.8;
      this.speedY = (Math.random() - 0.5) * 0.8;
      this.opacity = Math.random() * 0.6 + 0.2;
      // Alternate between your accent colors
    this.color = Math.random() > 0.5 ? 'rgb(147, 197, 253)' : '#db2778'; // Softer blue and lavender
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Bounce off edges
      if (this.x < 0 || this.x > canvas.width) {
        this.speedX *= -1;
        this.x = Math.max(0, Math.min(this.x, canvas.width));
      }
      if (this.y < 0 || this.y > canvas.height) {
        this.speedY *= -1;
        this.y = Math.max(0, Math.min(this.y, canvas.height));
      }

      // Slowly fade and reset to keep it fresh
      this.opacity -= 0.002;
      if (this.opacity <= 0.1) {
        this.reset();
        this.opacity = 0.6;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.opacity;
      ctx.fill();
      
      // Add a small glow
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  // Create 30 particles
  particles = Array.from({ length: 30 }, () => new Particle());

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!document.body.classList.contains("light-mode")) {
      animationId = requestAnimationFrame(animate);
      return;
    }

    // Draw all particles
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });

    animationId = requestAnimationFrame(animate);
  };

  animate();

  return () => {
    cancelAnimationFrame(animationId);
    window.removeEventListener("resize", resize);
  };
}, []);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentDemoIndex((prev) => (prev - 1 + websiteDemosData.length) % websiteDemosData.length);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentDemoIndex((prev) => (prev + 1) % websiteDemosData.length);
  };

  const renderDemoWebsite = (demo) => (
    <motion.div
      key={demo.title}
      className="demo-website"
      style={{
        backgroundImage: demo.image ? `url(${demo.image})` : demo.color ? `linear-gradient(135deg, ${demo.color}, ${demo.color}55)` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
      transition={{ duration: 0.4, ease: "linear" }}
    >
      <div className="browser-header">
        <div className="dots">
          <span style={{ backgroundColor: '#ff5f56' }}></span>
          <span style={{ backgroundColor: '#ffbd2e' }}></span>
          <span style={{ backgroundColor: '#27c93f' }}></span>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="home">
      <canvas id="light-bg-canvas"></canvas>
      <Navbar/>

      {/* HERO */}
      <div className="hero" style={{ display: 'flex', alignItems: 'flex-start', gap: '3rem', position: 'relative' }}>
        <div className="hero-left" style={{ flex: 1 }}>
          <motion.h1
            className="hero-name"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            BOSSONY<br />Khadija
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            AI & Big Data Engineering, I'm <span className="typewriter">{text}</span>
          </motion.p>
          <div className="button-group">
          <Link to="/Contact" className="link-contact">
            <button className="contact-btn">Contact Me</button>
          </Link>
<a href="/CVPortfolio.pdf" download  className="a-downloadBtn">
  <button className="download-cv-btn">
    Download CV
  </button>
</a>
          </div>
        </div>

        <div className="hero-right" style={{ flex: 1, marginTop: '3.5rem', position: 'relative' }}>
          <AnimatePresence mode="wait" initial={false}>
            {renderDemoWebsite(websiteDemosData[currentDemoIndex])}
          </AnimatePresence>
        </div>  
      </div>

      <div className="carousel-section">
        <ProjectCarousel 
          projects={filteredProjects} 
          category={activeCategory}
        />
      </div>

      <div className="sections-wrapper">

        {/* EXPERIENCE */}
        <section className="section" id="experience">
          <h2 className="section-title">Experience</h2>
          
          <div className="linkedin-experience-container">
            {experiencesData.map((exp, i) => (
              <motion.div
                key={i}
                className="linkedin-experience-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="linkedin-logo-wrapper">
                  <img src={exp.logo} alt={exp.company} className="linkedin-company-logo" />
                </div>

                <div className="linkedin-experience-content">
                  <div className="linkedin-header">
                    <div className="linkedin-role-wrapper">
                      <h3 className="linkedin-role">{exp.role}</h3>
                      {exp.verified && (
                        <CheckCircle className="linkedin-verified-icon" size={16} />
                      )}
                      {exp.featured && (
                        <Star className="linkedin-featured-icon" size={14} fill="#FFD700" />
                      )}
                    </div>
                    <p className="linkedin-company">
                      {exp.company}
                      {exp.status === "current" && (
                        <span className="linkedin-current-badge">
                          <span className="linkedin-status-dot"></span>
                        </span>
                      )}
                    </p>
                  </div>

                  <div className="linkedin-details">
                    <span className="linkedin-period">{exp.period}</span>
                    <span className="linkedin-separator">•</span>
                    <span className="linkedin-duration">{exp.duration}</span>
                  </div>
                  <div className="linkedin-location">
                    <span>{exp.location}</span>
                    <span className="linkedin-separator">•</span>
                    <span>{exp.type}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* EDUCATION */}
        <section id="education" className="section">
          <h2 className="section-title">Education</h2>
          
          <div className="education-timeline">
            <div className="timeline-line-education"></div>
            
            {educationData.map((edu, i) => (
              <motion.div
                key={i}
                className="education-timeline-item"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <div className="timeline-dot-education">
                  <div className="dot-inner"></div>
                </div>
                
                <div className="linkedin-experience-card education-card">
                  <div className="linkedin-logo-wrapper">
                    {edu.logo ? (
                      <img src={edu.logo} alt={edu.school} className="linkedin-company-logo" />
                    ) : (
                      <div className="education-logo-fallback">
                        <span>{edu.school.charAt(0)}</span>
                      </div>
                    )}
                  </div>

                  <div className="linkedin-experience-content">
                    <div className="linkedin-header">
                      <div className="linkedin-role-wrapper">
                        <h3 className="linkedin-role">{edu.degree}</h3>
                        {edu.verified && (
                          <CheckCircle className="linkedin-verified-icon" size={16} />
                        )}
                        {edu.featured && (
                          <Star className="linkedin-featured-icon" size={14} fill="#FFD700" />
                        )}
                      </div>
                      <p className="linkedin-company">
                        {edu.school}
                        {edu.status === "current" && (
                          <span className="linkedin-current-badge">
                            <span className="linkedin-status-dot"></span>
                          </span>
                        )}
                      </p>
                    </div>

                    <div className="linkedin-details">
                      <span className="linkedin-period">{edu.period}</span>
                      <span className="linkedin-separator">•</span>
                      <span className="linkedin-duration">{edu.duration}</span>
                    </div>
                    
                    <div className="linkedin-location">
                      <span>{edu.location}</span>
                      <span>{edu.type}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

       {/* Skills */}
<section className="section" id="skills">
  <h2 className="section-title">Skills & Technologies</h2>
  
  <div className="skills-compact-container">
    {/* Programming Languages Card */}
    <motion.div 
      className="skill-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5 }}
    >
      <div className="skill-card-header">
        <span className="skill-card-icon">💻</span>
        <h3 className="skill-card-title">Programming Languages</h3>
      </div>
      <div className="skill-card-content">
        {['C', 'C++', 'Java', 'Python', 'JavaScript', 'PHP', 'TypeScript', 'HTML5', 'CSS3', 'Assembly', 'C#'].map((skill, idx) => (
          <span key={idx} className="skill-badge">{skill}</span>
        ))}
      </div>
    </motion.div>

    {/* Frameworks & Libraries Card */}
    <motion.div 
      className="skill-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.1 }}
      whileHover={{ y: -5 }}
    >
      <div className="skill-card-header">
        <span className="skill-card-icon">⚛️</span>
        <h3 className="skill-card-title">Frameworks & Libraries</h3>
      </div>
      <div className="skill-card-content">
        {['React', 'React Native', 'Angular', 'Symfony', 'Django', 'Bootstrap', 'PyTorch', 'Scikit-learn'].map((skill, idx) => (
          <span key={idx} className="skill-badge">{skill}</span>
        ))}
      </div>
    </motion.div>

    {/* Databases Card */}
    <motion.div 
      className="skill-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.2 }}
      whileHover={{ y: -5 }}
    >
      <div className="skill-card-header">
        <span className="skill-card-icon">🗄️</span>
        <h3 className="skill-card-title">Databases</h3>
      </div>
      <div className="skill-card-content">
        {['MySQL', 'MongoDB', 'Oracle', 'SQL Server', 'SQLite', 'Firebase', 'Redis', 'Neo4j', 'Cassandra', 'PL/SQL', 'T-SQL'].map((skill, idx) => (
          <span key={idx} className="skill-badge">{skill}</span>
        ))}
      </div>
    </motion.div>

    {/* Tools & Methodologies Card */}
    <motion.div 
      className="skill-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <div className="skill-card-header">
        <span className="skill-card-icon">🛠️</span>
        <h3 className="skill-card-title">Tools & Methodologies</h3>
      </div>
      <div className="skill-card-content">
        {['VS Code', 'IntelliJ IDEA', 'Eclipse', 'Jira', 'Taiga', 'UML', 'Git', 'Docker'].map((skill, idx) => (
          <span key={idx} className="skill-badge">{skill}</span>
        ))}
      </div>
    </motion.div>

    {/* Data Science & AI Card */}
    <motion.div 
      className="skill-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.4 }}
      whileHover={{ y: -5 }}
    >
      <div className="skill-card-header">
        <span className="skill-card-icon">🤖</span>
        <h3 className="skill-card-title">Data Science & AI</h3>
      </div>
      <div className="skill-card-content">
        {['Machine Learning', 'Deep Learning', 'Data Analysis', 'Pandas', 'NumPy', 'Matplotlib', 'Tableau', 'Power BI', 'NLP', 'Computer Vision', 'Big Data', 'Spark'].map((skill, idx) => (
          <span key={idx} className="skill-badge">{skill}</span>
        ))}
      </div>
    </motion.div>
  </div>
</section>
        {/* CERTIFICATIONS */}
<section id="certifications" className="section">
  <h2 className="section-title">Certifications & Courses</h2>
  
  <div className="certifications-grid">
    {/* C++ Programming - EPFL */}
    <motion.div
      className="certification-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -8 }}
    >
      <div className="cert-icon">
        <img 
          src="C++.png" 
          alt="EPFL Logo" 
          className="cert-icon-image"
        />
      </div>
      
      <div className="cert-content">
        <h3 className="cert-title">Introduction à la programmation orientée objet (en C++)</h3>
        <p className="cert-issuer">
          <Award size={14} />
          École Polytechnique Fédérale de Lausanne
        </p>
        <p className="cert-date">
          <Calendar size={14} />
          Jan 25, 2025
        </p>
        
        <div className="cert-skills">
          <span className="skill-tag">C++</span>
          <span className="skill-tag">OOP</span>
          <span className="skill-tag">Programming</span>
        </div>
        
        <div className="cert-footer">
          <button 
            onClick={() => {
              setSelectedCertificate(allCertificatesData[0]);
              setIsCertificateModalOpen(true);
            }}
            className="cert-view-btn"
          >
            View Certificate
          </button>
        </div>
      </div>
    </motion.div>

    {/* Negotiation - University of Michigan */}
    <motion.div
      className="certification-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.1 }}
      whileHover={{ y: -8 }}
    >
      <div className="cert-icon">
        <img 
          src="negotiation.png"
          alt="University of Michigan Logo" 
          className="cert-icon-image"
        />
      </div>
      
      <div className="cert-content">
        <h3 className="cert-title">Successful Negotiation: Essential Strategies and Skills</h3>
        <p className="cert-issuer">
          <Award size={14} />
          University of Michigan
        </p>
        <p className="cert-date">
          <Calendar size={14} />
          Jan 24, 2025
        </p>
        
        <div className="cert-skills">
          <span className="skill-tag">Negotiation</span>
          <span className="skill-tag">Communication</span>
          <span className="skill-tag">Business Strategy</span>
        </div>
        
        <div className="cert-footer">
          <button 
            onClick={() => {
              setSelectedCertificate(allCertificatesData[1]);
              setIsCertificateModalOpen(true);
            }}
            className="cert-view-btn"
          >
            View Certificate
          </button>
        </div>
      </div>
    </motion.div>

    {/* JavaScript - University of Michigan */}
    <motion.div
      className="certification-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.2 }}
      whileHover={{ y: -8 }}
    >
      <div className="cert-icon">
        <img 
          src="JS.png" 
          alt="University of Michigan Logo" 
          className="cert-icon-image"
        />
      </div>
      
      <div className="cert-content">
        <h3 className="cert-title">Interactivity with JavaScript</h3>
        <p className="cert-issuer">
          <Award size={14} />
          University of Michigan
        </p>
        <p className="cert-date">
          <Calendar size={14} />
          Jan 24, 2025
        </p>
        
        <div className="cert-skills">
          <span className="skill-tag">JavaScript</span>
          <span className="skill-tag">DOM</span>
          <span className="skill-tag">Web Development</span>
        </div>
        
        <div className="cert-footer">
          <button 
            onClick={() => {
              setSelectedCertificate(allCertificatesData[2]);
              setIsCertificateModalOpen(true);
            }}
            className="cert-view-btn"
          >
            View Certificate
          </button>
        </div>
      </div>
    </motion.div>

    {/* Software Engineering - HKUST */}
    <motion.div
      className="certification-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.3 }}
      whileHover={{ y: -8 }}
    >
      <div className="cert-icon">
        <img 
          src="Software-Development.png" 
          alt="HKUST Logo" 
          className="cert-icon-image"
        />
      </div>
      
      <div className="cert-content">
        <h3 className="cert-title">Software Engineering: Software Design and Project Management</h3>
        <p className="cert-issuer">
          <Award size={14} />
          HKUST
        </p>
        <p className="cert-date">
          <Calendar size={14} />
          2025
        </p>
        
        <div className="cert-skills">
          <span className="skill-tag">Software Design</span>
          <span className="skill-tag">Project Management</span>
          <span className="skill-tag">Agile</span>
        </div>
        
        <div className="cert-footer">
          <button 
            onClick={() => {
              setSelectedCertificate(allCertificatesData[3]);
              setIsCertificateModalOpen(true);
            }}
            className="cert-view-btn"
          >
            View Certificate
          </button>
        </div>
      </div>
    </motion.div>

    {/* Python Web Access - University of Michigan */}
    <motion.div
      className="certification-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.4 }}
      whileHover={{ y: -8 }}
    >
      <div className="cert-icon">
        <img 
          src="python.jpg" 
          alt="University of Michigan Logo" 
          className="cert-icon-image"
        />
      </div>
      
      <div className="cert-content">
        <h3 className="cert-title">Using Python to Access Web Data</h3>
        <p className="cert-issuer">
          <Award size={14} />
          University of Michigan
        </p>
        <p className="cert-date">
          <Calendar size={14} />
          Jun 1, 2025
        </p>
        
        <div className="cert-skills">
          <span className="skill-tag">Python</span>
          <span className="skill-tag">Web Scraping</span>
          <span className="skill-tag">APIs</span>
          <span className="skill-tag">JSON</span>
        </div>
        
        <div className="cert-footer">
          <button 
            onClick={() => {
              setSelectedCertificate(allCertificatesData[4]);
              setIsCertificateModalOpen(true);
            }}
            className="cert-view-btn"
          >
            View Certificate
          </button>
        </div>
      </div>
    </motion.div>
  </div>
</section>
      </div>


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

      <DemoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        demo={selectedDemo}
      />

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={isCertificateModalOpen}
        onClose={() => setIsCertificateModalOpen(false)}
        certificate={selectedCertificate}
        allCertificates={allCertificatesData}
      />
    </div>
  );
};

export default Home;