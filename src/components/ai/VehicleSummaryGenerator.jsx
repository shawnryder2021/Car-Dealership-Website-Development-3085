import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import openaiService from '../../services/openaiService';

const { FiThumbsUp, FiThumbsDown, FiFileText, FiLoader, FiAlertTriangle } = FiIcons;

const VehicleSummaryGenerator = ({ vehicle }) => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const generateSummary = async () => {
      if (!vehicle) return;

      setLoading(true);
      setError(null);
      try {
        const { summary: aiSummary, error: aiError } = await openaiService.getVehicleSummaryAndReviews(vehicle);
        if (aiError) {
          setError(aiError);
        } else {
          setSummary(aiSummary);
        }
      } catch (err) {
        setError('An unexpected error occurred while generating the summary.');
      } finally {
        setLoading(false);
      }
    };

    generateSummary();
  }, [vehicle]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <p className="text-gray-600 font-semibold">Generating AI Summary & Review Analysis...</p>
        <p className="text-sm text-gray-500">This may take a moment. We're analyzing reviews from across the web.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 bg-red-50 rounded-lg">
        <SafeIcon icon={FiAlertTriangle} className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-red-700 mb-2">Failed to Generate Summary</h3>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!summary) {
    return null;
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* AI-Generated Summary */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <SafeIcon icon={FiFileText} className="w-6 h-6 text-primary-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">AI-Generated Summary</h2>
        </div>
        <div className="prose prose-lg max-w-none text-gray-700 bg-gray-50 p-6 rounded-lg">
          <p>{summary.summary}</p>
        </div>
      </div>

      {/* Pros and Cons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pros */}
        <div>
          <div className="flex items-center mb-4">
            <SafeIcon icon={FiThumbsUp} className="w-6 h-6 text-green-500 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Expert & Owner Pros</h2>
          </div>
          <ul className="space-y-3">
            {summary.pros.map((pro, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start"
              >
                <SafeIcon icon={FiThumbsUp} className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <span className="ml-3 text-gray-700">{pro}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Cons */}
        <div>
          <div className="flex items-center mb-4">
            <SafeIcon icon={FiThumbsDown} className="w-6 h-6 text-red-500 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Expert & Owner Cons</h2>
          </div>
          <ul className="space-y-3">
            {summary.cons.map((con, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start"
              >
                <SafeIcon icon={FiThumbsDown} className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                <span className="ml-3 text-gray-700">{con}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 text-sm text-gray-500 text-center">
        <p><strong>Disclaimer:</strong> This summary is AI-generated based on an analysis of professional and customer reviews from across the web. It is intended for informational purposes and should be used alongside your own research.</p>
      </div>
    </motion.div>
  );
};

export default VehicleSummaryGenerator;
