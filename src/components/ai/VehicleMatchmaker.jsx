import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { vehicleService } from '../../services/vehicleService';
import openaiService from '../../services/openaiService';

const { FiSearch, FiLoader, FiCheckCircle, FiSliders, FiStar } = FiIcons;

const VehicleMatchmaker = () => {
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [userPreferences, setUserPreferences] = useState('');
  const [matchedVehicles, setMatchedVehicles] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [aiRationale, setAiRationale] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await vehicleService.getAllVehicles();
      if (error) {
        console.error('Error loading vehicles:', error);
        setError('Failed to load vehicle inventory');
        return;
      }
      setVehicles(data);
    } catch (err) {
      console.error('Exception loading vehicles:', err);
      setError('Failed to load vehicle inventory');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!userPreferences.trim()) {
      return;
    }
    
    setAiLoading(true);
    setShowResults(true);
    setError(null);
    
    try {
      const { matches, rationale, error: aiError } = await openaiService.matchVehiclesFromInventory(
        userPreferences,
        vehicles
      );
      
      if (aiError) {
        setError(aiError);
        return;
      }
      
      setMatchedVehicles(matches || []);
      setAiRationale(rationale || '');
    } catch (err) {
      console.error('AI matchmaking error:', err);
      setError('Failed to match vehicles. Please try again later.');
    } finally {
      setAiLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const examplePrompts = [
    "I need a family SUV with good fuel economy under $40,000",
    "Looking for a truck with 4WD and towing capacity",
    "I want a fuel-efficient commuter car with modern tech features",
    "Need a luxury sedan with leather interior and safety features",
    "Electric vehicle with at least 200 miles of range"
  ];

  const handleExampleClick = (example) => {
    setUserPreferences(example);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-primary-600 text-white p-5">
        <h2 className="text-xl font-semibold flex items-center">
          <SafeIcon icon={FiStar} className="w-5 h-5 mr-2" />
          AI Vehicle Matchmaker
        </h2>
        <p className="text-sm mt-1 text-primary-100">
          Describe what you're looking for, and our AI will match you with vehicles from our inventory
        </p>
      </div>
      
      <div className="p-6">
        <form onSubmit={handleSubmit} className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Describe your ideal vehicle and requirements
          </label>
          <textarea
            value={userPreferences}
            onChange={(e) => setUserPreferences(e.target.value)}
            placeholder="Example: I need a fuel-efficient SUV for my family of 4, with good safety features and under $35,000"
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            required
          />
          
          <div className="mt-3 mb-5">
            <p className="text-xs text-gray-500 mb-2">Try these examples:</p>
            <div className="flex flex-wrap gap-2">
              {examplePrompts.map((example, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleExampleClick(example)}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-full transition-colors"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
          
          <button
            type="submit"
            disabled={!userPreferences.trim() || aiLoading}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {aiLoading ? (
              <>
                <SafeIcon icon={FiLoader} className="w-5 h-5 animate-spin" />
                <span>Finding Your Perfect Match...</span>
              </>
            ) : (
              <>
                <SafeIcon icon={FiSearch} className="w-5 h-5" />
                <span>Find My Perfect Vehicle</span>
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
        
        {/* Results */}
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {aiLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Our AI is analyzing your preferences and searching our inventory...</p>
              </div>
            ) : (
              <>
                {matchedVehicles.length > 0 ? (
                  <div className="space-y-6">
                    {/* AI Rationale */}
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <SafeIcon icon={FiCheckCircle} className="w-5 h-5 text-blue-600 mr-2" />
                        AI Match Summary
                      </h3>
                      <p className="text-sm text-gray-700">{aiRationale}</p>
                    </div>
                    
                    {/* Matched Vehicles */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">
                        Top Matches ({matchedVehicles.length})
                      </h3>
                      <div className="space-y-4">
                        {matchedVehicles.map((vehicle, index) => (
                          <div
                            key={vehicle.id}
                            className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                          >
                            <div className="flex flex-col sm:flex-row">
                              <div className="sm:w-1/3 h-48 sm:h-auto">
                                <img
                                  src={vehicle.images?.[0] || 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=300&h=200&fit=crop'}
                                  alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.target.src = 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=300&h=200&fit=crop';
                                  }}
                                />
                              </div>
                              <div className="p-4 flex-1">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h4 className="text-lg font-semibold text-gray-900">
                                      {vehicle.year} {vehicle.make} {vehicle.model}
                                    </h4>
                                    <p className="text-sm text-gray-600 mb-2">
                                      {vehicle.mileage.toLocaleString()} miles • {vehicle.fuelType} • {vehicle.transmission}
                                    </p>
                                  </div>
                                  <div className="text-xl font-bold text-primary-600">
                                    {formatPrice(vehicle.price)}
                                  </div>
                                </div>
                                
                                <div className="mt-3 flex flex-wrap gap-2">
                                  {vehicle.features?.slice(0, 3).map((feature, i) => (
                                    <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                      {feature}
                                    </span>
                                  ))}
                                  {vehicle.features?.length > 3 && (
                                    <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded">
                                      +{vehicle.features.length - 3} more
                                    </span>
                                  )}
                                </div>
                                
                                <div className="mt-4">
                                  <Link
                                    to={`/vehicle/${vehicle.id}`}
                                    className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm"
                                  >
                                    View Details
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-600 mb-4">
                      We couldn't find exact matches for your preferences in our current inventory.
                    </p>
                    <Link
                      to="/inventory"
                      className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                    >
                      Browse All Inventory
                    </Link>
                  </div>
                )}
              </>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default VehicleMatchmaker;