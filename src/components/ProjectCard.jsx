import React from 'react';
import { motion } from 'framer-motion';
import './ProjectCard.css';

const ProjectCard = ({ project, isActive }) => {
  return (
    <motion.div 
      className={`project-card-carousel ${isActive ? 'active' : ''}`}
      whileHover={{ scale: isActive ? 1.02 : 1 }}
      transition={{ duration: 0.2 }}
    >
      <div 
        className="project-card-preview"
        style={{ background: project.bgGradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
      >
        <div className="project-card-category">
          {project.category === 'dev' && '💻 Dev'}
          {project.category === 'ai' && '🤖 AI'}
          {project.category === 'data' && '📊 Data'}
          {project.category === 'games' && '🎮 Game'}
          {project.category === 'design' && '🎨 Design'}
        </div>
        <span className="project-card-icon">{project.icon || '📁'}</span>
        <div className="project-card-mockup">
          <div className="mockup-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="mockup-line"></div>
          <div className="mockup-line short"></div>
          <div className="mockup-box"></div>
        </div>
      </div>
      
      <div className="project-card-info">
        <h3 className="project-card-title">{project.title}</h3>
        <p className="project-card-description">{project.description}</p>
        <div className="project-card-tech">
          {project.tech && project.tech.slice(0, 3).map((tech, i) => (
            <span key={i}>{tech}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;