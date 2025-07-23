import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import StickyContactBar from './components/StickyContactBar';
import ChatBot from './components/ChatBot';
import Home from './pages/Home';
import Inventory from './pages/Inventory';
import VehicleDetail from './pages/VehicleDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Financing from './pages/Financing';
import Service from './pages/Service';
import TradeIn from './pages/TradeIn';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import LocalSEO from './pages/LocalSEO';
import Admin from './pages/Admin';
import AiTools from './pages/AiTools';
import './App.css';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/admin/*" element={<Admin />} />
              <Route
                path="/*"
                element={
                  <>
                    <Header />
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/inventory" element={<Inventory />} />
                      <Route path="/vehicle/:id" element={<VehicleDetail />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/financing" element={<Financing />} />
                      <Route path="/service" element={<Service />} />
                      <Route path="/trade-in" element={<TradeIn />} />
                      <Route path="/blog" element={<Blog />} />
                      <Route path="/blog/:slug" element={<BlogPost />} />
                      <Route path="/dealers/halifax" element={<LocalSEO />} />
                      <Route path="/ai-tools" element={<AiTools />} />
                    </Routes>
                    <Footer />
                    <StickyContactBar />
                    <ChatBot />
                  </>
                }
              />
            </Routes>
          </AnimatePresence>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;