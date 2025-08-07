import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import openaiService from '../../services/openaiService';

const { FiDollarSign, FiTrendingUp, FiTool, FiSun, FiDroplet, FiZap, FiLoader, FiCheckCircle } = FiIcons;

const OwnershipCostCalculator = () => {
  const [vehicle, setVehicle] = useState('');
  const [annualMileage, setAnnualMileage] = useState('');
  const [drivingStyle, setDrivingStyle] = useState('mixed');
  const [location, setLocation] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const { costAnalysis, error: aiError } = await openaiService.getOwnershipCost({
        vehicle,
        annualMileage,
        drivingStyle,
        location,
      });

      if (aiError) {
        setError(aiError);
        return;
      }

      setResults(costAnalysis);
    } catch (err) {
      setError('Failed to calculate ownership cost. Please try again later.');
      console.error('Ownership cost error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Personalized Ownership Cost Calculator</h2>
        <p className="text-gray-600">
          Estimate the 5-year total cost of ownership for a vehicle based on your driving habits.
        </p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="vehicle" className="block text-sm font-medium text-gray-700">
            Vehicle (e.g., "2023 Honda Civic EX")
          </label>
          <input
            type="text"
            id="vehicle"
            value={vehicle}
            onChange={(e) => setVehicle(e.target.value)}
            className="form-input"
            placeholder="Enter vehicle year, make, and model"
            required
          />
        </div>

        <div>
          <label htmlFor="annualMileage" className="block text-sm font-medium text-gray-700">
            Estimated Annual Mileage
          </label>
          <select
            id="annualMileage"
            value={annualMileage}
            onChange={(e) => setAnnualMileage(e.target.value)}
            className="form-select"
            required
          >
            <option value="">Select Mileage</option>
            <option value="10000">10,000 miles</option>
            <option value="15000">15,000 miles</option>
            <option value="20000">20,000 miles</option>
            <option value="25000">25,000 miles</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Primary Driving Style
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="drivingStyle"
                value="city"
                checked={drivingStyle === 'city'}
                onChange={(e) => setDrivingStyle(e.target.value)}
                className="form-radio"
              />
              <span className="ml-2">Mostly City</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="drivingStyle"
                value="highway"
                checked={drivingStyle === 'highway'}
                onChange={(e) => setDrivingStyle(e.target.value)}
                className="form-radio"
              />
              <span className="ml-2">Mostly Highway</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="drivingStyle"
                value="mixed"
                checked={drivingStyle === 'mixed'}
                onChange={(e) => setDrivingStyle(e.target.value)}
                className="form-radio"
              />
              <span className="ml-2">Mixed</span>
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location (e.g., "Halifax, NS" or "90210")
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="form-input"
            placeholder="Enter your city, province/state, or ZIP code"
            required
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <SafeIcon icon={FiLoader} className="w-5 h-5 animate-spin" />
                <span>Calculating...</span>
              </>
            ) : (
              <span>Calculate Ownership Cost</span>
            )}
          </button>
        </div>
      </form>

      {results && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-200"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">5-Year Ownership Cost Estimate for a {results.vehicle}</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center text-primary-600 mb-2">
                <SafeIcon icon={FiDollarSign} className="w-6 h-6 mr-2" />
                <h4 className="text-lg font-semibold">Total Estimated Cost</h4>
              </div>
              <p className="text-3xl font-bold text-gray-900">{results.totalCost}</p>
              <p className="text-sm text-gray-500">over 5 years</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center text-primary-600 mb-2">
                <SafeIcon icon={FiTrendingUp} className="w-6 h-6 mr-2" />
                <h4 className="text-lg font-semibold">Depreciation</h4>
              </div>
              <p className="text-2xl font-bold text-gray-900">{results.depreciation}</p>
              <p className="text-sm text-gray-500">Biggest factor in ownership cost</p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <h4 className="text-lg font-semibold text-gray-800">Cost Breakdown:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-start bg-white p-3 rounded-lg">
                <SafeIcon icon={FiDroplet} className="w-6 h-6 text-blue-500 mt-1" />
                <div className="ml-3">
                  <p className="font-semibold text-gray-700">Fuel</p>
                  <p className="text-lg font-bold text-gray-900">{results.fuel}</p>
                </div>
              </div>
              <div className="flex items-start bg-white p-3 rounded-lg">
                <SafeIcon icon={FiCheckCircle} className="w-6 h-6 text-green-500 mt-1" />
                <div className="ml-3">
                  <p className="font-semibold text-gray-700">Insurance</p>
                  <p className="text-lg font-bold text-gray-900">{results.insurance}</p>
                </div>
              </div>
              <div className="flex items-start bg-white p-3 rounded-lg">
                <SafeIcon icon={FiTool} className="w-6 h-6 text-yellow-500 mt-1" />
                <div className="ml-3">
                  <p className="font-semibold text-gray-700">Maintenance</p>
                  <p className="text-lg font-bold text-gray-900">{results.maintenance}</p>
                </div>
              </div>
              <div className="flex items-start bg-white p-3 rounded-lg">
                <SafeIcon icon={FiZap} className="w-6 h-6 text-red-500 mt-1" />
                <div className="ml-3">
                  <p className="font-semibold text-gray-700">Repairs</p>
                  <p className="text-lg font-bold text-gray-900">{results.repairs}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-sm text-gray-500">
            <p><strong>Disclaimer:</strong> This is an AI-generated estimate. Actual costs may vary based on your specific situation, driving conditions, and vehicle maintenance. This estimate does not include taxes, fees, or financing costs.</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default OwnershipCostCalculator;
