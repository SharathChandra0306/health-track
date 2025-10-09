import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Shield, Lock, Eye, FileText, Users, Globe, 
  Mail, Phone, Download, Trash2, 
  AlertCircle, CheckCircle, ArrowRight, UserCheck,
  Database, Settings, Key, Clock
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Privacy() {
  const heroRef = useRef(null);
  const sectionsRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animation
      gsap.fromTo(heroRef.current.children, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
      );

      // Section Cards Animation
      gsap.fromTo(".privacy-section", 
        { opacity: 0, y: 30, scale: 0.95 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.8, 
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionsRef.current,
            start: "top 80%"
          }
        }
      );

      // Timeline Animation
      gsap.fromTo(".timeline-item", 
        { opacity: 0, x: -50 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.6, 
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 75%"
          }
        }
      );

      // Floating Animation
      gsap.to(".floating", {
        y: "-15px",
        duration: 3,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.5
      });

      // Icon Rotation
      gsap.to(".rotating-icon", {
        rotation: 360,
        duration: 20,
        ease: "none",
        repeat: -1
      });
    });

    return () => ctx.revert();
  }, []);

  const privacySections = [
    {
      icon: Database,
      title: "Information We Collect",
      color: "blue",
      items: [
        { icon: UserCheck, text: "Personal identification (name, email, phone number)" },
        { icon: FileText, text: "Health records, medical history, and emergency contacts" },
        { icon: Settings, text: "Device information, IP address, and usage analytics" },
        { icon: Globe, text: "Location data for emergency services and hospital finder" }
      ]
    },
    {
      icon: Eye,
      title: "How We Use Your Data",
      color: "green",
      items: [
        { icon: Shield, text: "Provide personalized healthcare services and recommendations" },
        { icon: AlertCircle, text: "Notify emergency contacts during medical emergencies" },
        { icon: Users, text: "Connect you with healthcare providers and specialists" },
        { icon: Settings, text: "Improve our platform through usage analytics and feedback" }
      ]
    },
    {
      icon: Lock,
      title: "Data Protection & Security",
      color: "purple",
      items: [
        { icon: Key, text: "End-to-end encryption for all sensitive health data" },
        { icon: Shield, text: "HIPAA-compliant security measures and protocols" },
        { icon: Database, text: "Secure cloud storage with regular security audits" },
        { icon: UserCheck, text: "Multi-factor authentication and access controls" }
      ]
    },
    {
      icon: CheckCircle,
      title: "Your Privacy Rights",
      color: "orange",
      items: [
        { icon: Eye, text: "Access and review all your personal data at any time" },
        { icon: Download, text: "Download your data in a portable format (data portability)" },
        { icon: Settings, text: "Update, correct, or modify your personal information" },
        { icon: Trash2, text: "Request deletion of your account and associated data" }
      ]
    }
  ];

  const timelineItems = [
    {
      date: "Data Collection",
      title: "Information Gathering",
      description: "We collect only necessary information to provide our services",
      icon: Database
    },
    {
      date: "Processing",
      title: "Secure Processing",
      description: "Your data is processed using industry-standard encryption",
      icon: Lock
    },
    {
      date: "Storage",
      title: "Safe Storage",
      description: "Data stored in HIPAA-compliant, secure cloud infrastructure",
      icon: Shield
    },
    {
      date: "Usage",
      title: "Service Delivery",
      description: "Information used to provide personalized healthcare services",
      icon: UserCheck
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div className="relative max-w-6xl mx-auto px-4" ref={heroRef}>
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <Shield className="w-24 h-24 text-blue-600 floating rotating-icon" />
                <div className="absolute -inset-6 bg-blue-500/20 rounded-full blur-2xl"></div>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
              Your privacy is our priority. We're committed to protecting your personal health information 
              and ensuring transparency in how we handle your data.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/70 backdrop-blur px-4 py-2 rounded-full shadow-lg border border-gray-200">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-gray-700">HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2 bg-white/70 backdrop-blur px-4 py-2 rounded-full shadow-lg border border-gray-200">
                <Lock className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">End-to-End Encrypted</span>
              </div>
              <div className="flex items-center gap-2 bg-white/70 backdrop-blur px-4 py-2 rounded-full shadow-lg border border-gray-200">
                <Shield className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium text-gray-700">SOC 2 Certified</span>
              </div>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Sections */}
      <section className="py-20" ref={sectionsRef}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {privacySections.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <div key={index} className="privacy-section">
                  <div className="bg-white/80 backdrop-blur rounded-3xl p-8 shadow-xl border border-gray-200 h-full">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-16 h-16 bg-${section.color}-100 rounded-2xl flex items-center justify-center`}>
                        <IconComponent className={`w-8 h-8 text-${section.color}-600`} />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                    </div>
                    <div className="space-y-4">
                      {section.items.map((item, itemIndex) => {
                        const ItemIcon = item.icon;
                        return (
                          <div key={itemIndex} className="flex items-start gap-3 p-4 bg-gray-50/50 rounded-xl">
                            <ItemIcon className={`w-5 h-5 text-${section.color}-600 mt-0.5 flex-shrink-0`} />
                            <p className="text-gray-700 leading-relaxed">{item.text}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Data Processing Timeline */}
      <section className="py-20 bg-white/50" ref={timelineRef}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">How We Handle Your Data</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding our data processing workflow ensures transparency in how we protect your information
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>
            <div className="space-y-12">
              {timelineItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} className="timeline-item relative flex items-center">
                    <div className="absolute left-6 w-4 h-4 bg-white border-4 border-blue-500 rounded-full"></div>
                    <div className="ml-20 bg-white/80 backdrop-blur rounded-2xl p-6 shadow-lg border border-gray-200 flex-1">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span className="text-sm font-semibold text-blue-600">{item.date}</span>
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                          <p className="text-gray-600">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Rights Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white text-center">
            <div className="flex justify-center mb-6">
              <Mail className="w-16 h-16 text-white floating" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Questions About Your Privacy?</h2>
            <p className="text-xl mb-8 opacity-90">
              Our privacy team is here to help you understand and exercise your rights
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
                <Mail className="w-8 h-8 text-white mb-4 mx-auto" />
                <h3 className="text-lg font-semibold mb-2">Email Us</h3>
                <a href="mailto:privacy@healthtrack.com" className="text-blue-200 hover:text-white transition-colors">
                  privacy@healthtrack.com
                </a>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
                <Phone className="w-8 h-8 text-white mb-4 mx-auto" />
                <h3 className="text-lg font-semibold mb-2">Call Us</h3>
                <a href="tel:+91-1800-PRIVACY" className="text-blue-200 hover:text-white transition-colors">
                  +91 1800-PRIVACY
                </a>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="group px-8 py-4 bg-white text-blue-600 rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <span className="flex items-center justify-center">
                  Contact Privacy Team
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
              <a 
                href="/support" 
                className="group px-8 py-4 border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
              >
                Privacy Support Center
                <Settings className="inline-block ml-2 w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
