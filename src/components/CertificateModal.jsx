import { motion, AnimatePresence } from 'framer-motion';
import { Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import './CertificateModal.css';

const CertificateModal = ({ isOpen, onClose, certificate, allCertificates = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Find the index of the current certificate in allCertificates array
  useEffect(() => {
    if (certificate && allCertificates.length > 0) {
      const index = allCertificates.findIndex(
        (cert) => cert.title === certificate.title
      );
      if (index !== -1) {
        setCurrentIndex(index);
      }
    }
  }, [certificate, allCertificates]);

  if (!certificate) return null;

  // Map certificate titles to their image paths - using the exact titles from your data
  const getCertificateImage = (title) => {
    const imageMap = {
      'Introduction à la programmation orientée objet (en C++)': '/CourseraC++.png',
      'Successful Negotiation: Essential Strategies and Skills': '/CourseraEN.png',
      'Interactivity with JavaScript': '/CourseraJS.png',
      'Software Engineering: Software Design and Project Management': '/CourseraProjectManagement.png',
      'Using Python to Access Web Data': '/CourseraPythonWeb.png'
    };
    
    return imageMap[title] || null;
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + allCertificates.length) % allCertificates.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % allCertificates.length);
  };

  const handleDownload = () => {
    const imageUrl = getCertificateImage(certificate.title);
    if (imageUrl) {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = `${certificate.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Get the current certificate from allCertificates array based on index
  const currentCertificate = allCertificates[currentIndex] || certificate;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="cert-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div 
            className="cert-modal-content"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="cert-modal-close" onClick={onClose}>×</button>
            
            <div className="cert-modal-body">
              <h2>{currentCertificate.title}</h2>
              <p className="cert-issuer-text">
                {currentCertificate.issuer} • {currentCertificate.date}
              </p>
              
              <div className="cert-image-container">
                {getCertificateImage(currentCertificate.title) ? (
                  <img 
                    src={getCertificateImage(currentCertificate.title)} 
                    alt={currentCertificate.title}
                    className="cert-image"
                  />
                ) : (
                  <div 
                    className="cert-placeholder" 
                    style={{ backgroundColor: currentCertificate.color || '#0047AB' }}
                  >
                    <span className="placeholder-icon">{currentCertificate.icon || '📜'}</span>
                    <p>Certificate Preview</p>
                    <p className="placeholder-sub">{currentCertificate.issuer}</p>
                    <p className="placeholder-date">{currentCertificate.date}</p>
                  </div>
                )}
              </div>

              <div className="cert-skills">
                {currentCertificate.skills?.map((skill, idx) => (
                  <span key={idx} className="skill-tag">{skill}</span>
                ))}
              </div>

              <div className="cert-footer-actions">
                <a 
                  href={currentCertificate.verifyUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  // className="cert-verify-link"
                  className="cert-download-btn"
                  style={{marginRight:'55px', textDecoration:'none'}}
                >
                  Verify Certificate
                </a>
                <button 
                  onClick={handleDownload}
                  className="cert-download-btn"
                >
                  <Download size={18} />
                  Download
                </button>
              </div>

              {/* Navigation arrows if multiple certificates */}
              {allCertificates.length > 1 && (
                <div className="cert-navigation">
                  <button onClick={handlePrevious} className="cert-nav-btn">
                    <ChevronLeft size={24} />
                  </button>
                  <span className="cert-nav-counter">
                    {currentIndex + 1} / {allCertificates.length}
                  </span>
                  <button onClick={handleNext} className="cert-nav-btn">
                    <ChevronRight size={24} />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CertificateModal;