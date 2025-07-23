import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import openaiService from '../../services/openaiService';

const { FiMessageCircle, FiSend, FiLoader, FiUser, FiHelpCircle } = FiIcons;

const VehicleQA = ({ vehicle }) => {
  const [question, setQuestion] = useState('');
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = React.useRef(null);

  // Load previous conversations from localStorage
  useEffect(() => {
    if (!vehicle) return;
    
    const savedConversations = localStorage.getItem(`vehicle_qa_${vehicle.id}`);
    if (savedConversations) {
      try {
        setConversations(JSON.parse(savedConversations));
      } catch (err) {
        console.error('Error parsing saved conversations:', err);
      }
    }
  }, [vehicle]);

  // Save conversations to localStorage
  useEffect(() => {
    if (!vehicle || conversations.length === 0) return;
    localStorage.setItem(`vehicle_qa_${vehicle.id}`, JSON.stringify(conversations));
  }, [conversations, vehicle]);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversations]);

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    
    if (!question.trim() || !vehicle) return;
    
    const userQuestion = question.trim();
    setQuestion('');
    setLoading(true);
    setError(null);
    
    // Add user question to conversation
    setConversations([...conversations, { role: 'user', content: userQuestion }]);
    
    try {
      const { answer, error: aiError } = await openaiService.answerVehicleQuestion(vehicle, userQuestion);
      
      if (aiError) {
        setError(aiError);
        return;
      }
      
      // Add AI response to conversation
      setConversations(prev => [...prev, { role: 'assistant', content: answer }]);
    } catch (err) {
      setError('Failed to get an answer. Please try again later.');
      console.error('Question answering error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestedQuestion = (suggestedQuestion) => {
    setQuestion(suggestedQuestion);
  };

  const suggestedQuestions = [
    "What are the safety features?",
    "How is the fuel economy?",
    "Does it have Apple CarPlay?",
    "What's the warranty coverage?",
    "How much cargo space does it have?",
    "Is this good for winter driving?"
  ];

  if (!vehicle) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center py-8">
          <SafeIcon icon={FiHelpCircle} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Select a vehicle to ask questions</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-primary-600 text-white p-4">
        <h3 className="text-lg font-semibold flex items-center">
          <SafeIcon icon={FiMessageCircle} className="w-5 h-5 mr-2" />
          Ask About This Vehicle
        </h3>
      </div>

      {/* Conversation Area */}
      <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {conversations.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Ask a question about this vehicle</p>
          </div>
        ) : (
          conversations.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs md:max-w-md px-4 py-3 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-800 border border-gray-200'
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  <SafeIcon
                    icon={message.role === 'user' ? FiUser : FiMessageCircle}
                    className="w-4 h-4"
                  />
                  <span className="text-xs font-semibold">
                    {message.role === 'user' ? 'You' : 'AI Assistant'}
                  </span>
                </div>
                <p className="text-sm whitespace-pre-line">{message.content}</p>
              </div>
            </motion.div>
          ))
        )}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-800 border border-gray-200 px-4 py-3 rounded-lg max-w-xs md:max-w-md">
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiLoader} className="w-4 h-4 animate-spin" />
                <span className="text-xs font-semibold">AI Assistant</span>
              </div>
              <p className="text-sm mt-1">Thinking...</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-50 border-t border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Suggested Questions */}
      {conversations.length === 0 && (
        <div className="p-3 bg-gray-50 border-t border-gray-200">
          <p className="text-xs text-gray-500 mb-2">Suggested questions:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((q, index) => (
              <button
                key={index}
                onClick={() => handleSuggestedQuestion(q)}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Question Input */}
      <div className="p-4 border-t border-gray-200">
        <form onSubmit={handleQuestionSubmit} className="flex space-x-2">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask about this vehicle..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={!question.trim() || loading}
            className="bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <SafeIcon icon={loading ? FiLoader : FiSend} className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default VehicleQA;