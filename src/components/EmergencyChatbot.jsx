import React, { useState, useEffect, useRef } from 'react';
import { useTracker } from '../hooks/useTracker';

const EmergencyChatbot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  const messagesEndRef = useRef(null);
  const { hospitals } = useTracker();

  const emergencyKeywords = {
    heart: ['heart attack', 'chest pain', 'cardiac', 'heart', 'myocardial'],
    breathing: ['breathing', 'shortness of breath', 'asthma', 'respiratory', 'can\'t breathe'],
    injury: ['accident', 'injury', 'bleeding', 'broken', 'fracture', 'wound'],
    stroke: ['stroke', 'paralysis', 'weakness', 'speech', 'facial drooping'],
    emergency: ['emergency', 'urgent', 'critical', 'severe', 'help'],
    pain: ['severe pain', 'intense pain', 'unbearable pain'],
    poison: ['poisoning', 'overdose', 'toxic', 'ingested'],
    mental: ['suicide', 'mental health', 'depression', 'anxiety crisis']
  };

  const emergencyResponses = {
    heart: "🚨 CARDIAC EMERGENCY DETECTED! This requires immediate medical attention. Call 911 or your local emergency number immediately!",
    breathing: "🚨 BREATHING EMERGENCY! This is critical - call 911 immediately if you're having severe breathing difficulties!",
    injury: "🚨 INJURY EMERGENCY! For severe injuries with heavy bleeding or suspected fractures, call 911 immediately!",
    stroke: "🚨 POSSIBLE STROKE! Time is critical - call 911 immediately! Remember FAST: Face drooping, Arm weakness, Speech difficulty, Time to call!",
    emergency: "🚨 EMERGENCY SITUATION! If this is life-threatening, call 911 immediately!",
    pain: "🚨 SEVERE PAIN ALERT! Intense pain can indicate serious conditions - seek immediate medical attention!",
    poison: "🚨 POISONING EMERGENCY! Call Poison Control: 1-800-222-1222 or 911 immediately!",
    mental: "🚨 MENTAL HEALTH CRISIS! If you're having thoughts of self-harm, call 988 (Suicide & Crisis Lifeline) or 911 immediately!"
  };

  useEffect(() => {
    if (isOpen) {
      setMessages([
        {
          type: 'bot',
          text: "🚨 Emergency Medical Assistant activated! I'm here to help you find immediate medical care. I'll try to detect your location to find the nearest hospitals.",
          timestamp: new Date()
        }
      ]);
      getCurrentLocation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getCurrentLocation = () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
          setIsLoading(false);
          
          const locationMessage = {
            type: 'bot',
            text: `📍 Location detected! Finding nearest hospitals to your position...`,
            timestamp: new Date()
          };
          setMessages(prev => [...prev, locationMessage]);
          
          setTimeout(() => {
            findNearestHospitals(location);
          }, 1000);
        },
        (error) => {
          console.error('Geolocation error:', error);
          setIsLoading(false);
          
          const errorMessage = {
            type: 'bot',
            text: "⚠️ Unable to detect your exact location. I'll show you available hospitals, but please call 911 if this is a life-threatening emergency!",
            timestamp: new Date()
          };
          setMessages(prev => [...prev, errorMessage]);
          
          showAllHospitals();
        }
      );
    } else {
      setIsLoading(false);
      
      const noGeoMessage = {
        type: 'bot',
        text: "⚠️ Your device doesn't support location detection. Showing all available hospitals:",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, noGeoMessage]);
      
      showAllHospitals();
    }
  };

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const findNearestHospitals = (location) => {
    if (!hospitals || hospitals.length === 0) {
      const noHospitalsMessage = {
        type: 'bot',
        text: "⚠️ No hospital data available. Please call 911 for emergency services!",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, noHospitalsMessage]);
      return;
    }

    // Calculate distances and sort hospitals
    const hospitalsWithDistance = hospitals.map(hospital => ({
      ...hospital,
      distance: calculateDistance(
        location.lat, location.lng,
        hospital.latitude || 0, hospital.longitude || 0
      )
    })).sort((a, b) => a.distance - b.distance);

    const nearestHospitals = hospitalsWithDistance.slice(0, 5);
    
    const hospitalsMessage = {
      type: 'bot',
      text: `🏥 Found ${nearestHospitals.length} nearest hospitals:`,
      timestamp: new Date(),
      hospitals: nearestHospitals
    };
    
    setMessages(prev => [...prev, hospitalsMessage]);
  };

  const showAllHospitals = () => {
    if (!hospitals || hospitals.length === 0) {
      const noHospitalsMessage = {
        type: 'bot',
        text: "⚠️ No hospital data available. Please call 911 for emergency services!",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, noHospitalsMessage]);
      return;
    }

    const hospitalsMessage = {
      type: 'bot',
      text: `🏥 Available hospitals in your area:`,
      timestamp: new Date(),
      hospitals: hospitals.slice(0, 10) // Show first 10 hospitals
    };
    
    setMessages(prev => [...prev, hospitalsMessage]);
  };

  const detectEmergencyType = (message) => {
    const lowerMessage = message.toLowerCase();
    
    for (const [type, keywords] of Object.entries(emergencyKeywords)) {
      if (keywords.some(keyword => lowerMessage.includes(keyword))) {
        return type;
      }
    }
    return null;
  };

  const getGoogleMapsUrl = (hospital) => {
    const destination = encodeURIComponent(`${hospital.name}, ${hospital.address}`);
    return `https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=driving`;
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      type: 'user',
      text: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Detect emergency type
    const emergencyType = detectEmergencyType(inputMessage);
    
    setTimeout(() => {
      let botResponse;
      
      if (emergencyType) {
        botResponse = {
          type: 'bot',
          text: emergencyResponses[emergencyType],
          timestamp: new Date(),
          isEmergency: true
        };
      } else if (inputMessage.toLowerCase().includes('location') || inputMessage.toLowerCase().includes('where')) {
        if (userLocation) {
          botResponse = {
            type: 'bot',
            text: "📍 I have your location. Let me show you the nearest hospitals again:",
            timestamp: new Date()
          };
        } else {
          botResponse = {
            type: 'bot',
            text: "📍 Let me try to detect your location again:",
            timestamp: new Date()
          };
          getCurrentLocation();
        }
      } else {
        botResponse = {
          type: 'bot',
          text: "I'm here to help with medical emergencies. Please describe your symptoms or situation, or I can help you find nearby hospitals. Remember: For life-threatening emergencies, always call 911 first!",
          timestamp: new Date()
        };
      }
      
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
      
      // If emergency detected and we have location, show hospitals
      if (emergencyType && (userLocation || hospitals.length > 0)) {
        setTimeout(() => {
          if (userLocation) {
            findNearestHospitals(userLocation);
          } else {
            showAllHospitals();
          }
        }, 2000);
      }
    }, 1000);

    setInputMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md h-96 flex flex-col relative z-[10000]">
        {/* Header */}
        <div className="bg-red-600 text-white p-4 rounded-t-lg flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-xl mr-2">🚨</span>
            <h3 className="font-bold">Emergency Medical Assistant</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-200"
          >
            <span className="text-2xl">&times;</span>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-3/4 p-3 rounded-lg ${
                message.type === 'user' 
                  ? 'bg-blue-500 text-white' 
                  : message.isEmergency 
                    ? 'bg-red-100 text-red-800 border-l-4 border-red-500' 
                    : 'bg-gray-100 text-gray-800'
              }`}>
                <p className="text-sm">{message.text}</p>
                
                {/* Display hospitals if included */}
                {message.hospitals && (
                  <div className="mt-3 space-y-2">
                    {message.hospitals.map((hospital, hospitalIndex) => (
                      <div key={hospitalIndex} className="bg-white p-3 rounded border shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900">{hospital.name}</h4>
                            <p className="text-sm text-gray-600">{hospital.address}</p>
                            {hospital.distance && (
                              <p className="text-sm text-blue-600">📍 {hospital.distance.toFixed(1)} km away</p>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex space-x-2 mt-2">
                          <a
                            href={`tel:${hospital.phone}`}
                            className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                          >
                            📞 Call
                          </a>
                          <a
                            href={getGoogleMapsUrl(hospital)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                          >
                            🗺️ Directions
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                <p className="text-xs mt-1 opacity-75">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                  <span className="text-sm">Processing...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Describe your emergency or ask for help..."
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
          
          <div className="mt-2 text-center">
            <button
              onClick={getCurrentLocation}
              className="text-blue-600 text-sm hover:underline"
            >
              📍 Refresh My Location
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyChatbot;