// This file has the View More button - replace your existing ProjectCarousel.jsx with this
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import './ProjectCarousel.css';

const ProjectCarousel = ({ projects, category }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    if (!isAutoPlaying || projects.length <= 1) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying, projects.length]);

  const nextSlide = () => {
    if (projects.length <= 1) return;
    setDirection(1);
    setCurrentIndex((prevIndex) => prevIndex === projects.length - 1 ? 0 : prevIndex + 1);
  };

  const prevSlide = () => {
    if (projects.length <= 1) return;
    setDirection(-1);
    setCurrentIndex((prevIndex) => prevIndex === 0 ? projects.length - 1 : prevIndex - 1);
  };

  const goToSlide = (index) => {
    if (projects.length <= 1) return;
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const openProjectModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    setIsAutoPlaying(false);
  };

  const closeProjectModal = () => {
    setIsModalOpen(false);
    setIsAutoPlaying(true);
  };

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const getPosition = (index) => {
    const diff = index - currentIndex;
    const totalSlides = projects.length;
    let normalizedDiff = diff;
    if (Math.abs(diff) > totalSlides / 2) {
      normalizedDiff = diff > 0 ? diff - totalSlides : diff + totalSlides;
    }
    return normalizedDiff;
  };

  if (!projects || projects.length === 0) {
    return <div className="no-projects">No projects in this category</div>;
  }

  return (
    <div className="carousel-wrapper" ref={carouselRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="carousel-header">
        <h2 className="carousel-title">
          {category === 'all' ? 'All Projects' : 
           category === 'dev' ? '💻 Development Projects' :
           category === 'ai' ? '🤖 AI & ML Projects' :
           category === 'data' ? '📊 Data Science Projects' :
           category === 'games' ? '🎮 Game Projects' : '🎨 Design Projects'}
        </h2>
        <Link to="/projects" className="view-more-btn">View More →</Link>
      </div>

      <div className="carousel-3d-container">
        <div className="carousel-3d">
          {projects.map((project, index) => {
            const position = getPosition(index);
            const isActive = index === currentIndex;
            const opacity = Math.abs(position) > 2 ? 0 : Math.max(0.3, 1 - Math.abs(position) * 0.25);
            const scale = Math.max(0.6, 1 - Math.abs(position) * 0.12);
            const zIndex = 100 - Math.abs(position) * 10;
            const translateX = position * 320;
            const translateY = Math.abs(position) * 20;
            const rotateY = position * -12;
            const rotateX = Math.abs(position) * 3;
            const blur = Math.abs(position) * 2;
            
            return (
              <motion.div
                key={project.title}
                className={`carousel-item ${isActive ? 'active' : ''}`}
                initial={false}
                animate={{
                  x: translateX, y: translateY, scale, opacity, rotateY, rotateX,
                  filter: `blur(${blur}px)`, zIndex
                }}
                transition={{ type: "spring", stiffness: 300, damping: 35, mass: 1 }}
                style={{
                  position: 'absolute', left: '50%', top: '50%',
                  transformOrigin: 'center center', cursor: 'pointer', width: '350px'
                }}
                onClick={() => goToSlide(index)}
                whileHover={{ scale: isActive ? 1.05 : scale * 1.02 }}
              >
                <div className="carousel-card" onClick={(e) => { if (isActive) { e.stopPropagation(); openProjectModal(project); }}}>
                  <div className="carousel-preview" style={{ background: project.bgGradient }}>
                    <div className="carousel-category-tag">
                      {project.category === 'dev' && '💻 Dev'}
                      {project.category === 'ai' && '🤖 AI'}
                      {project.category === 'data' && '📊 Data'}
                      {project.category === 'games' && '🎮 Game'}
                      {project.category === 'design' && '🎨 Design'}
                    </div>
                    <span className="carousel-icon">{project.icon}</span>
                    <div className="carousel-mockup">
                      <div className="mockup-dots"><span></span><span></span><span></span></div>
                      <div className="mockup-line"></div>
                      <div className="mockup-line short"></div>
                      <div className="mockup-box"></div>
                    </div>
                  </div>
                  <div className="carousel-info">
                    <h3 className="carousel-card-title">{project.title}</h3>
                    <p className="carousel-description">{project.description}</p>
                    <div className="carousel-tech">
                      {project.tech.slice(0, 3).map((tech, i) => (<span key={i}>{tech}</span>))}
                    </div>
                  </div>
                  {isActive && (<div className="active-indicator-pulse"><span>Click to explore →</span></div>)}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      
      <div className="carousel-controls">
        <button className="carousel-btn prev-btn" onClick={prevSlide} disabled={projects.length <= 1}><FaChevronLeft /></button>
        <button className="carousel-btn next-btn" onClick={nextSlide} disabled={projects.length <= 1}><FaChevronRight /></button>
      </div>

      <div className="carousel-dots">
        {projects.map((_, index) => (<button key={index} className={`dot ${index === currentIndex ? 'active' : ''}`} onClick={() => goToSlide(index)} />))}
      </div>

      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <motion.div className="project-modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeProjectModal}>
            <motion.div className="project-modal-content" initial={{ scale: 0.8, opacity: 0, y: 50 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.8, opacity: 0, y: 50 }} transition={{ type: "spring", damping: 25, stiffness: 200 }} onClick={(e) => e.stopPropagation()}>
              <button className="modal-close-btn" onClick={closeProjectModal}>×</button>
              <div className="modal-header">
                <div className="modal-preview" style={{ background: selectedProject.bgGradient }}><span className="modal-icon">{selectedProject.icon}</span></div>
                <div className="modal-title-section">
                  <h2>{selectedProject.title}</h2>
                  <div className="modal-category-badge">
                    {selectedProject.category === 'dev' && '💻 Development'}
                    {selectedProject.category === 'ai' && '🤖 AI/ML'}
                    {selectedProject.category === 'data' && '📊 Data Science'}
                    {selectedProject.category === 'games' && '🎮 Game'}
                    {selectedProject.category === 'design' && '🎨 Design'}
                  </div>
                </div>
              </div>
              <div className="modal-body">
                <p className="modal-description">{selectedProject.description}</p>
                <div className="modal-details">
                  <div className="modal-detail-section">
                    <h4>Technologies Used</h4>
                    <div className="modal-tech-tags">{selectedProject.tech.map((tech, i) => (<span key={i} className="tech-tag">{tech}</span>))}</div>
                  </div>
                  <div className="modal-detail-section">
                    <h4>Features</h4>
                    <ul className="modal-features"><li>Real-time data updates</li><li>Responsive design</li><li>Interactive UI elements</li><li>API integration</li></ul>
                  </div>
                </div>
                <div className="modal-actions">
                  <motion.a href="/projects" className="modal-btn primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><FaExternalLinkAlt /> Live Demo</motion.a>
                  <motion.a href="/projects" className="modal-btn secondary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><FaGithub /> View Code</motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectCarousel;