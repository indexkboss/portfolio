import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, Instagram, MessageCircle, Sparkles } from 'lucide-react';
import emailjs from '@emailjs/browser';
import './Contact.css';
import Navbar from '../components/Navbar';
import { ChevronLeft, ChevronRight, CheckCircle, Star, Sun, Moon, Award, Calendar, ExternalLink } from 'lucide-react';
import {  ArrowUp, Code2, Heart } from 'lucide-react';

const Contact = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Toggle dark/light mode


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const result = await emailjs.sendForm(
        import.meta.env.VITE_serviceId,
        import.meta.env.VITE_templateId,
        formRef.current,
        import.meta.env.VITE_publicKey
      );
      
      console.log('Email sent successfully:', result);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
    } catch (error) {
      console.error('Failed to send email:', error);
      setSubmitStatus('error');
      
    } finally {
      setIsSubmitting(false);
    }
  };

  // Contact Icons for left side
  const contactIcons = [
    { icon: <Github size={22} />, label: 'GitHub', url: 'https://github.com/indexkboss', color: '#333' },
    { icon: <Linkedin size={22} />, label: 'LinkedIn', url: 'https://www.linkedin.com/in/khadijabossony', color: '#0077B5' },
    { icon: <Mail size={22} />, label: 'Email', url: 'mailto:bossonykhadijae@gmail.com', color: '#FF006E' },
    { icon: <Phone size={22} />, label: 'Phone',  onClick: () => window.location.href = 'tel:+212679101440', color: '#8338EC' },
  ];

  return (
    <div className="contact-page-new">
      {/* Navbar */}
   <Navbar/>
      {/* Header Section */}
      <motion.div 
        className="contact-header-new"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>Get in Touch</h1>
        <p>Have a question? I'd love to hear from you!</p>
      </motion.div>

      {/* Split Card */}
      <motion.div 
        className="split-card-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="split-card">
          {/* Left Side - Icons */}
          <div className="split-card-left">
            <h3>Connect With Me</h3>
            <p>Find me on social media or reach out directly</p>
            
            <div className="icons-grid">
         
{contactIcons.map((item, index) => (
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
      <div className="icon-circle" data-type={item.label.toLowerCase()}>
        {item.icon}
      </div>
      <span className="icon-label">{item.label}</span>
    </motion.a>
  ) : (
    <motion.button
      key={index}
      onClick={item.onClick}
      className="icon-item"
      whileHover={{ y: -3, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="icon-circle" data-type={item.label.toLowerCase()}>
        {item.icon}
      </div>
      <span className="icon-label">{item.label}</span>
    </motion.button>
  )
))}


            </div>


          </div>

          {/* Right Side - Form */}
          <div className="split-card-right">
            <h3>Send a Message</h3>
            <p>I'll get back to you within 24 hours</p>

            <form ref={formRef} onSubmit={handleSubmit} className="split-form">
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

              <motion.button
                type="submit"
                className="split-submit-btn"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <span className="sending">Sending...</span>
                ) : (
                  <>
                    Send Message <Send size={16} />
                  </>
                )}
              </motion.button>

              {submitStatus === 'success' && (
                <motion.div 
                  className="success-message-split"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <MessageCircle size={18} />
                  <span className='span-message-succ'>Message sent successfully!</span>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div 
                  className="error-message-split"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <MessageCircle size={18} />
                  <span>Failed to send. Please try again.</span>
                </motion.div>
              )}
            </form>
          </div>
        </div>
      </motion.div>

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

export default Contact;