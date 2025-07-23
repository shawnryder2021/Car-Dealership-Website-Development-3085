import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiPlus, FiEdit, FiTrash2, FiSearch, FiFilter, FiEye } = FiIcons;

const VehicleManager = () => {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [vehicleForm, setVehicleForm] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    price: '',
    mileage: '',
    condition: 'new',
    status: 'available',
    vin: '',
    stockNumber: '',
    fuelType: 'gasoline',
    transmission: 'automatic',
    exteriorColor: '',
    interiorColor: '',
    engine: '',
    drivetrain: 'fwd',
    description: '',
    features: [],
    images: []
  });

  useEffect(() => {
    // Load sample data
    const sampleVehicles = [
      {
        id: 1,
        make: 'Toyota',
        model: 'Camry',
        year: 2024,
        price: 28999,
        mileage: 12000,
        condition: 'new',
        status: 'available',
        vin: '1HGBH41JXMN109186',
        stockNumber: 'TC2024001',
        fuelType: 'gasoline',
        transmission: 'automatic',
        exteriorColor: 'Midnight Black',
        interiorColor: 'Ash Gray',
        engine: '2.5L 4-Cylinder',
        drivetrain: 'fwd',
        description: 'Brand new 2024 Toyota Camry with all the latest features.',
        features: ['Bluetooth', 'Backup Camera', 'Heated Seats'],
        images: ['https://images.unsplash.com/photo-1549924231-f129b911e442?w=400&h=300&fit=crop'],
        createdAt: '2024-01-15'
      },
      {
        id: 2,
        make: 'Honda',
        model: 'Accord',
        year: 2023,
        price: 25999,
        mileage: 25000,
        condition: 'used',
        status: 'available',
        vin: '1HGBH41JXMN109187',
        stockNumber: 'HA2023001',
        fuelType: 'gasoline',
        transmission: 'automatic',
        exteriorColor: 'Silver',
        interiorColor: 'Black',
        engine: '1.5L Turbo',
        drivetrain: 'fwd',
        description: 'Excellent condition 2023 Honda Accord.',
        features: ['Apple CarPlay', 'Lane Keep Assist', 'Sunroof'],
        images: ['https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop'],
        createdAt: '2024-01-14'
      }
    ];
    
    setVehicles(sampleVehicles);
    setFilteredVehicles(sampleVehicles);
  }, []);

  useEffect(() => {
    let filtered = vehicles;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(vehicle =>
        vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.stockNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(vehicle => vehicle.status === statusFilter);
    }

    setFilteredVehicles(filtered);
  }, [vehicles, searchTerm, statusFilter]);

  const handleAddVehicle = () => {
    const newVehicle = {
      ...vehicleForm,
      id: Date.now(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setVehicles([...vehicles, newVehicle]);
    setShowAddModal(false);
    resetForm();
  };

  const handleEditVehicle = (vehicle) => {
    setEditingVehicle(vehicle);
    setVehicleForm(vehicle);
    setShowAddModal(true);
  };

  const handleUpdateVehicle = () => {
    setVehicles(vehicles.map(v => v.id === editingVehicle.id ? { ...vehicleForm, id: editingVehicle.id } : v));
    setShowAddModal(false);
    setEditingVehicle(null);
    resetForm();
  };

  const handleDeleteVehicle = (id) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      setVehicles(vehicles.filter(v => v.id !== id));
    }
  };

  const resetForm = () => {
    setVehicleForm({
      make: '',
      model: '',
      year: new Date().getFullYear(),
      price: '',
      mileage: '',
      condition: 'new',
      status: 'available',
      vin: '',
      stockNumber: '',
      fuelType: 'gasoline',
      transmission: 'automatic',
      exteriorColor: '',
      interiorColor: '',
      engine: '',
      drivetrain: 'fwd',
      description: '',
      features: [],
      images: []
    });
  };

  const handleFormChange = (field, value) => {
    setVehicleForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Vehicle Management</h1>
          <p className="text-gray-600">Manage your vehicle inventory</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center space-x-2"
        >
          <SafeIcon icon={FiPlus} className="w-4 h-4" />
          <span>Add Vehicle</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <SafeIcon icon={FiSearch} className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search vehicles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="sold">Sold</option>
            <option value="pending">Pending</option>
          </select>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <SafeIcon icon={FiFilter} className="w-4 h-4" />
            <span>Showing {filteredVehicles.length} of {vehicles.length} vehicles</span>
          </div>
        </div>
      </div>

      {/* Vehicle List */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vehicle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mileage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredVehicles.map((vehicle) => (
                <tr key={vehicle.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-12 w-12 bg-gray-200 rounded-lg mr-4 overflow-hidden">
                        {vehicle.images[0] && (
                          <img 
                            src={vehicle.images[0]} 
                            alt={`${vehicle.make} ${vehicle.model}`}
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {vehicle.year} {vehicle.make} {vehicle.model}
                        </div>
                        <div className="text-sm text-gray-500">{vehicle.condition}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {vehicle.stockNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${vehicle.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {vehicle.mileage.toLocaleString()} mi
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      vehicle.status === 'available' ? 'bg-green-100 text-green-800' :
                      vehicle.status === 'sold' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {vehicle.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditVehicle(vehicle)}
                        className="text-primary-600 hover:text-primary-700"
                      >
                        <SafeIcon icon={FiEdit} className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteVehicle(vehicle.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Vehicle Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
              </h2>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Make *</label>
                  <input
                    type="text"
                    value={vehicleForm.make}
                    onChange={(e) => handleFormChange('make', e.target.value)}
                    className="form-input"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Model *</label>
                  <input
                    type="text"
                    value={vehicleForm.model}
                    onChange={(e) => handleFormChange('model', e.target.value)}
                    className="form-input"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Year *</label>
                  <input
                    type="number"
                    value={vehicleForm.year}
                    onChange={(e) => handleFormChange('year', parseInt(e.target.value))}
                    className="form-input"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price *</label>
                  <input
                    type="number"
                    value={vehicleForm.price}
                    onChange={(e) => handleFormChange('price', parseInt(e.target.value))}
                    className="form-input"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mileage</label>
                  <input
                    type="number"
                    value={vehicleForm.mileage}
                    onChange={(e) => handleFormChange('mileage', parseInt(e.target.value))}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Stock Number *</label>
                  <input
                    type="text"
                    value={vehicleForm.stockNumber}
                    onChange={(e) => handleFormChange('stockNumber', e.target.value)}
                    className="form-input"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
                  <select
                    value={vehicleForm.condition}
                    onChange={(e) => handleFormChange('condition', e.target.value)}
                    className="form-select"
                  >
                    <option value="new">New</option>
                    <option value="used">Used</option>
                    <option value="certified">Certified Pre-Owned</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={vehicleForm.status}
                    onChange={(e) => handleFormChange('status', e.target.value)}
                    className="form-select"
                  >
                    <option value="available">Available</option>
                    <option value="pending">Pending</option>
                    <option value="sold">Sold</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={vehicleForm.description}
                  onChange={(e) => handleFormChange('description', e.target.value)}
                  rows={4}
                  className="form-input"
                  placeholder="Enter vehicle description..."
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingVehicle(null);
                  resetForm();
                }}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={editingVehicle ? handleUpdateVehicle : handleAddVehicle}
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
              >
                {editingVehicle ? 'Update Vehicle' : 'Add Vehicle'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleManager;