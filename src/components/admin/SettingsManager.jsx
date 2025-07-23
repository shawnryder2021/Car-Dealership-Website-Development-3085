import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiSave, FiUser, FiShield, FiGlobe, FiMail, FiDatabase, FiClock } = FiIcons;

const SettingsManager = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      siteName: 'Premier Auto Halifax',
      siteDescription: 'Halifax\'s premier destination for quality new and used vehicles',
      timezone: 'America/Halifax',
      currency: 'CAD',
      language: 'en'
    },
    contact: {
      businessName: 'Premier Auto Halifax',
      address: '123 Robie Street, Halifax, NS B3H 3C2',
      phone: '(902) 555-4567',
      email: 'info@premierautohalifax.ca',
      website: 'https://premierautohalifax.ca'
    },
    business: {
      mondayOpen: '09:00',
      mondayClose: '19:00',
      tuesdayOpen: '09:00',
      tuesdayClose: '19:00',
      wednesdayOpen: '09:00',
      wednesdayClose: '19:00',
      thursdayOpen: '09:00',
      thursdayClose: '19:00',
      fridayOpen: '09:00',
      fridayClose: '19:00',
      saturdayOpen: '09:00',
      saturdayClose: '18:00',
      sundayOpen: '12:00',
      sundayClose: '17:00'
    },
    email: {
      smtpHost: 'smtp.gmail.com',
      smtpPort: '587',
      smtpUsername: '',
      smtpPassword: '',
      fromEmail: 'info@premierautohalifax.ca',
      fromName: 'Premier Auto Halifax'
    },
    integrations: {
      googleAnalyticsId: '',
      facebookPixelId: '',
      googleMapsApiKey: '',
      supabaseUrl: '',
      supabaseAnonKey: ''
    }
  });

  const tabs = [
    { id: 'general', name: 'General', icon: FiGlobe },
    { id: 'contact', name: 'Contact Info', icon: FiUser },
    { id: 'business', name: 'Business Hours', icon: FiClock },
    { id: 'email', name: 'Email Settings', icon: FiMail },
    { id: 'integrations', name: 'Integrations', icon: FiDatabase },
  ];

  const handleSettingChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const saveSettings = () => {
    // Here you would save to your backend
    alert('Settings saved successfully!');
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">General Settings</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
          <input
            type="text"
            value={settings.general.siteName}
            onChange={(e) => handleSettingChange('general', 'siteName', e.target.value)}
            className="form-input"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
          <select
            value={settings.general.currency}
            onChange={(e) => handleSettingChange('general', 'currency', e.target.value)}
            className="form-select"
          >
            <option value="CAD">CAD - Canadian Dollar</option>
            <option value="USD">USD - US Dollar</option>
          </select>
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Site Description</label>
          <textarea
            value={settings.general.siteDescription}
            onChange={(e) => handleSettingChange('general', 'siteDescription', e.target.value)}
            rows={3}
            className="form-input"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
          <select
            value={settings.general.timezone}
            onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
            className="form-select"
          >
            <option value="America/Halifax">America/Halifax (Atlantic Time)</option>
            <option value="America/Toronto">America/Toronto (Eastern Time)</option>
            <option value="America/Vancouver">America/Vancouver (Pacific Time)</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
          <select
            value={settings.general.language}
            onChange={(e) => handleSettingChange('general', 'language', e.target.value)}
            className="form-select"
          >
            <option value="en">English</option>
            <option value="fr">French</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderContactSettings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Contact Information</h2>
      
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
          <input
            type="text"
            value={settings.contact.businessName}
            onChange={(e) => handleSettingChange('contact', 'businessName', e.target.value)}
            className="form-input"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
          <textarea
            value={settings.contact.address}
            onChange={(e) => handleSettingChange('contact', 'address', e.target.value)}
            rows={2}
            className="form-input"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              value={settings.contact.phone}
              onChange={(e) => handleSettingChange('contact', 'phone', e.target.value)}
              className="form-input"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={settings.contact.email}
              onChange={(e) => handleSettingChange('contact', 'email', e.target.value)}
              className="form-input"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
          <input
            type="url"
            value={settings.contact.website}
            onChange={(e) => handleSettingChange('contact', 'website', e.target.value)}
            className="form-input"
          />
        </div>
      </div>
    </div>
  );

  const renderBusinessHours = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Business Hours</h2>
      
      <div className="space-y-4">
        {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
          <div key={day} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-24 font-medium text-gray-900 capitalize">{day}</div>
            <div className="flex items-center space-x-2">
              <input
                type="time"
                value={settings.business[`${day}Open`]}
                onChange={(e) => handleSettingChange('business', `${day}Open`, e.target.value)}
                className="form-input"
              />
              <span className="text-gray-500">to</span>
              <input
                type="time"
                value={settings.business[`${day}Close`]}
                onChange={(e) => handleSettingChange('business', `${day}Close`, e.target.value)}
                className="form-input"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderEmailSettings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Email Settings</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Host</label>
          <input
            type="text"
            value={settings.email.smtpHost}
            onChange={(e) => handleSettingChange('email', 'smtpHost', e.target.value)}
            className="form-input"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Port</label>
          <input
            type="text"
            value={settings.email.smtpPort}
            onChange={(e) => handleSettingChange('email', 'smtpPort', e.target.value)}
            className="form-input"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Username</label>
          <input
            type="text"
            value={settings.email.smtpUsername}
            onChange={(e) => handleSettingChange('email', 'smtpUsername', e.target.value)}
            className="form-input"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Password</label>
          <input
            type="password"
            value={settings.email.smtpPassword}
            onChange={(e) => handleSettingChange('email', 'smtpPassword', e.target.value)}
            className="form-input"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">From Email</label>
          <input
            type="email"
            value={settings.email.fromEmail}
            onChange={(e) => handleSettingChange('email', 'fromEmail', e.target.value)}
            className="form-input"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">From Name</label>
          <input
            type="text"
            value={settings.email.fromName}
            onChange={(e) => handleSettingChange('email', 'fromName', e.target.value)}
            className="form-input"
          />
        </div>
      </div>
    </div>
  );

  const renderIntegrations = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Integrations</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Analytics & Tracking</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Google Analytics ID</label>
              <input
                type="text"
                value={settings.integrations.googleAnalyticsId}
                onChange={(e) => handleSettingChange('integrations', 'googleAnalyticsId', e.target.value)}
                placeholder="GA-XXXXXXXXX"
                className="form-input"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Facebook Pixel ID</label>
              <input
                type="text"
                value={settings.integrations.facebookPixelId}
                onChange={(e) => handleSettingChange('integrations', 'facebookPixelId', e.target.value)}
                placeholder="Facebook Pixel ID"
                className="form-input"
              />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Maps & Location</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Google Maps API Key</label>
            <input
              type="text"
              value={settings.integrations.googleMapsApiKey}
              onChange={(e) => handleSettingChange('integrations', 'googleMapsApiKey', e.target.value)}
              placeholder="Your Google Maps API Key"
              className="form-input"
            />
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Database (Supabase)</h3>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Supabase URL</label>
              <input
                type="text"
                value={settings.integrations.supabaseUrl}
                onChange={(e) => handleSettingChange('integrations', 'supabaseUrl', e.target.value)}
                placeholder="https://your-project.supabase.co"
                className="form-input"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Supabase Anon Key</label>
              <input
                type="password"
                value={settings.integrations.supabaseAnonKey}
                onChange={(e) => handleSettingChange('integrations', 'supabaseAnonKey', e.target.value)}
                placeholder="Your Supabase Anonymous Key"
                className="form-input"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'contact':
        return renderContactSettings();
      case 'business':
        return renderBusinessHours();
      case 'email':
        return renderEmailSettings();
      case 'integrations':
        return renderIntegrations();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Configure your website settings and integrations</p>
        </div>
        <button
          onClick={saveSettings}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center space-x-2"
        >
          <SafeIcon icon={FiSave} className="w-4 h-4" />
          <span>Save Settings</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <SafeIcon icon={tab.icon} className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-lg p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsManager;