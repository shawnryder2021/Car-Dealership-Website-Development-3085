import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import AuthGuard from '../components/AuthGuard';
import AdminNavigation from '../components/AdminNavigation';
import VehicleManager from '../components/admin/VehicleManager';
import ContentManager from '../components/admin/ContentManager';
import LeadManager from '../components/admin/LeadManager';
import SettingsManager from '../components/admin/SettingsManager';
import AdminDashboard from '../components/admin/AdminDashboard';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'vehicles':
        return <VehicleManager />;
      case 'content':
        return <ContentManager />;
      case 'leads':
        return <LeadManager />;
      case 'settings':
        return <SettingsManager />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <AuthGuard>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gray-50"
      >
        <Helmet>
          <title>Admin Dashboard - Premier Auto Halifax</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>

        <AdminNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="flex">
          <main className="flex-1 p-6">
            {renderContent()}
          </main>
        </div>
      </motion.div>
    </AuthGuard>
  );
};

export default Admin;