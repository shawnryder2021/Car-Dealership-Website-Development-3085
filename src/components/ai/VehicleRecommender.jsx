import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import openaiService from '../../services/openaiService';

const { FiSearch, FiUsers, FiDollarSign, FiTruck, FiSettings, FiThumbsUp, FiLoader } = FiIcons;

const VehicleRecommender = () => {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState({
    budget: '',
    primaryUse: '',
    passengers: '',
    features: [],
    fuelType: '',
    bodyStyle: '',
  });
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const primaryUseOptions = [
    { value: 'commuting', label: 'Daily Commuting', icon: FiTruck },
    { value: 'family', label: 'Family Transportation', icon: FiUsers },
    { value: 'offroad', label: 'Off-Road Adventures', icon: FiTruck },
    { value: 'luxury', label: 'Luxury & Comfort', icon: FiThumbsUp },
    { value: 'business', label: 'Business Use', icon: FiDollarSign },
    { value: 'other', label: 'Other', icon: FiSettings },
  ];

  const featureOptions = [
    'Navigation System',
    'Backup Camera',
    'Bluetooth',
    'Heated Seats',
    'Sunroof',
    'Third Row Seating',
    'All-Wheel Drive',
    'Leather Interior',
    'Apple CarPlay/Android Auto',
    'Advanced Safety Features',
  ];

  const fuelTypeOptions = [
    'Gasoline',
    'Diesel',
    'Hybrid',
    'Electric',
    'Plug-in Hybrid',
    'Any',
  ];

  const bodyStyleOptions = [
    'Sedan',
    'SUV',
    'Truck',
    'Van/Minivan',
    'Coupe',
    'Convertible',
    'Wagon',
    'Hatchback',
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPreferences({ ...preferences, [name]: value });
  };

  const toggleFeature = (feature) => {
    const features = [...preferences.features];
    if (features.includes(feature)) {
      setPreferences({ ...preferences, features: features.filter(f => f !== feature) });
    } else {
      setPreferences({ ...preferences, features: [...features, feature] });
    }
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { recommendation: aiRecommendation, error: aiError } = await openaiService.getVehicleRecommendation(preferences);
      
      if (aiError) {
        setError(aiError);
        return;
      }
      
      setRecommendation(aiRecommendation);
      setStep(4);
    } catch (err) {
      setError('Failed to generate recommendation. Please try again later.');
      console.error('Recommendation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What's your budget?
        </label>
        <select
          name="budget"
          value={preferences.budget}
          onChange={handleInputChange}
          className="form-select"
        >
          <option value="">Select Budget Range</option>
          <option value="Under $15,000">Under $15,000</option>
          <option value="$15,000 - $25,000">$15,000 - $25,000</option>
          <option value="$25,000 - $35,000">$25,000 - $35,000</option>
          <option value="$35,000 - $50,000">$35,000 - $50,000</option>
          <option value="$50,000 - $75,000">$50,000 - $75,000</option>
          <option value="$75,000+">$75,000+</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What will be the primary use for this vehicle?
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {primaryUseOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setPreferences({ ...preferences, primaryUse: option.value })}
              className={`flex flex-col items-center justify-center p-4 border rounded-lg transition-colors ${
                preferences.primaryUse === option.value
                  ? 'bg-primary-100 border-primary-500'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <SafeIcon
                icon={option.icon}
                className={`w-8 h-8 mb-2 ${
                  preferences.primaryUse === option.value ? 'text-primary-600' : 'text-gray-500'
                }`}
              />
              <span className="text-sm font-medium">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          How many passengers do you need to accommodate?
        </label>
        <select
          name="passengers"
          value={preferences.passengers}
          onChange={handleInputChange}
          className="form-select"
        >
          <option value="">Select Number of Passengers</option>
          <option value="1-2">1-2 passengers</option>
          <option value="3-5">3-5 passengers</option>
          <option value="6-7">6-7 passengers</option>
          <option value="8+">8+ passengers</option>
        </select>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleNext}
          disabled={!preferences.budget || !preferences.primaryUse || !preferences.passengers}
          className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next Step
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Must-have features (select all that apply):
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {featureOptions.map((feature) => (
            <button
              key={feature}
              type="button"
              onClick={() => toggleFeature(feature)}
              className={`p-3 border rounded-lg text-sm transition-colors ${
                preferences.features.includes(feature)
                  ? 'bg-primary-100 border-primary-500 text-primary-800'
                  : 'border-gray-300 hover:bg-gray-50 text-gray-700'
              }`}
            >
              {feature}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={handleBack}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Next Step
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Preferred fuel type:
        </label>
        <select
          name="fuelType"
          value={preferences.fuelType}
          onChange={handleInputChange}
          className="form-select"
        >
          <option value="">Select Fuel Type</option>
          {fuelTypeOptions.map((fuel) => (
            <option key={fuel} value={fuel}>{fuel}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Preferred body style:
        </label>
        <select
          name="bodyStyle"
          value={preferences.bodyStyle}
          onChange={handleInputChange}
          className="form-select"
        >
          <option value="">Select Body Style</option>
          {bodyStyleOptions.map((style) => (
            <option key={style} value={style}>{style}</option>
          ))}
        </select>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Preferences Summary</h3>
        <ul className="space-y-1 text-sm text-gray-700">
          <li><span className="font-medium">Budget:</span> {preferences.budget || 'Not specified'}</li>
          <li><span className="font-medium">Primary Use:</span> {primaryUseOptions.find(o => o.value === preferences.primaryUse)?.label || 'Not specified'}</li>
          <li><span className="font-medium">Passengers:</span> {preferences.passengers || 'Not specified'}</li>
          <li><span className="font-medium">Must-have Features:</span> {preferences.features.length > 0 ? preferences.features.join(', ') : 'None selected'}</li>
          <li><span className="font-medium">Fuel Type:</span> {preferences.fuelType || 'Not specified'}</li>
          <li><span className="font-medium">Body Style:</span> {preferences.bodyStyle || 'Not specified'}</li>
        </ul>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={handleBack}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          {loading ? (
            <>
              <SafeIcon icon={FiLoader} className="w-5 h-5 animate-spin" />
              <span>Generating...</span>
            </>
          ) : (
            <span>Get Recommendation</span>
          )}
        </button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="bg-green-50 p-6 rounded-lg border border-green-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Your AI-Generated Recommendation</h3>
        <div className="prose prose-sm max-w-none">
          <p className="whitespace-pre-line">{recommendation}</p>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <button
          type="button"
          onClick={() => {
            setStep(1);
            setPreferences({
              budget: '',
              primaryUse: '',
              passengers: '',
              features: [],
              fuelType: '',
              bodyStyle: '',
            });
            setRecommendation(null);
          }}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Start Over
        </button>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="/inventory"
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center"
          >
            Browse Inventory
          </a>
          <a
            href="/contact"
            className="border border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center"
          >
            Contact Sales
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">AI Vehicle Recommender</h2>
        <p className="text-gray-600">
          Tell us about your needs and preferences, and our AI will recommend the perfect vehicle for you.
        </p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="mb-8">
        <div className="flex items-center">
          {[1, 2, 3, 4].map((stepNumber) => (
            <React.Fragment key={stepNumber}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  stepNumber === step
                    ? 'bg-primary-600 text-white'
                    : stepNumber < step
                    ? 'bg-primary-200 text-primary-800'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {stepNumber}
              </div>
              {stepNumber < 4 && (
                <div
                  className={`flex-1 h-1 ${
                    stepNumber < step ? 'bg-primary-200' : 'bg-gray-200'
                  }`}
                ></div>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-500">
          <span>Budget & Use</span>
          <span>Features</span>
          <span>Preferences</span>
          <span>Results</span>
        </div>
      </div>

      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
      {step === 4 && renderStep4()}
    </div>
  );
};

export default VehicleRecommender;