import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiHome, FiCar, FiFileText, FiUsers, FiSettings, FiLogOut, FiBarChart3 } = FiIcons;

const AdminNavigation = ({ activeTab, setActiveTab }) => {
  const { signOut, user } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: FiBarChart3 },
    { id: 'vehicles', name: 'Vehicles', icon: FiCar },
    { id: 'content', name: 'Content', icon: FiFileText },
    { id: 'leads', name: 'Leads', icon: FiUsers },
    { id: 'settings', name: 'Settings', icon: FiSettings },
  ];

  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">PA</span>
              </div>
              <span className="font-semibold text-gray-900">Premier Auto Admin</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex space-x-8">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === item.id
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <SafeIcon icon={item.icon} className="w-4 h-4" />
                <span>{item.name}</span>
              </button>
            ))}
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <SafeIcon icon={FiHome} className="w-4 h-4" />
              <span>View Site</span>
            </Link>
            <div className="flex items-center space-x-2 text-gray-600">
              <span className="text-sm">{user?.email}</span>
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors"
              >
                <SafeIcon icon={FiLogOut} className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNavigation;