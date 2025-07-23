import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import openaiService from '../../services/openaiService';

const { FiInfo, FiSearch, FiLoader, FiCheckSquare } = FiIcons;

const FeatureExplainer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [explanation, setExplanation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const { explanation: featureExplanation, error: aiError } = await openaiService.explainCarFeature(searchTerm);
      
      if (aiError) {
        setError(aiError);
        return;
      }
      
      setExplanation(featureExplanation);
      
      // Add to recent searches if not already there
      if (!recentSearches.includes(searchTerm)) {
        setRecentSearches(prev => [searchTerm, ...prev].slice(0, 5));
      }
    } catch (err) {
      console.error('Feature explanation error:', err);
      setError('Failed to get explanation. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecentSearch = (term) => {
    setSearchTerm(term);
    handleExplainFeature(term);
  };

  const handleExplainFeature = async (feature) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { explanation: featureExplanation, error: aiError } = await openaiService.explainCarFeature(feature);
      
      if (aiError) {
        setError(aiError);
        return;
      }
      
      setExplanation(featureExplanation);
      
      // Add to recent searches if not already there
      if (!recentSearches.includes(feature)) {
        setRecentSearches(prev => [feature, ...prev].slice(0, 5));
      }
    } catch (err) {
      console.error('Feature explanation error:', err);
      setError('Failed to get explanation. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const popularFeatures = [
    'AWD vs 4WD',
    'Lane Keep Assist',
    'Blind Spot Monitoring',
    'Apple CarPlay',
    'Adaptive Cruise Control',
    'CVT Transmission'
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-primary-600 text-white p-5">
        <h2 className="text-xl font-semibold flex items-center">
          <SafeIcon icon={FiInfo} className="w-5 h-5 mr-2" />
          AI Car Feature Explainer
        </h2>
        <p className="text-sm mt-1 text-primary-100">
          Enter any car feature or technology to get a simple explanation
        </p>
      </div>
      
      <div className="p-6">
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="e.g., ADAS, Hybrid Powertrain, Torque Vectoring..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              required
            />
            <SafeIcon
              icon={FiSearch}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
            />
          </div>
          
          <button
            type="submit"
            disabled={!searchTerm.trim() || isLoading}
            className="w-full mt-3 bg-primary-600 hover:bg-primary-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <SafeIcon icon={FiLoader} className="w-5 h-5 animate-spin" />
                <span>Getting Explanation...</span>
              </>
            ) : (
              <>
                <SafeIcon icon={FiInfo} className="w-5 h-5" />
                <span>Explain This Feature</span>
              </>
            )}
          </button>
        </form>
        
        {/* Error message */}
        {error && (
          <div className="p-4 mb-6 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}
        
        {/* Explanation Result */}
        {explanation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-5 bg-blue-50 rounded-lg border border-blue-200"
          >
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
              <SafeIcon icon={FiCheckSquare} className="w-5 h-5 text-blue-600 mr-2" />
              {searchTerm}
            </h3>
            <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-line">
              {explanation}
            </div>
          </motion.div>
        )}
        
        {/* Popular Features */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Popular Features</h3>
          <div className="flex flex-wrap gap-2">
            {popularFeatures.map((feature, index) => (
              <button
                key={index}
                onClick={() => {
                  setSearchTerm(feature);
                  handleExplainFeature(feature);
                }}
                className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-lg transition-colors"
              >
                {feature}
              </button>
            ))}
          </div>
        </div>
        
        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Recent Searches</h3>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((term, index) => (
                <button
                  key={index}
                  onClick={() => handleRecentSearch(term)}
                  className="text-sm bg-primary-50 hover:bg-primary-100 text-primary-700 px-3 py-1 rounded-lg transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeatureExplainer;