import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Bed, MapPin, Shield, Heart, Clock, Users, Zap, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Product() {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const statsRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animation
      gsap.fromTo(heroRef.current.children, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
      );

      // Features Animation
      gsap.fromTo(".feature-card", 
        { opacity: 0, y: 30, scale: 0.95 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.8, 
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Stats Counter Animation
      gsap.fromTo(".stat-number", 
        { innerText: 0 },
        { 
          innerText: (i, el) => el.dataset.value,
          duration: 2,
          ease: "power2.out",
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%"
          },
          onUpdate: function() {
            this.targets().forEach(el => {
              el.innerText = Math.ceil(el.innerText).toLocaleString();
            });
          }
        }
      );

      // Floating animation for icons
      gsap.to(".floating-icon", {
        y: "-10px",
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.3
      });
    }, [heroRef, featuresRef, statsRef, ctaRef]);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: MapPin,
      title: "Smart Location Search",
      description: "AI-powered hospital discovery based on your location with real-time availability",
      color: "blue"
    },
    {
      icon: Bed,
      title: "Real-Time Bed Tracking",
      description: "Live updates on bed availability across all departments and specialties",
      color: "green"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "End-to-end encryption ensuring your medical data stays protected",
      color: "purple"
    },
    {
      icon: Heart,
      title: "Emergency Response",
      description: "Instant emergency assistance with location-based hospital recommendations",
      color: "red"
    },
    {
      icon: Clock,
      title: "24/7 Monitoring",
      description: "Round-the-clock system monitoring for maximum uptime and reliability",
      color: "orange"
    },
    {
      icon: Users,
      title: "Multi-User Support",
      description: "Family account management with role-based access and permissions",
      color: "indigo"
    }
  ];

  const stats = [
    { number: 500, label: "Partner Hospitals", suffix: "+" },
    { number: 10000, label: "Active Users", suffix: "+" },
    { number: 50000, label: "Beds Tracked", suffix: "+" },
    { number: 99.9, label: "Uptime", suffix: "%" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-6xl mx-auto px-4" ref={heroRef}>
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <img 
                  src={require('../images/logo.svg').default} 
                  alt="HealthTrack Logo" 
                  className="w-20 h-20 floating-icon" 
                />
                <div className="absolute -inset-4 bg-blue-500/20 rounded-full blur-xl"></div>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              HealthTrack Product
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Revolutionary healthcare platform connecting patients to the right care at the right time
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup" className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1">
                <span className="relative z-10">Get Started Free</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
              <Link to="/features" className="group px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-full font-semibold text-lg hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1">
                Explore Features
                <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50" ref={featuresRef}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage your healthcare journey in one intelligent platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={index}
                  className="feature-card group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative">
                    <div className={`w-16 h-16 bg-${feature.color}-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className={`w-8 h-8 text-${feature.color}-600 floating-icon`} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    <div className={`absolute top-6 right-6 w-8 h-8 bg-${feature.color}-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity`}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600" ref={statsRef}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Join the growing community of healthcare providers and patients
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="relative">
                  <div className="stat-number text-5xl md:text-6xl font-bold text-white mb-2" data-value={stat.number}>
                    0
                  </div>
                  <span className="text-5xl md:text-6xl font-bold text-white">{stat.suffix}</span>
                </div>
                <p className="text-xl text-blue-100 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900" ref={ctaRef}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Healthcare?
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Join thousands of healthcare providers and patients who trust HealthTrack for their medical needs
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/signup" className="group relative px-10 py-5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
                <span className="relative z-10 flex items-center justify-center">
                  Start Your Journey
                  <Zap className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                </span>
              </Link>
              <Link to="/contact" className="group px-10 py-5 border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105">
                Contact Sales
                <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
