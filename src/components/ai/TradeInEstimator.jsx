import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import openaiService from '../../services/openaiService';

const { FiCar, FiLoader, FiDollarSign, FiCheckSquare } = FiIcons;

const TradeInEstimator = () => {
  const [step, setStep] = useState(1);
  const [vehicleInfo, setVehicleInfo] = useState({
    make: '',
    model: '',
    year: '',
    mileage: '',
    condition: '',
    accidents: '',
    features: '',
  });
  const [estimate, setEstimate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const makeOptions = [
    'Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan', 'Hyundai', 'Kia', 'Subaru',
    'Mazda', 'Volkswagen', 'BMW', 'Mercedes-Benz', 'Audi', 'Lexus', 'Acura',
    'Jeep', 'Ram', 'GMC', 'Buick', 'Cadillac', 'Chrysler', 'Dodge', 'Tesla',
    'Volvo', 'Land Rover', 'Porsche', 'Infiniti', 'Lincoln', 'Genesis', 'Other'
  ];

  const yearOptions = Array.from({ length: 25 }, (_, i) => new Date().getFullYear() - i);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVehicleInfo({ ...vehicleInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const { estimate: aiEstimate, error: aiError } = await openaiService.estimateTradeInValue(vehicleInfo);
      
      if (aiError) {
        setError(aiError);
        return;
      }
      
      setEstimate(aiEstimate);
      setStep(3);
    } catch (err) {
      setError('Failed to generate trade-in estimate. Please try again later.');
      console.error('Trade-in estimation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Make *
        </label>
        <select
          name="make"
          value={vehicleInfo.make}
          onChange={handleInputChange}
          className="form-select"
          required
        >
          <option value="">Select Make</option>
          {makeOptions.map((make) => (
            <option key={make} value={make}>{make}</option>
          ))}
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Model *
        </label>
        <input
          type="text"
          name="model"
          value={vehicleInfo.model}
          onChange={handleInputChange}
          className="form-input"
          placeholder="e.g., Camry, F-150, Civic"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Year *
        </label>
        <select
          name="year"
          value={vehicleInfo.year}
          onChange={handleInputChange}
          className="form-select"
          required
        >
          <option value="">Select Year</option>
          {yearOptions.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Mileage (km) *
        </label>
        <input
          type="number"
          name="mileage"
          value={vehicleInfo.mileage}
          onChange={handleInputChange}
          className="form-input"
          placeholder="e.g., 50000"
          required
        />
      </div>
      
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleNext}
          disabled={!vehicleInfo.make || !vehicleInfo.model || !vehicleInfo.year || !vehicleInfo.mileage}
          className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next Step
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Overall Condition *
        </label>
        <select
          name="condition"
          value={vehicleInfo.condition}
          onChange={handleInputChange}
          className="form-select"
          required
        >
          <option value="">Select Condition</option>
          <option value="Excellent">Excellent - Like new</option>
          <option value="Good">Good - Minor wear and tear</option>
          <option value="Fair">Fair - Noticeable wear and tear</option>
          <option value="Poor">Poor - Significant issues</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Accident History *
        </label>
        <select
          name="accidents"
          value={vehicleInfo.accidents}
          onChange={handleInputChange}
          className="form-select"
          required
        >
          <option value="">Select Accident History</option>
          <option value="No accidents">No accidents</option>
          <option value="Minor accidents">Minor accidents (fender benders)</option>
          <option value="One major accident">One major accident</option>
          <option value="Multiple accidents">Multiple accidents</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Notable Features (Optional)
        </label>
        <textarea
          name="features"
          value={vehicleInfo.features}
          onChange={handleInputChange}
          className="form-input"
          placeholder="List any special features or packages (e.g., leather seats, sunroof, navigation, premium sound system)"
          rows={3}
        />
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
          disabled={!vehicleInfo.condition || !vehicleInfo.accidents || loading}
          className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          {loading ? (
            <>
              <SafeIcon icon={FiLoader} className="w-5 h-5 animate-spin" />
              <span>Estimating...</span>
            </>
          ) : (
            <>
              <SafeIcon icon={FiDollarSign} className="w-5 h-5" />
              <span>Get Estimate</span>
            </>
          )}
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <div className="bg-green-50 p-5 rounded-lg border border-green-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Your AI Trade-In Estimate</h3>
        <div className="prose prose-sm max-w-none">
          <div className="whitespace-pre-line">{estimate}</div>
        </div>
      </div>
      
      <div className="bg-primary-50 p-5 rounded-lg border border-primary-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
          <SafeIcon icon={FiCheckSquare} className="w-5 h-5 mr-2 text-primary-600" />
          Next Steps
        </h3>
        <p className="text-gray-700 mb-4">
          For an official trade-in appraisal, bring your vehicle to our dealership along with:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-gray-700">
          <li>Vehicle registration</li>
          <li>Driver's license</li>
          <li>All keys and remotes</li>
          <li>Service records (if available)</li>
          <li>Loan payoff information (if applicable)</li>
        </ul>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <button
          type="button"
          onClick={() => {
            setStep(1);
            setVehicleInfo({
              make: '',
              model: '',
              year: '',
              mileage: '',
              condition: '',
              accidents: '',
              features: '',
            });
            setEstimate(null);
          }}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Start Over
        </button>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="/contact"
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center"
          >
            Schedule Appraisal
          </a>
          <a
            href="/inventory"
            className="border border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center"
          >
            Browse Inventory
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <SafeIcon icon={FiCar} className="w-6 h-6 mr-2 text-primary-600" />
          AI Trade-In Value Estimator
        </h2>
        <p className="text-gray-600">
          Get an instant estimate of your vehicle's trade-in value powered by AI.
        </p>
      </div>
      
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}
      
      <div className="mb-8">
        <div className="flex items-center">
          {[1, 2, 3].map((stepNumber) => (
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
              {stepNumber < 3 && (
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
          <span>Vehicle Details</span>
          <span>Condition</span>
          <span>Estimate</span>
        </div>
      </div>
      
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
    </div>
  );
};

export default TradeInEstimator;