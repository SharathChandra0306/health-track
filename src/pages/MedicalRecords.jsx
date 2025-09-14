import { useState } from 'react';
import { Button, Card, Input, Select } from '../components/ui';
import { 
  FileText, 
  Plus, 
  Search, 
  Calendar, 
  User, 
  Heart, 
  Activity,
  Pill,
  Stethoscope,
  Download,
  Eye,
  Edit,
  Trash2,
  Filter
} from 'lucide-react';

export default function MedicalRecords() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const [newRecord, setNewRecord] = useState({
    type: '',
    title: '',
    date: '',
    doctor: '',
    hospital: '',
    description: '',
    medications: '',
    attachments: []
  });

  const recordTypes = [
    { value: 'consultation', label: 'Consultation', icon: Stethoscope, color: 'blue' },
    { value: 'prescription', label: 'Prescription', icon: Pill, color: 'green' },
    { value: 'lab', label: 'Lab Report', icon: Activity, color: 'purple' },
    { value: 'scan', label: 'Scan Report', icon: Heart, color: 'red' },
    { value: 'vaccination', label: 'Vaccination', icon: FileText, color: 'orange' },
    { value: 'other', label: 'Other', icon: FileText, color: 'gray' }
  ];

  const mockRecords = [
    {
      id: 1,
      type: 'consultation',
      title: 'Cardiology Consultation',
      date: '2024-12-10',
      doctor: 'Dr. Rajesh Kumar',
      hospital: 'Apollo Hospitals, Hyderabad',
      description: 'Regular checkup for heart condition. Blood pressure normal, heart rate stable.',
      medications: 'Aspirin 75mg daily, Metoprolol 50mg twice daily',
      attachments: ['ecg_report.pdf', 'blood_test.pdf']
    },
    {
      id: 2,
      type: 'lab',
      title: 'Complete Blood Count',
      date: '2024-12-08',
      doctor: 'Dr. Priya Sharma',
      hospital: 'Yashoda Hospitals, Somajiguda',
      description: 'Routine blood test. All parameters within normal range.',
      medications: '',
      attachments: ['cbc_report.pdf']
    },
    {
      id: 3,
      type: 'prescription',
      title: 'Diabetes Management',
      date: '2024-12-05',
      doctor: 'Dr. Anil Gupta',
      hospital: 'Fortis Healthcare, Secunderabad',
      description: 'Updated medication for diabetes control.',
      medications: 'Metformin 500mg twice daily, Glimepiride 2mg once daily',
      attachments: ['prescription.pdf']
    },
    {
      id: 4,
      type: 'scan',
      title: 'CT Scan - Chest',
      date: '2024-11-28',
      doctor: 'Dr. Sunita Reddy',
      hospital: 'Continental Hospitals, Gachibowli',
      description: 'CT scan of chest region. No abnormalities detected.',
      medications: '',
      attachments: ['ct_scan_report.pdf', 'ct_images.zip']
    },
    {
      id: 5,
      type: 'vaccination',
      title: 'COVID-19 Booster',
      date: '2024-11-15',
      doctor: 'Dr. Meera Singh',
      hospital: 'KIMS Hospitals, Secunderabad',
      description: 'COVID-19 booster vaccination administered.',
      medications: '',
      attachments: ['vaccination_certificate.pdf']
    }
  ];

  const filteredRecords = mockRecords.filter(record => {
    const matchesQuery = record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        record.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        record.hospital.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = filterType === 'All' || record.type === filterType;
    
    return matchesQuery && matchesType;
  });

  const handleAddRecord = (e) => {
    e.preventDefault();
    // In a real app, this would save to backend
    console.log('New record:', newRecord);
    setShowAddForm(false);
    setNewRecord({
      type: '',
      title: '',
      date: '',
      doctor: '',
      hospital: '',
      description: '',
      medications: '',
      attachments: []
    });
  };

  const getRecordIcon = (type) => {
    const recordType = recordTypes.find(rt => rt.value === type);
    return recordType ? recordType.icon : FileText;
  };

  const getRecordColor = (type) => {
    const recordType = recordTypes.find(rt => rt.value === type);
    return recordType ? recordType.color : 'gray';
  };

  if (selectedRecord) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="w-full px-0">
          <Button 
            variant="secondary" 
            onClick={() => setSelectedRecord(null)}
            className="mb-4"
          >
            ← Back to Records
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">{selectedRecord.title}</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Record Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Description</label>
                  <p className="text-gray-900 mt-1">{selectedRecord.description}</p>
                </div>
                
                {selectedRecord.medications && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">Medications</label>
                    <p className="text-gray-900 mt-1">{selectedRecord.medications}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Doctor</label>
                    <p className="text-gray-900 mt-1">{selectedRecord.doctor}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Hospital</label>
                    <p className="text-gray-900 mt-1">{selectedRecord.hospital}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Date</label>
                  <p className="text-gray-900 mt-1">{new Date(selectedRecord.date).toLocaleDateString()}</p>
                </div>
              </div>
            </Card>

            {selectedRecord.attachments.length > 0 && (
              <Card className="p-6 mt-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Attachments</h2>
                <div className="space-y-2">
                  {selectedRecord.attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium">{attachment}</span>
                      </div>
                      <Button size="sm" variant="secondary">
                        <Download className="w-3 h-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          <div>
            <Card className="p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Actions</h3>
              <div className="space-y-2">
                <Button className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Download All
                </Button>
                <Button variant="secondary" className="w-full justify-start">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Record
                </Button>
                <Button variant="secondary" className="w-full justify-start text-red-600">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Record
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Medical Records</h1>
            <p className="text-gray-600">Manage your medical history and health records</p>
          </div>
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Record
          </Button>
        </div>
      </div>

      {/* Add Record Form */}
      {showAddForm && (
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Medical Record</h2>
          <form onSubmit={handleAddRecord} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Record Type *
                </label>
                <Select
                  value={newRecord.type}
                  onChange={(e) => setNewRecord(prev => ({...prev, type: e.target.value}))}
                  required
                >
                  <option value="">Select Type</option>
                  {recordTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <Input
                  value={newRecord.title}
                  onChange={(e) => setNewRecord(prev => ({...prev, title: e.target.value}))}
                  placeholder="Record title"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date *
                </label>
                <Input
                  type="date"
                  value={newRecord.date}
                  onChange={(e) => setNewRecord(prev => ({...prev, date: e.target.value}))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Doctor
                </label>
                <Input
                  value={newRecord.doctor}
                  onChange={(e) => setNewRecord(prev => ({...prev, doctor: e.target.value}))}
                  placeholder="Doctor's name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hospital
              </label>
              <Input
                value={newRecord.hospital}
                onChange={(e) => setNewRecord(prev => ({...prev, hospital: e.target.value}))}
                placeholder="Hospital name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                value={newRecord.description}
                onChange={(e) => setNewRecord(prev => ({...prev, description: e.target.value}))}
                placeholder="Record description"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Medications
              </label>
              <textarea
                value={newRecord.medications}
                onChange={(e) => setNewRecord(prev => ({...prev, medications: e.target.value}))}
                placeholder="List of medications"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={2}
              />
            </div>

            <div className="flex gap-3">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Record
              </Button>
              <Button type="button" variant="secondary" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

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
                  Record Type
                </label>
                <Select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="All">All Types</option>
                  {recordTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </Select>
              </div>

              <Button 
                className="w-full" 
                onClick={() => {
                  setFilterType('All');
                  setSearchQuery('');
                }}
                variant="secondary"
              >
                Clear Filters
              </Button>
            </div>
          </Card>
        </div>

        {/* Records List */}
        <div className="lg:col-span-3">
          {/* Search Bar */}
          <Card className="p-4 mb-6">
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  placeholder="Search records..."
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

          {/* Records */}
          <div className="space-y-4">
            {filteredRecords.length === 0 && (
              <Card className="p-6 text-gray-500 text-center">
                <FileText className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p>No medical records found.</p>
                <p className="text-sm">Add your first record to get started.</p>
              </Card>
            )}

            {filteredRecords.map(record => {
              const IconComponent = getRecordIcon(record.type);
              const color = getRecordColor(record.type);
              
              return (
                <Card key={record.id} className="p-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 bg-${color}-100 rounded-lg flex items-center justify-center`}>
                      <IconComponent className={`w-6 h-6 text-${color}-600`} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">{record.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{record.description}</p>
                          
                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">
                                {new Date(record.date).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">{record.doctor}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Stethoscope className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">{record.hospital}</span>
                            </div>
                          </div>

                          {record.medications && (
                            <div className="mt-2">
                              <span className="text-xs font-medium text-gray-700">Medications: </span>
                              <span className="text-xs text-gray-600">{record.medications}</span>
                            </div>
                          )}

                          {record.attachments.length > 0 && (
                            <div className="mt-2">
                              <span className="text-xs font-medium text-gray-700">
                                {record.attachments.length} attachment(s)
                              </span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="secondary"
                            onClick={() => setSelectedRecord(record)}
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="secondary">
                            <Download className="w-3 h-3 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
