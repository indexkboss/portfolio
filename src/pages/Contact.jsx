import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Phone,
  Send,
  Github,
  Linkedin,
  MessageCircle,
  ArrowUp,
  Code2,
  Heart,
  ExternalLink,
} from "lucide-react";

import { useForm } from "@formspree/react";
import "./Contact.css";
import Navbar from "../components/Navbar";

const Contact = () => {
  const navigate = useNavigate();
  
  console.log("Env variable:", import.meta.env.VITE_FORMSPREE_ID);
  const formspreeId = import.meta.env.VITE_FORMSPREE_ID;
  const [state, handleSubmit] = useForm(formspreeId || "mzdaqoer");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [configError, setConfigError] = useState(false);


  useEffect(() => {
    if (!formspreeId) {
      console.error("Formspree ID is missing! Check your .env file.");
      setConfigError(true);
      setErrorMessage("Contact form configuration error. Please try again later.");
    } else {
      console.log("Formspree ID loaded successfully:", formspreeId);
    }
  }, []);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    setSubmitStatus(null);
    setErrorMessage("");

    if (!formData.name.trim()) {
      setErrorMessage("Please enter your name.");
      setSubmitStatus("error");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setErrorMessage("Please enter a valid email address.");
      setSubmitStatus("error");
      return;
    }

    if (formData.message.trim().length < 10) {
      setErrorMessage("Message must contain at least 10 characters.");
      setSubmitStatus("error");
      return;
    }

    try {
      await handleSubmit(e);
    } catch (error) {
      console.error("Submit error:", error);
      setErrorMessage("Failed to send message. Please try again.");
      setSubmitStatus("error");
    }
  };

  useEffect(() => {
    if (state.succeeded) {
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    }
    
    if (state.errors) {
      console.error("Formspree errors:", state.errors);
      
      let message = "Something went wrong while sending your message.";
      
      if (state.errors.response?.data?.error) {
        message = state.errors.response.data.error;
      } else if (state.errors.getFormErrors) {
        const formErrors = state.errors.getFormErrors();
        if (formErrors.length > 0) {
          message = formErrors[0].message;
        }
      }
      
      setErrorMessage(message);
      setSubmitStatus("error");
    }
  }, [state.succeeded, state.errors]);

  useEffect(() => {
    if (submitStatus) {
      const timer = setTimeout(() => {
        setSubmitStatus(null);
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const scrollToSection = (sectionId) => {
    if (window.location.pathname !== '/') {
      navigate("/", { state: { sectionId } });
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const contactIcons = [
    {
      icon: <Github size={22} />,
      label: "GitHub",
      url: "https://github.com/indexkboss",
      color: "#333",
    },
    {
      icon: <Linkedin size={22} />,
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/khadijabossony",
      color: "#0077B5",
    },
    {
      icon: <Mail size={22} />,
      label: "Email",
      url: "mailto:bossonykhadijae@gmail.com",
      color: "#FF006E",
    },
    {
      icon: <Phone size={22} />,
      label: "Phone",
      onClick: () => (window.location.href = "tel:+212679101440"),
      color: "#8338EC",
    },
  ];

  if (configError) {
    return (
      <div className="contact-page-new">
        <Navbar />
        <div style={{ 
          textAlign: 'center', 
          padding: '50px 20px',
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <h2 style={{ color: '#ff6b6b', marginBottom: '20px' }}>
            Contact Form Temporarily Unavailable
          </h2>
          <p style={{ marginBottom: '30px', fontSize: '1.1rem' }}>
            Please email me directly at:
          </p>
          <a 
            href="mailto:bossonykhadijae@gmail.com"
            style={{
              display: 'inline-block',
              padding: '12px 30px',
              background: '#007bff',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '25px',
              fontSize: '1.1rem',
              transition: 'all 0.3s ease'
            }}
          >
            bossonykhadijae@gmail.com
          </a>
        </div>
        <Footer scrollToSection={scrollToSection} />
      </div>
    );
  }

  return (
    <div className="contact-page-new">
      <Navbar />

      {/* HEADER */}
      <motion.div
        className="contact-header-new"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>Get in Touch</h1>
        <p>Have a question? I'd love to hear from you!</p>
      </motion.div>

      {/* SPLIT CARD */}
      <motion.div
        className="split-card-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="split-card">
          {/* LEFT SIDE - CONNECT */}
          <div className="split-card-left">
            <h3>Connect With Me</h3>
            <p>Find me on social media or reach out directly</p>

            <div className="icons-grid">
              {contactIcons.map((item, index) =>
                item.url ? (
                  <motion.a
                    key={index}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="icon-item"
                    whileHover={{ y: -3, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div
                      className="icon-circle"
                      data-type={item.label.toLowerCase()}
                    >
                      {item.icon}
                    </div>
                    <span className="icon-label">
                      {item.label}
                    </span>
                  </motion.a>
                ) : (
                  <motion.button
                    key={index}
                    onClick={item.onClick}
                    className="icon-item"
                    whileHover={{ y: -3, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div
                      className="icon-circle"
                      data-type={item.label.toLowerCase()}
                    >
                      {item.icon}
                    </div>
                    <span className="icon-label">
                      {item.label}
                    </span>
                  </motion.button>
                )
              )}
            </div>

          </div>

          {/* RIGHT SIDE - FORM */}
          <div className="split-card-right">
            <h3>Send a Message</h3>
            <p>I'll get back to you within 24 hours</p>

            <form onSubmit={onSubmit} className="split-form">
              <div className="split-form-group">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder=" "
                />
                <label htmlFor="name">Your Name</label>
              </div>

              <div className="split-form-group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder=" "
                />
                <label htmlFor="email">Email Address</label>
              </div>

              <div className="split-form-group">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder=" "
                  rows="3"
                />
                <label htmlFor="message">Your Message</label>
              </div>

              {/* Hidden fields for Formspree */}
              <input type="hidden" name="_replyto" value={formData.email} />
              <input type="hidden" name="_subject" value={`New message from ${formData.name}`} />

              <motion.button
                type="submit"
                className="split-submit-btn"
                disabled={state.submitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {state.submitting ? (
                  <span className="sending">Sending...</span>
                ) : (
                  <>
                    Send Message <Send size={16} />
                  </>
                )}
              </motion.button>

              {submitStatus === "success" && (
                <motion.div
                  className="success-message-split"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <MessageCircle size={18} />
                  <span className="span-message-succ">
                    Message sent successfully! I'll get back to you soon. ✅
                  </span>
                </motion.div>
              )}

              {submitStatus === "error" && (
                <motion.div
                  className="error-message-split"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <MessageCircle size={18} />
                  <span>{errorMessage}</span>
                </motion.div>
              )}
            </form>
          </div>
        </div>
      </motion.div>

      {/* FOOTER */}
      <Footer scrollToSection={scrollToSection} />
    </div>
  );
};

const Footer = ({ scrollToSection }) => (
  <footer className="footer-main">
    <div className="footer-gradient-line" />

    <div className="footer-inner">
      <motion.div
        className="footer-brand"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="footer-logo">BK</span>
        <div>
          <p className="footer-name">BOSSONY Khadija</p>
          <p className="footer-tagline">AI & Big Data Engineering</p>
        </div>
      </motion.div>

      <motion.nav
        className="footer-nav"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <a onClick={() => scrollToSection('experience')} className="footer-nav-link" style={{ cursor: 'pointer' }}>
          Experience
        </a>
        <a onClick={() => scrollToSection('education')} className="footer-nav-link" style={{ cursor: 'pointer' }}>
          Education
        </a>
        <a onClick={() => scrollToSection('skills')} className="footer-nav-link" style={{ cursor: 'pointer' }}>
          Skills
        </a>
        <a onClick={() => scrollToSection('certifications')} className="footer-nav-link" style={{ cursor: 'pointer' }}>
          Certifications
        </a>
        <Link to="/Contact" className="footer-nav-link">
          Contact
        </Link>
      </motion.nav>

      <motion.div
        className="footer-right"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="footer-socials">
          <a href="https://github.com/indexkboss" target="_blank" rel="noopener noreferrer" className="footer-social-btn">
            <Github size={18} />
          </a>
          <a href="https://linkedin.com/in/khadijabossony" target="_blank" rel="noopener noreferrer" className="footer-social-btn">
            <Linkedin size={18} />
          </a>
          <a href="mailto:bossonykhadijae@gmail.com" className="footer-social-btn">
            <Mail size={18} />
          </a>
        </div>

        <button
          className="footer-top-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ArrowUp size={16} />
        </button>
      </motion.div>
    </div>

    <div className="footer-bottom">
      <span className="footer-copy">
        © 2026 BOSSONY Khadija — Built with <Heart size={12} className="footer-heart" /> and{" "}
        <Code2 size={12} className="footer-code" />
      </span>
      <a href="/CVPortfolio.pdf" download className="footer-cv-link">
        Download CV <ExternalLink size={12} />
      </a>
    </div>
  </footer>
);

export default Contact;
