import { useEffect, useState } from 'react';
import { Button, Card, Input, Select } from '../components/ui';
import { useTracker } from '../hooks/useTracker';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Phone, Star, Bed, Clock, Filter, Search as SearchIcon, Ambulance, FileText, User, Settings, AlertTriangle, Heart, Activity } from 'lucide-react';

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

  // Filter hospitals based on search query and filters
  useEffect(() => {
    let filtered = hospitals.filter(hospital => {
      const matchesQuery = hospital.name.toLowerCase().includes(query.toLowerCase()) ||
                          hospital.location.city.toLowerCase().includes(query.toLowerCase()) ||
                          hospital.specialties.some(s => s.toLowerCase().includes(query.toLowerCase()));
      
      const matchesType = filters.hospitalType === 'All' || hospital.type === filters.hospitalType;
      const matchesSpecialty = filters.specialty === 'All' || hospital.specialties.includes(filters.specialty);
      const matchesFacility = filters.facility === 'All' || hospital.facilities.includes(filters.facility);
      const matchesStatus = filters.status === 'All' || hospital.status === filters.status;
      const matchesRadius = hospital.distance <= filters.radius;

      return matchesQuery && matchesType && matchesSpecialty && matchesFacility && matchesStatus && matchesRadius;
    });

    setFilteredHospitals(filtered);
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {isAuthenticated ? `Welcome back, ${user?.name || 'User'}!` : 'Find Hospitals Near You'}
        </h1>
        <p className="text-gray-600">
          {isAuthenticated 
            ? 'Access all your health services and find hospitals across India with real-time availability'
            : 'Search and filter hospitals across India with real-time availability'
          }
        </p>
      </div>

      {/* Quick Actions for Authenticated Users */}
      {isAuthenticated && (
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <Link key={index} to={action.link}>
                  <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 bg-${action.color}-100 rounded-lg flex items-center justify-center`}>
                        <IconComponent className={`w-6 h-6 text-${action.color}-600`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{action.title}</h3>
                        <p className="text-sm text-gray-600">{action.description}</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </Card>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search Bar */}
          <Card className="p-4">
            <div className="flex gap-2">
              <div className="flex-1">
                <Input 
                  placeholder="Search for a location or hospital" 
                  value={query} 
                  onChange={e => setQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button onClick={handleLocationSearch} className="px-6">
                <SearchIcon className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </Card>

          {/* Map */}
          <Card className="p-0 overflow-hidden">
            <div className="h-96 w-full">
              <MapContainer
                center={mapCenter}
                zoom={mapZoom}
                style={{ height: '100%', width: '100%' }}
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
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Hospitals ({filteredHospitals.length})
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Filter className="w-4 h-4" />
                <span>Filtered Results</span>
              </div>
            </div>

            {loading && <Card className="p-6 text-gray-500">Loading hospitals...</Card>}
            {!loading && filteredHospitals.length === 0 && (
              <Card className="p-6 text-gray-500 text-center">
                <MapPin className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p>No hospitals found matching your criteria.</p>
                <p className="text-sm">Try adjusting your filters or search terms.</p>
              </Card>
            )}
            {filteredHospitals.map(hospital => (
              <Card key={hospital.id} className="p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                    <MapPin className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{hospital.name}</h3>
                        <p className="text-sm text-gray-600">{hospital.location.address}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium">{hospital.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{hospital.distance} km away</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Bed className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{getTotalBeds(hospital)} beds</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {hospital.type}
                          </span>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            hospital.status === 'Available' ? 'bg-green-100 text-green-800' :
                            hospital.status === 'Limited' ? 'bg-orange-100 text-orange-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {hospital.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Link to={`/hospitals/${hospital.id}`}>
                          <Button variant="secondary" size="sm">
                            View Details
                          </Button>
                        </Link>
                        <a href={`tel:${hospital.phone}`}>
                          <Button size="sm" className="w-full">
                            <Phone className="w-3 h-3 mr-1" />
                            Call
                          </Button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
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
  );
}


