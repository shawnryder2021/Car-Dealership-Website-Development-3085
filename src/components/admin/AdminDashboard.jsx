import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiCar, FiUsers, FiDollarSign, FiTrendingUp, FiPhone, FiMail, FiCalendar, FiFileText } = FiIcons;

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalVehicles: 0,
    totalLeads: 0,
    monthlyRevenue: 0,
    conversionRate: 0,
  });

  const [recentLeads, setRecentLeads] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    // Simulate loading data
    setStats({
      totalVehicles: 47,
      totalLeads: 124,
      monthlyRevenue: 285000,
      conversionRate: 23.5,
    });

    setRecentLeads([
      { id: 1, name: 'Sarah Johnson', email: 'sarah@email.com', type: 'Test Drive', vehicle: '2024 Toyota Camry', date: '2024-01-15' },
      { id: 2, name: 'Mike Chen', email: 'mike@email.com', type: 'Financing', vehicle: '2023 Honda Accord', date: '2024-01-15' },
      { id: 3, name: 'Lisa Brown', email: 'lisa@email.com', type: 'Trade-In', vehicle: 'N/A', date: '2024-01-14' },
      { id: 4, name: 'David Wilson', email: 'david@email.com', type: 'Information', vehicle: '2024 Ford F-150', date: '2024-01-14' },
    ]);

    setRecentActivity([
      { id: 1, action: 'New vehicle added', details: '2024 Subaru Outback', time: '2 hours ago' },
      { id: 2, action: 'Lead converted', details: 'Sarah Johnson purchased 2024 Toyota Camry', time: '4 hours ago' },
      { id: 3, action: 'Content updated', details: 'Homepage hero section modified', time: '1 day ago' },
      { id: 4, action: 'New lead received', details: 'Mike Chen - Financing inquiry', time: '1 day ago' },
    ]);
  }, []);

  const statCards = [
    {
      title: 'Total Vehicles',
      value: stats.totalVehicles,
      icon: FiCar,
      change: '+3 this week',
      changeType: 'positive'
    },
    {
      title: 'Total Leads',
      value: stats.totalLeads,
      icon: FiUsers,
      change: '+12 this week',
      changeType: 'positive'
    },
    {
      title: 'Monthly Revenue',
      value: `$${stats.monthlyRevenue.toLocaleString()}`,
      icon: FiDollarSign,
      change: '+15% from last month',
      changeType: 'positive'
    },
    {
      title: 'Conversion Rate',
      value: `${stats.conversionRate}%`,
      icon: FiTrendingUp,
      change: '+2.1% from last month',
      changeType: 'positive'
    },
  ];

  const getLeadIcon = (type) => {
    switch (type) {
      case 'Test Drive':
        return FiCar;
      case 'Financing':
        return FiDollarSign;
      case 'Trade-In':
        return FiTrendingUp;
      default:
        return FiMail;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening at Premier Auto Halifax.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className={`text-sm ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </p>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <SafeIcon icon={stat.icon} className="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Leads</h2>
            <button className="text-primary-600 hover:text-primary-700 font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentLeads.map((lead) => (
              <div key={lead.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <SafeIcon icon={getLeadIcon(lead.type)} className="w-5 h-5 text-primary-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{lead.name}</p>
                  <p className="text-sm text-gray-600">{lead.type} - {lead.vehicle}</p>
                  <p className="text-xs text-gray-500">{lead.date}</p>
                </div>
                <button className="text-primary-600 hover:text-primary-700">
                  <SafeIcon icon={FiPhone} className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
            <button className="text-primary-600 hover:text-primary-700 font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.details}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center space-x-3 p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors">
            <SafeIcon icon={FiCar} className="w-6 h-6 text-primary-600" />
            <span className="font-medium text-gray-900">Add New Vehicle</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <SafeIcon icon={FiUsers} className="w-6 h-6 text-green-600" />
            <span className="font-medium text-gray-900">View All Leads</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <SafeIcon icon={FiFileText} className="w-6 h-6 text-blue-600" />
            <span className="font-medium text-gray-900">Update Content</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;