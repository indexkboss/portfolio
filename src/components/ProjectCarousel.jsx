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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const carouselRef = useRef(null);
  const modalContentRef = useRef(null);

  useEffect(() => {
    if (isModalOpen) {
      const scrollY = window.scrollY;
      
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
      
      document.body.classList.add('modal-open');
      
      document.body.style.touchAction = 'none';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.body.style.touchAction = '';
      
      document.body.classList.remove('modal-open');
      
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    
    // Cleanup function
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.body.style.touchAction = '';
      document.body.classList.remove('modal-open');
    };
  }, [isModalOpen]);

  useEffect(() => {
    if (isModalOpen && modalContentRef.current) {
      const handleTouchMove = (e) => {
        e.stopPropagation();
      };
      
      modalContentRef.current.addEventListener('touchmove', handleTouchMove, { passive: false });
      
      return () => {
        if (modalContentRef.current) {
          modalContentRef.current.removeEventListener('touchmove', handleTouchMove);
        }
      };
    }
  }, [isModalOpen]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const getMobileAnimation = (position) => {
    return {
      x: position * (isMobile ? 200 : 320),
      y: Math.abs(position) * (isMobile ? 15 : 20),
      scale: Math.max(0.6, 1 - Math.abs(position) * 0.12),
      opacity: Math.abs(position) > 2 ? 0 : Math.max(0.3, 1 - Math.abs(position) * 0.25),
      rotateY: position * (isMobile ? -8 : -12),
      rotateX: Math.abs(position) * (isMobile ? 2 : 3),
      filter: `blur(${Math.abs(position) * (isMobile ? 1 : 2)}px)`,
      zIndex: 100 - Math.abs(position) * 10
    };
  };

  const getDesktopAnimation = (position) => {
    return {
      x: position * 320,
      y: Math.abs(position) * 20,
      scale: Math.max(0.6, 1 - Math.abs(position) * 0.12),
      opacity: Math.abs(position) > 2 ? 0 : Math.max(0.3, 1 - Math.abs(position) * 0.25),
      rotateY: position * -12,
      rotateX: Math.abs(position) * 3,
      filter: `blur(${Math.abs(position) * 2}px)`,
      zIndex: 100 - Math.abs(position) * 10
    };
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
            
            const animation = isMobile ? getMobileAnimation(position) : getDesktopAnimation(position);
            
            return (
              <motion.div
                key={project.title}
                className={`carousel-item ${isActive ? 'active' : ''}`}
                initial={false}
                animate={animation}
                transition={{ type: "spring", stiffness: 300, damping: 35, mass: 1 }}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  width: isMobile ? '280px' : '350px',
                  marginLeft: isMobile ? '-140px' : '-175px',
                  marginTop: isMobile ? '-190px' : '-225px',
                  transformOrigin: 'center center',
                  cursor: 'pointer',
                  zIndex: isActive ? 100 : 1,
                }}
                onClick={() => goToSlide(index)}
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
          <motion.div 
            className="project-modal-overlay" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={closeProjectModal}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 999999,
            }}
          >
            <motion.div 
              ref={modalContentRef}
              className="project-modal-content" 
              initial={{ scale: 0.8, opacity: 0, y: 50 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.8, opacity: 0, y: 50 }} 
              transition={{ type: "spring", damping: 25, stiffness: 200 }} 
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                zIndex: 1000000,
                maxHeight: '90vh',
                overflowY: 'auto',
                WebkitOverflowScrolling: 'touch', 
              }}
            >
              <button className="modal-close-btn" onClick={closeProjectModal}>×</button>
              <div className="modal-header">
                <div className="modal-preview" style={{ background: selectedProject.bgGradient }}>
                  <span className="modal-icon">{selectedProject.icon}</span>
                </div>
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
                    <div className="modal-tech-tags">
                      {selectedProject.tech.map((tech, i) => (<span key={i} className="tech-tag">{tech}</span>))}
                    </div>
                  </div>
                  <div className="modal-detail-section">
                    <h4>Features</h4>
                    <ul className="modal-features">
                      <li>Real-time data updates</li>
                      <li>Responsive design</li>
                      <li>Interactive UI elements</li>
                      <li>API integration</li>
                    </ul>
                  </div>
                </div>
                <div className="modal-actions">
                  <motion.a 
                    href="/projects" 
                    className="modal-btn primary" 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaExternalLinkAlt /> Live Demo
                  </motion.a>
                  <motion.a 
                    href="/projects" 
                    className="modal-btn secondary" 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaGithub /> View Code
                  </motion.a>
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
