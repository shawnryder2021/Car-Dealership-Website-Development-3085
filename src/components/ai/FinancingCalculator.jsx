import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import openaiService from '../../services/openaiService';

const { FiDollarSign, FiPercent, FiCalendar, FiLoader, FiCreditCard, FiBarChart } = FiIcons;

const FinancingCalculator = ({ vehiclePrice = 30000 }) => {
  const [customerInfo, setCustomerInfo] = useState({
    creditScore: '',
    downPayment: '',
    loanTerm: '',
    income: '',
  });
  const [financingOptions, setFinancingOptions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const { options, error: aiError } = await openaiService.generateFinancingOptions(
        vehiclePrice,
        customerInfo
      );
      
      if (aiError) {
        setError(aiError);
        return;
      }
      
      setFinancingOptions(options);
    } catch (err) {
      setError('Failed to generate financing options. Please try again later.');
      console.error('Financing calculation error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-primary-600 text-white p-4">
        <h3 className="text-lg font-semibold flex items-center">
          <SafeIcon icon={FiCreditCard} className="w-5 h-5 mr-2" />
          AI Financing Calculator
        </h3>
      </div>
      
      <div className="p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h4 className="text-xl font-bold text-gray-900">
              Vehicle Price: {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'CAD',
                minimumFractionDigits: 0,
              }).format(vehiclePrice)}
            </h4>
          </div>
        </div>

        {!financingOptions ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Credit Score Range
              </label>
              <select
                name="creditScore"
                value={customerInfo.creditScore}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Select Credit Score Range</option>
                <option value="Excellent (750+)">Excellent (750+)</option>
                <option value="Good (700-749)">Good (700-749)</option>
                <option value="Fair (650-699)">Fair (650-699)</option>
                <option value="Poor (600-649)">Poor (600-649)</option>
                <option value="Bad (below 600)">Bad (below 600)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Down Payment Amount
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SafeIcon icon={FiDollarSign} className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  name="downPayment"
                  value={customerInfo.downPayment}
                  onChange={handleInputChange}
                  placeholder="0"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Loan Term
              </label>
              <select
                name="loanTerm"
                value={customerInfo.loanTerm}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Select Loan Term</option>
                <option value="36">36 months (3 years)</option>
                <option value="48">48 months (4 years)</option>
                <option value="60">60 months (5 years)</option>
                <option value="72">72 months (6 years)</option>
                <option value="84">84 months (7 years)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Annual Income (Optional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SafeIcon icon={FiDollarSign} className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  name="income"
                  value={customerInfo.income}
                  onChange={handleInputChange}
                  placeholder="Annual income"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
            
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}
            
            <button
              type="submit"
              disabled={!customerInfo.creditScore || loading}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <SafeIcon icon={FiLoader} className="w-5 h-5 animate-spin" />
                  <span>Calculating Options...</span>
                </>
              ) : (
                <>
                  <SafeIcon icon={FiBarChart} className="w-5 h-5" />
                  <span>Calculate Financing Options</span>
                </>
              )}
            </button>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">AI-Generated Financing Options</h4>
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-line">{financingOptions}</div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={() => {
                  setFinancingOptions(null);
                  setCustomerInfo({
                    creditScore: '',
                    downPayment: '',
                    loanTerm: '',
                    income: '',
                  });
                }}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Start Over
              </button>
              
              <a
                href="/financing"
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Learn More About Financing
              </a>
            </div>
            
            <div className="text-xs text-gray-500 mt-4">
              <p>Disclaimer: These financing options are estimates only and subject to credit approval. 
              Actual rates and terms may vary. Contact our finance department for personalized options.</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FinancingCalculator;