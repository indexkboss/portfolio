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

import emailjs from "@emailjs/browser";
import "./Contact.css";
import Navbar from "../components/Navbar";

const Contact = () => {
  const formRef = useRef();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [debugInfo, setDebugInfo] = useState("");

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
     TEST CONNECTION HELPER
  ====================== */
  const testConnection = async () => {
    try {
      // Try to ping EmailJS
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch('https://api.emailjs.com/api/v1.0/test', { 
        method: 'HEAD',
        mode: 'no-cors',
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      return { success: true, message: "EmailJS is reachable" };
    } catch (error) {
      if (error.name === 'AbortError') {
        return { success: false, message: "Connection timeout - network may be slow" };
      }
      return { success: false, message: "Connection blocked - possible ad blocker or firewall" };
    }
  };

  /* ======================
     CHECK BROWSER INFO
  ====================== */
  const getBrowserInfo = () => {
    const ua = navigator.userAgent;
    let browser = "Unknown";
    
    if (ua.indexOf("Chrome") > -1) browser = "Chrome";
    if (ua.indexOf("Firefox") > -1) browser = "Firefox";
    if (ua.indexOf("Safari") > -1) browser = "Safari";
    if (ua.indexOf("Edg") > -1) browser = "Edge";
    if (ua.indexOf("Brave") > -1) browser = "Brave";
    
    return browser;
  };

  /* ======================
     FORM SUBMIT
  ====================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitStatus(null);
    setErrorMessage("");
    setDebugInfo("");

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
      setErrorMessage(
        "Message must contain at least 10 characters."
      );
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);

    try {
      // First, test connection for debugging
      const connectionTest = await testConnection();
      
      // Check online status
      if (!navigator.onLine) {
        throw new Error("offline");
      }

      // Check for common blockers
      const browser = getBrowserInfo();
      if (browser === "Brave") {
        console.log("Brave browser detected - may need to disable shields");
      }

      const result = await emailjs.sendForm(
        import.meta.env.VITE_serviceId,
        import.meta.env.VITE_templateId,
        formRef.current,
        import.meta.env.VITE_publicKey
      );

      console.log("Email sent successfully:", result);

      setSubmitStatus("success");

      setFormData({
        name: "",
        email: "",
        message: "",
      });
      
      setDebugInfo(""); // Clear any debug info on success
      
    } catch (error) {
      console.error("EmailJS ERROR - Full details:", error);
      console.error("Error type:", error.name);
      console.error("Error message:", error.message);
      console.error("Error status:", error.status);
      console.error("Error text:", error.text);

      let message = "Something went wrong while sending your message.";
      let suggestions = "";

      /* ===== ENHANCED ERROR DETECTION ===== */

      // Check for ad blockers / privacy extensions (most likely for single user)
      if (error.message === "Failed to fetch" || 
          error.name === "TypeError" ||
          error.message?.includes("NetworkError") ||
          error.message?.includes("Network request failed")) {
        
        message = "📵 Request blocked by your browser or extensions.";
        suggestions = `
          Please try these solutions:
          • Disable ad blockers (uBlock, AdBlock, etc.)
          • Disable Brave Shields if using Brave browser
          • Turn off VPN or proxy temporarily
          • Try Chrome or Edge browser
          • Disable tracking protection (in Safari/Firefox)
          • Add exception for emailjs.com in your extensions
        `;
      }
      
      // Check for network connectivity
      else if (!navigator.onLine) {
        message = "📶 No internet connection detected.";
        suggestions = "Please check your WiFi or mobile data and try again.";
      }
      
      // Check for CORS issues
      else if (error.message?.includes("CORS")) {
        message = "🌐 CORS policy blocked the request.";
        suggestions = "This is usually caused by extensions. Try incognito mode or a different browser.";
      }
      
      // Check for rate limiting
      else if (error?.status === 429) {
        message = "⏳ Too many requests.";
        suggestions = "Please wait a moment before trying again.";
      }
      
      // Check for service configuration issues
      else if (error?.text?.includes("Invalid service") || 
               error?.text?.includes("Invalid template") ||
               error?.text?.includes("Public Key")) {
        message = "⚙️ Service configuration error.";
        suggestions = "Please contact the website owner.";
      }
      
      // Generic error with text
      else if (error?.text) {
        message = `Server response: ${error.text}`;
        try {
          const errorData = JSON.parse(error.text);
          if (errorData.error) {
            message = errorData.error;
          }
        } catch {
          // Not JSON, use as is
        }
      }

      // Add browser and connection info for debugging
      const browserInfo = getBrowserInfo();
      const connectionType = navigator.connection?.effectiveType || "unknown";
      const debugDetails = `
        Browser: ${browserInfo}
        Online: ${navigator.onLine ? "Yes" : "No"}
        Connection: ${connectionType}
        Error Type: ${error.name || "N/A"}
        Status: ${error.status || "N/A"}
      `;

      setErrorMessage(message);
      setDebugInfo(suggestions || debugDetails);
      setSubmitStatus("error");
      
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ======================
     AUTO HIDE ALERT
  ====================== */
  useEffect(() => {
    if (submitStatus) {
      const timer = setTimeout(() => {
        setSubmitStatus(null);
        setDebugInfo(""); // Clear debug info when hiding alert
      }, 8000); // Extended to 8 seconds to show suggestions

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
      onClick: () =>
        (window.location.href = "tel:+212679101440"),
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

          {/* Quick troubleshooting guide for users */}
          <div className="troubleshoot-tip">
            <small>
              ⚡ Having trouble? Try:
              <br />
              • Disable ad blocker
              <br />
              • Use Chrome/Edge
              <br />
              • Turn off VPN
            </small>
          </div>
        </div>

        {/* FORM */}
        <div className="split-card-right">
          <h3>Send a Message</h3>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="split-form"
          >
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

            {/* hidden time */}
            <input
              type="hidden"
              name="time"
              value={new Date().toLocaleString()}
            />

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="split-submit-btn"
            >
              {isSubmitting
                ? "Sending..."
                : "Send Message"}
              <Send size={16} />
            </motion.button>

            {/* SUCCESS */}
            {submitStatus === "success" && (
              <div className="success-message-split">
                <MessageCircle size={18} />
                <span>
                  Message sent successfully! I'll get back to you soon. ✅
                </span>
              </div>
            )}

            {/* ERROR - Enhanced with suggestions */}
            {submitStatus === "error" && (
              <div className="error-message-split">
                <MessageCircle size={18} />
                <div className="error-content">
                  <strong>{errorMessage}</strong>
                  {debugInfo && (
                    <div className="error-suggestions">
                      <small>{debugInfo}</small>
                    </div>
                  )}
                  <button 
                    className="retry-btn"
                    onClick={() => setSubmitStatus(null)}
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer-main">
        <div className="footer-bottom">
          © 2026 BOSSONY Khadija — Built with{" "}
          <Heart size={12} /> <Code2 size={12} />

          <a href="/CVPortfolio.pdf" download>
            Download CV <ExternalLink size={12} />
          </a>
        </div>

        <button
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
        >
          <ArrowUp size={16} />
        </button>
      </footer>
    </div>
  );
};

export default Contact;