import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiDollarSign, FiCreditCard, FiCalculator, FiCheckCircle, FiPercent, FiTrendingUp } = FiIcons;

const Financing = () => {
  const [loanAmount, setLoanAmount] = useState(25000);
  const [downPayment, setDownPayment] = useState(5000);
  const [interestRate, setInterestRate] = useState(4.9);
  const [loanTerm, setLoanTerm] = useState(60);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  const [applicationData, setApplicationData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    annualIncome: '',
    employmentStatus: '',
    creditScore: '',
    downPayment: '',
    tradeInValue: '',
    vehicleInterest: '',
  });

  React.useEffect(() => {
    calculatePayment();
  }, [loanAmount, downPayment, interestRate, loanTerm]);

  const calculatePayment = () => {
    const principal = loanAmount - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm;
    
    if (principal > 0 && monthlyRate > 0) {
      const payment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                     (Math.pow(1 + monthlyRate, numPayments) - 1);
      setMonthlyPayment(payment);
    } else {
      setMonthlyPayment(0);
    }
  };

  const handleApplicationSubmit = (e) => {
    e.preventDefault();
    console.log('Financing application submitted:', applicationData);
    // Handle application submission here
  };

  const handleApplicationChange = (e) => {
    setApplicationData({
      ...applicationData,
      [e.target.name]: e.target.value,
    });
  };

  const benefits = [
    {
      icon: FiPercent,
      title: 'Competitive Rates',
      description: 'Get rates as low as 2.9% APR with approved credit',
    },
    {
      icon: FiCreditCard,
      title: 'All Credit Welcome',
      description: 'We work with all credit types, including first-time buyers',
    },
    {
      icon: FiTrendingUp,
      title: 'Flexible Terms',
      description: 'Choose from 12 to 84-month financing options',
    },
    {
      icon: FiCheckCircle,
      title: 'Quick Approval',
      description: 'Get pre-approved in minutes with our online application',
    },
  ];

  const lenders = [
    { name: 'Wells Fargo', logo: 'https://via.placeholder.com/120x60?text=Wells+Fargo' },
    { name: 'Chase', logo: 'https://via.placeholder.com/120x60?text=Chase' },
    { name: 'Bank of America', logo: 'https://via.placeholder.com/120x60?text=BofA' },
    { name: 'Capital One', logo: 'https://via.placeholder.com/120x60?text=Capital+One' },
    { name: 'Ally Financial', logo: 'https://via.placeholder.com/120x60?text=Ally' },
    { name: 'Credit Union', logo: 'https://via.placeholder.com/120x60?text=Credit+Union' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50"
    >
      <Helmet>
        <title>Auto Financing - Car Loans & Financing Options | Premier Auto</title>
        <meta name="description" content="Get competitive auto financing rates starting at 2.9% APR. Calculate payments, apply online, and get pre-approved for your next vehicle at Premier Auto." />
        <meta name="keywords" content="auto financing, car loans, vehicle financing, auto loan calculator, car payment calculator, bad credit auto loans" />
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
              Auto Financing Made Easy
            </motion.h1>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-200 mb-8"
            >
              Get competitive rates, flexible terms, and quick approval for your next vehicle purchase.
            </motion.p>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href="#calculator"
                className="bg-white text-primary-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Calculate Payment
              </a>
              <a
                href="#application"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-900 transition-colors"
              >
                Apply Now
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Financing?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We work with multiple lenders to find you the best rates and terms for your situation.
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

      {/* Payment Calculator */}
      <section id="calculator" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Payment Calculator</h2>
              <p className="text-gray-600">
                Estimate your monthly payment with our easy-to-use calculator.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Vehicle Price: ${loanAmount.toLocaleString()}
                    </label>
                    <input
                      type="range"
                      min="5000"
                      max="100000"
                      step="1000"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(parseInt(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <span>$5,000</span>
                      <span>$100,000</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Down Payment: ${downPayment.toLocaleString()}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max={loanAmount * 0.5}
                      step="500"
                      value={downPayment}
                      onChange={(e) => setDownPayment(parseInt(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <span>$0</span>
                      <span>${(loanAmount * 0.5).toLocaleString()}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Interest Rate: {interestRate}% APR
                    </label>
                    <input
                      type="range"
                      min="2.9"
                      max="15"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <span>2.9%</span>
                      <span>15%</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Loan Term: {loanTerm} months
                    </label>
                    <input
                      type="range"
                      min="12"
                      max="84"
                      step="12"
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(parseInt(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <span>12 months</span>
                      <span>84 months</span>
                    </div>
                  </div>
                </div>

                <div className="bg-primary-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Payment Summary</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Vehicle Price:</span>
                      <span className="font-semibold">${loanAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Down Payment:</span>
                      <span className="font-semibold">${downPayment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Loan Amount:</span>
                      <span className="font-semibold">${(loanAmount - downPayment).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Interest Rate:</span>
                      <span className="font-semibold">{interestRate}% APR</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Loan Term:</span>
                      <span className="font-semibold">{loanTerm} months</span>
                    </div>
                    <div className="border-t border-gray-300 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-gray-900">Monthly Payment:</span>
                        <span className="text-2xl font-bold text-primary-600">
                          ${monthlyPayment.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <a
                      href="#application"
                      className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-semibold transition-colors block text-center"
                    >
                      Apply for This Rate
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Financing Application */}
      <section id="application" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Apply for Financing</h2>
              <p className="text-gray-600">
                Get pre-approved in minutes with our secure online application.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8">
              <form onSubmit={handleApplicationSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={applicationData.firstName}
                      onChange={handleApplicationChange}
                      className="form-input"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={applicationData.lastName}
                      onChange={handleApplicationChange}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={applicationData.email}
                      onChange={handleApplicationChange}
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
                      value={applicationData.phone}
                      onChange={handleApplicationChange}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Annual Income *
                    </label>
                    <input
                      type="number"
                      name="annualIncome"
                      value={applicationData.annualIncome}
                      onChange={handleApplicationChange}
                      className="form-input"
                      placeholder="$50,000"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Employment Status *
                    </label>
                    <select
                      name="employmentStatus"
                      value={applicationData.employmentStatus}
                      onChange={handleApplicationChange}
                      className="form-select"
                      required
                    >
                      <option value="">Select employment status</option>
                      <option value="employed">Employed</option>
                      <option value="self-employed">Self-Employed</option>
                      <option value="retired">Retired</option>
                      <option value="student">Student</option>
                      <option value="unemployed">Unemployed</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Estimated Credit Score
                    </label>
                    <select
                      name="creditScore"
                      value={applicationData.creditScore}
                      onChange={handleApplicationChange}
                      className="form-select"
                    >
                      <option value="">Select credit score range</option>
                      <option value="excellent">Excellent (750+)</option>
                      <option value="good">Good (700-749)</option>
                      <option value="fair">Fair (650-699)</option>
                      <option value="poor">Poor (600-649)</option>
                      <option value="bad">Bad (Below 600)</option>
                      <option value="no-credit">No Credit History</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Down Payment Amount
                    </label>
                    <input
                      type="number"
                      name="downPayment"
                      value={applicationData.downPayment}
                      onChange={handleApplicationChange}
                      className="form-input"
                      placeholder="$5,000"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Trade-in Value (if applicable)
                    </label>
                    <input
                      type="number"
                      name="tradeInValue"
                      value={applicationData.tradeInValue}
                      onChange={handleApplicationChange}
                      className="form-input"
                      placeholder="$10,000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Vehicle of Interest
                    </label>
                    <input
                      type="text"
                      name="vehicleInterest"
                      value={applicationData.vehicleInterest}
                      onChange={handleApplicationChange}
                      className="form-input"
                      placeholder="e.g., 2024 Toyota Camry"
                    />
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">
                    By submitting this application, you consent to Premier Auto and our lending partners 
                    obtaining your credit report and contacting you about financing options. Your information 
                    is secure and will not be shared with third parties for marketing purposes.
                  </p>
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Lending Partners */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Lending Partners</h2>
            <p className="text-gray-600">
              We work with trusted financial institutions to get you the best rates.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {lenders.map((lender, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-4 rounded-lg shadow-lg flex items-center justify-center"
              >
                <img
                  src={lender.logo}
                  alt={lender.name}
                  className="max-w-full h-auto"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Financing;