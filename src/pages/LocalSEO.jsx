import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiMapPin, FiPhone, FiClock, FiStar, FiNavigation, FiAward } = FiIcons;

const LocalSEO = () => {
  const reviews = [
    {
      name: 'Michael Thompson',
      rating: 5,
      text: 'Excellent service and great selection of vehicles. The Halifax team was professional and helped me find exactly what I was looking for.',
      date: '2024-01-10'
    },
    {
      name: 'Jennifer MacLean',
      rating: 5,
      text: 'Best car buying experience I\'ve ever had in Halifax. Fair prices, no pressure, and they really care about customer satisfaction.',
      date: '2024-01-08'
    },
    {
      name: 'Robert Chen',
      rating: 5,
      text: 'Premier Auto Halifax made the financing process so easy. Great rates and the staff explained everything clearly.',
      date: '2024-01-05'
    }
  ];

  const services = [
    'New Car Sales',
    'Used Car Sales', 
    'Auto Financing',
    'Vehicle Service & Repair',
    'Trade-In Appraisals',
    'Extended Warranties',
    'Parts & Accessories'
  ];

  const brands = [
    'Toyota', 'Honda', 'Ford', 'Chevrolet', 'Subaru', 'Mazda',
    'Nissan', 'Hyundai', 'Kia', 'Volkswagen', 'BMW', 'Audi'
  ];

  const servingAreas = [
    'Halifax', 'Dartmouth', 'Bedford', 'Sackville', 'Cole Harbour',
    'Eastern Passage', 'Fall River', 'Hammonds Plains', 'Timberlea',
    'Prospect', 'Tantallon', 'Elmsdale'
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50"
    >
      <Helmet>
        <title>Premier Auto Dealer in Halifax - New & Used Cars | Best Halifax Car Dealership | Nova Scotia</title>
        <meta name="description" content="Premier Auto is Halifax's trusted car dealership. Browse new & used cars, get auto financing, and expert service. Visit our Halifax location today! Serving Dartmouth, Bedford & all Nova Scotia." />
        <meta name="keywords" content="car dealer Halifax, auto dealership Halifax, new cars Halifax, used cars Halifax, car financing Halifax, Dartmouth cars, Bedford auto dealer" />
        <meta name="geo.region" content="CA-NS" />
        <meta name="geo.placename" content="Halifax" />
        <meta name="geo.position" content="44.6488;-63.5752" />
        <meta name="ICBM" content="44.6488,-63.5752" />
        
        {/* Local Business Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AutoDealer",
            "name": "Premier Auto Halifax",
            "image": "https://premierautohalifax.ca/images/dealership.jpg",
            "url": "https://premierautohalifax.ca/dealers/halifax",
            "telephone": "+1-902-555-4567",
            "priceRange": "$$",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "123 Robie Street",
              "addressLocality": "Halifax",
              "addressRegion": "NS",
              "postalCode": "B3H 3C2",
              "addressCountry": "CA"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 44.6488,
              "longitude": -63.5752
            },
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "09:00",
                "closes": "19:00"
              },
              {
                "@type": "OpeningHoursSpecification", 
                "dayOfWeek": "Saturday",
                "opens": "09:00",
                "closes": "18:00"
              },
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Sunday", 
                "opens": "12:00",
                "closes": "17:00"
              }
            ],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "247"
            },
            "areaServed": [
              "Halifax", "Dartmouth", "Bedford", "Sackville", "Cole Harbour",
              "Eastern Passage", "Fall River", "Nova Scotia"
            ],
            "review": reviews.map(review => ({
              "@type": "Review",
              "author": {
                "@type": "Person",
                "name": review.name
              },
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": review.rating,
                "bestRating": "5"
              },
              "reviewBody": review.text,
              "datePublished": review.date
            }))
          })}
        </script>
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
              Halifax's Premier Auto Dealer
            </motion.h1>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-200 mb-8"
            >
              Serving Halifax, Dartmouth, Bedford and surrounding areas for over 25 years with quality 
              new and used vehicles, expert service, and competitive financing options.
            </motion.p>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center space-x-2 mb-8"
            >
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <SafeIcon key={i} icon={FiStar} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-lg font-semibold">4.9/5 from 247+ Halifax reviews</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location & Contact Info */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Visit Our Halifax Location
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <SafeIcon icon={FiMapPin} className="w-6 h-6 text-primary-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Address</h3>
                    <p className="text-gray-600">
                      123 Robie Street<br />
                      Halifax, NS B3H 3C2
                    </p>
                    <a 
                      href="https://maps.google.com/maps?q=123+Robie+Street+Halifax+NS" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center space-x-1 mt-2"
                    >
                      <SafeIcon icon={FiNavigation} className="w-4 h-4" />
                      <span>Get Directions</span>
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <SafeIcon icon={FiPhone} className="w-6 h-6 text-primary-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Phone</h3>
                    <a 
                      href="tel:+19025554567" 
                      className="text-primary-600 hover:text-primary-700 font-medium text-lg"
                    >
                      (902) 555-4567
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <SafeIcon icon={FiClock} className="w-6 h-6 text-primary-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Hours</h3>
                    <div className="text-gray-600">
                      <p>Monday - Friday: 9:00 AM - 7:00 PM</p>
                      <p>Saturday: 9:00 AM - 6:00 PM</p>
                      <p>Sunday: 12:00 PM - 5:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="h-96 bg-gray-300 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2839.123456789!2d-63.5752!3d44.6488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDTCsDM4JzU1LjciTiA2M8KwMzQnMzAuNyJX!5e0!3m2!1sen!2sca!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Premier Auto Halifax Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Serving Areas */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Serving Halifax and Surrounding Areas
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We proudly serve customers throughout the Halifax Regional Municipality and beyond.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {servingAreas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white p-4 rounded-lg text-center font-semibold text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors shadow-md"
              >
                {area}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Complete Automotive Services in Halifax
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From new car sales to service and financing, we're your one-stop automotive destination in Halifax.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-lg text-center shadow-md hover:shadow-lg transition-shadow"
              >
                <SafeIcon icon={FiAward} className="w-8 h-8 text-primary-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900">{service}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Popular Brands Available in Halifax
            </h2>
            <p className="text-gray-600">
              We carry a wide selection of new and used vehicles from trusted manufacturers, 
              perfect for Maritime driving conditions.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brands.map((brand, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white p-4 rounded-lg text-center font-semibold text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors shadow-md"
              >
                {brand}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Halifax Customers Say
            </h2>
            <p className="text-gray-600">
              Read reviews from satisfied customers in Halifax and surrounding areas.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                className="bg-gray-50 p-6 rounded-lg shadow-lg"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <SafeIcon key={i} icon={FiStar} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{review.text}"</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span className="font-semibold">{review.name}</span>
                  <span>{new Date(review.date).toLocaleDateString()}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Local CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Visit Premier Auto Halifax?
          </h2>
          <p className="text-xl mb-8 text-primary-200">
            Stop by our Halifax location today to browse our inventory, meet our team, 
            and experience the Premier Auto difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <a
              href="/inventory"
              className="bg-white text-primary-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Browse Inventory
            </a>
            <a
              href="tel:+19025554567"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-900 transition-colors"
            >
              Call Today
            </a>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default LocalSEO;