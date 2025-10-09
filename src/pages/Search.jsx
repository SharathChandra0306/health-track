import React, { useEffect, useState, useRef } from 'react';
import { Button, Card, Input, Select } from '../components/ui';
import { useTracker } from '../hooks/useTracker';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  MapPin, Phone, Star, Bed, Filter, Search as SearchIcon, 
  Ambulance, FileText, User, Settings, AlertTriangle, Navigation,
  Activity, Shield, Award
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Custom marker icons based on hospital status
const createCustomIcon = (status) => {
  const color = status === 'Available' ? 'green' : status === 'Limited' ? 'orange' : 'red';
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });
};

// Component to center map on user location
function MapCenter({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);
  return null;
}

export default function Search() {
  const { listHospitals } = useTracker();
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [hospitals, setHospitals] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    hospitalType: 'All',
    specialty: 'All',
    facility: 'All',
    status: 'All',
    radius: 50
  });
  const [mapCenter, setMapCenter] = useState([17.3850, 78.4867]); // Hyderabad coordinates
  const [mapZoom, setMapZoom] = useState(10);
  
  const headerRef = useRef(null);
  const searchRef = useRef(null);
  const quickActionsRef = useRef(null);
  const filtersRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const res = await listHospitals();
      if (mounted) {
        setHospitals(res);
        setFilteredHospitals(res);
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [listHospitals]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(headerRef.current?.children || [], 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" }
      );

      // Search bar animation
      gsap.fromTo(searchRef.current, 
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)", delay: 0.3 }
      );

      // Quick actions animation
      gsap.fromTo(".quick-action-card", 
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.5, 
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.5
        }
      );

      // Hospital cards animation
      gsap.fromTo(".hospital-card", 
        { opacity: 0, x: -30 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.6, 
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".hospital-list",
            start: "top 80%"
          }
        }
      );

      // Filters animation
      gsap.fromTo(filtersRef.current, 
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out", delay: 0.4 }
      );

      // Floating stats animation
      gsap.to(".floating-stat", {
        y: "-5px",
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.3
      });
    });

    return () => ctx.revert();
  }, []);

  // Filter hospitals based on search query and filters
  useEffect(() => {
  // ...existing code...

  // ...existing code...
  }, [hospitals, query, filters]);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  const handleLocationSearch = () => {
    // In a real app, this would geocode the location
    // For now, we'll just filter by city name
    const cityHospitals = hospitals.filter(h => 
      h.location.city.toLowerCase().includes(query.toLowerCase())
    );
    if (cityHospitals.length > 0) {
      setMapCenter(cityHospitals[0].location.coordinates);
      setMapZoom(12);
    }
  };

  const getTotalBeds = (hospital) => {
    return hospital.beds.reduce((total, bed) => total + bed.available, 0);
  };

  const quickActions = [
    {
      title: 'Emergency Services',
      description: 'Request emergency medical assistance',
      icon: Ambulance,
      color: 'red',
      link: '/ems'
    },
    {
      title: 'Book Hospital Bed',
      description: 'Find and book available hospital beds',
      icon: Bed,
      color: 'blue',
      link: '/book-bed'
    },
    {
      title: 'Medical Records',
      description: 'View and manage your health records',
      icon: FileText,
      color: 'green',
      link: '/medical-records'
    },
    {
      title: 'Emergency Contacts',
      description: 'Manage emergency contacts and numbers',
      icon: Phone,
      color: 'orange',
      link: '/emergency-contacts'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-8" ref={headerRef}>
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent mb-4">
              {isAuthenticated ? `Welcome back, ${user?.name || 'User'}!` : 'Find Hospitals Near You'}
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              {isAuthenticated 
                ? 'Access all your health services and find hospitals across India with real-time availability'
                : 'Search and filter hospitals across India with real-time availability'
              }
            </p>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="floating-stat bg-white/80 backdrop-blur rounded-2xl p-6 text-center shadow-lg border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{filteredHospitals.length}</div>
              <div className="text-sm text-gray-600">Hospitals</div>
            </div>
            <div className="floating-stat bg-white/80 backdrop-blur rounded-2xl p-6 text-center shadow-lg border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Bed className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {filteredHospitals.reduce((total, h) => total + getTotalBeds(h), 0)}
              </div>
              <div className="text-sm text-gray-600">Available Beds</div>
            </div>
            <div className="floating-stat bg-white/80 backdrop-blur rounded-2xl p-6 text-center shadow-lg border border-gray-200">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">24/7</div>
              <div className="text-sm text-gray-600">Emergency Care</div>
            </div>
            <div className="floating-stat bg-white/80 backdrop-blur rounded-2xl p-6 text-center shadow-lg border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">4.8</div>
              <div className="text-sm text-gray-600">Avg Rating</div>
            </div>
          </div>
        </div>

      {/* Emergency Alert Banner */}
      <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-red-600 mr-3" />
            <div>
              <h3 className="text-sm font-semibold text-red-900">Medical Emergency?</h3>
              <p className="text-sm text-red-700">Get immediate assistance and find nearby hospitals</p>
            </div>
          </div>
          <div className="flex gap-2">
            <a href="tel:911" className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700">
              📞 Call 911
            </a>
            <Button 
              size="sm" 
              className="bg-orange-600 hover:bg-orange-700"
              onClick={() => {
                // This will be handled by the emergency button in navbar
                // For now, redirect to emergency page
                window.location.href = '/ems';
              }}
            >
              🚨 Get Help
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Actions for Authenticated Users */}
      {isAuthenticated && (
        <div ref={quickActionsRef} className="mb-8">
          <div className="bg-white/80 backdrop-blur rounded-3xl p-8 shadow-xl border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Quick Actions</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action, index) => {
                const IconComponent = action.icon;
                return (
                  <Link key={index} to={action.link}>
                    <div className="quick-action-card group">
                      <div className="bg-white/90 backdrop-blur rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 text-center">
                        <div className={`w-16 h-16 bg-${action.color}-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className={`w-8 h-8 text-${action.color}-600`} />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
                        <p className="text-sm text-gray-600">{action.description}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search Bar */}
          <div ref={searchRef}>
            <div className="bg-white/90 backdrop-blur rounded-3xl p-6 shadow-xl border border-gray-200 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <SearchIcon className="w-5 h-5 text-blue-600" />
                Search Hospitals
              </h3>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input 
                    placeholder="Search for a location or hospital name..." 
                    value={query} 
                    onChange={e => setQuery(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <Button 
                  onClick={handleLocationSearch} 
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
                >
                  <SearchIcon className="w-5 h-5 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </div>

          {/* Map */}
          <Card className="p-0 overflow-hidden relative z-10">
            <div className="h-96 w-full">
              <MapContainer
                center={mapCenter}
                zoom={mapZoom}
                style={{ height: '100%', width: '100%', zIndex: 10 }}
                scrollWheelZoom={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapCenter center={mapCenter} zoom={mapZoom} />
                {filteredHospitals.map(hospital => (
                  <Marker
                    key={hospital.id}
                    position={hospital.location.coordinates}
                    icon={createCustomIcon(hospital.status)}
                  >
                    <Popup>
                      <div className="p-2">
                        <h3 className="font-semibold text-sm">{hospital.name}</h3>
                        <p className="text-xs text-gray-600">{hospital.location.address}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-xs">{hospital.rating}</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {getTotalBeds(hospital)} beds available
                        </div>
                        <Link to={`/hospitals/${hospital.id}`}>
                          <Button size="sm" className="mt-2 w-full">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </Card>

          {/* Hospital Listings */}
          <div className="hospital-list space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Hospitals ({filteredHospitals.length})
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-500 bg-white/70 backdrop-blur px-3 py-2 rounded-full">
                <Filter className="w-4 h-4" />
                <span>Filtered Results</span>
              </div>
            </div>

            {loading && (
              <div className="bg-white/80 backdrop-blur rounded-2xl p-8 text-center shadow-lg">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Finding hospitals near you...</p>
              </div>
            )}
            
            {!loading && filteredHospitals.length === 0 && (
              <div className="bg-white/80 backdrop-blur rounded-2xl p-8 text-center shadow-lg">
                <MapPin className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No hospitals found</h3>
                <p className="text-gray-600 mb-4">No hospitals match your current search criteria.</p>
                <p className="text-sm text-gray-500">Try adjusting your filters or search terms.</p>
              </div>
            )}
            
            {filteredHospitals.map(hospital => (
              <div key={hospital.id} className="hospital-card">
                <div className="bg-white/90 backdrop-blur rounded-2xl p-6 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-start gap-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-10 h-10 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{hospital.name}</h3>
                          <p className="text-gray-600 mb-3">{hospital.location.address}</p>
                          
                          <div className="flex flex-wrap items-center gap-4 mb-4">
                            <div className="flex items-center gap-2">
                              <Star className="w-5 h-5 text-yellow-400 fill-current" />
                              <span className="text-sm font-semibold">{hospital.rating}</span>
                              <span className="text-xs text-gray-500">(1.2k reviews)</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">{hospital.distance} km away</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Bed className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">{getTotalBeds(hospital)} beds available</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium">
                              {hospital.type}
                            </span>
                            <span className={`px-3 py-1 text-sm rounded-full font-medium ${
                              hospital.status === 'Available' ? 'bg-green-100 text-green-800' :
                              hospital.status === 'Limited' ? 'bg-orange-100 text-orange-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {hospital.status}
                            </span>
                            {hospital.specialties && hospital.specialties.slice(0, 2).map((specialty, idx) => (
                              <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full font-medium">
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-3 ml-4">
                          <Link to={`/hospitals/${hospital.id}`}>
                            <Button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                              View Details
                            </Button>
                          </Link>
                          <a href={`tel:${hospital.phone}`}>
                            <Button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-all duration-300 w-full">
                              <Phone className="w-4 h-4 mr-2" />
                              Call
                            </Button>
                          </a>
                          <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(hospital.name + ', ' + hospital.location.address)}&travelmode=driving`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all duration-300 w-full">
                              <Navigation className="w-4 h-4 mr-2" />
                              Directions
                            </Button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters Sidebar */}
        <aside className="space-y-4">
          {/* User Profile Section for Authenticated Users */}
          {isAuthenticated && (
            <Card className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{user?.name || 'User'}</h3>
                  <p className="text-sm text-gray-600">{user?.email || 'user@example.com'}</p>
                </div>
              </div>
              <Link to="/profile">
                <Button className="w-full" variant="secondary">
                  <Settings className="w-4 h-4 mr-2" />
                  Profile Settings
                </Button>
              </Link>
            </Card>
          )}

          <Card className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </h3>
            <div className="space-y-4">
              <Select 
                label="Hospital Type" 
                value={filters.hospitalType}
                onChange={e => handleFilterChange('hospitalType', e.target.value)}
              >
                <option value="All">All Types</option>
                <option value="Multi-Specialty">Multi-Specialty</option>
                <option value="Super Specialty">Super Specialty</option>
                <option value="Government">Government</option>
                <option value="Cancer Specialty">Cancer Specialty</option>
                <option value="Cardiac Specialty">Cardiac Specialty</option>
                <option value="Orthopedic Specialty">Orthopedic Specialty</option>
                <option value="Pediatric Specialty">Pediatric Specialty</option>
                <option value="Maternity Specialty">Maternity Specialty</option>
              </Select>

              <Select 
                label="Specialty" 
                value={filters.specialty}
                onChange={e => handleFilterChange('specialty', e.target.value)}
              >
                <option value="All">All Specialties</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Neurology">Neurology</option>
                <option value="Oncology">Oncology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Gastroenterology">Gastroenterology</option>
                <option value="Urology">Urology</option>
                <option value="Pulmonology">Pulmonology</option>
                <option value="Cardiac Surgery">Cardiac Surgery</option>
                <option value="Neurosurgery">Neurosurgery</option>
                <option value="Transplant">Transplant</option>
                <option value="Cancer Care">Cancer Care</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Maternity">Maternity</option>
                <option value="Emergency Care">Emergency Care</option>
              </Select>

              <Select 
                label="Facilities" 
                value={filters.facility}
                onChange={e => handleFilterChange('facility', e.target.value)}
              >
                <option value="All">All Facilities</option>
                <option value="MRI">MRI</option>
                <option value="CT Scan">CT Scan</option>
                <option value="Cath Lab">Cath Lab</option>
                <option value="Dialysis">Dialysis</option>
                <option value="ICU">ICU</option>
                <option value="Blood Bank">Blood Bank</option>
                <option value="Pharmacy">Pharmacy</option>
                <option value="Ambulance">Ambulance</option>
                <option value="Laboratory">Laboratory</option>
                <option value="Radiation Therapy">Radiation Therapy</option>
                <option value="PET Scan">PET Scan</option>
                <option value="Research Labs">Research Labs</option>
              </Select>

              <Select 
                label="Status" 
                value={filters.status}
                onChange={e => handleFilterChange('status', e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Available">Available</option>
                <option value="Limited">Limited</option>
                <option value="Full">Full</option>
              </Select>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Radius: {filters.radius} km
                </label>
                <input
                  type="range"
                  min="5"
                  max="200"
                  value={filters.radius}
                  onChange={e => handleFilterChange('radius', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>5 km</span>
                  <span>200 km</span>
                </div>
              </div>

              <Button 
                className="w-full" 
                onClick={() => setFilters({
                  hospitalType: 'All',
                  specialty: 'All',
                  facility: 'All',
                  status: 'All',
                  radius: 50
                })}
              >
                Clear Filters
              </Button>
            </div>
          </Card>

          {/* Emergency Quick Access for Authenticated Users */}
          {isAuthenticated && (
            <Card className="p-4 bg-red-50 border-red-200">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                <h3 className="font-semibold text-red-900">Emergency</h3>
              </div>
              <p className="text-sm text-red-700 mb-4">
                Need immediate medical assistance?
              </p>
              <Link to="/ems">
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  <Ambulance className="w-4 h-4 mr-2" />
                  Request Emergency
                </Button>
              </Link>
            </Card>
          )}

          {/* Quick Stats */}
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Hospitals</span>
                <span className="text-sm font-medium">{filteredHospitals.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Available Beds</span>
                <span className="text-sm font-medium">
                  {filteredHospitals.reduce((total, h) => total + getTotalBeds(h), 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">ICU Beds</span>
                <span className="text-sm font-medium">
                  {filteredHospitals.reduce((total, h) => 
                    total + h.beds.find(b => b.type === 'ICU')?.available || 0, 0
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Emergency Beds</span>
                <span className="text-sm font-medium">
                  {filteredHospitals.reduce((total, h) => 
                    total + h.beds.find(b => b.type === 'Emergency')?.available || 0, 0
                  )}
                </span>
              </div>
            </div>
          </Card>
        </aside>
      </div>
      </div>
    </div>
  );
}


