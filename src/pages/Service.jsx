import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiTool, FiSettings, FiShield, FiClock, FiCheckCircle, FiCalendar, FiPhone } = FiIcons;

const Service = () => {
  const [appointmentData, setAppointmentData] = useState({
    service: '',
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
    vehicle: '',
    mileage: '',
    description: '',
  });

  const handleAppointmentSubmit = (e) => {
    e.preventDefault();
    console.log('Service appointment submitted:', appointmentData);
    // Handle appointment submission here
  };

  const handleAppointmentChange = (e) => {
    setAppointmentData({
      ...appointmentData,
      [e.target.name]: e.target.value,
    });
  };

  const services = [
    {
      icon: FiTool,
      title: 'Oil Change',
      description: 'Regular oil changes to keep your engine running smoothly',
      price: 'Starting at $29.99',
      duration: '30 minutes',
    },
    {
      icon: FiSettings,
      title: 'Brake Service',
      description: 'Complete brake inspection, repair, and replacement',
      price: 'Starting at $149.99',
      duration: '2-3 hours',
    },
    {
      icon: FiShield,
      title: 'Multi-Point Inspection',
      description: 'Comprehensive vehicle inspection and safety check',
      price: 'Starting at $99.99',
      duration: '1 hour',
    },
    {
      icon: FiTool,
      title: 'Tire Service',
      description: 'Tire rotation, balancing, and replacement',
      price: 'Starting at $79.99',
      duration: '1-2 hours',
    },
    {
      icon: FiSettings,
      title: 'Engine Diagnostics',
      description: 'Computer diagnostics to identify engine issues',
      price: 'Starting at $129.99',
      duration: '1 hour',
    },
    {
      icon: FiShield,
      title: 'Transmission Service',
      description: 'Transmission fluid change and inspection',
      price: 'Starting at $199.99',
      duration: '2 hours',
    },
  ];

  const benefits = [
    {
      icon: FiCheckCircle,
      title: 'Certified Technicians',
      description: 'ASE-certified mechanics with years of experience',
    },
    {
      icon: FiShield,
      title: 'Quality Parts',
      description: 'OEM and high-quality aftermarket parts',
    },
    {
      icon: FiClock,
      title: 'Quick Turnaround',
      description: 'Most services completed same day',
    },
    {
      icon: FiTool,
      title: 'Latest Equipment',
      description: 'State-of-the-art diagnostic and repair tools',
    },
  ];

  const timeSlots = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM',
    '4:00 PM', '5:00 PM',
  ];

  const maintenanceSchedule = [
    { mileage: '5,000', services: ['Oil Change', 'Filter Replacement'] },
    { mileage: '10,000', services: ['Oil Change', 'Tire Rotation', 'Multi-Point Inspection'] },
    { mileage: '15,000', services: ['Oil Change', 'Brake Inspection', 'Fluid Check'] },
    { mileage: '20,000', services: ['Oil Change', 'Air Filter', 'Cabin Filter'] },
    { mileage: '30,000', services: ['Major Service', 'Transmission Service', 'Brake Service'] },
    { mileage: '60,000', services: ['Comprehensive Inspection', 'Timing Belt', 'Spark Plugs'] },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50"
    >
      <Helmet>
        <title>Auto Service & Repair - Professional Car Maintenance | Premier Auto</title>
        <meta name="description" content="Professional auto service and repair by certified technicians. Oil changes, brake service, diagnostics, and more. Schedule your service appointment today." />
        <meta name="keywords" content="auto service, car repair, oil change, brake service, vehicle maintenance, certified mechanics, car service center" />
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
              Professional Auto Service
            </motion.h1>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-200 mb-8"
            >
              Keep your vehicle running at its best with our comprehensive service and repair solutions.
            </motion.p>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href="#appointment"
                className="bg-white text-primary-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Schedule Service
              </a>
              <a
                href="tel:+15551234567"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-900 transition-colors"
              >
                Call Service Dept
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Service Center?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our certified technicians use the latest equipment and quality parts to keep your vehicle running safely and efficiently.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SafeIcon icon={benefit.icon} className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-gray-600">
              From routine maintenance to complex repairs, we've got you covered.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg p-6 card-hover"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <SafeIcon icon={service.icon} className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                  <span>{service.price}</span>
                  <span>{service.duration}</span>
                </div>
                <a
                  href="#appointment"
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg font-semibold transition-colors block text-center"
                >
                  Schedule Service
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Maintenance Schedule */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Maintenance Schedule</h2>
            <p className="text-gray-600">
              Follow our recommended maintenance schedule to keep your vehicle in optimal condition.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-primary-600 text-white p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="font-semibold">Mileage</div>
                  <div className="font-semibold">Recommended Services</div>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {maintenanceSchedule.map((schedule, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div className="font-semibold text-primary-600">
                        {schedule.mileage} miles
                      </div>
                      <div className="text-gray-700">
                        {schedule.services.join(', ')}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Appointment Form */}
      <section id="appointment" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Schedule Your Service</h2>
              <p className="text-gray-600">
                Book your service appointment online or call us at (555) 123-4567.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8">
              <form onSubmit={handleAppointmentSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Needed *
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
                      <option key={service.title} value={service.title}>
                        {service.title}
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
                      Vehicle *
                    </label>
                    <input
                      type="text"
                      name="vehicle"
                      value={appointmentData.vehicle}
                      onChange={handleAppointmentChange}
                      placeholder="e.g., 2020 Honda Civic"
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Mileage
                    </label>
                    <input
                      type="number"
                      name="mileage"
                      value={appointmentData.mileage}
                      onChange={handleAppointmentChange}
                      placeholder="e.g., 45000"
                      className="form-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description of Issue (Optional)
                  </label>
                  <textarea
                    name="description"
                    value={appointmentData.description}
                    onChange={handleAppointmentChange}
                    rows={4}
                    className="form-input"
                    placeholder="Please describe any issues or concerns with your vehicle..."
                  ></textarea>
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 mx-auto"
                  >
                    <SafeIcon icon={FiCalendar} className="w-5 h-5" />
                    <span>Schedule Appointment</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Immediate Service?</h2>
          <p className="text-xl mb-8 text-primary-200">
            Call our service department directly for urgent repairs and same-day service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <a
              href="tel:+15551234567"
              className="bg-white text-primary-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
            >
              <SafeIcon icon={FiPhone} className="w-5 h-5" />
              <span>Call Service Dept</span>
            </a>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Service;