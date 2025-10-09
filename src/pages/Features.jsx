import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  MapPin, Bed, Ambulance, FileText, Shield, Users, 
  Heart, Activity, Zap, CheckCircle,
  ArrowRight, Star, Target, Globe
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Features() {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const benefitsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animation
      gsap.fromTo(heroRef.current.children, 
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.2, stagger: 0.2, ease: "power3.out" }
      );

      // Features Cards Animation
      gsap.fromTo(".feature-card", 
        { opacity: 0, y: 40, rotation: -5 },
        { 
          opacity: 1, 
          y: 0, 
          rotation: 0,
          duration: 0.8, 
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 75%",
            end: "bottom 25%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Benefits Animation
      gsap.fromTo(".benefit-item", 
        { opacity: 0, x: -50 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.6, 
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: benefitsRef.current,
            start: "top 80%"
          }
        }
      );

      // Continuous animations
      gsap.to(".pulse-element", {
        scale: 1.05,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.5
      });
    });

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: MapPin,
      title: "Smart Location Search",
      description: "AI-powered hospital discovery with GPS integration and real-time distance calculations",
      color: "blue",
      benefits: ["GPS Integration", "Real-time Distance", "Route Optimization"]
    },
    {
      icon: Bed,
      title: "Real-Time Bed Tracking",
      description: "Live bed availability across all departments with automated updates and booking",
      color: "green",
      benefits: ["Live Updates", "Department Wise", "Instant Booking"]
    },
    {
      icon: Ambulance,
      title: "Emergency Response",
      description: "24/7 emergency assistance with automatic location detection and rapid dispatch",
      color: "red",
      benefits: ["24/7 Available", "Auto Location", "Rapid Response"]
    },
    {
      icon: FileText,
      title: "Medical Records",
      description: "Secure cloud storage for medical records with easy sharing and access control",
      color: "purple",
      benefits: ["Cloud Storage", "Easy Sharing", "Access Control"]
    },
    {
      icon: Shield,
      title: "Data Security",
      description: "Military-grade encryption and HIPAA compliance for complete data protection",
      color: "indigo",
      benefits: ["Military Grade", "HIPAA Compliant", "Zero Knowledge"]
    },
    {
      icon: Users,
      title: "Family Management",
      description: "Manage multiple family members with shared access and individual privacy settings",
      color: "teal",
      benefits: ["Multi-User", "Shared Access", "Privacy Controls"]
    }
  ];

  const benefits = [
    { icon: Target, text: "99.9% Uptime Guaranteed" },
    { icon: Zap, text: "Lightning Fast Response" },
    { icon: Globe, text: "Available Nationwide" },
    { icon: CheckCircle, text: "HIPAA Compliant" },
    { icon: Heart, text: "Patient-Centric Design" },
    { icon: Star, text: "5-Star Rated Platform" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div className="relative max-w-6xl mx-auto px-4" ref={heroRef}>
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <img 
                  src={require('../images/logo.svg').default} 
                  alt="HealthTrack Logo" 
                  className="w-24 h-24 pulse-element" 
                />
                <div className="absolute -inset-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-2xl"></div>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent mb-6">
              Powerful Features
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-4xl mx-auto leading-relaxed">
              Discover cutting-edge healthcare technology designed to connect you with the right care at the right moment
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <div key={index} className="benefit-item flex items-center gap-2 bg-white/70 backdrop-blur px-4 py-2 rounded-full shadow-lg">
                    <IconComponent className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">{benefit.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20" ref={featuresRef}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={index}
                  className="feature-card group relative bg-white/80 backdrop-blur rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-white/50"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <div className="relative">
                    {/* Icon */}
                    <div className={`w-20 h-20 bg-gradient-to-br from-${feature.color}-100 to-${feature.color}-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 pulse-element`}>
                      <IconComponent className={`w-10 h-10 text-${feature.color}-600`} />
                    </div>
                    
                    {/* Title & Description */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {feature.description}
                    </p>
                    
                    {/* Benefits */}
                    <div className="space-y-2">
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-center gap-2">
                          <CheckCircle className={`w-4 h-4 text-${feature.color}-500`} />
                          <span className="text-sm text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Hover Effect */}
                    <div className={`absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-${feature.color}-400 to-${feature.color}-600 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-blue-900" ref={benefitsRef}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose HealthTrack?
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Join thousands of healthcare providers and patients who trust our platform for critical healthcare decisions
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Advanced Technology", desc: "AI-powered matching algorithms ensure you find the best healthcare options" },
              { title: "Real-Time Data", desc: "Live updates from hospitals ensure accuracy when you need it most" },
              { title: "Seamless Integration", desc: "Works with existing hospital systems and electronic health records" },
              { title: "Mobile Optimized", desc: "Full functionality on any device, anywhere, anytime" },
              { title: "24/7 Support", desc: "Round-the-clock customer support for emergencies and general queries" },
              { title: "Proven Results", desc: "Reduced wait times by 60% and improved patient satisfaction by 85%" }
            ].map((item, index) => (
              <div key={index} className="benefit-item bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                <h4 className="text-xl font-semibold text-white mb-3">{item.title}</h4>
                <p className="text-blue-100">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Experience the Future of Healthcare
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Ready to transform how you access healthcare? Join our platform today
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/signup" className="group relative px-10 py-5 bg-white text-blue-600 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-white/25 transition-all duration-300 transform hover:scale-105">
              <span className="relative z-10 flex items-center justify-center">
                Get Started Now
                <Activity className="ml-2 w-5 h-5 group-hover:animate-pulse" />
              </span>
            </Link>
            <Link to="/product" className="group px-10 py-5 border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105">
              View Product Details
              <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
