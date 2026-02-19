import { useTypewriter } from 'react-simple-typewriter';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
// import DemoModal from '../components/DemoModal';
import './Home.css';
import { ChevronLeft, ChevronRight, CheckCircle, Star, Sun, Moon, Award, Calendar, ExternalLink } from 'lucide-react';
// import ProjectCarousel from '../components/ProjectCarousel';
// import ProjectCard from '../components/ProjectCard';
import Navbar from "../components/Navbar";
const Home = () => {
  const [text] = useTypewriter({
    words: ['Developer', 'Creative Thinker', 'Problem Solver', 'Innovator', 'Designer'],
    loop: true,
    delaySpeed: 2000,
  });
  
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(true);

// Define all projects - EXPANDED
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

// Toggle dark/light mode
useEffect(() => {
  document.body.classList.toggle('light-mode', !isDarkMode);
}, [isDarkMode]);

// Set filtered projects when component mounts or category changes
useEffect(() => {
  if (activeCategory === 'all') {
    setFilteredProjects(allProjects);
  } else {
    setFilteredProjects(allProjects.filter(project => project.category === activeCategory));
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

const websiteDemos = [
  { title: 'Pinterest', color: '#E60023' },
  { title: 'Apple', color: '#A2AAAD' },
  { 
    title: 'My Screenshot', 
    image: 'image.png' 
  },
];

  const [currentDemoIndex, setCurrentDemoIndex] = useState(0);
  const [direction, setDirection] = useState(0);

useEffect(() => {
  const timeout = setTimeout(() => {
    setDirection(1);
    setCurrentDemoIndex((prev) => (prev + 1) % websiteDemos.length);
  }, 5000);

  return () => clearTimeout(timeout);
}, [currentDemoIndex]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentDemoIndex((prev) => (prev - 1 + websiteDemos.length) % websiteDemos.length);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentDemoIndex((prev) => (prev + 1) % websiteDemos.length);
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
    onClick={() => {
      setSelectedDemo(demo);
      setIsModalOpen(true);
    }}
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

const experiences = [
  {
    company: "Sofrecom",
    logo: "data:image/png;base64,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",
    role: "Software Engineer II",
    period: "May 2021 - Aug 2023",
    duration: "2 yr 3 mo",
    location: "Bengaluru, India",
    type: "Full-Time",
    status: "past",
    verified: true,
    featured: true,
  },
  {
    company: "CashPlus",
    logo: "data:image/jpeg;base64,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",
    role: "Software Engineer",
    period: "Jul 2020 - Apr 2021",
    duration: "10 mo",
    location: "Bengaluru, India",
    type: "Full-Time",
    status: "past",
    verified: true,
  },
  {
    company: "Emsi",
    logo: "data:image/jpeg;base64,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",
    role: "Software Engineering Intern",
    period: "Dec 2019 - Jun 2020",
    duration: "7 mo",
    location: "Bengaluru, India",
    type: "Internship",
    status: "past",
    verified: false,
  },
];

const educationData = [
  {
    degree: "Master of Computer Science",
    school: "Stanford University",
    location: "Stanford, CA",
    period: "2022 - 2024",
    gpa: "3.9/4.0",
    description: "Specialization in Artificial Intelligence and Machine Learning",
    achievements: [
      "Teaching Assistant for Data Structures & Algorithms",
      "Published research on Deep Learning optimization",
      "Dean's Honor List - All Semesters"
    ]
  },
  {
    degree: "Bachelor of Engineering in Computer Science",
    school: "University of California, Berkeley",
    location: "Berkeley, CA",
    period: "2018 - 2022",
    gpa: "3.8/4.0",
    description: "Focus on Software Engineering and Systems Design",
    achievements: [
      "Graduated Summa Cum Laude",
      "Senior Thesis: Deep Learning for Computer Vision",
      "President of Computer Science Student Association"
    ]
  }
];

const certifications = [
  {
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "January 2024",
    credentialId: "AWS-SAA-2024-001",
    skills: ["Cloud Architecture", "AWS", "DevOps"],
    icon: "☁️",
    color: "#FF9900"
  },
  {
    title: "Google Cloud Professional Data Engineer",
    issuer: "Google Cloud",
    date: "November 2023",
    credentialId: "GCP-PDE-2023-789",
    skills: ["Data Engineering", "BigQuery", "ML"],
    icon: "📊",
    color: "#4285F4"
  },
  {
    title: "Certified Kubernetes Administrator",
    issuer: "Cloud Native Computing Foundation",
    date: "September 2023",
    credentialId: "CKA-2023-456",
    skills: ["Kubernetes", "Container Orchestration", "Docker"],
    icon: "⚓",
    color: "#326CE5"
  },
  {
    title: "Meta Front-End Developer Professional",
    issuer: "Meta (Facebook)",
    date: "July 2023",
    credentialId: "META-FED-2023-321",
    skills: ["React", "JavaScript", "UI/UX"],
    icon: "⚛️",
    color: "#61DAFB"
  },
  {
    title: "Machine Learning Specialization",
    issuer: "Stanford University & DeepLearning.AI",
    date: "March 2023",
    credentialId: "STANFORD-ML-2023-654",
    skills: ["Machine Learning", "Python", "TensorFlow"],
    icon: "🤖",
    color: "#FF6F00"
  },
  {
    title: "MongoDB Certified Developer",
    issuer: "MongoDB University",
    date: "January 2023",
    credentialId: "MONGO-DEV-2023-987",
    skills: ["MongoDB", "NoSQL", "Database Design"],
    icon: "🍃",
    color: "#00ED64"
  }
];

  return (
    <div className="home">
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
            I'm a <span className="typewriter">{text}</span>
          </motion.p>
        </div>

        <div className="hero-right" style={{ flex: 1, marginTop: '3.5rem', position: 'relative' }}>
          <button onClick={handlePrev} className="scroll-btn left">
            <ChevronLeft />
          </button>
          <button onClick={handleNext} className="scroll-btn right">
            <ChevronRight />
          </button>

          <AnimatePresence mode="wait" initial={false}>
            {renderDemoWebsite(websiteDemos[currentDemoIndex])}
          </AnimatePresence>
        </div>  
      </div>

      {/* <div className="carousel-section">
        <ProjectCarousel 
          projects={filteredProjects} 
          category={activeCategory}
        />
      </div> */}

      <div style={{ background: 'radial-gradient(circle at top, #141726, #0b0d10 70%)' }}>

        {/* EXPERIENCE 
        {/* <section className="section" id="experience">
          <h2 className="section-title">Experience</h2>
          
          <div className="linkedin-experience-container">
            {experiences.map((exp, i) => (
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

        {/* EDUCATION - Improved Timeline 
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
                
                <div className="education-card">
                  <div className="education-card-header">
                    <div>
                      <h3 className="education-degree">{edu.degree}</h3>
                      <p className="education-school">{edu.school}</p>
                    </div>
                    <span className="education-period">{edu.period}</span>
                  </div>
                  
                  <div className="education-card-body">
                    <div className="education-meta">
                      <span className="education-location">📍 {edu.location}</span>
                      <span className="education-gpa">🎓 GPA: {edu.gpa}</span>
                    </div>
                    
                    <p className="education-description">{edu.description}</p>
                    
                    <div className="education-achievements">
                      <h4>Achievements</h4>
                      <ul>
                        {edu.achievements.map((achievement, idx) => (
                          <li key={idx}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CERTIFICATIONS 
        <section id="certifications" className="section">
          <h2 className="section-title">Certifications & Courses</h2>
          
          <div className="certifications-grid">
            {certifications.map((cert, i) => (
              <motion.div
                key={i}
                className="certification-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <div className="cert-icon" style={{ background: cert.color }}>
                  <span>{cert.icon}</span>
                </div>
                
                <div className="cert-content">
                  <h3 className="cert-title">{cert.title}</h3>
                  <p className="cert-issuer">
                    <Award size={14} />
                    {cert.issuer}
                  </p>
                  <p className="cert-date">
                    <Calendar size={14} />
                    {cert.date}
                  </p>
                  
                  <div className="cert-skills">
                    {cert.skills.map((skill, idx) => (
                      <span key={idx} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                  
                  <div className="cert-footer">
                    <span className="cert-id">ID: {cert.credentialId}</span>
                    <ExternalLink size={16} className="cert-link-icon" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section> */}
      </div>

      <footer className="footer">
        <p>© 2026 BOSSONY Khadija</p>
      </footer>

      {/* <DemoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        demo={selectedDemo}
      /> */}
    </div>
  );
};

export default Home;