import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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

// Import Formspree hook
import { useForm } from "@formspree/react";
import "./Contact.css";
import Navbar from "../components/Navbar";

const Contact = () => {
  // Debug: Log to see if env variable is loading
  console.log("Env variable:", import.meta.env.VITE_FORMSPREE_ID);
  
  // Get Formspree ID from env
  const formspreeId = import.meta.env.VITE_FORMSPREE_ID;
  
  // Check if ID exists, otherwise use a fallback for testing
  const [state, handleSubmit] = useForm(formspreeId || "mzdaqoer");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [configError, setConfigError] = useState(false);

  // Check for configuration errors on mount
  useEffect(() => {
    if (!formspreeId) {
      console.error("Formspree ID is missing! Check your .env file.");
      console.log("Make sure you have: VITE_FORMSPREE_ID=your_id_here");
      setConfigError(true);
      setErrorMessage("Contact form configuration error. Please try again later.");
    } else {
      console.log("Formspree ID loaded successfully:", formspreeId);
    }
  }, []);

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

    try {
      await handleSubmit(e);
    } catch (error) {
      console.error("Submit error:", error);
      setErrorMessage("Failed to send message. Please try again.");
      setSubmitStatus("error");
    }
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

  // Show error state if configuration is missing
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
        <footer className="footer-main">
          <div className="footer-bottom">
            © 2026 BOSSONY Khadija — Built with <Heart size={12} /> <Code2 size={12} />
            <a href="/CVPortfolio.pdf" download>
              Download CV <ExternalLink size={12} />
            </a>
          </div>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <ArrowUp size={16} />
          </button>
        </footer>
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

            <input
              type="hidden"
              name="_replyto"
              value={formData.email}
            />
            
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

            {submitStatus === "success" && (
              <div className="success-message-split">
                <MessageCircle size={18} />
                <span>Message sent successfully! I'll get back to you soon. ✅</span>
              </div>
            )}

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