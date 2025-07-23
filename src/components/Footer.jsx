import React from 'react';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiPhone, FiMail, FiMapPin, FiClock, FiFacebook, FiTwitter, FiInstagram, FiLinkedin } = FiIcons;

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">PA</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Premier Auto Halifax</h3>
                <p className="text-sm text-gray-400">Your Trusted Nova Scotia Dealer</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Halifax's premier destination for quality new and used vehicles. We're committed to 
              providing exceptional service and helping Maritimers find their perfect car.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <SafeIcon icon={FiFacebook} className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <SafeIcon icon={FiTwitter} className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <SafeIcon icon={FiInstagram} className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <SafeIcon icon={FiLinkedin} className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/inventory" className="text-gray-400 hover:text-white transition-colors">Inventory</Link></li>
              <li><Link to="/financing" className="text-gray-400 hover:text-white transition-colors">Financing</Link></li>
              <li><Link to="/service" className="text-gray-400 hover:text-white transition-colors">Service</Link></li>
              <li><Link to="/trade-in" className="text-gray-400 hover:text-white transition-colors">Trade-In</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">New Car Sales</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Used Car Sales</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Auto Financing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Vehicle Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Parts & Accessories</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Trade-In Appraisal</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Extended Warranties</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <SafeIcon icon={FiMapPin} className="w-5 h-5 text-primary-500 mt-0.5" />
                <div>
                  <p className="text-gray-400">123 Robie Street</p>
                  <p className="text-gray-400">Halifax, NS B3H 3C2</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiPhone} className="w-5 h-5 text-primary-500" />
                <p className="text-gray-400">(902) 555-4567</p>
              </div>
              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiMail} className="w-5 h-5 text-primary-500" />
                <p className="text-gray-400">info@premierautohalifax.ca</p>
              </div>
              <div className="flex items-start space-x-3">
                <SafeIcon icon={FiClock} className="w-5 h-5 text-primary-500 mt-0.5" />
                <div className="text-gray-400">
                  <p>Mon-Fri: 9AM-7PM</p>
                  <p>Sat: 9AM-6PM</p>
                  <p>Sun: 12PM-5PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Premier Auto Halifax. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;