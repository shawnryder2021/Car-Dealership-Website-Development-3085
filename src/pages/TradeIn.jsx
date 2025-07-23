import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiDollarSign, FiCar, FiCheckCircle, FiTrendingUp, FiCalendar, FiUpload } = FiIcons;

const TradeIn = () => {
  const [tradeInData, setTradeInData] = useState({
    year: '',
    make: '',
    model: '',
    trim: '',
    mileage: '',
    condition: '',
    accidents: '',
    maintenance: '',
    modifications: '',
    name: '',
    email: '',
    phone: '',
    comments: '',
  });

  const [estimatedValue, setEstimatedValue] = useState(null);

  const handleTradeInSubmit = (e) => {
    e.preventDefault();
    // Simulate trade-in valuation
    const baseValue = 15000;
    const yearFactor = (2024 - parseInt(tradeInData.year)) * -500;
    const mileageFactor = (parseInt(tradeInData.mileage) / 1000) * -50;
    const conditionMultiplier = {
      'excellent': 1.1,
      'good': 1.0,
      'fair': 0.85,
      'poor': 0.7
    };
    
    const estimated = Math.max(1000, (baseValue + yearFactor + mileageFactor) * (conditionMultiplier[tradeInData.condition] || 1));
    setEstimatedValue(Math.round(estimated));
    
    console.log('Trade-in form submitted:', tradeInData);
    // Handle form submission here
  };

  const handleTradeInChange = (e) => {
    setTradeInData({
      ...tradeInData,
      [e.target.name]: e.target.value,
    });
  };

  const benefits = [
    {
      icon: FiDollarSign,
      title: 'Fair Market Value',
      description: 'Get the best possible value for your trade-in vehicle',
    },
    {
      icon: FiCheckCircle,
      title: 'Instant Evaluation',
      description: 'Receive an immediate estimate online with our appraisal tool',
    },
    {
      icon: FiTrendingUp,
      title: 'Tax Benefits',
      description: 'Reduce your sales tax on your next vehicle purchase',
    },
    {
      icon: FiCar,
      title: 'Any Condition',
      description: 'We accept vehicles in any condition, running or not',
    },
  ];

  const makes = [
    'Acura', 'Audi', 'BMW', 'Buick', 'Cadillac', 'Chevrolet', 'Chrysler', 'Dodge',
    'Ford', 'GMC', 'Honda', 'Hyundai', 'Infiniti', 'Jeep', 'Kia', 'Lexus',
    'Lincoln', 'Mazda', 'Mercedes-Benz', 'Mitsubishi', 'Nissan', 'Ram', 'Subaru',
    'Tesla', 'Toyota', 'Volkswagen', 'Volvo'
  ];

  const years = Array.from({ length: 25 }, (_, i) => 2024 - i);

  const process = [
    {
      step: 1,
      title: 'Get Your Estimate',
      description: 'Fill out our online form to get an instant trade-in estimate',
    },
    {
      step: 2,
      title: 'Schedule Inspection',
      description: 'Bring your vehicle for a quick inspection at our dealership',
    },
    {
      step: 3,
      title: 'Receive Final Offer',
      description: 'Get your final trade-in offer based on the inspection',
    },
    {
      step: 4,
      title: 'Complete Transaction',
      description: 'Use your trade-in value toward your next vehicle purchase',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50"
    >
      <Helmet>
        <title>Trade-In Your Vehicle - Get Instant Appraisal | Premier Auto</title>
        <meta name="description" content="Get an instant trade-in estimate for your vehicle. Fair market value, tax benefits, and we accept any condition. Start your free appraisal today." />
        <meta name="keywords" content="trade-in, vehicle appraisal, car trade-in value, sell my car, vehicle estimate, auto trade-in" />
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
              Trade-In Your Vehicle
            </motion.h1>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-200 mb-8"
            >
              Get an instant estimate and fair market value for your current vehicle. 
              Use it toward your next purchase and save on taxes.
            </motion.p>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href="#appraisal"
                className="bg-white text-primary-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Get Instant Estimate
              </a>
              <a
                href="tel:+15551234567"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-900 transition-colors"
              >
                Call for Appraisal
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Trade With Us?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer competitive trade-in values and make the process simple and transparent.
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

      {/* Process */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600">
              Our simple 4-step process makes trading in your vehicle easy and stress-free.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {process.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Appraisal Form */}
      <section id="appraisal" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Your Trade-In Estimate</h2>
              <p className="text-gray-600">
                Provide some basic information about your vehicle to get an instant estimate.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8">
              <form onSubmit={handleTradeInSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Year *
                    </label>
                    <select
                      name="year"
                      value={tradeInData.year}
                      onChange={handleTradeInChange}
                      className="form-select"
                      required
                    >
                      <option value="">Select Year</option>
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Make *
                    </label>
                    <select
                      name="make"
                      value={tradeInData.make}
                      onChange={handleTradeInChange}
                      className="form-select"
                      required
                    >
                      <option value="">Select Make</option>
                      {makes.map((make) => (
                        <option key={make} value={make}>
                          {make}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Model *
                    </label>
                    <input
                      type="text"
                      name="model"
                      value={tradeInData.model}
                      onChange={handleTradeInChange}
                      className="form-input"
                      placeholder="e.g., Camry"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Trim Level
                    </label>
                    <input
                      type="text"
                      name="trim"
                      value={tradeInData.trim}
                      onChange={handleTradeInChange}
                      className="form-input"
                      placeholder="e.g., LE, XLE"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mileage *
                    </label>
                    <input
                      type="number"
                      name="mileage"
                      value={tradeInData.mileage}
                      onChange={handleTradeInChange}
                      className="form-input"
                      placeholder="e.g., 50000"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Overall Condition *
                    </label>
                    <select
                      name="condition"
                      value={tradeInData.condition}
                      onChange={handleTradeInChange}
                      className="form-select"
                      required
                    >
                      <option value="">Select Condition</option>
                      <option value="excellent">Excellent</option>
                      <option value="good">Good</option>
                      <option value="fair">Fair</option>
                      <option value="poor">Poor</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Accident History *
                    </label>
                    <select
                      name="accidents"
                      value={tradeInData.accidents}
                      onChange={handleTradeInChange}
                      className="form-select"
                      required
                    >
                      <option value="">Select Option</option>
                      <option value="none">No Accidents</option>
                      <option value="minor">Minor Accidents</option>
                      <option value="major">Major Accidents</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Maintenance History
                    </label>
                    <select
                      name="maintenance"
                      value={tradeInData.maintenance}
                      onChange={handleTradeInChange}
                      className="form-select"
                    >
                      <option value="">Select Option</option>
                      <option value="excellent">Excellent - Full Records</option>
                      <option value="good">Good - Some Records</option>
                      <option value="average">Average - Basic Maintenance</option>
                      <option value="poor">Poor - Minimal Maintenance</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Modifications
                  </label>
                  <textarea
                    name="modifications"
                    value={tradeInData.modifications}
                    onChange={handleTradeInChange}
                    rows={3}
                    className="form-input"
                    placeholder="List any modifications or aftermarket parts..."
                  ></textarea>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={tradeInData.name}
                        onChange={handleTradeInChange}
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
                        value={tradeInData.email}
                        onChange={handleTradeInChange}
                        className="form-input"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={tradeInData.phone}
                        onChange={handleTradeInChange}
                        className="form-input"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Comments
                  </label>
                  <textarea
                    name="comments"
                    value={tradeInData.comments}
                    onChange={handleTradeInChange}
                    rows={3}
                    className="form-input"
                    placeholder="Any additional information about your vehicle..."
                  ></textarea>
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Get My Trade-In Estimate
                  </button>
                </div>
              </form>

              {/* Estimated Value Display */}
              {estimatedValue && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 p-6 bg-primary-50 rounded-lg border-2 border-primary-200"
                >
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Estimated Trade-In Value
                    </h3>
                    <div className="text-4xl font-bold text-primary-600 mb-4">
                      ${estimatedValue.toLocaleString()}
                    </div>
                    <p className="text-gray-600 mb-4">
                      This is a preliminary estimate. Final value will be determined after vehicle inspection.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <a
                        href="/contact"
                        className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                      >
                        Schedule Inspection
                      </a>
                      <a
                        href="/inventory"
                        className="border border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                      >
                        Browse Our Inventory
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Trade In Your Vehicle?</h2>
          <p className="text-xl mb-8 text-primary-200">
            Visit our dealership for a professional appraisal and get the best value for your trade.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <a
              href="/contact"
              className="bg-white text-primary-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Schedule Appointment
            </a>
            <a
              href="tel:+15551234567"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-900 transition-colors"
            >
              Call Us Today
            </a>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default TradeIn;