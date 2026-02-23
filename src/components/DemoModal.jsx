import { motion, AnimatePresence } from 'framer-motion';
import './DemoModal.css';

const DemoModal = ({ isOpen, onClose, demo }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          className="modal-content"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="modal-close" onClick={onClose}>×</button>
          <div className="modal-body">
            <h2>{demo.title} Demo</h2>
            <div className="demo-container">
              {/*here */}
              <p>Interactive demo for {demo.title} will be displayed here.</p>
              <p className="demo-description">{demo.description}</p>
              <div className="demo-placeholder">
                <span className="placeholder-icon">{demo.icon}</span>
                <p>Demo coming soon!</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DemoModal;