import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
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

// Import Formspree hook instead of emailjs
import { useForm } from "@formspree/react";
import "./Contact.css";
import Navbar from "../components/Navbar";

const Contact = () => {
  // Formspree hook - replace with your actual form ID
  const [state, handleSubmit] = useForm(import.meta.env.VITE_REACT_APP_FORMSPREE_ID);  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  /* ======================
     INPUT CHANGE
  ====================== */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* ======================
     FORM SUBMIT
  ====================== */
  const onSubmit = async (e) => {
    e.preventDefault();

    setSubmitStatus(null);
    setErrorMessage("");

    /* ---------- VALIDATION ---------- */
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

    // Let Formspree handle the submission
    await handleSubmit(e);
  };

  /* ======================
     HANDLE FORMSPREE STATE CHANGES
  ====================== */
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
      
      // Extract error messages from Formspree
      let message = "Something went wrong while sending your message.";
      
      if (state.errors.getFormErrors) {
        const formErrors = state.errors.getFormErrors();
        if (formErrors.length > 0) {
          message = formErrors[0].message;
        }
      }
      
      setErrorMessage(message);
      setSubmitStatus("error");
    }
  }, [state.succeeded, state.errors]);

  /* ======================
     AUTO HIDE ALERT
  ====================== */
  useEffect(() => {
    if (submitStatus) {
      const timer = setTimeout(() => {
        setSubmitStatus(null);
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  /* ======================
     CONTACT ICONS
  ====================== */
  const contactIcons = [
    {
      icon: <Github size={22} />,
      label: "GitHub",
      url: "https://github.com/indexkboss",
    },
    {
      icon: <Linkedin size={22} />,
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/khadijabossony",
    },
    {
      icon: <Mail size={22} />,
      label: "Email",
      url: "mailto:bossonykhadijae@gmail.com",
    },
    {
      icon: <Phone size={22} />,
      label: "Phone",
      onClick: () => (window.location.href = "tel:+212679101440"),
    },
  ];

  return (
    <div className="contact-page-new">
      <Navbar />

      {/* HEADER */}
      <motion.div
        className="contact-header-new"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>Get in Touch</h1>
        <p>Have a question? I'd love to hear from you!</p>
      </motion.div>

      {/* CARD */}
      <div className="split-card">
        {/* LEFT */}
        <div className="split-card-left">
          <h3>Connect With Me</h3>

          <div className="icons-grid">
            {contactIcons.map((item, index) =>
              item.url ? (
                <a
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-item"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              ) : (
                <button
                  key={index}
                  onClick={item.onClick}
                  className="icon-item"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              )
            )}
          </div>
          
          {/* Add a helpful tip for users */}
          <div className="troubleshoot-tip">
            <small>
              ⚡ Having trouble? Formspree works with ad blockers! 
              Just make sure JavaScript is enabled.
            </small>
          </div>
        </div>

        {/* FORM */}
        <div className="split-card-right">
          <h3>Send a Message</h3>

          <form onSubmit={onSubmit} className="split-form">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
            />

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="4"
              required
            />

            {/* Hidden field for better email replies [citation:4] */}
            <input
              type="hidden"
              name="_replyto"
              value={formData.email}
            />
            
            {/* Hidden field for custom subject [citation:4] */}
            <input
              type="hidden"
              name="_subject"
              value={`New message from ${formData.name}`}
            />

            <motion.button
              type="submit"
              disabled={state.submitting}
              className="split-submit-btn"
            >
              {state.submitting ? "Sending..." : "Send Message"}
              <Send size={16} />
            </motion.button>

            {/* SUCCESS */}
            {submitStatus === "success" && (
              <div className="success-message-split">
                <MessageCircle size={18} />
                <span>Message sent successfully! I'll get back to you soon. ✅</span>
              </div>
            )}

            {/* ERROR */}
            {submitStatus === "error" && (
              <div className="error-message-split">
                <MessageCircle size={18} />
                <span>{errorMessage}</span>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer-main">
        <div className="footer-bottom">
          © 2026 BOSSONY Khadija — Built with <Heart size={12} /> <Code2 size={12} />
          <a href="/CVPortfolio.pdf" download>
            Download CV <ExternalLink size={12} />
          </a>
        </div>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ArrowUp size={16} />
        </button>
      </footer>
    </div>
  );
};

export default Contact;