import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { vehicleService } from '../services/vehicleService';
import VehicleQA from '../components/ai/VehicleQA';
import FinancingCalculator from '../components/ai/FinancingCalculator';
import openaiService from '../services/openaiService';

const { FiHeart, FiShare2, FiPhone, FiMail, FiCheckCircle, FiMapPin, FiClock, FiX, FiArrowLeft, FiLoader, FiEdit, FiFileText } = FiIcons;

const VehicleDetail = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [leadFormData, setLeadFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    inquiryType: 'test-drive',
  });
  const [aiDescription, setAiDescription] = useState(null);
  const [loadingDescription, setLoadingDescription] = useState(false);
  const [activeTab, setActiveTab] = useState('info');

  useEffect(() => {
    loadVehicle();
  }, [id]);

  const loadVehicle = async () => {
    console.log('VehicleDetail: Loading vehicle with ID:', id);
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await vehicleService.getVehicleById(id);
      
      if (error) {
        console.error('Error loading vehicle:', error);
        setError('Failed to load vehicle');
        return;
      }
      
      if (!data) {
        setError('Vehicle not found');
        return;
      }
      
      console.log('VehicleDetail: Loaded vehicle:', data);
      setVehicle(data);
      
      // Generate AI description if not already in the vehicle data
      if (data && (!data.description || data.description.length < 100)) {
        generateAiDescription(data);
      }
    } catch (err) {
      console.error('Exception loading vehicle:', err);
      setError('Failed to load vehicle');
    } finally {
      setLoading(false);
    }
  };

  const generateAiDescription = async (vehicleData) => {
    setLoadingDescription(true);
    try {
      const { description, error } = await openaiService.generateVehicleDescription(vehicleData);
      if (!error && description) {
        setAiDescription(description);
      }
    } catch (err) {
      console.error('Error generating description:', err);
    } finally {
      setLoadingDescription(false);
    }
  };

  const handleLeadFormSubmit = (e) => {
    e.preventDefault();
    console.log('Lead form submitted:', leadFormData);
    alert('Thank you for your interest! We will contact you soon.');
    setShowLeadForm(false);
    setLeadFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      inquiryType: 'test-drive',
    });
  };

  const handleLeadFormChange = (e) => {
    setLeadFormData({
      ...leadFormData,
      [e.target.name]: e.target.value,
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatMileage = (mileage) => {
    return new Intl.NumberFormat('en-US').format(mileage);
  };

  const calculateMonthlyPayment = (price) => {
    // Simple calculation for demo: price / 72 months at 4.9% APR
    const principal = price * 0.8; // Assuming 20% down
    const monthlyRate = 4.9 / 100 / 12;
    const months = 72;
    const payment = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                   (Math.pow(1 + monthlyRate, months) - 1);
    return Math.round(payment);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading vehicle details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Vehicle Not Found</h1>
            <p className="text-gray-600 mb-6">
              {error || 'The vehicle you\'re looking for doesn\'t exist or may have been sold.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/inventory" 
                className="inline-flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                <SafeIcon icon={FiArrowLeft} className="w-4 h-4" />
                <span>Back to Inventory</span>
              </Link>
              <button
                onClick={loadVehicle}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const vehicleImages = vehicle.images && vehicle.images.length > 0 
    ? vehicle.images 
    : ['https://images.unsplash.com/photo-1494976688153-d4d4c0c8e0b0?w=800&h=600&fit=crop'];

  const displayDescription = aiDescription || vehicle.description || 'No description available for this vehicle.';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 py-8"
    >
      <Helmet>
        <title>{vehicle.year} {vehicle.make} {vehicle.model} - {formatPrice(vehicle.price)} | Premier Auto Halifax</title>
        <meta 
          name="description" 
          content={`${vehicle.year} ${vehicle.make} ${vehicle.model} for sale at Premier Auto Halifax. ${formatMileage(vehicle.mileage)} miles, ${vehicle.fuelType}, ${vehicle.transmission}.`} 
        />
      </Helmet>

      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li><Link to="/" className="hover:text-primary-600">Home</Link></li>
            <li>/</li>
            <li><Link to="/inventory" className="hover:text-primary-600">Inventory</Link></li>
            <li>/</li>
            <li className="text-gray-900">{vehicle.year} {vehicle.make} {vehicle.model}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
              <div className="relative">
                <img 
                  src={vehicleImages[selectedImage]} 
                  alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                  className="w-full h-96 object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1494976688153-d4d4c0c8e0b0?w=800&h=600&fit=crop';
                  }}
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded text-sm font-semibold ${
                    vehicle.condition === 'New' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {vehicle.condition}
                  </span>
                </div>
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button className="bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full transition-colors">
                    <SafeIcon icon={FiHeart} className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full transition-colors">
                    <SafeIcon icon={FiShare2} className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
              {vehicleImages.length > 1 && (
                <div className="p-4">
                  <div className="flex space-x-2 overflow-x-auto">
                    {vehicleImages.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                          selectedImage === index ? 'border-primary-600' : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <img 
                          src={image} 
                          alt={`View ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1494976688153-d4d4c0c8e0b0?w=400&h=300&fit=crop';
                          }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Vehicle Details */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
              <div className="p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </h1>
                <div className="flex items-center text-gray-600 mb-6">
                  <span>Stock #{vehicle.stockNumber}</span>
                  <span className="mx-2">•</span>
                  <span>VIN: {vehicle.vin}</span>
                </div>

                {/* Key Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-primary-600">{formatMileage(vehicle.mileage)}</div>
                    <div className="text-sm text-gray-600">Miles</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-primary-600">{vehicle.combinedMPG}</div>
                    <div className="text-sm text-gray-600">MPG Combined</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-primary-600">{vehicle.fuelType}</div>
                    <div className="text-sm text-gray-600">Fuel Type</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-primary-600">{vehicle.transmission}</div>
                    <div className="text-sm text-gray-600">Transmission</div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="mb-6 border-b border-gray-200">
                  <div className="flex space-x-8">
                    <button
                      onClick={() => setActiveTab('info')}
                      className={`pb-4 px-2 font-medium transition-colors ${
                        activeTab === 'info'
                          ? 'border-b-2 border-primary-600 text-primary-600'
                          : 'text-gray-500 hover:text-gray-800'
                      }`}
                    >
                      Vehicle Details
                    </button>
                    <button
                      onClick={() => setActiveTab('qa')}
                      className={`pb-4 px-2 font-medium transition-colors ${
                        activeTab === 'qa'
                          ? 'border-b-2 border-primary-600 text-primary-600'
                          : 'text-gray-500 hover:text-gray-800'
                      }`}
                    >
                      Ask Questions
                    </button>
                    <button
                      onClick={() => setActiveTab('financing')}
                      className={`pb-4 px-2 font-medium transition-colors ${
                        activeTab === 'financing'
                          ? 'border-b-2 border-primary-600 text-primary-600'
                          : 'text-gray-500 hover:text-gray-800'
                      }`}
                    >
                      Financing
                    </button>
                  </div>
                </div>

                {/* Tab Content */}
                {activeTab === 'info' && (
                  <div>
                    {/* Description */}
                    <div className="mb-8">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-gray-900">Description</h3>
                        {loadingDescription && (
                          <div className="flex items-center text-sm text-gray-500">
                            <SafeIcon icon={FiLoader} className="w-4 h-4 animate-spin mr-2" />
                            <span>Generating enhanced description...</span>
                          </div>
                        )}
                        {aiDescription && (
                          <div className="flex items-center text-sm text-primary-600">
                            <SafeIcon icon={FiEdit} className="w-4 h-4 mr-1" />
                            <span>AI enhanced</span>
                          </div>
                        )}
                      </div>
                      <div className="prose prose-sm max-w-none">
                        <p className="text-gray-600 leading-relaxed whitespace-pre-line">{displayDescription}</p>
                      </div>
                    </div>

                    {/* Vehicle Specifications */}
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Vehicle Specifications</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div className="flex justify-between py-2 border-b border-gray-200">
                            <span className="text-gray-600">Engine</span>
                            <span className="font-medium">{vehicle.engine}</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-gray-200">
                            <span className="text-gray-600">Drivetrain</span>
                            <span className="font-medium">{vehicle.drivetrain}</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-gray-200">
                            <span className="text-gray-600">Doors</span>
                            <span className="font-medium">{vehicle.doors}</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-gray-200">
                            <span className="text-gray-600">Seating</span>
                            <span className="font-medium">{vehicle.seating}</span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between py-2 border-b border-gray-200">
                            <span className="text-gray-600">Exterior Color</span>
                            <span className="font-medium">{vehicle.exteriorColor}</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-gray-200">
                            <span className="text-gray-600">Interior Color</span>
                            <span className="font-medium">{vehicle.interiorColor}</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-gray-200">
                            <span className="text-gray-600">City MPG</span>
                            <span className="font-medium">{vehicle.cityMPG}</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-gray-200">
                            <span className="text-gray-600">Highway MPG</span>
                            <span className="font-medium">{vehicle.highwayMPG}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Features & Options */}
                    {vehicle.features && vehicle.features.length > 0 && (
                      <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Features & Options</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {vehicle.features.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <SafeIcon icon={FiCheckCircle} className="w-5 h-5 text-green-500 flex-shrink-0" />
                              <span className="text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Warranty & History */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {vehicle.warranty && (
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-gray-900 mb-2">Warranty</h4>
                          <p className="text-gray-700 text-sm">{vehicle.warranty}</p>
                        </div>
                      )}
                      {vehicle.history && (
                        <div className="bg-green-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-gray-900 mb-2">Vehicle History</h4>
                          <p className="text-gray-700 text-sm">{vehicle.history}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'qa' && (
                  <div>
                    <VehicleQA vehicle={vehicle} />
                  </div>
                )}

                {activeTab === 'financing' && (
                  <div>
                    <FinancingCalculator vehiclePrice={vehicle.price} />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              {/* Price Section */}
              <div className="text-center mb-6 pb-6 border-b border-gray-200">
                <div className="text-4xl font-bold text-primary-600 mb-2">
                  {formatPrice(vehicle.price)}
                </div>
                <div className="text-sm text-gray-600">
                  Est. ${calculateMonthlyPayment(vehicle.price)}/month*
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 mb-6">
                <button 
                  onClick={() => setShowLeadForm(true)}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Schedule Test Drive
                </button>
                <button 
                  onClick={() => setShowLeadForm(true)}
                  className="w-full border border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Request Information
                </button>
                <Link
                  to={`/vehicle/${id}/summary`}
                  className="w-full flex items-center justify-center space-x-2 bg-secondary-500 hover:bg-secondary-600 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  <SafeIcon icon={FiFileText} className="w-5 h-5" />
                  <span>AI Summary & Reviews</span>
                </Link>
                <div className="grid grid-cols-2 gap-3">
                  <a 
                    href="tel:+19025554567" 
                    className="flex items-center justify-center space-x-2 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold transition-colors"
                  >
                    <SafeIcon icon={FiPhone} className="w-4 h-4" />
                    <span>Call</span>
                  </a>
                  <a 
                    href="mailto:info@premierautohalifax.ca" 
                    className="flex items-center justify-center space-x-2 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold transition-colors"
                  >
                    <SafeIcon icon={FiMail} className="w-4 h-4" />
                    <span>Email</span>
                  </a>
                </div>
              </div>

              {/* Contact Information */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Dealership Info</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <SafeIcon icon={FiMapPin} className="w-5 h-5 text-primary-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">Premier Auto Halifax</div>
                      <div className="text-sm text-gray-600">123 Robie Street<br />Halifax, NS B3H 3C2</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <SafeIcon icon={FiPhone} className="w-5 h-5 text-primary-600" />
                    <div className="text-sm text-gray-600">(902) 555-4567</div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <SafeIcon icon={FiClock} className="w-5 h-5 text-primary-600 mt-0.5" />
                    <div className="text-sm text-gray-600">
                      Mon-Fri: 9AM-7PM<br />
                      Sat: 9AM-6PM<br />
                      Sun: 12PM-5PM
                    </div>
                  </div>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-xs text-gray-500">
                  *Payment estimate based on 72-month financing at 4.9% APR with approved credit. 
                  Actual terms may vary.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lead Form Modal */}
      {showLeadForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                Interested in this {vehicle.year} {vehicle.make} {vehicle.model}?
              </h2>
              <button 
                onClick={() => setShowLeadForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <SafeIcon icon={FiX} className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleLeadFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  I'm interested in:
                </label>
                <select 
                  name="inquiryType" 
                  value={leadFormData.inquiryType} 
                  onChange={handleLeadFormChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                >
                  <option value="test-drive">Scheduling a test drive</option>
                  <option value="information">Getting more information</option>
                  <option value="financing">Financing options</option>
                  <option value="trade-in">Trade-in value</option>
                </select>
              </div>
              
              <input 
                type="text" 
                name="name" 
                value={leadFormData.name} 
                onChange={handleLeadFormChange}
                placeholder="Your Name" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" 
                required 
              />
              
              <input 
                type="email" 
                name="email" 
                value={leadFormData.email} 
                onChange={handleLeadFormChange}
                placeholder="Your Email" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" 
                required 
              />
              
              <input 
                type="tel" 
                name="phone" 
                value={leadFormData.phone} 
                onChange={handleLeadFormChange}
                placeholder="Your Phone Number" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" 
                required 
              />
              
              <textarea 
                name="message" 
                value={leadFormData.message} 
                onChange={handleLeadFormChange}
                placeholder="Additional message (optional)" 
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              ></textarea>
              
              <div className="flex space-x-3">
                <button 
                  type="button" 
                  onClick={() => setShowLeadForm(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Send Message
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default VehicleDetail;