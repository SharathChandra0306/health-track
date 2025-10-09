import React, { useState, useEffect, useRef } from 'react';
import { useTracker } from '../hooks/useTracker';
import { gsap } from 'gsap';
import { 
  MessageCircle, X, Send, MapPin, Navigation, Phone, 
  Bot, ChevronDown, Star, AlertTriangle, Users, 
  Ambulance, Shield, Heart, Clock, Zap
} from 'lucide-react';

const NavigationBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const { hospitals } = useTracker();
  const messagesEndRef = useRef(null);
  const chatRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Initial welcome message
      setTimeout(() => {
        addBotMessage("👋 Hi! I'm your HealthTrack assistant. I can help you with:\n\n🚨 **Emergency assistance** (call 911/108)\n📞 Emergency contact numbers\n🏥 Find nearby hospitals\n🛏️ Check bed availability\n🗺️ Get directions to medical facilities\n👩‍⚕️ Medical guidance\n\nFor emergencies, type 'emergency' or use the quick actions below. How can I help you today?");
      }, 500);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && chatRef.current) {
      gsap.fromTo(chatRef.current, 
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(1.7)" }
      );
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const addBotMessage = (text, options = {}) => {
    const message = {
      type: 'bot',
      text,
      timestamp: new Date(),
      ...options
    };
    setMessages(prev => [...prev, message]);
  };

  const addUserMessage = (text) => {
    const message = {
      type: 'user',
      text,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, message]);
  };

  const processUserMessage = (message) => {
    const lowerMessage = message.toLowerCase();
    
    // Emergency keywords - highest priority
    if (lowerMessage.includes('emergency') || lowerMessage.includes('urgent') || lowerMessage.includes('critical') || 
        lowerMessage.includes('ambulance') || lowerMessage.includes('911') || lowerMessage.includes('108') ||
        lowerMessage.includes('help me') || lowerMessage.includes('accident') || lowerMessage.includes('heart attack') ||
        lowerMessage.includes('stroke') || lowerMessage.includes('bleeding') || lowerMessage.includes('unconscious') ||
        lowerMessage.includes('chest pain') || lowerMessage.includes('breathing') || lowerMessage.includes('trauma')) {
      handleEmergencyAssistance();
    }
    // Hospital search keywords
    else if (lowerMessage.includes('hospital') || lowerMessage.includes('find') || lowerMessage.includes('search')) {
      if (lowerMessage.includes('near') || lowerMessage.includes('nearby') || lowerMessage.includes('close')) {
        handleNearbyHospitals();
      } else if (lowerMessage.includes('emergency')) {
        handleEmergencyHospitals();
      } else {
        handleGeneralHospitalSearch();
      }
    }
    // Bed availability
    else if (lowerMessage.includes('bed') || lowerMessage.includes('available') || lowerMessage.includes('availability')) {
      handleBedAvailability();
    }
    // Navigation/Directions
    else if (lowerMessage.includes('direction') || lowerMessage.includes('navigate') || lowerMessage.includes('route')) {
      handleNavigationHelp();
    }
    // Emergency contacts
    else if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('call')) {
      handleEmergencyContacts();
    }
    // Symptoms or medical help
    else if (lowerMessage.includes('doctor') || lowerMessage.includes('medical') || lowerMessage.includes('sick') ||
             lowerMessage.includes('pain') || lowerMessage.includes('fever') || lowerMessage.includes('injury')) {
      handleMedicalAssistance();
    }
    // Greeting
    else if (['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening'].some(greeting => lowerMessage.includes(greeting))) {
      addBotMessage("Hello! 👋 I'm your HealthTrack assistant. I can help you with:\n\n🚨 Emergency assistance (call 911/108)\n🏥 Find nearby hospitals\n🛏️ Check bed availability\n🗺️ Get directions\n📞 Emergency contacts\n\nHow can I help you today?");
    }
    // Default response
    else {
      addBotMessage("I can help you with:\n\n🚨 **Emergency Assistance** - Call 911/108\n🏥 Finding nearby hospitals\n🛏️ Checking bed availability\n🗺️ Getting directions to medical facilities\n📞 Emergency contact numbers\n👩‍⚕️ Medical guidance\n\nType 'emergency' for immediate help or ask me anything!");
    }
  };

  const handleNearbyHospitals = () => {
    if (!hospitals || hospitals.length === 0) {
      addBotMessage("I don't have hospital data available right now. Please try refreshing the page or contact support.");
      return;
    }

    const nearbyHospitals = hospitals.slice(0, 5);
    addBotMessage("🏥 Here are nearby hospitals:", { hospitals: nearbyHospitals });
  };

  const handleEmergencyHospitals = () => {
    addBotMessage("🚨 For medical emergencies, please call 911 immediately!\n\nI can also show you nearby hospitals with emergency services:");
    
    if (hospitals && hospitals.length > 0) {
      const emergencyHospitals = hospitals.filter(h => 
        h.specialties?.includes('Emergency Medicine') || h.type === 'General Hospital'
      ).slice(0, 3);
      
      if (emergencyHospitals.length > 0) {
        addBotMessage("Emergency hospitals near you:", { hospitals: emergencyHospitals });
      }
    }
  };

  const handleGeneralHospitalSearch = () => {
    addBotMessage("🔍 I can help you find hospitals! You can:\n• View nearby hospitals\n• Search by specialty\n• Check availability\n• Get directions\n\nWould you like to see nearby hospitals?");
  };

  const handleBedAvailability = () => {
    addBotMessage("🛏️ To check bed availability:\n• Browse hospitals below\n• Each hospital shows available beds\n• Click 'View Details' for specific department availability\n• Use filters to find specific bed types");
    
    if (hospitals && hospitals.length > 0) {
      const hospitalsWithBeds = hospitals.filter(h => h.beds && h.beds.length > 0).slice(0, 3);
      if (hospitalsWithBeds.length > 0) {
        addBotMessage("Hospitals with available beds:", { hospitals: hospitalsWithBeds });
      }
    }
  };

  const handleNavigationHelp = () => {
    addBotMessage("🗺️ I can help you get directions!\n• Click the 'Directions' button on any hospital card\n• It will open Google Maps with turn-by-turn navigation\n• Or I can show you nearby hospitals to choose from");
    
    if (hospitals && hospitals.length > 0) {
      addBotMessage("Choose a hospital for directions:", { hospitals: hospitals.slice(0, 4) });
    }
  };

  const handleEmergencyAssistance = () => {
    addBotMessage("🚨 EMERGENCY ASSISTANCE ACTIVATED:\n\n⚡ IMMEDIATE ACTIONS:\n📞 Call 911/102 for ambulance\n🏥 Call 108 for medical emergency\n👮 Call 100 for police\n🔥 Call 101 for fire department\n\n📍 I'll show you the nearest emergency facilities:", { isEmergency: true });
    
    // Show emergency contact buttons
    const emergencyContacts = [
      { name: "Ambulance", number: "108", type: "ambulance" },
      { name: "Police", number: "100", type: "police" },
      { name: "Fire", number: "101", type: "fire" },
      { name: "Emergency", number: "911", type: "general" }
    ];
    
    addBotMessage("Quick Emergency Contacts:", { emergencyContacts, isEmergency: true });
    
    if (hospitals && hospitals.length > 0) {
      const emergencyFacilities = hospitals.filter(h => 
        h.specialties?.includes('Emergency Medicine') || 
        h.specialties?.includes('Emergency Care') ||
        h.type.includes('General') ||
        h.type.includes('Multi-Specialty')
      ).slice(0, 4);
      
      if (emergencyFacilities.length > 0) {
        addBotMessage("🏥 Nearest Emergency Hospitals (24/7):", { 
          hospitals: emergencyFacilities.map(h => ({
            ...h,
            isEmergency: true
          })), 
          isEmergency: true 
        });
      } else {
        addBotMessage("Nearest Medical Facilities:", { 
          hospitals: hospitals.slice(0, 3).map(h => ({
            ...h,
            isEmergency: true
          })), 
          isEmergency: true 
        });
      }
    }
    
    // Add additional emergency guidance
    setTimeout(() => {
      addBotMessage("🩺 EMERGENCY GUIDANCE:\n\n✅ Stay calm and assess the situation\n✅ Call emergency services first\n✅ Provide clear location details\n✅ Follow dispatcher instructions\n✅ Keep the patient stable\n\n🚗 Need directions to nearest hospital? Just ask!", { isEmergency: true });
    }, 2000);
  };

  const handleEmergencyContacts = () => {
    const emergencyContacts = [
      { name: "National Emergency", number: "911", type: "general", description: "General emergency services" },
      { name: "Medical Emergency", number: "108", type: "ambulance", description: "Ambulance & medical help" },
      { name: "Police Emergency", number: "100", type: "police", description: "Police assistance" },
      { name: "Fire Emergency", number: "101", type: "fire", description: "Fire department" },
      { name: "Women Helpline", number: "1091", type: "women", description: "Women in distress" },
      { name: "Child Helpline", number: "1098", type: "child", description: "Child emergency" }
    ];
    
    addBotMessage("📞 EMERGENCY CONTACT NUMBERS:\n\nHere are important emergency numbers you can call:", { emergencyContacts, isEmergency: true });
  };

  const handleMedicalAssistance = () => {
    addBotMessage("👩‍⚕️ MEDICAL ASSISTANCE:\n\n🚨 For serious symptoms, call 108 immediately!\n\n⚠️ Seek immediate help for:\n• Chest pain or difficulty breathing\n• Severe bleeding\n• Head injuries\n• Stroke symptoms\n• Allergic reactions\n• Loss of consciousness\n\n🏥 I can show you nearby hospitals with medical specialists:");
    
    if (hospitals && hospitals.length > 0) {
      const medicalFacilities = hospitals.slice(0, 4);
      addBotMessage("Medical facilities near you:", { hospitals: medicalFacilities });
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    addUserMessage(inputMessage);
    setIsTyping(true);
    setShowSuggestions(false);

    setTimeout(() => {
      processUserMessage(inputMessage);
      setIsTyping(false);
    }, 1000);

    setInputMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const getGoogleMapsUrl = (hospital) => {
    const destination = encodeURIComponent(`${hospital.name}, ${hospital.address || hospital.location?.address}`);
    return `https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=driving`;
  };

  const suggestions = [
    "🚨 Emergency assistance",
    "📞 Emergency contacts", 
    "🏥 Find nearby hospitals",
    "🛏️ Check bed availability",
    "🗺️ Get directions",
    "👩‍⚕️ Medical help"
  ];

  return (
    <>
      {/* Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        {isOpen && (
          <div 
            ref={chatRef}
            className="mb-4 w-96 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">HealthTrack Assistant</h3>
                  <p className="text-xs text-blue-100">Always here to help</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-sm' 
                      : message.isEmergency
                        ? 'bg-red-50 text-red-800 border border-red-200 rounded-bl-sm'
                        : 'bg-white text-gray-800 border border-gray-200 rounded-bl-sm'
                  }`}>
                    {message.type === 'bot' && (
                      <div className="flex items-center gap-2 mb-2">
                        <Bot className="w-4 h-4 text-blue-600" />
                        <span className="text-xs font-medium text-gray-500">Assistant</span>
                      </div>
                    )}
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    
                    {/* Emergency Contacts */}
                    {message.emergencyContacts && (
                      <div className="mt-3 space-y-2">
                        {message.emergencyContacts.map((contact, contactIndex) => (
                          <div key={contactIndex} className="bg-red-50 border border-red-200 p-3 rounded-lg">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  {contact.type === 'ambulance' && <Ambulance className="w-4 h-4 text-red-600" />}
                                  {contact.type === 'police' && <Shield className="w-4 h-4 text-blue-600" />}
                                  {contact.type === 'fire' && <Zap className="w-4 h-4 text-orange-600" />}
                                  {contact.type === 'general' && <AlertTriangle className="w-4 h-4 text-red-600" />}
                                  {contact.type === 'women' && <Users className="w-4 h-4 text-purple-600" />}
                                  {contact.type === 'child' && <Heart className="w-4 h-4 text-pink-600" />}
                                  <h4 className="font-semibold text-gray-900 text-sm">{contact.name}</h4>
                                </div>
                                {contact.description && (
                                  <p className="text-xs text-gray-600 mt-1">{contact.description}</p>
                                )}
                              </div>
                              <a
                                href={`tel:${contact.number}`}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors flex items-center gap-2"
                              >
                                <Phone className="w-4 h-4" />
                                {contact.number}
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Hospital Cards */}
                    {message.hospitals && (
                      <div className="mt-3 space-y-2">
                        {message.hospitals.map((hospital, hospitalIndex) => (
                          <div key={hospitalIndex} className={`p-3 rounded-lg border shadow-sm ${
                            hospital.isEmergency ? 'bg-red-50 border-red-200' : 'bg-white'
                          }`}>
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  {hospital.isEmergency && <AlertTriangle className="w-4 h-4 text-red-600" />}
                                  <h4 className="font-semibold text-gray-900 text-sm">{hospital.name}</h4>
                                  {hospital.isEmergency && (
                                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
                                      24/7 Emergency
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-gray-600">{hospital.address || hospital.location?.address}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  {hospital.rating && (
                                    <div className="flex items-center gap-1">
                                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                      <span className="text-xs text-gray-600">{hospital.rating}</span>
                                    </div>
                                  )}
                                  {hospital.distance && (
                                    <div className="flex items-center gap-1">
                                      <MapPin className="w-3 h-3 text-gray-400" />
                                      <span className="text-xs text-gray-600">{hospital.distance} km</span>
                                    </div>
                                  )}
                                  <div className="flex items-center gap-1">
                                    <Clock className="w-3 h-3 text-green-500" />
                                    <span className="text-xs text-green-600">Open Now</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex gap-2 mt-2">
                              <a
                                href={`tel:${hospital.phone}`}
                                className={`flex-1 px-2 py-1 rounded text-xs text-center transition-colors flex items-center justify-center gap-1 ${
                                  hospital.isEmergency 
                                    ? 'bg-red-600 text-white hover:bg-red-700' 
                                    : 'bg-green-500 text-white hover:bg-green-600'
                                }`}
                              >
                                <Phone className="w-3 h-3" />
                                {hospital.isEmergency ? 'Emergency Call' : 'Call'}
                              </a>
                              <a
                                href={getGoogleMapsUrl(hospital)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 bg-blue-500 text-white px-2 py-1 rounded text-xs text-center hover:bg-blue-600 transition-colors flex items-center justify-center gap-1"
                              >
                                <Navigation className="w-3 h-3" />
                                Directions
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <p className="text-xs mt-2 opacity-60">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white text-gray-800 border border-gray-200 p-3 rounded-lg rounded-bl-sm max-w-[80%]">
                    <div className="flex items-center gap-2 mb-2">
                      <Bot className="w-4 h-4 text-blue-600" />
                      <span className="text-xs font-medium text-gray-500">Assistant is typing...</span>
                    </div>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Suggestions */}
              {showSuggestions && messages.length <= 1 && (
                <div className="space-y-2">
                  <p className="text-xs text-gray-500 text-center">Quick actions:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setInputMessage(suggestion);
                          handleSendMessage();
                        }}
                        className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about hospitals, beds, or directions..."
                  className="flex-1 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Chat Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          {isOpen ? (
            <ChevronDown className="w-6 h-6 group-hover:rotate-180 transition-transform duration-300" />
          ) : (
            <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
          )}
        </button>
      </div>
    </>
  );
};

export default NavigationBot;