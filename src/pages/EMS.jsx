import { useState, useEffect } from 'react';
import { Button, Card, Input, Select } from '../components/ui';
import { Link } from 'react-router-dom';
import { 
  Ambulance, 
  Phone, 
  MapPin, 
  Clock, 
  AlertTriangle, 
  Heart, 
  Activity,
  User,
  Calendar,
  FileText,
  Shield,
  Zap,
  Bed,
  Stethoscope,
  Plus,
  Search,
  Filter
} from 'lucide-react';

export default function EMS() {
  const [emergencyType, setEmergencyType] = useState('');
  const [location, setLocation] = useState('');
  const [urgency, setUrgency] = useState('');
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [emergencyId, setEmergencyId] = useState(null);

  const emergencyTypes = [
    { value: 'cardiac', label: 'Cardiac Emergency', icon: Heart, color: 'red' },
    { value: 'trauma', label: 'Trauma/Accident', icon: AlertTriangle, color: 'orange' },
    { value: 'stroke', label: 'Stroke', icon: Activity, color: 'purple' },
    { value: 'respiratory', label: 'Respiratory Emergency', icon: Stethoscope, color: 'blue' },
    { value: 'pediatric', label: 'Pediatric Emergency', icon: User, color: 'green' },
    { value: 'other', label: 'Other Medical Emergency', icon: Plus, color: 'gray' }
  ];

  const urgencyLevels = [
    { value: 'critical', label: 'Critical (Immediate)', color: 'red' },
    { value: 'urgent', label: 'Urgent (Within 30 mins)', color: 'orange' },
    { value: 'moderate', label: 'Moderate (Within 2 hours)', color: 'yellow' },
    { value: 'low', label: 'Low Priority', color: 'green' }
  ];

  const handleEmergencyRequest = () => {
    if (!emergencyType || !location || !urgency) {
      alert('Please fill in all required fields');
      return;
    }
    
    const id = Math.random().toString(36).substr(2, 9);
    setEmergencyId(id);
    setIsEmergencyActive(true);
    
    // In a real app, this would send data to emergency services
    console.log('Emergency Request:', { emergencyType, location, urgency, id });
  };

  const cancelEmergency = () => {
    setIsEmergencyActive(false);
    setEmergencyId(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Emergency Medical Services</h1>
        <p className="text-gray-600">Quick access to emergency care and medical services</p>
      </div>

      {/* Emergency Alert Banner */}
      {isEmergencyActive && (
        <Card className="mb-6 p-4 bg-red-50 border-red-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-red-600" />
              <div>
                <h3 className="font-semibold text-red-900">Emergency Request Active</h3>
                <p className="text-sm text-red-700">Request ID: {emergencyId}</p>
              </div>
            </div>
            <Button onClick={cancelEmergency} variant="secondary" size="sm">
              Cancel Request
            </Button>
          </div>
        </Card>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Emergency Request Form */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Ambulance className="w-5 h-5 text-red-600" />
              Request Emergency Services
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Emergency Type *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {emergencyTypes.map((type) => {
                    const IconComponent = type.icon;
                    return (
                      <button
                        key={type.value}
                        onClick={() => setEmergencyType(type.value)}
                        className={`p-3 rounded-lg border-2 text-left transition-all ${
                          emergencyType === type.value
                            ? `border-${type.color}-500 bg-${type.color}-50`
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <IconComponent className={`w-4 h-4 text-${type.color}-600`} />
                          <span className="text-sm font-medium">{type.label}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Location *
                </label>
                <Input
                  placeholder="Enter your current location or address"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Urgency Level *
                </label>
                <div className="space-y-2">
                  {urgencyLevels.map((level) => (
                    <button
                      key={level.value}
                      onClick={() => setUrgency(level.value)}
                      className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                        urgency === level.value
                          ? `border-${level.color}-500 bg-${level.color}-50`
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full bg-${level.color}-500`}></div>
                        <span className="font-medium">{level.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  onClick={handleEmergencyRequest}
                  className="flex-1 bg-red-600 hover:bg-red-700"
                  disabled={isEmergencyActive}
                >
                  <Ambulance className="w-4 h-4 mr-2" />
                  {isEmergencyActive ? 'Emergency Active' : 'Request Emergency Services'}
                </Button>
                <Button variant="secondary" className="px-6">
                  <Phone className="w-4 h-4 mr-2" />
                  Call 108
                </Button>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link to="/search">
                <Button variant="secondary" className="w-full justify-start">
                  <Search className="w-4 h-4 mr-2" />
                  Find Nearby Hospitals
                </Button>
              </Link>
              <Link to="/book-bed">
                <Button variant="secondary" className="w-full justify-start">
                  <Bed className="w-4 h-4 mr-2" />
                  Book Hospital Bed
                </Button>
              </Link>
              <Link to="/medical-records">
                <Button variant="secondary" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Medical Records
                </Button>
              </Link>
              <Link to="/emergency-contacts">
                <Button variant="secondary" className="w-full justify-start">
                  <Phone className="w-4 h-4 mr-2" />
                  Emergency Contacts
                </Button>
              </Link>
            </div>
          </Card>

          {/* Recent Emergencies */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Emergency Requests</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-sm">Cardiac Emergency</p>
                    <p className="text-xs text-gray-500">Dec 13, 2024 - 2:30 PM</p>
                  </div>
                </div>
                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">Completed</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-sm">Trauma Emergency</p>
                    <p className="text-xs text-gray-500">Dec 12, 2024 - 8:15 AM</p>
                  </div>
                </div>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Resolved</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Emergency Contacts */}
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Emergency Contacts</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-medium">Emergency</span>
                </div>
                <a href="tel:108" className="text-sm text-blue-600 hover:underline">108</a>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Ambulance className="w-4 h-4 text-orange-600" />
                  <span className="text-sm font-medium">Ambulance</span>
                </div>
                <a href="tel:102" className="text-sm text-blue-600 hover:underline">102</a>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium">Police</span>
                </div>
                <a href="tel:100" className="text-sm text-blue-600 hover:underline">100</a>
              </div>
            </div>
          </Card>

          {/* Health Status */}
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Health Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Heart Rate</span>
                <span className="text-sm font-medium text-green-600">72 BPM</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Blood Pressure</span>
                <span className="text-sm font-medium text-green-600">120/80</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Last Checkup</span>
                <span className="text-sm font-medium">Dec 1, 2024</span>
              </div>
            </div>
          </Card>

          {/* Quick Stats */}
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Emergency Requests</span>
                <span className="text-sm font-medium">2</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Hospitals Booked</span>
                <span className="text-sm font-medium">1</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Medical Records</span>
                <span className="text-sm font-medium">5</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
