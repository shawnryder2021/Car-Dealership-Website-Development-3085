import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiMapPin, FiPhone, FiMail, FiClock, FiCalendar, FiSend } = FiIcons;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    preferredDate: '',
    preferredTime: '',
    message: '',
  });

  const [appointmentData, setAppointmentData] = useState({
    service: '',
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
    vehicle: '',
  });

  const [activeTab, setActiveTab] = useState('contact');

  const handleContactSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    // Handle form submission here
  };

  const handleAppointmentSubmit = (e) => {
    e.preventDefault();
    console.log('Appointment form submitted:', appointmentData);
    // Handle appointment booking here
  };

  const handleContactChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAppointmentChange = (e) => {
    setAppointmentData({
      ...appointmentData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: FiMapPin,
      title: 'Visit Our Showroom',
      details: ['123 Main Street', 'Your City, State 12345'],
      action: 'Get Directions',
      link: 'https://maps.google.com',
    },
    {
      icon: FiPhone,
      title: 'Call Us',
      details: ['(555) 123-4567', 'Available during business hours'],
      action: 'Call Now',
      link: 'tel:+15551234567',
    },
    {
      icon: FiMail,
      title: 'Email Us',
      details: ['info@premierauto.com', 'We respond within 24 hours'],
      action: 'Send Email',
      link: 'mailto:info@premierauto.com',
    },
    {
      icon: FiClock,
      title: 'Business Hours',
      details: ['Mon-Fri: 9AM-7PM', 'Sat: 9AM-6PM', 'Sun: 12PM-5PM'],
      action: 'View Calendar',
      link: '#',
    },
  ];

  const services = [
    'Sales Consultation',
    'Test Drive',
    'Vehicle Service',
    'Financing Discussion',
    'Trade-In Appraisal',
    'Parts & Accessories',
    'Warranty Service',
    'General Inquiry',
  ];

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
    '5:00 PM', '6:00 PM',
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50"
    >
      <Helmet>
        <title>Contact Premier Auto - Visit Our Showroom, Call, or Book Online | Car Dealership</title>
        <meta name="description" content="Contact Premier Auto for sales, service, or general inquiries. Visit our showroom, call (555) 123-4567, or book an appointment online. We're here to help!" />
        <meta name="keywords" content="contact premier auto, car dealership contact, book appointment, test drive, vehicle service, showroom location" />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-900 to-primary-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Contact Premier Auto
            </motion.h1>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-200"
            >
              We're here to help you find your perfect vehicle or service your current one. 
              Get in touch with us today!
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-lg text-center"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SafeIcon icon={info.icon} className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{info.title}</h3>
                <div className="text-gray-600 mb-4">
                  {info.details.map((detail, i) => (
                    <div key={i}>{detail}</div>
                  ))}
                </div>
                <a
                  href={info.link}
                  className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
                >
                  {info.action}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Forms */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Tab Navigation */}
            <div className="flex justify-center mb-8">
              <div className="bg-white rounded-lg p-1 shadow-lg">
                <button
                  onClick={() => setActiveTab('contact')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                    activeTab === 'contact' 
                      ? 'bg-primary-600 text-white' 
                      : 'text-gray-600 hover:text-primary-600'
                  }`}
                >
                  Send Message
                </button>
                <button
                  onClick={() => setActiveTab('appointment')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                    activeTab === 'appointment' 
                      ? 'bg-primary-600 text-white' 
                      : 'text-gray-600 hover:text-primary-600'
                  }`}
                >
                  Book Appointment
                </button>
              </div>
            </div>

            {/* Contact Form */}
            {activeTab === 'contact' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-lg p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Send Us a Message
                </h2>
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleContactChange}
                        className="form-input"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleContactChange}
                        className="form-input"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleContactChange}
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Service Needed
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleContactChange}
                        className="form-select"
                      >
                        <option value="">Select a service</option>
                        {services.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleContactChange}
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Time
                      </label>
                      <select
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleContactChange}
                        className="form-select"
                      >
                        <option value="">Select a time</option>
                        {timeSlots.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleContactChange}
                      rows={4}
                      className="form-input"
                      placeholder="Tell us how we can help you..."
                    ></textarea>
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 mx-auto"
                    >
                      <SafeIcon icon={FiSend} className="w-5 h-5" />
                      <span>Send Message</span>
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Appointment Form */}
            {activeTab === 'appointment' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-lg p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Book an Appointment
                </h2>
                <form onSubmit={handleAppointmentSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service Type *
                    </label>
                    <select
                      name="service"
                      value={appointmentData.service}
                      onChange={handleAppointmentChange}
                      className="form-select"
                      required
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={appointmentData.date}
                        onChange={handleAppointmentChange}
                        className="form-input"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Time *
                      </label>
                      <select
                        name="time"
                        value={appointmentData.time}
                        onChange={handleAppointmentChange}
                        className="form-select"
                        required
                      >
                        <option value="">Select a time</option>
                        {timeSlots.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={appointmentData.name}
                        onChange={handleAppointmentChange}
                        className="form-input"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={appointmentData.email}
                        onChange={handleAppointmentChange}
                        className="form-input"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={appointmentData.phone}
                        onChange={handleAppointmentChange}
                        className="form-input"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Vehicle (if applicable)
                      </label>
                      <input
                        type="text"
                        name="vehicle"
                        value={appointmentData.vehicle}
                        onChange={handleAppointmentChange}
                        placeholder="e.g., 2020 Honda Civic"
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 mx-auto"
                    >
                      <SafeIcon icon={FiCalendar} className="w-5 h-5" />
                      <span>Book Appointment</span>
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Find Us</h2>
            <p className="text-gray-600">
              Visit our showroom and experience our extensive inventory and exceptional service firsthand.
            </p>
          </div>
          <div className="bg-gray-300 rounded-lg overflow-hidden" style={{ height: '400px' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.123456789!2d-74.0059728!3d40.7127753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjAiTiA3NMKwMDAnMjEuNSJX!5e0!3m2!1sen!2sus!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Contact;