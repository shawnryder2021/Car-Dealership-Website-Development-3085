import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiAward, FiUsers, FiHeart, FiTrendingUp, FiMapPin, FiPhone, FiMail } = FiIcons;

const About = () => {
  const values = [
    {
      icon: FiHeart,
      title: 'Customer First',
      description: 'We put our customers at the center of everything we do, ensuring exceptional service and satisfaction.',
    },
    {
      icon: FiAward,
      title: 'Quality Assurance',
      description: 'Every vehicle undergoes rigorous inspection to meet our high standards for quality and reliability.',
    },
    {
      icon: FiUsers,
      title: 'Expert Team',
      description: 'Our experienced professionals are dedicated to helping you find the perfect vehicle for your needs.',
    },
    {
      icon: FiTrendingUp,
      title: 'Continuous Growth',
      description: 'We continuously evolve and improve our services to better serve our community.',
    },
  ];

  const team = [
    {
      name: 'John Smith',
      position: 'General Manager',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      description: 'With over 20 years in the automotive industry, John leads our team with passion and expertise.',
    },
    {
      name: 'Sarah Johnson',
      position: 'Sales Director',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
      description: 'Sarah brings 15 years of sales experience and ensures every customer finds their perfect match.',
    },
    {
      name: 'Mike Rodriguez',
      position: 'Service Manager',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      description: 'Mike oversees our service department with a commitment to excellence and customer satisfaction.',
    },
    {
      name: 'Lisa Chen',
      position: 'Finance Manager',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
      description: 'Lisa helps customers navigate financing options to make their dream car affordable.',
    },
  ];

  const milestones = [
    { year: '1998', event: 'Premier Auto founded' },
    { year: '2005', event: 'Expanded to current location' },
    { year: '2010', event: 'Reached 1,000 satisfied customers' },
    { year: '2015', event: 'Added certified pre-owned program' },
    { year: '2020', event: 'Launched online sales platform' },
    { year: '2024', event: 'Celebrating 25+ years of excellence' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50"
    >
      <Helmet>
        <title>About Premier Auto - Your Trusted Car Dealership | 25+ Years of Excellence</title>
        <meta name="description" content="Learn about Premier Auto's 25+ year history of serving customers with quality vehicles and exceptional service. Meet our expert team and discover our commitment to excellence." />
        <meta name="keywords" content="about premier auto, car dealership history, automotive team, customer service, quality vehicles" />
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
              About Premier Auto
            </motion.h1>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-200"
            >
              Your trusted automotive partner for over 25 years, committed to providing 
              exceptional service and quality vehicles to our community.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <motion.h2
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-3xl font-bold text-gray-900 mb-6"
                >
                  Our Story
                </motion.h2>
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-4 text-gray-600"
                >
                  <p>
                    Founded in 1998, Premier Auto began as a small family-owned dealership with a simple mission: 
                    to provide quality vehicles and honest service to our local community. Over the past 25+ years, 
                    we've grown from a modest lot to one of the region's most trusted automotive destinations.
                  </p>
                  <p>
                    What started as a dream to serve our neighbors has evolved into a comprehensive automotive 
                    experience, offering new and used vehicle sales, financing, service, and parts. Despite our 
                    growth, we've never forgotten our roots or the values that built our reputation.
                  </p>
                  <p>
                    Today, we're proud to have helped thousands of customers find their perfect vehicle, 
                    and we continue to be committed to excellence in everything we do.
                  </p>
                </motion.div>
              </div>
              <motion.div
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="relative"
              >
                <img
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop"
                  alt="Premier Auto Dealership"
                  className="rounded-lg shadow-lg"
                />
                <div className="absolute -bottom-4 -right-4 bg-primary-600 text-white p-4 rounded-lg">
                  <div className="text-2xl font-bold">25+</div>
                  <div className="text-sm">Years of Service</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These core principles guide everything we do and shape the experience we provide to every customer.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-lg text-center"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SafeIcon icon={value.icon} className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From humble beginnings to becoming a trusted automotive destination, 
              here are the key milestones in our journey.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary-200"></div>
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  >
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                      <div className="bg-white p-6 rounded-lg shadow-lg">
                        <div className="text-2xl font-bold text-primary-600 mb-2">{milestone.year}</div>
                        <div className="text-gray-800">{milestone.event}</div>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="w-4 h-4 bg-primary-600 rounded-full border-4 border-white shadow-lg"></div>
                    </div>
                    <div className="w-1/2"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our experienced professionals are dedicated to providing you with exceptional service 
              and helping you find the perfect vehicle.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <div className="text-primary-600 font-medium mb-3">{member.position}</div>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience the Premier Auto Difference?</h2>
          <p className="text-xl mb-8 text-primary-200">
            Visit us today and discover why thousands of customers have trusted us with their automotive needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <a
              href="/contact"
              className="bg-white text-primary-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Visit Our Showroom
            </a>
            <a
              href="tel:+15551234567"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-900 transition-colors"
            >
              Call Us Today
            </a>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;