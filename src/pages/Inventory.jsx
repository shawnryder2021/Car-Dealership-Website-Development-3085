import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { vehicleService } from '../services/vehicleService';

const { FiFilter, FiGrid, FiList, FiHeart, FiPhone } = FiIcons;

const Inventory = () => {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [filters, setFilters] = useState({
    make: '',
    model: '',
    year: '',
    priceMin: '',
    priceMax: '',
    mileageMax: '',
    fuelType: '',
    transmission: '',
    condition: '',
  });
  const [sortBy, setSortBy] = useState('price-low');
  const [viewMode, setViewMode] = useState('grid');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    console.log('Loading vehicles from database...');
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await vehicleService.getAllVehicles();
      
      if (error) {
        console.error('Error loading vehicles:', error);
        setError('Failed to load vehicles');
        return;
      }
      
      console.log('Loaded vehicles:', data);
      setVehicles(data || []);
      setFilteredVehicles(data || []);
      
    } catch (err) {
      console.error('Exception loading vehicles:', err);
      setError('Failed to load vehicles');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log('Applying filters to vehicles:', vehicles.length);
    let filtered = vehicles.filter(vehicle => {
      const matchesMake = !filters.make || vehicle.make === filters.make;
      const matchesModel = !filters.model || vehicle.model === filters.model;
      const matchesYear = !filters.year || vehicle.year.toString() === filters.year;
      const matchesPriceMin = !filters.priceMin || vehicle.price >= parseInt(filters.priceMin);
      const matchesPriceMax = !filters.priceMax || vehicle.price <= parseInt(filters.priceMax);
      const matchesMileage = !filters.mileageMax || vehicle.mileage <= parseInt(filters.mileageMax);
      const matchesFuel = !filters.fuelType || vehicle.fuelType === filters.fuelType;
      const matchesTransmission = !filters.transmission || vehicle.transmission === filters.transmission;
      const matchesCondition = !filters.condition || vehicle.condition === filters.condition;
      
      return matchesMake && matchesModel && matchesYear && matchesPriceMin && 
             matchesPriceMax && matchesMileage && matchesFuel && matchesTransmission && matchesCondition;
    });

    // Sort vehicles
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'year-new': return b.year - a.year;
        case 'year-old': return a.year - b.year;
        case 'mileage-low': return a.mileage - b.mileage;
        case 'mileage-high': return b.mileage - a.mileage;
        default: return 0;
      }
    });

    console.log('Filtered vehicles:', filtered.length);
    setFilteredVehicles(filtered);
  }, [vehicles, filters, sortBy]);

  const handleFilterChange = (key, value) => {
    console.log('Filter changed:', key, value);
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      make: '',
      model: '',
      year: '',
      priceMin: '',
      priceMax: '',
      mileageMax: '',
      fuelType: '',
      transmission: '',
      condition: '',
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

  // Create unique lists for filters
  const uniqueMakes = vehicles.length > 0 ? [...new Set(vehicles.map(v => v.make))].sort() : [];
  const uniqueYears = vehicles.length > 0 ? [...new Set(vehicles.map(v => v.year))].sort((a, b) => b - a) : [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading vehicles...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Error Loading Vehicles</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <button 
              onClick={loadVehicles}
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 py-8"
    >
      <Helmet>
        <title>Car Inventory - New & Used Cars for Sale | Premier Auto Halifax</title>
        <meta name="description" content="Browse our extensive inventory of new and used cars in Halifax. Find your perfect vehicle with detailed specs, photos, and competitive pricing." />
      </Helmet>

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Vehicle Inventory</h1>
          <p className="text-gray-600">
            Browse our selection of {vehicles.length} quality vehicles
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                <button 
                  onClick={clearFilters}
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Make</label>
                  <select 
                    value={filters.make} 
                    onChange={(e) => handleFilterChange('make', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">All Makes</option>
                    {uniqueMakes.map(make => (
                      <option key={make} value={make}>{make}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
                  <select 
                    value={filters.condition} 
                    onChange={(e) => handleFilterChange('condition', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">All Conditions</option>
                    <option value="New">New</option>
                    <option value="Used">Used</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                  <select 
                    value={filters.year} 
                    onChange={(e) => handleFilterChange('year', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">All Years</option>
                    {uniqueYears.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                  <div className="flex space-x-2">
                    <input 
                      type="number" 
                      placeholder="Min" 
                      value={filters.priceMin}
                      onChange={(e) => handleFilterChange('priceMin', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                    <input 
                      type="number" 
                      placeholder="Max" 
                      value={filters.priceMax}
                      onChange={(e) => handleFilterChange('priceMax', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fuel Type</label>
                  <select 
                    value={filters.fuelType} 
                    onChange={(e) => handleFilterChange('fuelType', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">All Fuel Types</option>
                    <option value="Gasoline">Gasoline</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Toolbar */}
            <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="text-sm text-gray-600">
                  Showing {filteredVehicles.length} of {vehicles.length} vehicles
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium text-gray-700">Sort by:</label>
                    <select 
                      value={sortBy} 
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="year-new">Year: Newest First</option>
                      <option value="year-old">Year: Oldest First</option>
                      <option value="mileage-low">Mileage: Low to High</option>
                      <option value="mileage-high">Mileage: High to Low</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded transition-colors ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
                    >
                      <SafeIcon icon={FiGrid} className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded transition-colors ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
                    >
                      <SafeIcon icon={FiList} className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Vehicle Grid */}
            {filteredVehicles.length > 0 ? (
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                {filteredVehicles.map((vehicle) => (
                  <motion.div
                    key={vehicle.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative">
                      <img 
                        src={vehicle.images?.[0] || 'https://images.unsplash.com/photo-1494976688153-d4d4c0c8e0b0?w=400&h=300&fit=crop'} 
                        alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1494976688153-d4d4c0c8e0b0?w=400&h=300&fit=crop';
                        }}
                      />
                      <div className="absolute top-3 left-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-lg ${
                          vehicle.condition === 'New' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
                        }`}>
                          {vehicle.condition}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <button className="bg-white bg-opacity-90 hover:bg-opacity-100 p-2 rounded-full transition-colors shadow-lg">
                          <SafeIcon icon={FiHeart} className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {vehicle.year} {vehicle.make} {vehicle.model}
                          </h3>
                          <p className="text-sm text-gray-600">Stock #{vehicle.stockNumber}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary-600">
                            {formatPrice(vehicle.price)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600 mb-4 space-x-4">
                        <span>{formatMileage(vehicle.mileage)} mi</span>
                        <span>•</span>
                        <span>{vehicle.fuelType}</span>
                        <span>•</span>
                        <span>{vehicle.combinedMPG} MPG</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {vehicle.features?.slice(0, 3).map((feature, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                          >
                            {feature}
                          </span>
                        ))}
                        {vehicle.features?.length > 3 && (
                          <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded">
                            +{vehicle.features.length - 3} more
                          </span>
                        )}
                      </div>
                      
                      <div className="flex space-x-2">
                        <Link 
                          to={`/vehicle/${vehicle.id}`}
                          className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-center"
                        >
                          View Details
                        </Link>
                        <a
                          href="tel:+19025554567"
                          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-semibold transition-colors"
                          title="Call about this vehicle"
                        >
                          <SafeIcon icon={FiPhone} className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg mb-4">
                  {vehicles.length === 0 ? 'No vehicles available' : 'No vehicles match your search criteria'}
                </div>
                <p className="text-gray-400 mb-6">
                  {vehicles.length === 0 ? 'Please check back later' : 'Try adjusting your filters to see more results'}
                </p>
                {vehicles.length > 0 && (
                  <button 
                    onClick={clearFilters}
                    className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Inventory;