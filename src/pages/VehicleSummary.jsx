import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { vehicleService } from '../services/vehicleService';
import VehicleSummaryGenerator from '../components/ai/VehicleSummaryGenerator';

const { FiArrowLeft } = FiIcons;

const VehicleSummary = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadVehicle = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await vehicleService.getVehicleById(id);
        if (error) {
          setError('Failed to load vehicle data.');
        } else if (data) {
          setVehicle(data);
        } else {
          setError('Vehicle not found.');
        }
      } catch (err) {
        setError('An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    loadVehicle();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading vehicle details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            to="/inventory"
            className="inline-flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            <SafeIcon icon={FiArrowLeft} className="w-4 h-4" />
            <span>Back to Inventory</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-gray-50 py-12">
      <Helmet>
        <title>AI Summary & Reviews for {vehicle.year} {vehicle.make} {vehicle.model} | Premier Auto Halifax</title>
        <meta
          name="description"
          content={`AI-generated summary and review analysis for the ${vehicle.year} ${vehicle.make} ${vehicle.model}.`}
        />
      </Helmet>

      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link
            to={`/vehicle/${id}`}
            className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-800 transition-colors"
          >
            <SafeIcon icon={FiArrowLeft} className="w-5 h-5" />
            <span className="font-semibold">Back to Vehicle Details</span>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <div className="mb-6 border-b pb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </h1>
            <p className="text-lg text-gray-600">{vehicle.trim}</p>
          </div>

          <VehicleSummaryGenerator vehicle={vehicle} />
        </div>
      </div>
    </motion.div>
  );
};

export default VehicleSummary;
