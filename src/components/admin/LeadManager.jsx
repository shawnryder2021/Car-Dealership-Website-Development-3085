import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiPhone, FiMail, FiCalendar, FiUser, FiCar, FiDollarSign, FiFilter, FiSearch } = FiIcons;

const LeadManager = () => {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState(null);

  useEffect(() => {
    // Load sample leads data
    const sampleLeads = [
      {
        id: 1,
        name: 'Sarah Johnson',
        email: 'sarah.johnson@email.com',
        phone: '(902) 555-0123',
        type: 'test-drive',
        vehicle: '2024 Toyota Camry',
        message: 'Interested in scheduling a test drive for this weekend.',
        status: 'new',
        createdAt: '2024-01-15T10:30:00',
        followUpDate: '2024-01-16T14:00:00'
      },
      {
        id: 2,
        name: 'Mike Chen',
        email: 'mike.chen@email.com',
        phone: '(902) 555-0124',
        type: 'financing',
        vehicle: '2023 Honda Accord',
        message: 'Looking for financing options. Credit score around 720.',
        status: 'contacted',
        createdAt: '2024-01-15T09:15:00',
        followUpDate: '2024-01-17T10:00:00'
      },
      {
        id: 3,
        name: 'Lisa Brown',
        email: 'lisa.brown@email.com',
        phone: '(902) 555-0125',
        type: 'trade-in',
        vehicle: 'N/A',
        message: 'Want to get a quote for my 2019 Mazda CX-5.',
        status: 'qualified',
        createdAt: '2024-01-14T16:45:00',
        followUpDate: '2024-01-18T11:00:00'
      },
      {
        id: 4,
        name: 'David Wilson',
        email: 'david.wilson@email.com',
        phone: '(902) 555-0126',
        type: 'information',
        vehicle: '2024 Ford F-150',
        message: 'Need more information about available features and warranty.',
        status: 'converted',
        createdAt: '2024-01-14T14:20:00',
        followUpDate: null
      },
      {
        id: 5,
        name: 'Emma Thompson',
        email: 'emma.thompson@email.com',
        phone: '(902) 555-0127',
        type: 'service',
        vehicle: '2022 Subaru Outback',
        message: 'Need to schedule maintenance service.',
        status: 'new',
        createdAt: '2024-01-13T11:30:00',
        followUpDate: '2024-01-16T09:00:00'
      }
    ];
    
    setLeads(sampleLeads);
    setFilteredLeads(sampleLeads);
  }, []);

  useEffect(() => {
    let filtered = leads;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(lead =>
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.phone.includes(searchTerm)
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(lead => lead.status === statusFilter);
    }

    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(lead => lead.type === typeFilter);
    }

    setFilteredLeads(filtered);
  }, [leads, searchTerm, statusFilter, typeFilter]);

  const updateLeadStatus = (leadId, newStatus) => {
    setLeads(leads.map(lead => 
      lead.id === leadId ? { ...lead, status: newStatus } : lead
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'contacted':
        return 'bg-yellow-100 text-yellow-800';
      case 'qualified':
        return 'bg-purple-100 text-purple-800';
      case 'converted':
        return 'bg-green-100 text-green-800';
      case 'lost':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'test-drive':
        return FiCar;
      case 'financing':
        return FiDollarSign;
      case 'trade-in':
        return FiCar;
      case 'service':
        return FiCar;
      default:
        return FiUser;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Lead Management</h1>
        <p className="text-gray-600">Manage customer inquiries and follow-ups</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {[
          { label: 'Total Leads', value: leads.length, color: 'bg-blue-500' },
          { label: 'New', value: leads.filter(l => l.status === 'new').length, color: 'bg-blue-600' },
          { label: 'Contacted', value: leads.filter(l => l.status === 'contacted').length, color: 'bg-yellow-500' },
          { label: 'Qualified', value: leads.filter(l => l.status === 'qualified').length, color: 'bg-purple-500' },
          { label: 'Converted', value: leads.filter(l => l.status === 'converted').length, color: 'bg-green-500' },
        ].map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
            <div className={`w-full h-2 ${stat.color} rounded-full mb-2`}></div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <SafeIcon icon={FiSearch} className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search leads..."
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
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="converted">Converted</option>
            <option value="lost">Lost</option>
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Types</option>
            <option value="test-drive">Test Drive</option>
            <option value="financing">Financing</option>
            <option value="trade-in">Trade-In</option>
            <option value="information">Information</option>
            <option value="service">Service</option>
          </select>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <SafeIcon icon={FiFilter} className="w-4 h-4" />
            <span>Showing {filteredLeads.length} of {leads.length} leads</span>
          </div>
        </div>
      </div>

      {/* Leads List */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vehicle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                      <div className="text-sm text-gray-500">{lead.email}</div>
                      <div className="text-sm text-gray-500">{lead.phone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <SafeIcon icon={getTypeIcon(lead.type)} className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900 capitalize">{lead.type.replace('-', ' ')}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {lead.vehicle}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={lead.status}
                      onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                      className={`text-xs font-semibold rounded-full px-2 py-1 border-0 ${getStatusColor(lead.status)}`}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="qualified">Qualified</option>
                      <option value="converted">Converted</option>
                      <option value="lost">Lost</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(lead.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedLead(lead)}
                        className="text-primary-600 hover:text-primary-700"
                        title="View Details"
                      >
                        <SafeIcon icon={FiUser} className="w-4 h-4" />
                      </button>
                      <a
                        href={`tel:${lead.phone}`}
                        className="text-green-600 hover:text-green-700"
                        title="Call"
                      >
                        <SafeIcon icon={FiPhone} className="w-4 h-4" />
                      </a>
                      <a
                        href={`mailto:${lead.email}`}
                        className="text-blue-600 hover:text-blue-700"
                        title="Email"
                      >
                        <SafeIcon icon={FiMail} className="w-4 h-4" />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Lead Details</h2>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <p className="text-gray-900">{selectedLead.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="text-gray-900">{selectedLead.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <p className="text-gray-900">{selectedLead.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <p className="text-gray-900 capitalize">{selectedLead.type.replace('-', ' ')}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Vehicle</label>
                  <p className="text-gray-900">{selectedLead.vehicle}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedLead.status)}`}>
                    {selectedLead.status}
                  </span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedLead.message}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Created At</label>
                <p className="text-gray-900">{formatDate(selectedLead.createdAt)}</p>
              </div>
              
              {selectedLead.followUpDate && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Follow Up Date</label>
                  <p className="text-gray-900">{formatDate(selectedLead.followUpDate)}</p>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-between">
              <div className="flex space-x-2">
                <a
                  href={`tel:${selectedLead.phone}`}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                >
                  <SafeIcon icon={FiPhone} className="w-4 h-4" />
                  <span>Call</span>
                </a>
                <a
                  href={`mailto:${selectedLead.email}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                >
                  <SafeIcon icon={FiMail} className="w-4 h-4" />
                  <span>Email</span>
                </a>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadManager;