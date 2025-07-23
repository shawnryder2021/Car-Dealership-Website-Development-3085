import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import VehicleMatchmaker from '../components/ai/VehicleMatchmaker';

const { FiSearch, FiTrendingUp, FiShield, FiAward, FiUsers, FiDollarSign, FiClock, FiMapPin, FiZap } = FiIcons;

const Home = () => {
  const features = [
    {
      icon: FiSearch,
      title: 'Extensive Inventory',
      description: 'Browse our wide selection of new and used vehicles from top manufacturers.',
    },
    {
      icon: FiDollarSign,
      title: 'Competitive Pricing',
      description: 'Get the best deals in Halifax with our competitive pricing and financing options.',
    },
    {
      icon: FiShield,
      title: 'Quality Assurance',
      description: 'Every vehicle undergoes thorough inspection to ensure Maritime-ready quality and reliability.',
    },
    {
      icon: FiAward,
      title: 'Expert Service',
      description: 'Our certified technicians provide top-notch service and maintenance for Nova Scotia drivers.',
    },
  ];

  const stats = [
    { number: '5000+', label: 'Happy Halifax Customers' },
    { number: '1200+', label: 'Cars Sold' },
    { number: '25+', label: 'Years Serving Nova Scotia' },
    { number: '4.9', label: 'Customer Rating' },
  ];

  const testimonials = [
    {
      name: 'Sarah MacKenzie',
      text: 'Amazing experience! The Halifax team helped me find the perfect car within my budget. Highly recommend!',
      rating: 5,
      location: 'Dartmouth, NS',
    },
    {
      name: 'Mike O\'Brien',
      text: 'Professional service and great selection. The financing process was smooth and transparent.',
      rating: 5,
      location: 'Bedford, NS',
    },
    {
      name: 'Lisa MacDonald',
      text: 'Excellent customer service from start to finish. They made car buying stress-free!',
      rating: 5,
      location: 'Cole Harbour, NS',
    },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Helmet>
        <title>Premier Auto Halifax - New & Used Cars | Halifax's Best Car Dealer | Nova Scotia</title>
        <meta
          name="description"
          content="Find your perfect car at Premier Auto Halifax. Browse our extensive inventory of new and used vehicles with expert service, competitive prices, and financing options. Serving Halifax, Dartmouth, and all of Nova Scotia."
        />
        <meta
          name="keywords"
          content="car dealership Halifax, new cars Halifax, used cars Halifax, auto financing Nova Scotia, car service Halifax, trade-in Halifax, test drive, Halifax car dealer"
        />
        <link rel="canonical" href="https://premierautohalifax.ca/" />
        <meta name="geo.region" content="CA-NS" />
        <meta name="geo.placename" content="Halifax" />
        <meta name="geo.position" content="44.6488;-63.5752" />
        <meta name="ICBM" content="44.6488,-63.5752" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-900 to-primary-700 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Find Your Perfect Car in Halifax
            </motion.h1>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl mb-8 text-gray-200"
            >
              Nova Scotia's premier destination for quality new and used vehicles. Expert service, competitive pricing, and financing options to fit your needs.
            </motion.p>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/inventory"
                className="bg-white text-primary-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Browse Inventory
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-900 transition-colors"
              >
                Book Test Drive
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI Vehicle Matchmaker */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 flex items-center justify-center">
                <SafeIcon icon={FiZap} className="w-8 h-8 mr-2 text-primary-600" />
                AI Vehicle Matchmaker
              </h2>
              <p className="text-gray-600 mb-6">
                Describe what you're looking for, and our AI will match you with vehicles from our inventory
              </p>
            </div>
            <VehicleMatchmaker />
            <div className="text-center mt-6">
              <Link
                to="/ai-tools"
                className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
              >
                Explore more AI tools
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Search */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Quick Vehicle Search</h2>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <select className="form-select">
                  <option>Make</option>
                  <option>Toyota</option>
                  <option>Honda</option>
                  <option>Ford</option>
                  <option>Chevrolet</option>
                  <option>Subaru</option>
                  <option>Mazda</option>
                </select>
                <select className="form-select">
                  <option>Model</option>
                  <option>Camry</option>
                  <option>Accord</option>
                  <option>F-150</option>
                  <option>Outback</option>
                </select>
                <select className="form-select">
                  <option>Max Price</option>
                  <option>$20,000</option>
                  <option>$30,000</option>
                  <option>$40,000</option>
                  <option>$50,000+</option>
                </select>
                <select className="form-select">
                  <option>Year</option>
                  <option>2024</option>
                  <option>2023</option>
                  <option>2022</option>
                  <option>2021</option>
                </select>
              </div>
              <Link
                to="/inventory"
                className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
              >
                <SafeIcon icon={FiSearch} className="w-5 h-5 mr-2" />
                Search Vehicles
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Premier Auto Halifax?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're committed to providing exceptional service and helping Haligonians find the perfect vehicle that fits their needs and Maritime lifestyle.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SafeIcon icon={feature.icon} className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-primary-200">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Vehicles */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Vehicles</h2>
            <p className="text-gray-600">Check out our handpicked selection of quality vehicles perfect for Nova Scotia roads</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden card-hover"
              >
                <div className="h-48 bg-gray-300 flex items-center justify-center">
                  <img
                    src={`https://images.unsplash.com/photo-1549924231-f129b911e442?w=400&h=200&fit=crop`}
                    alt={`Featured Vehicle ${i}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    2024 Toyota Camry
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Excellent condition, low mileage, fully loaded with premium features. Perfect for Halifax commuting.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary-600">$32,999</span>
                    <Link
                      to="/inventory"
                      className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/inventory"
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              View All Vehicles
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Halifax Customers Say</h2>
            <p className="text-gray-600">Don't just take our word for it - hear from our satisfied customers across Nova Scotia</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.location}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Car in Halifax?</h2>
          <p className="text-xl mb-8 text-primary-200">
            Visit our Halifax showroom today or browse our inventory online. Our expert team is ready to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/inventory"
              className="bg-white text-primary-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Browse Inventory
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-900 transition-colors"
            >
              Contact Us Today
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;