import { useState, useEffect } from 'react';
import { Button, Card, Input, Select } from '../components/ui';
import { Link } from 'react-router-dom';
import { useTracker } from '../hooks/useTracker';
import { 
  Bed, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  MapPin, 
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
  Star,
  Heart
} from 'lucide-react';

export default function BookBed() {
  const { listHospitals } = useTracker();
  const [hospitals, setHospitals] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    bedType: 'All',
    specialty: 'All',
    urgency: 'All'
  });
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    patientName: '',
    patientAge: '',
    patientPhone: '',
    emergencyContact: '',
    medicalCondition: '',
    preferredDate: '',
    notes: ''
  });

  const bedTypes = [
    'ICU', 'General', 'Maternity', 'Emergency', 'Cardiac', 'Neurology', 'Pediatric'
  ];

  const specialties = [
    'Cardiology', 'Neurology', 'Oncology', 'Orthopedics', 'Gastroenterology', 
    'Urology', 'Pulmonology', 'Pediatrics', 'Maternity', 'Emergency Care'
  ];

  const urgencyLevels = [
    { value: 'critical', label: 'Critical (Immediate)', color: 'red' },
    { value: 'urgent', label: 'Urgent (Within 24 hours)', color: 'orange' },
    { value: 'moderate', label: 'Moderate (Within 3 days)', color: 'yellow' },
    { value: 'planned', label: 'Planned (Within 1 week)', color: 'green' }
  ];

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
    let filtered = hospitals.filter(hospital => {
      const matchesQuery = hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          hospital.location.city.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesBedType = filters.bedType === 'All' || 
                            hospital.beds.some(bed => bed.type === filters.bedType && bed.available > 0);
      
      const matchesSpecialty = filters.specialty === 'All' || 
                              hospital.specialties.includes(filters.specialty);
      
      return matchesQuery && matchesBedType && matchesSpecialty;
    });

    setFilteredHospitals(filtered);
  }, [hospitals, searchQuery, filters]);

  const getAvailableBeds = (hospital, bedType) => {
    const bed = hospital.beds.find(b => b.type === bedType);
    return bed ? bed.available : 0;
  };

  const getTotalBeds = (hospital) => {
    return hospital.beds.reduce((total, bed) => total + bed.available, 0);
  };

  const handleBookBed = (hospital) => {
    setSelectedHospital(hospital);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would submit the booking request
    alert('Bed booking request submitted successfully! You will receive a confirmation call shortly.');
    setSelectedHospital(null);
    setBookingDetails({
      patientName: '',
      patientAge: '',
      patientPhone: '',
      emergencyContact: '',
      medicalCondition: '',
      preferredDate: '',
      notes: ''
    });
  };

  if (selectedHospital) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button 
            variant="secondary" 
            onClick={() => setSelectedHospital(null)}
            className="mb-4"
          >
            ← Back to Hospitals
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Book Bed at {selectedHospital.name}</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Hospital Details</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-sm">{selectedHospital.location.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-500" />
                <span className="text-sm">{selectedHospital.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm">{selectedHospital.rating}/5</span>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold text-gray-900 mb-3">Available Beds</h3>
              <div className="grid grid-cols-2 gap-3">
                {selectedHospital.beds.map((bed, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{bed.type}</span>
                      <span className={`text-sm font-bold ${
                        bed.available > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {bed.available}/{bed.total}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Booking Details</h2>
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Patient Name *
                </label>
                <Input
                  value={bookingDetails.patientName}
                  onChange={(e) => setBookingDetails(prev => ({...prev, patientName: e.target.value}))}
                  placeholder="Enter patient's full name"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Age *
                  </label>
                  <Input
                    type="number"
                    value={bookingDetails.patientAge}
                    onChange={(e) => setBookingDetails(prev => ({...prev, patientAge: e.target.value}))}
                    placeholder="Age"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone *
                  </label>
                  <Input
                    value={bookingDetails.patientPhone}
                    onChange={(e) => setBookingDetails(prev => ({...prev, patientPhone: e.target.value}))}
                    placeholder="Phone number"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Emergency Contact
                </label>
                <Input
                  value={bookingDetails.emergencyContact}
                  onChange={(e) => setBookingDetails(prev => ({...prev, emergencyContact: e.target.value}))}
                  placeholder="Emergency contact number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Medical Condition *
                </label>
                <Input
                  value={bookingDetails.medicalCondition}
                  onChange={(e) => setBookingDetails(prev => ({...prev, medicalCondition: e.target.value}))}
                  placeholder="Brief description of medical condition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Date
                </label>
                <Input
                  type="date"
                  value={bookingDetails.preferredDate}
                  onChange={(e) => setBookingDetails(prev => ({...prev, preferredDate: e.target.value}))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Notes
                </label>
                <textarea
                  value={bookingDetails.notes}
                  onChange={(e) => setBookingDetails(prev => ({...prev, notes: e.target.value}))}
                  placeholder="Any additional information..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                />
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                <CheckCircle className="w-4 h-4 mr-2" />
                Submit Booking Request
              </Button>
            </form>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Hospital Bed</h1>
        <p className="text-gray-600">Find and book available beds in hospitals near you</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bed Type
                </label>
                <Select
                  value={filters.bedType}
                  onChange={(e) => setFilters(prev => ({...prev, bedType: e.target.value}))}
                >
                  <option value="All">All Types</option>
                  {bedTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specialty
                </label>
                <Select
                  value={filters.specialty}
                  onChange={(e) => setFilters(prev => ({...prev, specialty: e.target.value}))}
                >
                  <option value="All">All Specialties</option>
                  {specialties.map(specialty => (
                    <option key={specialty} value={specialty}>{specialty}</option>
                  ))}
                </Select>
              </div>

              <Button 
                className="w-full" 
                onClick={() => setFilters({bedType: 'All', specialty: 'All', urgency: 'All'})}
                variant="secondary"
              >
                Clear Filters
              </Button>
            </div>
          </Card>
        </div>

        {/* Hospital Listings */}
        <div className="lg:col-span-3">
          {/* Search Bar */}
          <Card className="p-4 mb-6">
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  placeholder="Search hospitals or locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="secondary">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </Card>

          {/* Results */}
          <div className="space-y-4">
            {loading && <Card className="p-6 text-gray-500">Loading hospitals...</Card>}
            
            {!loading && filteredHospitals.length === 0 && (
              <Card className="p-6 text-gray-500 text-center">
                <Bed className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p>No hospitals found with available beds.</p>
                <p className="text-sm">Try adjusting your filters or search terms.</p>
              </Card>
            )}

            {filteredHospitals.map(hospital => (
              <Card key={hospital.id} className="p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                        <Bed className="w-8 h-8 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{hospital.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{hospital.location.address}</p>
                        
                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium">{hospital.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{hospital.distance} km</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Bed className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{getTotalBeds(hospital)} beds</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-3">
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

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {hospital.beds.map((bed, index) => (
                            <div key={index} className="p-2 bg-gray-50 rounded text-center">
                              <div className="text-xs text-gray-600">{bed.type}</div>
                              <div className={`text-sm font-bold ${
                                bed.available > 0 ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {bed.available}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 ml-4">
                    <Button 
                      onClick={() => handleBookBed(hospital)}
                      disabled={getTotalBeds(hospital) === 0}
                      className="whitespace-nowrap"
                    >
                      <Bed className="w-4 h-4 mr-2" />
                      Book Bed
                    </Button>
                    <a href={`tel:${hospital.phone}`}>
                      <Button variant="secondary" size="sm" className="w-full">
                        <Phone className="w-3 h-3 mr-1" />
                        Call
                      </Button>
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
