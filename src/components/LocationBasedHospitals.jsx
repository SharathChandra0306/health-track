import React, { useState, useEffect } from 'react';
import { useTracker } from '../hooks/useTracker';
import { MapPin, Navigation, Phone, Clock } from 'lucide-react';

const LocationBasedHospitals = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyHospitals, setNearbyHospitals] = useState([]);
  const [locationStatus, setLocationStatus] = useState('detecting'); // 'detecting', 'success', 'error', 'denied'
  const [isVisible, setIsVisible] = useState(false);
  const { hospitals } = useTracker();

  useEffect(() => {
    // Auto-detect location when component mounts
    detectUserLocation();
  }, []);

  useEffect(() => {
    if (userLocation && hospitals && hospitals.length > 0) {
      findNearbyHospitals();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLocation, hospitals]);

  const detectUserLocation = () => {
    setLocationStatus('detecting');
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
          setLocationStatus('success');
          setIsVisible(true);
        },
        (error) => {
          console.error('Geolocation error:', error);
          if (error.code === error.PERMISSION_DENIED) {
            setLocationStatus('denied');
          } else {
            setLocationStatus('error');
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    } else {
      setLocationStatus('error');
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

  const findNearbyHospitals = () => {
    if (!hospitals || hospitals.length === 0) return;

    const hospitalsWithDistance = hospitals.map(hospital => ({
      ...hospital,
      distance: calculateDistance(
        userLocation.lat, userLocation.lng,
        hospital.latitude || 0, hospital.longitude || 0
      )
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 6); // Show top 6 nearest hospitals

    setNearbyHospitals(hospitalsWithDistance);
  };

  const getGoogleMapsUrl = (hospital) => {
    const destination = encodeURIComponent(`${hospital.name}, ${hospital.address}`);
    return `https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=driving`;
  };

  const formatDistance = (distance) => {
    if (distance < 1) {
      return `${Math.round(distance * 1000)}m`;
    }
    return `${distance.toFixed(1)}km`;
  };

  const getEstimatedTime = (distance) => {
    // Rough estimate: 40km/h average speed in city
    const timeInHours = distance / 40;
    const timeInMinutes = Math.round(timeInHours * 60);
    return timeInMinutes;
  };

  if (!isVisible) {
    return null;
  }

  if (locationStatus === 'denied') {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <MapPin className="w-6 h-6 text-yellow-600 mr-2" />
          <h3 className="text-lg font-semibold text-yellow-800">Location Access Needed</h3>
        </div>
        <p className="text-yellow-700 mb-4">
          To show you nearby hospitals, we need access to your location. You can:
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={detectUserLocation}
            className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 transition-colors"
          >
            Allow Location Access
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
          >
            Skip for Now
          </button>
        </div>
      </div>
    );
  }

  if (locationStatus === 'error') {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <MapPin className="w-6 h-6 text-red-600 mr-2" />
          <h3 className="text-lg font-semibold text-red-800">Location Detection Failed</h3>
        </div>
        <p className="text-red-700 mb-4">
          We couldn't detect your location. Please use the search feature to find hospitals manually.
        </p>
        <button
          onClick={() => setIsVisible(false)}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
        >
          Dismiss
        </button>
      </div>
    );
  }

  if (locationStatus === 'detecting') {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-3"></div>
          <h3 className="text-lg font-semibold text-blue-800">Detecting Your Location...</h3>
        </div>
        <p className="text-blue-700 mt-2">Finding nearby hospitals for you</p>
      </div>
    );
  }

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <MapPin className="w-6 h-6 text-green-600 mr-2" />
          <h3 className="text-xl font-semibold text-green-800">Hospitals Near You</h3>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-green-600 hover:text-green-800 text-2xl font-bold"
        >
          ×
        </button>
      </div>

      {nearbyHospitals.length === 0 ? (
        <p className="text-green-700">Loading nearby hospitals...</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {nearbyHospitals.map((hospital, index) => (
            <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-green-100">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">{hospital.name}</h4>
                  <p className="text-gray-600 text-xs mt-1">{hospital.address}</p>
                </div>
                <div className="text-right">
                  <div className="text-green-600 font-semibold text-sm">
                    {formatDistance(hospital.distance)}
                  </div>
                  <div className="flex items-center text-gray-500 text-xs mt-1">
                    <Clock className="w-3 h-3 mr-1" />
                    ~{getEstimatedTime(hospital.distance)}min
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <a
                  href={`tel:${hospital.phone}`}
                  className="flex-1 bg-green-600 text-white px-3 py-2 rounded text-xs text-center hover:bg-green-700 transition-colors flex items-center justify-center"
                >
                  <Phone className="w-3 h-3 mr-1" />
                  Call
                </a>
                <a
                  href={getGoogleMapsUrl(hospital)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-xs text-center hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <Navigation className="w-3 h-3 mr-1" />
                  Directions
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 text-center">
        <p className="text-green-700 text-sm">
          📍 Location detected automatically. <button onClick={detectUserLocation} className="underline hover:text-green-800">Refresh location</button>
        </p>
      </div>
    </div>
  );
};

export default LocationBasedHospitals;