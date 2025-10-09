import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTracker } from '../hooks/useTracker';
import { 
  MapPin, Phone, Star, Bed, Clock, Shield, Award, 
  Users, Heart, Activity, Calendar, Navigation, 
  Stethoscope, Building2, Car, Wifi, Coffee, Parking,
  CheckCircle, AlertCircle, Info, ArrowLeft, Share2,
  MessageCircle, ThumbsUp, UserCheck, Mail
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HospitalDetails() {
  const { id } = useParams();
  const { getHospitalById } = useTracker();
  const [hospital, setHospital] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  const headerRef = useRef(null);
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    (async () => {
      const res = await getHospitalById(id);
      setHospital(res);
    })();
  }, [id, getHospitalById]);

  useEffect(() => {
    if (hospital) {
      const ctx = gsap.context(() => {
        // Header animation
        gsap.fromTo(headerRef.current?.children || [], 
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" }
        );

        // Hero section animation
        gsap.fromTo(heroRef.current, 
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 1, ease: "power2.out", delay: 0.2 }
        );

        // Stats animation
        gsap.fromTo(".stat-card", 
          { opacity: 0, y: 30, rotation: -2 },
          { 
            opacity: 1, 
            y: 0, 
            rotation: 0,
            duration: 0.6, 
            stagger: 0.1,
            ease: "back.out(1.7)",
            delay: 0.4
          }
        );

        // Content sections animation
        gsap.fromTo(".content-section", 
          { opacity: 0, x: -30 },
          { 
            opacity: 1, 
            x: 0, 
            duration: 0.8, 
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 80%"
            }
          }
        );

        // Floating elements
        gsap.to(".floating-element", {
          y: "-10px",
          duration: 2.5,
          ease: "power2.inOut",
          yoyo: true,
          repeat: -1,
          stagger: 0.3
        });
      });

      return () => ctx.revert();
    }
  }, [hospital]);

  if (!hospital) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading Hospital Details</h2>
          <p className="text-gray-600">Please wait while we fetch the information...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Info },
    { id: 'services', label: 'Services', icon: Stethoscope },
    { id: 'facilities', label: 'Facilities', icon: Building2 },
    { id: 'reviews', label: 'Reviews', icon: MessageCircle },
    { id: 'contact', label: 'Contact', icon: Phone }
  ];

  const facilities = [
    { icon: Parking, name: 'Free Parking', available: true },
    { icon: Wifi, name: 'Free WiFi', available: true },
    { icon: Coffee, name: 'Cafeteria', available: true },
    { icon: Car, name: 'Ambulance Service', available: true },
    { icon: Activity, name: 'ICU', available: true },
    { icon: Shield, name: '24/7 Emergency', available: true }
  ];

  const reviews = [
    {
      id: 1,
      name: "Rajesh Kumar",
      rating: 5,
      date: "2 days ago",
      comment: "Excellent care and professional staff. The facilities are top-notch and the doctors are very experienced.",
      helpful: 12
    },
    {
      id: 2,
      name: "Priya Sharma",
      rating: 4,
      date: "1 week ago", 
      comment: "Good hospital with modern equipment. The staff was helpful but waiting times could be better.",
      helpful: 8
    },
    {
      id: 3,
      name: "Dr. Amit Patel",
      rating: 5,
      date: "2 weeks ago",
      comment: "As a fellow medical professional, I'm impressed by their standards and patient care protocols.",
      helpful: 15
    }
  ];

  const getTotalBeds = () => {
    return hospital.beds.reduce((total, bed) => total + bed.available, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4" ref={headerRef}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                to="/search" 
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">{hospital.name}</h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-2 rounded-full transition-all duration-300 ${
                  isBookmarked ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Heart className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
              </button>
              <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div ref={heroRef} className="mb-8">
          <div className="bg-white/90 backdrop-blur rounded-3xl p-8 shadow-xl border border-gray-200">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
                    <Building2 className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">{hospital.name}</h2>
                    <p className="text-gray-600 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {hospital.location.address}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-lg font-semibold">{hospital.rating}</span>
                    <span className="text-gray-500">(1,234 reviews)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{hospital.distance} km away</span>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    hospital.status === 'Available' ? 'bg-green-100 text-green-800' :
                    hospital.status === 'Limited' ? 'bg-orange-100 text-orange-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {hospital.status}
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed mb-6">
                  {hospital.type} hospital providing comprehensive healthcare services with state-of-the-art 
                  facilities and experienced medical professionals. We are committed to delivering quality 
                  care with compassion and excellence.
                </p>

                <div className="flex flex-wrap gap-3">
                  <a href={`tel:${hospital.phone}`}>
                    <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                      <Phone className="w-5 h-5" />
                      Call Hospital
                    </button>
                  </a>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(hospital.name + ', ' + hospital.location.address)}&travelmode=driving`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                      <Navigation className="w-5 h-5" />
                      Get Directions
                    </button>
                  </a>
                  <Link to="/book-bed">
                    <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Book Appointment
                    </button>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
                  <h3 className="text-xl font-bold mb-4">Quick Info</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5" />
                      <div>
                        <p className="font-semibold">Open 24/7</p>
                        <p className="text-blue-100 text-sm">Emergency services available</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Bed className="w-5 h-5" />
                      <div>
                        <p className="font-semibold">{getTotalBeds()} Beds Available</p>
                        <p className="text-blue-100 text-sm">Real-time availability</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5" />
                      <div>
                        <p className="font-semibold">50+ Specialists</p>
                        <p className="text-blue-100 text-sm">Experienced doctors</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="stat-card floating-element">
            <div className="bg-white/90 backdrop-blur rounded-2xl p-6 text-center shadow-lg border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">25+</div>
              <div className="text-sm text-gray-600">Years Experience</div>
            </div>
          </div>
          
          <div className="stat-card floating-element">
            <div className="bg-white/90 backdrop-blur rounded-2xl p-6 text-center shadow-lg border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <UserCheck className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">10K+</div>
              <div className="text-sm text-gray-600">Patients Treated</div>
            </div>
          </div>
          
          <div className="stat-card floating-element">
            <div className="bg-white/90 backdrop-blur rounded-2xl p-6 text-center shadow-lg border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Stethoscope className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">50+</div>
              <div className="text-sm text-gray-600">Specialties</div>
            </div>
          </div>
          
          <div className="stat-card floating-element">
            <div className="bg-white/90 backdrop-blur rounded-2xl p-6 text-center shadow-lg border border-gray-200">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">99.9%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="bg-white/80 backdrop-blur rounded-2xl p-2 shadow-lg border border-gray-200">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content based on active tab */}
        <div ref={contentRef}>
          {activeTab === 'overview' && (
            <div className="content-section">
              <div className="bg-white/90 backdrop-blur rounded-3xl p-8 shadow-xl border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Bed Availability</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {hospital.beds.map((bed, index) => (
                    <div key={bed.type} className="bg-gray-50/50 rounded-2xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-900">{bed.type}</h4>
                        <div className={`w-3 h-3 rounded-full ${
                          bed.available > 10 ? 'bg-green-500' :
                          bed.available > 5 ? 'bg-orange-500' : 'bg-red-500'
                        }`}></div>
                      </div>
                      <div className="text-3xl font-bold text-gray-900 mb-2">{bed.available}</div>
                      <div className="text-sm text-gray-600">Available beds</div>
                      <div className="mt-4 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            bed.available > 10 ? 'bg-green-500' :
                            bed.available > 5 ? 'bg-orange-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${Math.min((bed.available / 50) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'facilities' && (
            <div className="content-section">
              <div className="bg-white/90 backdrop-blur rounded-3xl p-8 shadow-xl border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Facilities & Amenities</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {facilities.map((facility, index) => {
                    const IconComponent = facility.icon;
                    return (
                      <div key={index} className="flex items-center gap-4 p-4 bg-gray-50/50 rounded-xl">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          facility.available ? 'bg-green-100' : 'bg-gray-100'
                        }`}>
                          <IconComponent className={`w-6 h-6 ${
                            facility.available ? 'text-green-600' : 'text-gray-400'
                          }`} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{facility.name}</h4>
                          <div className="flex items-center gap-1 text-sm">
                            {facility.available ? (
                              <>
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                <span className="text-green-600">Available</span>
                              </>
                            ) : (
                              <>
                                <AlertCircle className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-400">Not Available</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="content-section">
              <div className="bg-white/90 backdrop-blur rounded-3xl p-8 shadow-xl border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">Reviews & Ratings</h3>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-lg font-semibold">{hospital.rating}</span>
                    <span className="text-gray-500">(1,234 reviews)</span>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="bg-gray-50/50 rounded-2xl p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <Users className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{review.name}</h4>
                            <div className="flex items-center gap-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < review.rating
                                        ? 'text-yellow-400 fill-current'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-500">{review.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4">{review.comment}</p>
                      <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors">
                          <ThumbsUp className="w-4 h-4" />
                          Helpful ({review.helpful})
                        </button>
                        <button className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                          Reply
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="content-section">
              <div className="bg-white/90 backdrop-blur rounded-3xl p-8 shadow-xl border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                          <Phone className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Phone</h4>
                          <p className="text-gray-600">{hospital.phone}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                          <Mail className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Email</h4>
                          <p className="text-gray-600">contact@{hospital.name.toLowerCase().replace(/\s+/g, '')}.com</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                          <MapPin className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Address</h4>
                          <p className="text-gray-600">{hospital.location.address}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
                      <h4 className="text-xl font-bold mb-4">Emergency Contact</h4>
                      <p className="text-blue-100 mb-4">
                        For medical emergencies, call our 24/7 emergency hotline
                      </p>
                      <a 
                        href="tel:+91-1800-EMERGENCY"
                        className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
                      >
                        <Phone className="w-5 h-5" />
                        +91 1800-EMERGENCY
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


