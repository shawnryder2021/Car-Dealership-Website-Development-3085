import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { vehicleService } from '../../services/vehicleService';
import openaiService from '../../services/openaiService';

const { FiCheck, FiX, FiLoader, FiRefreshCw, FiList, FiArrowRight, FiExternalLink } = FiIcons;

const ComparisonTool = () => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [aiComparison, setAiComparison] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadVehicles();
  }, []);

  useEffect(() => {
    if (vehicles.length > 0) {
      const filtered = vehicles.filter(vehicle => 
        `${vehicle.year} ${vehicle.make} ${vehicle.model}`.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredVehicles(filtered);
    }
  }, [searchTerm, vehicles]);

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
      setFilteredVehicles(data);
    } catch (err) {
      console.error('Exception loading vehicles:', err);
      setError('Failed to load vehicle inventory');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectVehicle = (vehicle) => {
    if (selectedVehicles.some(v => v.id === vehicle.id)) {
      setSelectedVehicles(selectedVehicles.filter(v => v.id !== vehicle.id));
    } else {
      if (selectedVehicles.length < 3) {
        setSelectedVehicles([...selectedVehicles, vehicle]);
      }
    }
  };

  const handleRemoveVehicle = (index) => {
    const newSelection = [...selectedVehicles];
    newSelection.splice(index, 1);
    setSelectedVehicles(newSelection);
    // Clear AI comparison if vehicles change
    setAiComparison(null);
  };

  const generateComparison = async () => {
    if (selectedVehicles.length < 2) {
      setError('Please select at least 2 vehicles to compare');
      return;
    }
    
    setIsGenerating(true);
    setError(null);
    
    try {
      const { comparison, error: aiError } = await openaiService.compareVehicles(selectedVehicles);
      
      if (aiError) {
        setError(aiError);
        return;
      }
      
      setAiComparison(comparison);
    } catch (err) {
      console.error('AI comparison error:', err);
      setError('Failed to generate comparison. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading vehicles...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-primary-600 text-white p-5">
        <h2 className="text-xl font-semibold flex items-center">
          <SafeIcon icon={FiList} className="w-5 h-5 mr-2" />
          AI Vehicle Comparison Tool
        </h2>
        <p className="text-sm mt-1 text-primary-100">
          Select up to 3 vehicles to compare with AI-powered insights
        </p>
      </div>
      
      <div className="p-6">
        {/* Selected Vehicles */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Selected Vehicles</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {[0, 1, 2].map((index) => (
              <div 
                key={index} 
                className={`border rounded-lg p-4 h-32 ${
                  selectedVehicles[index] ? 'border-primary-300 bg-primary-50' : 'border-dashed border-gray-300'
                }`}
              >
                {selectedVehicles[index] ? (
                  <div className="flex flex-col h-full">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">
                          {selectedVehicles[index].year} {selectedVehicles[index].make}
                        </h4>
                        <p className="text-sm text-gray-600">{selectedVehicles[index].model}</p>
                      </div>
                      <button 
                        onClick={() => handleRemoveVehicle(index)}
                        className="text-gray-400 hover:text-red-600"
                      >
                        <SafeIcon icon={FiX} className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="mt-auto text-primary-600 font-semibold">
                      {formatPrice(selectedVehicles[index].price)}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                    {index === 0 && selectedVehicles.length === 0 
                      ? "Select vehicles below to compare" 
                      : "Add another vehicle (optional)"}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {selectedVehicles.length >= 2 && (
            <button
              onClick={generateComparison}
              disabled={isGenerating}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isGenerating ? (
                <>
                  <SafeIcon icon={FiLoader} className="w-5 h-5 animate-spin" />
                  <span>Generating AI Comparison...</span>
                </>
              ) : (
                <>
                  <SafeIcon icon={FiRefreshCw} className="w-5 h-5" />
                  <span>Generate AI Comparison</span>
                </>
              )}
            </button>
          )}
        </div>
        
        {/* Error message */}
        {error && (
          <div className="p-4 mb-6 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}
        
        {/* AI Comparison Results */}
        {aiComparison && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-5 bg-blue-50 rounded-lg border border-blue-200"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-3">AI Comparison Analysis</h3>
            <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-line">
              {aiComparison}
            </div>
          </motion.div>
        )}
        
        {/* Vehicle Selection */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Select Vehicles to Compare</h3>
          
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by make or model..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <div className="max-h-96 overflow-y-auto pr-2">
            {filteredVehicles.length > 0 ? (
              <div className="space-y-3">
                {filteredVehicles.map((vehicle) => {
                  const isSelected = selectedVehicles.some(v => v.id === vehicle.id);
                  return (
                    <div
                      key={vehicle.id}
                      className={`flex items-center border rounded-lg p-3 cursor-pointer transition-colors ${
                        isSelected 
                          ? 'border-primary-300 bg-primary-50' 
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                      onClick={() => handleSelectVehicle(vehicle)}
                    >
                      <div className="w-16 h-12 bg-gray-200 rounded overflow-hidden mr-3 flex-shrink-0">
                        {vehicle.images?.[0] && (
                          <img
                            src={vehicle.images[0]}
                            alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=300&h=200&fit=crop';
                            }}
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">
                          {vehicle.year} {vehicle.make} {vehicle.model}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {vehicle.condition} • {formatPrice(vehicle.price)}
                        </p>
                      </div>
                      <div className="ml-2">
                        {isSelected ? (
                          <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                            <SafeIcon icon={FiCheck} className="w-4 h-4 text-white" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600">No vehicles match your search</p>
              </div>
            )}
          </div>
        </div>
        
        {/* View All Link */}
        <div className="mt-6 text-center">
          <Link
            to="/inventory"
            className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
          >
            <span>View All Inventory</span>
            <SafeIcon icon={FiArrowRight} className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ComparisonTool;