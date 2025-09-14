import { Link } from 'react-router-dom';
import { Button, Card } from '../components/ui';
import hospitalImage from '../images/image.png';
import { 
  MapPin, 
  Clock, 
  User, 
  Shield, 
  Phone, 
  BarChart3,
  Check,
  Star,
  ThumbsUp,
  MessageCircle,
  Bed,
  Activity
} from 'lucide-react';

export default function Home() {
  const features = [
    {
      title: "Location-Based Search",
      description: "Find hospitals and facilities near you with available resources.",
      icon: MapPin
    },
    {
      title: "Real-Time Updates",
      description: "Get up-to-the-minute information on bed availability, facility status, and service capacity.",
      icon: Clock
    },
    {
      title: "User Profiles",
      description: "Create and manage your profile to save preferences and access history.",
      icon: User
    },
    {
      title: "Secure and Private",
      description: "Your data is protected with advanced security measures to ensure privacy and confidentiality.",
      icon: Shield
    },
    {
      title: "Direct Contact",
      description: "Contact hospitals directly through the platform to confirm availability and arrange for care.",
      icon: Phone
    },
    {
      title: "Analytics and Reporting",
      description: "Access detailed reports and analytics on hospital bed utilization and service trends.",
      icon: BarChart3
    }
  ];

  const testimonials = [
    {
      name: "Dr. Emily Carter",
      date: "2023-09-15",
      rating: 5,
      text: "HealthTrack has transformed the way we manage patient admissions. The real-time availability tracking has significantly reduced wait times and improved patient satisfaction.",
      likes: 12,
      comments: 2
    },
    {
      name: "Mark Thompson",
      date: "2023-08-22",
      rating: 4,
      text: "As a patient, HealthTrack helped me find the right hospital quickly during a critical time. The user-friendly interface and accurate information were invaluable.",
      likes: 8,
      comments: 1
    },
    {
      name: "Sarah Johnson",
      date: "2023-07-10",
      rating: 5,
      text: "HealthTrack is an essential tool for healthcare professionals. The ability to track bed availability in real-time has streamlined our operations and enhanced patient care.",
      likes: 15,
      comments: 3
    }
  ];

  return (
    <div className="">
      {/* Hero Section */}
      <section className="relative min-h-[600px] overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${hospitalImage})`
          }}
        ></div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-800/70"></div>
        
    <div className="relative w-full px-0 py-20 sm:py-28">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
              Care Faster. Save Lives Smarter.
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Real-time hospital bed and facility tracker
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <Button className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-3 text-lg">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="secondary" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-700 px-8 py-3 text-lg">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Healthcare at Your Fingertips</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Real-time data from hospitals across India, helping you find the right care when you need it most.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bed className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">456</h3>
              <p className="text-gray-600">Total Beds Available</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">10+</h3>
              <p className="text-gray-600">Hospitals Nationwide</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">144</h3>
              <p className="text-gray-600">ICU Beds Available</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">25</h3>
              <p className="text-gray-600">Avg ER Wait (mins)</p>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">About HealthTrack</h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              HealthTrack is a revolutionary platform designed to provide real-time tracking of hospital bed and facility availability across India. Our 
              mission is to improve healthcare accessibility by ensuring that patients can quickly find the care they need, when they 
              need it. With HealthTrack, you can easily locate available beds, specialized facilities, and essential services across a 
              network of hospitals, reducing wait times and enhancing patient outcomes.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-center gap-3">
              <Check className="text-green-500 w-6 h-6 flex-shrink-0" />
              <span className="text-gray-700 font-medium">Real-Time Data</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="text-green-500 w-6 h-6 flex-shrink-0" />
              <span className="text-gray-700 font-medium">Comprehensive Coverage</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="text-green-500 w-6 h-6 flex-shrink-0" />
              <span className="text-gray-700 font-medium">User-friendly Interface</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Search for Availability</h3>
              <p className="text-gray-600">
                Enter your location and desired service to find nearby hospitals with available resources.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">View Real-Time Updates</h3>
              <p className="text-gray-600">
                Get up-to-the-minute information on bed availability, facility status, and service capacity.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Contact Hospital Directly</h3>
              <p className="text-gray-600">
                Connect directly with the hospital to confirm availability and arrange for care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">HealthTrack Features</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore the key features that make HealthTrack the leading platform for real-time hospital bed 
              and facility tracking.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <Card key={feature.title} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <IconComponent className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Testimonials</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.date}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">{testimonial.text}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{testimonial.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>{testimonial.comments}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}