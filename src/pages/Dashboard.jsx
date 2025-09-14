import { useTracker } from '../hooks/useTracker';
import { useEffect, useState } from 'react';
import { Card, Button } from '../components/ui';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Ambulance, 
  Bed, 
  FileText, 
  Phone, 
  Settings, 
  User, 
  Heart, 
  Activity,
  MapPin,
  Clock,
  AlertTriangle,
  Plus,
  TrendingUp
} from 'lucide-react';

export default function Dashboard() {
  const { listTrackers } = useTracker();
  const { user } = useAuth();
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => setItems(await listTrackers()))();
  }, [listTrackers]);

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

  const recentActivities = [
    {
      id: 1,
      type: 'emergency',
      title: 'Emergency Request Submitted',
      time: '2 hours ago',
      status: 'completed'
    },
    {
      id: 2,
      type: 'booking',
      title: 'Bed Booking Confirmed',
      time: '1 day ago',
      status: 'completed'
    },
    {
      id: 3,
      type: 'record',
      title: 'Medical Record Added',
      time: '3 days ago',
      status: 'completed'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name || 'User'}!
        </h1>
        <p className="text-gray-600">Here's your health tracking overview</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid md:grid-cols-2 gap-4">
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

          {/* Statistics */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Health Statistics</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((item) => (
                <div key={item.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">{item.label}</div>
                  <div className="mt-2 text-2xl font-bold text-gray-900">{item.value}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Activities */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activities</h2>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Profile Quick Access */}
          <Card className="p-6">
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
              <Button className="w-full">
                <Settings className="w-4 h-4 mr-2" />
                Profile Settings
              </Button>
            </Link>
          </Card>

          {/* Emergency Quick Access */}
          <Card className="p-6 bg-red-50 border-red-200">
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

          {/* Health Tips */}
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Health Tips</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Heart className="w-4 h-4 text-red-500 mt-1" />
                <p className="text-sm text-gray-600">
                  Regular exercise helps maintain cardiovascular health
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-blue-500 mt-1" />
                <p className="text-sm text-gray-600">
                  Get 7-8 hours of sleep for optimal health
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Activity className="w-4 h-4 text-green-500 mt-1" />
                <p className="text-sm text-gray-600">
                  Stay hydrated by drinking 8 glasses of water daily
                </p>
              </div>
            </div>
          </Card>

          {/* Quick Stats */}
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Emergency Requests</span>
                <span className="text-sm font-medium">2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Bed Bookings</span>
                <span className="text-sm font-medium">1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Medical Records</span>
                <span className="text-sm font-medium">5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Emergency Contacts</span>
                <span className="text-sm font-medium">4</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}


