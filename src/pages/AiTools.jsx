import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import VehicleRecommender from '../components/ai/VehicleRecommender';
import TradeInEstimator from '../components/ai/TradeInEstimator';
import VehicleMatchmaker from '../components/ai/VehicleMatchmaker';
import ComparisonTool from '../components/ai/ComparisonTool';
import FeatureExplainer from '../components/ai/FeatureExplainer';

const { FiZap, FiTrendingUp, FiCreditCard, FiMessageSquare, FiAward, FiSearch, FiList, FiInfo } = FiIcons;

const AiTools = () => {
  const aiFeatures = [
    {
      icon: FiSearch,
      title: 'Vehicle Matchmaker',
      description: 'Tell us what you\'re looking for in natural language, and we\'ll match you with vehicles from our inventory.',
    },
    {
      icon: FiList,
      title: 'Comparison Tool',
      description: 'Get AI-powered comparisons between multiple vehicles to help you make an informed decision.',
    },
    {
      icon: FiZap,
      title: 'Vehicle Recommender',
      description: 'Get personalized vehicle suggestions based on your needs and preferences.',
    },
    {
      icon: FiTrendingUp,
      title: 'Trade-In Value Estimates',
      description: 'Get an instant AI-powered estimate of your current vehicle\'s trade-in value.',
    },
    {
      icon: FiInfo,
      title: 'Feature Explainer',
      description: 'Learn about car features and technologies in simple, easy-to-understand terms.',
    },
    {
      icon: FiMessageSquare,
      title: 'Vehicle Q&A',
      description: 'Ask our AI assistant any questions about specific vehicles in our inventory.',
    },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-gray-50">
      <Helmet>
        <title>AI-Powered Car Shopping Tools | Premier Auto Halifax</title>
        <meta
          name="description"
          content="Use our AI-powered tools to find your perfect vehicle, estimate trade-in value, calculate financing, compare vehicles, and get instant answers to your car questions."
        />
        <meta
          name="keywords"
          content="AI car recommendations, vehicle trade-in estimator, car financing calculator, auto AI assistant, car shopping tools, vehicle comparison"
        />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-900 to-primary-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              AI-Powered Car Shopping Tools
            </motion.h1>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-200"
            >
              Experience the future of car shopping with our suite of AI tools designed to make finding your perfect vehicle easier than ever.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our AI-Powered Tools</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We've integrated cutting-edge AI technology to enhance your car shopping experience and help you make informed decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aiFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-lg shadow-md"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <SafeIcon icon={feature.icon} className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicle Matchmaker */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Find Your Perfect Match</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Describe what you're looking for in your own words, and our AI will match you with vehicles from our inventory.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <VehicleMatchmaker />
          </div>
        </div>
      </section>

      {/* Vehicle Comparison Tool */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Compare Vehicles with AI</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select vehicles from our inventory and get an AI-powered comparison to help you make the right choice.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <ComparisonTool />
          </div>
        </div>
      </section>

      {/* Feature Explainer */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Understand Car Features & Technology</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get simple explanations of complex car features and technologies to make informed decisions.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <FeatureExplainer />
          </div>
        </div>
      </section>

      {/* Trade-In Estimator */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Estimate Your Trade-In Value</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get an instant AI-powered estimate of your current vehicle's trade-in value.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <TradeInEstimator />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Experience the Future of Car Shopping</h2>
          <p className="text-xl mb-8 text-primary-200">
            Visit our showroom to experience more AI-powered tools and find your perfect vehicle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/inventory"
              className="bg-white text-primary-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Browse Inventory
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-900 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default AiTools;