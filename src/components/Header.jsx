import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiMenu, FiX, FiPhone, FiMail, FiMapPin, FiClock, FiSettings, FiZap, FiChevronDown } = FiIcons;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mainNavigation = [
    { name: 'Home', href: '/' },
    { name: 'Inventory', href: '/inventory' },
    { name: 'AI Tools', href: '/ai-tools', icon: FiZap },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const servicesDropdown = [
    { name: 'Financing', href: '/financing' },
    { name: 'Service', href: '/service' },
    { name: 'Trade-In', href: '/trade-in' },
  ];

  const mobileNavigation = [
    { name: 'Home', href: '/' },
    { name: 'Inventory', href: '/inventory' },
    { name: 'Financing', href: '/financing' },
    { name: 'Service', href: '/service' },
    { name: 'Trade-In', href: '/trade-in' },
    { name: 'AI Tools', href: '/ai-tools', icon: FiZap },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      {/* Top Bar - Simplified */}
      <div className="bg-primary-800 text-white py-2 hidden lg:block">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiPhone} className="w-4 h-4" />
                <span>(902) 555-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiMapPin} className="w-4 h-4" />
                <span>123 Robie Street, Halifax, NS</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiClock} className="w-4 h-4" />
                <span>Mon-Fri: 9AM-7PM</span>
              </div>
              {/* Admin Link */}
              <Link
                to="/admin"
                className="flex items-center space-x-1 text-primary-200 hover:text-white transition-colors"
                title="Admin Access"
              >
                <SafeIcon icon={FiSettings} className="w-4 h-4" />
                <span className="text-xs">Admin</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-lg' : 'bg-white'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">PA</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Premier Auto Halifax</h1>
                <p className="text-xs text-gray-600 hidden sm:block">Your Trusted Nova Scotia Dealer</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              {mainNavigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-gray-700 hover:text-primary-600 font-medium transition-colors px-2 py-1 ${
                    location.pathname === item.href ? 'text-primary-600' : ''
                  }`}
                >
                  {item.icon ? (
                    <span className="flex items-center">
                      <SafeIcon icon={item.icon} className="w-4 h-4 mr-1" />
                      {item.name}
                    </span>
                  ) : (
                    item.name
                  )}
                </Link>
              ))}

              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setShowServicesDropdown(true)}
                onMouseLeave={() => setShowServicesDropdown(false)}
              >
                <button className="flex items-center text-gray-700 hover:text-primary-600 font-medium transition-colors px-2 py-1">
                  Services <SafeIcon icon={FiChevronDown} className="w-4 h-4 ml-1" />
                </button>
                {showServicesDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2"
                  >
                    {servicesDropdown.map((service) => (
                      <Link
                        key={service.name}
                        to={service.href}
                        className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                      >
                        {service.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>
            </nav>

            {/* CTA Buttons - Simplified */}
            <div className="hidden lg:flex items-center space-x-3">
              <Link
                to="/inventory"
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm"
              >
                Browse Cars
              </Link>
              <Link
                to="/contact"
                className="border border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm"
              >
                Test Drive
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="lg:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <SafeIcon icon={isMenuOpen ? FiX : FiMenu} className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden bg-white border-t border-gray-200"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                {mobileNavigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`text-gray-700 hover:text-primary-600 font-medium transition-colors ${
                      location.pathname === item.href ? 'text-primary-600' : ''
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.icon ? (
                      <span className="flex items-center">
                        <SafeIcon icon={item.icon} className="w-4 h-4 mr-1" />
                        {item.name}
                      </span>
                    ) : (
                      item.name
                    )}
                  </Link>
                ))}
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                  <Link
                    to="/inventory"
                    className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Browse Cars
                  </Link>
                  <Link
                    to="/contact"
                    className="border border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white px-4 py-2 rounded-lg font-semibold transition-colors text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Test Drive
                  </Link>

                  {/* Mobile Contact Info */}
                  <div className="pt-4 border-t border-gray-200 space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiPhone} className="w-4 h-4" />
                      <span>(902) 555-4567</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiMapPin} className="w-4 h-4" />
                      <span>123 Robie Street, Halifax, NS</span>
                    </div>
                  </div>

                  {/* Mobile Admin Link */}
                  <Link
                    to="/admin"
                    className="flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <SafeIcon icon={FiSettings} className="w-4 h-4" />
                    <span>Admin Access</span>
                  </Link>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </header>
    </>
  );
};

export default Header;