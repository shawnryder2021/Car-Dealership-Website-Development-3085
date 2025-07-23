import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiSave, FiEdit, FiImage, FiType, FiSettings } = FiIcons;

const ContentManager = () => {
  const [activeSection, setActiveSection] = useState('homepage');
  const [content, setContent] = useState({
    homepage: {
      heroTitle: 'Find Your Perfect Car in Halifax',
      heroSubtitle: 'Nova Scotia\'s premier destination for quality new and used vehicles. Expert service, competitive pricing, and financing options to fit your needs.',
      featuresTitle: 'Why Choose Premier Auto Halifax?',
      featuresSubtitle: 'We\'re committed to providing exceptional service and helping Haligonians find the perfect vehicle that fits their needs and Maritime lifestyle.',
      statsTitle: 'Our Numbers Speak for Themselves'
    },
    about: {
      heroTitle: 'About Premier Auto',
      heroSubtitle: 'Your trusted automotive partner for over 25 years, committed to providing exceptional service and quality vehicles to our community.',
      storyTitle: 'Our Story',
      storyContent: 'Founded in 1998, Premier Auto began as a small family-owned dealership with a simple mission: to provide quality vehicles and honest service to our local community...'
    },
    contact: {
      heroTitle: 'Contact Premier Auto',
      heroSubtitle: 'We\'re here to help you find your perfect vehicle or service your current one. Get in touch with us today!',
      address: '123 Robie Street, Halifax, NS B3H 3C2',
      phone: '(902) 555-4567',
      email: 'info@premierautohalifax.ca',
      hours: 'Mon-Fri: 9AM-7PM | Sat: 9AM-6PM | Sun: 12PM-5PM'
    }
  });

  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: 'Sarah MacKenzie',
      text: 'Amazing experience! The Halifax team helped me find the perfect car within my budget. Highly recommend!',
      rating: 5,
      location: 'Dartmouth, NS'
    },
    {
      id: 2,
      name: 'Mike O\'Brien',
      text: 'Professional service and great selection. The financing process was smooth and transparent.',
      rating: 5,
      location: 'Bedford, NS'
    },
    {
      id: 3,
      name: 'Lisa MacDonald',
      text: 'Excellent customer service from start to finish. They made car buying stress-free!',
      rating: 5,
      location: 'Cole Harbour, NS'
    }
  ]);

  const [blogPosts, setBlogPosts] = useState([
    {
      id: 1,
      title: 'Top 10 Cars to Buy in 2024',
      excerpt: 'Discover the best vehicles of 2024, from fuel-efficient sedans to powerful SUVs.',
      author: 'John Smith',
      date: '2024-01-15',
      status: 'published'
    },
    {
      id: 2,
      title: 'Electric vs Gas: Which is Right for You?',
      excerpt: 'Compare electric and gas vehicles in terms of cost, convenience, and environmental impact.',
      author: 'Sarah Johnson',
      date: '2024-01-12',
      status: 'published'
    }
  ]);

  const sections = [
    { id: 'homepage', name: 'Homepage', icon: FiType },
    { id: 'about', name: 'About Page', icon: FiType },
    { id: 'contact', name: 'Contact Info', icon: FiSettings },
    { id: 'testimonials', name: 'Testimonials', icon: FiEdit },
    { id: 'blog', name: 'Blog Posts', icon: FiEdit },
  ];

  const handleContentChange = (section, field, value) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleTestimonialChange = (id, field, value) => {
    setTestimonials(prev => prev.map(testimonial => 
      testimonial.id === id ? { ...testimonial, [field]: value } : testimonial
    ));
  };

  const addTestimonial = () => {
    const newTestimonial = {
      id: Date.now(),
      name: '',
      text: '',
      rating: 5,
      location: ''
    };
    setTestimonials([...testimonials, newTestimonial]);
  };

  const removeTestimonial = (id) => {
    setTestimonials(testimonials.filter(t => t.id !== id));
  };

  const saveContent = () => {
    // Here you would typically save to your backend/database
    alert('Content saved successfully!');
  };

  const renderHomepageEditor = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Homepage Content</h2>
      
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Hero Title</label>
          <input
            type="text"
            value={content.homepage.heroTitle}
            onChange={(e) => handleContentChange('homepage', 'heroTitle', e.target.value)}
            className="form-input"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Hero Subtitle</label>
          <textarea
            value={content.homepage.heroSubtitle}
            onChange={(e) => handleContentChange('homepage', 'heroSubtitle', e.target.value)}
            rows={3}
            className="form-input"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Features Section Title</label>
          <input
            type="text"
            value={content.homepage.featuresTitle}
            onChange={(e) => handleContentChange('homepage', 'featuresTitle', e.target.value)}
            className="form-input"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Features Section Subtitle</label>
          <textarea
            value={content.homepage.featuresSubtitle}
            onChange={(e) => handleContentChange('homepage', 'featuresSubtitle', e.target.value)}
            rows={3}
            className="form-input"
          />
        </div>
      </div>
    </div>
  );

  const renderContactEditor = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Contact Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
          <input
            type="text"
            value={content.contact.address}
            onChange={(e) => handleContentChange('contact', 'address', e.target.value)}
            className="form-input"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
          <input
            type="text"
            value={content.contact.phone}
            onChange={(e) => handleContentChange('contact', 'phone', e.target.value)}
            className="form-input"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={content.contact.email}
            onChange={(e) => handleContentChange('contact', 'email', e.target.value)}
            className="form-input"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Business Hours</label>
          <input
            type="text"
            value={content.contact.hours}
            onChange={(e) => handleContentChange('contact', 'hours', e.target.value)}
            className="form-input"
          />
        </div>
      </div>
    </div>
  );

  const renderTestimonialsEditor = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">Customer Testimonials</h2>
        <button
          onClick={addTestimonial}
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Add Testimonial
        </button>
      </div>
      
      <div className="space-y-4">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={testimonial.name}
                  onChange={(e) => handleTestimonialChange(testimonial.id, 'name', e.target.value)}
                  className="form-input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={testimonial.location}
                  onChange={(e) => handleTestimonialChange(testimonial.id, 'location', e.target.value)}
                  className="form-input"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Testimonial Text</label>
              <textarea
                value={testimonial.text}
                onChange={(e) => handleTestimonialChange(testimonial.id, 'text', e.target.value)}
                rows={3}
                className="form-input"
              />
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                <select
                  value={testimonial.rating}
                  onChange={(e) => handleTestimonialChange(testimonial.id, 'rating', parseInt(e.target.value))}
                  className="form-select w-20"
                >
                  <option value={5}>5</option>
                  <option value={4}>4</option>
                  <option value={3}>3</option>
                  <option value={2}>2</option>
                  <option value={1}>1</option>
                </select>
              </div>
              <button
                onClick={() => removeTestimonial(testimonial.id)}
                className="text-red-600 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBlogEditor = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">Blog Posts</h2>
        <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors">
          Add New Post
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Author
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
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
            {blogPosts.map((post) => (
              <tr key={post.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{post.title}</div>
                  <div className="text-sm text-gray-500">{post.excerpt}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {post.author}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {post.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    {post.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-primary-600 hover:text-primary-700 mr-4">
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-700">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'homepage':
        return renderHomepageEditor();
      case 'about':
        return renderHomepageEditor(); // Similar structure
      case 'contact':
        return renderContactEditor();
      case 'testimonials':
        return renderTestimonialsEditor();
      case 'blog':
        return renderBlogEditor();
      default:
        return renderHomepageEditor();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
          <p className="text-gray-600">Manage website content and information</p>
        </div>
        <button
          onClick={saveContent}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center space-x-2"
        >
          <SafeIcon icon={FiSave} className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    activeSection === section.id
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <SafeIcon icon={section.icon} className="w-4 h-4" />
                  <span>{section.name}</span>
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

export default ContentManager;