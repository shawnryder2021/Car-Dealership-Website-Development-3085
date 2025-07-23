import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiCalendar, FiUser, FiArrowRight, FiSearch } = FiIcons;

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const blogPosts = [
    {
      id: 1,
      title: 'Top 10 Cars to Buy in 2024',
      excerpt: 'Discover the best vehicles of 2024, from fuel-efficient sedans to powerful SUVs. Our expert review covers safety, performance, and value.',
      content: 'Full content here...',
      category: 'Reviews',
      author: 'John Smith',
      date: '2024-01-15',
      image: 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=600&h=400&fit=crop',
      slug: 'top-10-cars-to-buy-2024',
    },
    {
      id: 2,
      title: 'Electric vs Gas: Which is Right for You?',
      excerpt: 'Compare electric and gas vehicles in terms of cost, convenience, and environmental impact. Make an informed decision for your next purchase.',
      content: 'Full content here...',
      category: 'Buying Guide',
      author: 'Sarah Johnson',
      date: '2024-01-12',
      image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&h=400&fit=crop',
      slug: 'electric-vs-gas-which-is-right',
    },
    {
      id: 3,
      title: 'Essential Car Maintenance Tips for Winter',
      excerpt: 'Keep your vehicle running smoothly during cold weather with these essential maintenance tips from our certified technicians.',
      content: 'Full content here...',
      category: 'Maintenance',
      author: 'Mike Rodriguez',
      date: '2024-01-10',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop',
      slug: 'car-maintenance-tips-winter',
    },
    {
      id: 4,
      title: 'How to Get the Best Trade-In Value',
      excerpt: 'Maximize your trade-in value with these professional tips. Learn what dealers look for and how to prepare your vehicle.',
      content: 'Full content here...',
      category: 'Tips',
      author: 'Lisa Chen',
      date: '2024-01-08',
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&h=400&fit=crop',
      slug: 'best-trade-in-value-tips',
    },
    {
      id: 5,
      title: 'Understanding Auto Financing Options',
      excerpt: 'Navigate the world of auto loans, leasing, and financing. Learn about interest rates, terms, and how to get approved.',
      content: 'Full content here...',
      category: 'Financing',
      author: 'David Wilson',
      date: '2024-01-05',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop',
      slug: 'understanding-auto-financing',
    },
    {
      id: 6,
      title: 'Safety Features Every New Car Should Have',
      excerpt: 'Modern safety technology explained. Learn about advanced driver assistance systems and what to look for in your next vehicle.',
      content: 'Full content here...',
      category: 'Safety',
      author: 'Emily Davis',
      date: '2024-01-03',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&h=400&fit=crop',
      slug: 'safety-features-new-cars',
    },
  ];

  const categories = ['all', 'Reviews', 'Buying Guide', 'Maintenance', 'Tips', 'Financing', 'Safety'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const featuredPost = blogPosts[0];
  const regularPosts = blogPosts.slice(1);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50"
    >
      <Helmet>
        <title>Auto Blog - Car Reviews, Tips & Buying Guides | Premier Auto</title>
        <meta name="description" content="Read our latest car reviews, maintenance tips, buying guides, and automotive news. Expert advice to help you make informed vehicle decisions." />
        <meta name="keywords" content="car reviews, auto blog, car buying tips, vehicle maintenance, automotive news, car safety" />
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
              Auto Blog & Resources
            </motion.h1>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-200"
            >
              Expert automotive advice, reviews, and tips to help you make informed decisions about your next vehicle purchase.
            </motion.p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <SafeIcon icon={FiSearch} className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-primary-50 border border-gray-300'
                  }`}
                >
                  {category === 'all' ? 'All' : category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Post */}
        {selectedCategory === 'all' && !searchTerm && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Article</h2>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="h-64 lg:h-auto">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded">
                      {featuredPost.category}
                    </span>
                    <div className="flex items-center space-x-1">
                      <SafeIcon icon={FiCalendar} className="w-4 h-4" />
                      <span>{formatDate(featuredPost.date)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <SafeIcon icon={FiUser} className="w-4 h-4" />
                      <span>{featuredPost.author}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{featuredPost.title}</h3>
                  <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>
                  <Link
                    to={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-semibold"
                  >
                    <span>Read More</span>
                    <SafeIcon icon={FiArrowRight} className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Blog Posts Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {selectedCategory === 'all' ? 'Latest Articles' : `${selectedCategory} Articles`}
          </h2>
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden card-hover"
                >
                  <div className="h-48">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                      <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded text-xs">
                        {post.category}
                      </span>
                      <div className="flex items-center space-x-1">
                        <SafeIcon icon={FiCalendar} className="w-3 h-3" />
                        <span>{formatDate(post.date)}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <SafeIcon icon={FiUser} className="w-3 h-3" />
                        <span>{post.author}</span>
                      </div>
                      <Link
                        to={`/blog/${post.slug}`}
                        className="inline-flex items-center space-x-1 text-primary-600 hover:text-primary-700 font-semibold text-sm"
                      >
                        <span>Read More</span>
                        <SafeIcon icon={FiArrowRight} className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Newsletter Signup */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8 text-primary-200">
            Subscribe to our newsletter for the latest automotive tips, reviews, and industry news.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900"
            />
            <button className="bg-white text-primary-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Blog;