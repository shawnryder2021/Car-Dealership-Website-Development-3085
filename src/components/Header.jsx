import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiMenu, FiX, FiPhone, FiMail, FiMapPin, FiClock, FiSettings, FiZap, FiChevronDown, FiChevronUp, FiTool, FiDollarSign, FiRepeat, FiHome, FiSearch, FiInfo, FiMessageSquare } = FiIcons;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
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
    { name: 'Home', href: '/', icon: FiHome },
    { name: 'Inventory', href: '/inventory', icon: FiSearch },
    {
      name: 'Services',
      icon: FiTool,
      subItems: [
        { name: 'Financing', href: '/financing', icon: FiDollarSign },
        { name: 'Service & Parts', href: '/service', icon: FiTool },
        { name: 'Trade-In', href: '/trade-in', icon: FiRepeat },
      ],
    },
    { name: 'AI Tools', href: '/ai-tools', icon: FiZap },
    { name: 'About', href: '/about', icon: FiInfo },
    { name: 'Contact', href: '/contact', icon: FiMessageSquare },
  ];

  const renderMobileNav = () => {
    const handleNavigation = (item) => {
      if (!item.subItems) {
        setIsMenuOpen(false);
      }
    };

    return mobileNavigation.map((item) => {
      if (item.subItems) {
        return (
          <div key={item.name}>
            <button
              onClick={() => setIsServicesOpen(!isServicesOpen)}
              className="w-full flex justify-between items-center text-gray-700 hover:text-primary-600 font-medium p-2 rounded-lg transition-colors"
            >
              <span className="flex items-center">
                <SafeIcon icon={item.icon} className="w-5 h-5 mr-3" />
                {item.name}
              </span>
              <SafeIcon icon={isServicesOpen ? FiChevronUp : FiChevronDown} className="w-5 h-5" />
            </button>
            {isServicesOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="pl-6 mt-2 space-y-2"
              >
                {item.subItems.map((subItem) => (
                  <Link
                    key={subItem.name}
                    to={subItem.href}
                    className={`flex items-center space-x-3 text-gray-600 hover:text-primary-600 p-2 rounded-lg transition-colors ${
                      location.pathname === subItem.href ? 'text-primary-600 bg-primary-50' : ''
                    }`}
                    onClick={() => handleNavigation(subItem)}
                  >
                    <SafeIcon icon={subItem.icon} className="w-5 h-5" />
                    <span>{subItem.name}</span>
                  </Link>
                ))}
              </motion.div>
            )}
          </div>
        );
      }

      return (
        <Link
          key={item.name}
          to={item.href}
          className={`flex items-center text-gray-700 hover:text-primary-600 font-medium p-2 rounded-lg transition-colors ${
            location.pathname === item.href ? 'text-primary-600 bg-primary-50' : ''
          }`}
          onClick={() => handleNavigation(item)}
        >
          <SafeIcon icon={item.icon} className="w-5 h-5 mr-3" />
          {item.name}
        </Link>
      );
    });
  };

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
                {renderMobileNav()}
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
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