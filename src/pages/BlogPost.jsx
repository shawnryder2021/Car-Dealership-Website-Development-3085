import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiCalendar, FiUser, FiArrowLeft, FiShare2, FiFacebook, FiTwitter, FiLinkedin } = FiIcons;

const BlogPost = () => {
  const { slug } = useParams();

  // Sample blog post data (in real app, this would come from API/CMS)
  const blogPost = {
    id: 1,
    title: 'Top 10 Cars to Buy in 2024',
    content: `
      <p>As we move into 2024, the automotive landscape continues to evolve with exciting new models, improved technology, and better value propositions. Whether you're looking for a fuel-efficient daily driver, a family-friendly SUV, or a luxury vehicle with all the bells and whistles, this year's lineup has something for everyone.</p>

      <h2>1. Toyota Camry - Best Overall Sedan</h2>
      <p>The Toyota Camry continues to dominate the midsize sedan market with its perfect blend of reliability, fuel efficiency, and value. The 2024 model features updated styling, improved technology, and Toyota's renowned build quality.</p>

      <h3>Key Features:</h3>
      <ul>
        <li>Standard Toyota Safety Sense 2.0</li>
        <li>Up to 41 mpg highway</li>
        <li>Spacious interior with premium materials</li>
        <li>Strong resale value</li>
      </ul>

      <h2>2. Honda CR-V - Best Compact SUV</h2>
      <p>The Honda CR-V remains a top choice for families seeking a reliable, practical, and efficient compact SUV. With its roomy interior, excellent safety ratings, and Honda's reputation for reliability, it's easy to see why the CR-V is consistently one of America's best-selling vehicles.</p>

      <h2>3. Tesla Model 3 - Best Electric Vehicle</h2>
      <p>Leading the charge in the electric vehicle revolution, the Tesla Model 3 offers impressive range, cutting-edge technology, and performance that rivals traditional sports cars. With ongoing improvements to build quality and expanding Supercharger network, it's an excellent choice for eco-conscious buyers.</p>

      <h2>4. Ford F-150 - Best Full-Size Truck</h2>
      <p>America's best-selling truck for over four decades, the Ford F-150 continues to set the standard for capability, technology, and innovation in the full-size pickup segment. The 2024 model offers multiple powertrain options, including hybrid and all-electric variants.</p>

      <h2>5. Mazda CX-5 - Best Value SUV</h2>
      <p>The Mazda CX-5 stands out in the crowded compact SUV segment with its upscale interior, engaging driving dynamics, and attractive styling. It's proof that you don't have to sacrifice fun-to-drive characteristics for practicality.</p>

      <h2>Making Your Decision</h2>
      <p>When choosing your next vehicle, consider factors such as:</p>
      <ul>
        <li>Your budget and financing options</li>
        <li>Fuel efficiency requirements</li>
        <li>Safety ratings and features</li>
        <li>Reliability and maintenance costs</li>
        <li>Resale value</li>
      </ul>

      <p>Our team at Premier Auto is here to help you find the perfect vehicle for your needs and budget. Visit our showroom to test drive any of these excellent vehicles and speak with our knowledgeable sales team.</p>
    `,
    category: 'Reviews',
    author: 'John Smith',
    date: '2024-01-15',
    image: 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=800&h=400&fit=crop',
    slug: 'top-10-cars-to-buy-2024',
    excerpt: 'Discover the best vehicles of 2024, from fuel-efficient sedans to powerful SUVs. Our expert review covers safety, performance, and value.',
  };

  const relatedPosts = [
    {
      id: 2,
      title: 'Electric vs Gas: Which is Right for You?',
      slug: 'electric-vs-gas-which-is-right',
      image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=300&h=200&fit=crop',
      date: '2024-01-12',
    },
    {
      id: 3,
      title: 'Essential Car Maintenance Tips for Winter',
      slug: 'car-maintenance-tips-winter',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=200&fit=crop',
      date: '2024-01-10',
    },
    {
      id: 4,
      title: 'How to Get the Best Trade-In Value',
      slug: 'best-trade-in-value-tips',
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=300&h=200&fit=crop',
      date: '2024-01-08',
    },
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const shareUrl = window.location.href;
  const shareTitle = blogPost.title;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50"
    >
      <Helmet>
        <title>{blogPost.title} | Premier Auto Blog</title>
        <meta name="description" content={blogPost.excerpt} />
        <meta name="keywords" content="car reviews, 2024 cars, best cars to buy, automotive advice" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content={blogPost.title} />
        <meta property="og:description" content={blogPost.excerpt} />
        <meta property="og:image" content={blogPost.image} />
        <meta property="og:url" content={shareUrl} />
        <meta property="og:type" content="article" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blogPost.title} />
        <meta name="twitter:description" content={blogPost.excerpt} />
        <meta name="twitter:image" content={blogPost.image} />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            to="/blog"
            className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
          >
            <SafeIcon icon={FiArrowLeft} className="w-4 h-4" />
            <span>Back to Blog</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <article className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Featured Image */}
              <div className="h-64 md:h-96">
                <img
                  src={blogPost.image}
                  alt={blogPost.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Article Content */}
              <div className="p-8">
                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                  <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full font-medium">
                    {blogPost.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <SafeIcon icon={FiCalendar} className="w-4 h-4" />
                    <span>{formatDate(blogPost.date)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <SafeIcon icon={FiUser} className="w-4 h-4" />
                    <span>{blogPost.author}</span>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {blogPost.title}
                </h1>

                {/* Social Share */}
                <div className="flex items-center space-x-4 mb-8 pb-6 border-b border-gray-200">
                  <span className="text-gray-600 font-medium">Share:</span>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <SafeIcon icon={FiFacebook} className="w-5 h-5" />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-500 transition-colors"
                  >
                    <SafeIcon icon={FiTwitter} className="w-5 h-5" />
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-800 hover:text-blue-900 transition-colors"
                  >
                    <SafeIcon icon={FiLinkedin} className="w-5 h-5" />
                  </a>
                </div>

                {/* Article Body */}
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: blogPost.content }}
                />

                {/* Call to Action */}
                <div className="mt-12 p-6 bg-primary-50 rounded-lg border border-primary-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Ready to Find Your Perfect Vehicle?
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Our expert team is here to help you choose the right vehicle for your needs and budget. 
                    Visit our showroom or browse our extensive inventory online.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      to="/inventory"
                      className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center"
                    >
                      Browse Inventory
                    </Link>
                    <Link
                      to="/contact"
                      className="border border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center"
                    >
                      Schedule Test Drive
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Related Posts */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Related Articles</h3>
              <div className="space-y-6">
                {relatedPosts.map((post) => (
                  <article key={post.id} className="flex space-x-4">
                    <div className="w-20 h-20 flex-shrink-0">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2">
                        <Link 
                          to={`/blog/${post.slug}`}
                          className="hover:text-primary-600 transition-colors"
                        >
                          {post.title}
                        </Link>
                      </h4>
                      <p className="text-xs text-gray-500">
                        {formatDate(post.date)}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-primary-600 text-white rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Stay Informed</h3>
              <p className="text-primary-200 mb-6 text-sm">
                Get the latest automotive tips, reviews, and industry news delivered to your inbox.
              </p>
              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-3 rounded-lg text-gray-900"
                />
                <button
                  type="submit"
                  className="w-full bg-white text-primary-900 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogPost;