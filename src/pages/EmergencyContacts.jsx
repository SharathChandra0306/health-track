import { useState } from 'react';
import { Button, Card, Input } from '../components/ui';
import { 
  Phone, 
  Plus, 
  Edit, 
  Trash2, 
  Heart, 
  Ambulance, 
  Shield, 
  User,
  Search,
  Star,
  AlertTriangle
} from 'lucide-react';

export default function EmergencyContacts() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingContact, setEditingContact] = useState(null);

  const [newContact, setNewContact] = useState({
    name: '',
    phone: '',
    relationship: '',
    isEmergency: false,
    notes: ''
  });

  const emergencyNumbers = [
    {
      id: 'emergency',
      name: 'Emergency Services',
      phone: '108',
      type: 'emergency',
      icon: AlertTriangle,
      color: 'red',
      description: 'All-in-one emergency number for medical, fire, and police'
    },
    {
      id: 'ambulance',
      name: 'Ambulance',
      phone: '102',
      type: 'ambulance',
      icon: Ambulance,
      color: 'orange',
      description: 'Medical emergency and ambulance services'
    },
    {
      id: 'police',
      name: 'Police',
      phone: '100',
      type: 'police',
      icon: Shield,
      color: 'blue',
      description: 'Police emergency services'
    },
    {
      id: 'fire',
      name: 'Fire Department',
      phone: '101',
      type: 'fire',
      icon: Heart,
      color: 'red',
      description: 'Fire emergency services'
    }
  ];

  const [personalContacts, setPersonalContacts] = useState([
    {
      id: 1,
      name: 'Dr. Rajesh Kumar',
      phone: '+91-98765-43210',
      relationship: 'Family Doctor',
      isEmergency: true,
      notes: 'Cardiologist - Available 24/7'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      phone: '+91-98765-43211',
      relationship: 'Sister',
      isEmergency: true,
      notes: 'Emergency contact - Lives nearby'
    },
    {
      id: 3,
      name: 'Anil Gupta',
      phone: '+91-98765-43212',
      relationship: 'Friend',
      isEmergency: false,
      notes: 'Close friend - Can help in non-emergency situations'
    },
    {
      id: 4,
      name: 'Dr. Sunita Reddy',
      phone: '+91-98765-43213',
      relationship: 'Specialist',
      isEmergency: false,
      notes: 'Neurologist - Available during office hours'
    }
  ]);

  const filteredContacts = personalContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone.includes(searchQuery) ||
    contact.relationship.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddContact = (e) => {
    e.preventDefault();
    const newId = Math.max(...personalContacts.map(c => c.id)) + 1;
    setPersonalContacts([...personalContacts, { ...newContact, id: newId }]);
    setNewContact({
      name: '',
      phone: '',
      relationship: '',
      isEmergency: false,
      notes: ''
    });
    setShowAddForm(false);
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact);
    setNewContact(contact);
    setShowAddForm(true);
  };

  const handleUpdateContact = (e) => {
    e.preventDefault();
    setPersonalContacts(personalContacts.map(contact => 
      contact.id === editingContact.id ? { ...newContact, id: editingContact.id } : contact
    ));
    setEditingContact(null);
    setNewContact({
      name: '',
      phone: '',
      relationship: '',
      isEmergency: false,
      notes: ''
    });
    setShowAddForm(false);
  };

  const handleDeleteContact = (id) => {
    setPersonalContacts(personalContacts.filter(contact => contact.id !== id));
  };

  const handleCall = (phone) => {
    window.open(`tel:${phone}`, '_self');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Emergency Contacts</h1>
            <p className="text-gray-600">Quick access to emergency services and important contacts</p>
          </div>
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Contact
          </Button>
        </div>
      </div>

      {/* Add/Edit Contact Form */}
      {showAddForm && (
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {editingContact ? 'Edit Contact' : 'Add New Contact'}
          </h2>
          <form onSubmit={editingContact ? handleUpdateContact : handleAddContact} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <Input
                  value={newContact.name}
                  onChange={(e) => setNewContact(prev => ({...prev, name: e.target.value}))}
                  placeholder="Contact name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <Input
                  value={newContact.phone}
                  onChange={(e) => setNewContact(prev => ({...prev, phone: e.target.value}))}
                  placeholder="Phone number"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Relationship
                </label>
                <Input
                  value={newContact.relationship}
                  onChange={(e) => setNewContact(prev => ({...prev, relationship: e.target.value}))}
                  placeholder="e.g., Family Doctor, Sister, Friend"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isEmergency"
                  checked={newContact.isEmergency}
                  onChange={(e) => setNewContact(prev => ({...prev, isEmergency: e.target.checked}))}
                  className="mr-2"
                />
                <label htmlFor="isEmergency" className="text-sm font-medium text-gray-700">
                  Emergency Contact
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                value={newContact.notes}
                onChange={(e) => setNewContact(prev => ({...prev, notes: e.target.value}))}
                placeholder="Additional notes about this contact"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
              />
            </div>

            <div className="flex gap-3">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                {editingContact ? 'Update Contact' : 'Add Contact'}
              </Button>
              <Button 
                type="button" 
                variant="secondary" 
                onClick={() => {
                  setShowAddForm(false);
                  setEditingContact(null);
                  setNewContact({
                    name: '',
                    phone: '',
                    relationship: '',
                    isEmergency: false,
                    notes: ''
                  });
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Emergency Numbers */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Emergency Numbers</h2>
          <div className="space-y-4">
            {emergencyNumbers.map(emergency => {
              const IconComponent = emergency.icon;
              return (
                <Card key={emergency.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 bg-${emergency.color}-100 rounded-lg flex items-center justify-center`}>
                        <IconComponent className={`w-6 h-6 text-${emergency.color}-600`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{emergency.name}</h3>
                        <p className="text-sm text-gray-600">{emergency.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-900">{emergency.phone}</span>
                      <Button 
                        onClick={() => handleCall(emergency.phone)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Personal Contacts */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Personal Contacts</h2>
            <div className="flex-1 max-w-xs ml-4">
              <Input
                placeholder="Search contacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredContacts.length === 0 && (
              <Card className="p-6 text-gray-500 text-center">
                <User className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p>No personal contacts found.</p>
                <p className="text-sm">Add your first contact to get started.</p>
              </Card>
            )}

            {filteredContacts.map(contact => (
              <Card key={contact.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      contact.isEmergency ? 'bg-red-100' : 'bg-gray-100'
                    }`}>
                      <User className={`w-6 h-6 ${
                        contact.isEmergency ? 'text-red-600' : 'text-gray-600'
                      }`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                        {contact.isEmergency && (
                          <Star className="w-4 h-4 text-red-500 fill-current" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{contact.relationship}</p>
                      {contact.notes && (
                        <p className="text-xs text-gray-500 mt-1">{contact.notes}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">{contact.phone}</span>
                    <div className="flex gap-1">
                      <Button 
                        size="sm"
                        onClick={() => handleCall(contact.phone)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Phone className="w-3 h-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={() => handleEditContact(contact)}
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={() => handleDeleteContact(contact.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
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
