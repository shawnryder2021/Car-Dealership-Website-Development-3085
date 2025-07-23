import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiPhone, FiMail, FiMessageSquare, FiX } = FiIcons;

const StickyContactBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-0 left-0 right-0 bg-primary-600 text-white shadow-lg z-40"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <p className="font-semibold text-sm md:text-base">
              Ready to find your perfect car in Halifax?
            </p>
            <div className="hidden md:flex items-center space-x-4">
              <a
                href="tel:+19025554567"
                className="flex items-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1 rounded-lg transition-colors"
              >
                <SafeIcon icon={FiPhone} className="w-4 h-4" />
                <span className="text-sm">Call Now</span>
              </a>
              <a
                href="mailto:info@premierautohalifax.ca"
                className="flex items-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1 rounded-lg transition-colors"
              >
                <SafeIcon icon={FiMail} className="w-4 h-4" />
                <span className="text-sm">Email Us</span>
              </a>
              <button className="flex items-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1 rounded-lg transition-colors">
                <SafeIcon icon={FiMessageSquare} className="w-4 h-4" />
                <span className="text-sm">Live Chat</span>
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="md:hidden flex space-x-2">
              <a
                href="tel:+19025554567"
                className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-lg transition-colors"
              >
                <SafeIcon icon={FiPhone} className="w-4 h-4" />
              </a>
              <a
                href="mailto:info@premierautohalifax.ca"
                className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-lg transition-colors"
              >
                <SafeIcon icon={FiMail} className="w-4 h-4" />
              </a>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 p-1 rounded transition-colors"
            >
              <SafeIcon icon={FiX} className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StickyContactBar;