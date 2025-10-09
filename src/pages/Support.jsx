import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  HeadphonesIcon, MessageCircle, Phone, Mail, Clock, HelpCircle, 
  Search, BookOpen, Video, Users, ArrowRight, CheckCircle, Star,
  Zap, Shield, Heart
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Support() {
  const heroRef = useRef(null);
  const supportRef = useRef(null);
  const faqRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animation
      gsap.fromTo(heroRef.current.children, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
      );

      // Support Options Animation
      gsap.fromTo(".support-card", 
        { opacity: 0, x: -50, rotation: -3 },
        { 
          opacity: 1, 
          x: 0, 
          rotation: 0,
          duration: 0.8, 
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: supportRef.current,
            start: "top 75%",
            end: "bottom 25%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // FAQ Animation
      gsap.fromTo(".faq-item", 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: faqRef.current,
            start: "top 80%"
          }
        }
      );

      // Floating Animation
      gsap.to(".floating", {
        y: "-10px",
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.3
      });
    });

    return () => ctx.revert();
  }, []);

  const supportOptions = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help from our support team through live chat",
      action: "Start Chat",
      color: "blue",
      available: "24/7"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our healthcare support specialists",
      action: "Call Now",
      color: "green",
      available: "9 AM - 9 PM"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us detailed questions and get comprehensive answers",
      action: "Send Email",
      color: "purple",
      available: "Response in 2-4 hours"
    },
    {
      icon: Video,
      title: "Video Support",
      description: "Schedule a video call for complex technical assistance",
      action: "Schedule Call",
      color: "red",
      available: "By Appointment"
    },
    {
      icon: BookOpen,
      title: "Knowledge Base",
      description: "Browse our comprehensive documentation and guides",
      action: "Browse Docs",
      color: "indigo",
      available: "Self-Service"
    },
    {
      icon: Users,
      title: "Community Forum",
      description: "Connect with other users and share experiences",
      action: "Join Forum",
      color: "teal",
      available: "Community Driven"
    }
  ];

  const faqs = [
    {
      question: "How do I find hospitals near me?",
      answer: "Use our location-based search feature on the homepage or search page. Allow location access for the most accurate results, or manually enter your location."
    },
    {
      question: "Is my medical data secure?",
      answer: "Yes, we use military-grade encryption and are HIPAA compliant. Your data is stored securely and never shared without your explicit consent."
    },
    {
      question: "How accurate is the bed availability information?",
      answer: "Our system updates bed availability in real-time through direct integration with hospital management systems, ensuring 99%+ accuracy."
    },
    {
      question: "Can I book appointments through HealthTrack?",
      answer: "Yes, you can book beds and schedule appointments directly through our platform with participating hospitals."
    },
    {
      question: "Is there a mobile app available?",
      answer: "Our web platform is fully mobile-optimized. A dedicated mobile app is coming soon with additional features."
    },
    {
      question: "What if I need emergency assistance?",
      answer: "Click the red 'Emergency' button in the navigation for immediate assistance, or call 911 for life-threatening emergencies."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-green-600/5"></div>
        <div className="relative max-w-6xl mx-auto px-4" ref={heroRef}>
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <HeadphonesIcon className="w-24 h-24 text-blue-600 floating" />
                <div className="absolute -inset-6 bg-blue-500/20 rounded-full blur-2xl"></div>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-green-600 to-teal-600 bg-clip-text text-transparent mb-6">
              Support Center
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-4xl mx-auto leading-relaxed">
              We're here to help you navigate your healthcare journey. Get the support you need, when you need it.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">24/7 Emergency Support</span>
              </div>
              <div className="flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
                <Star className="w-4 h-4" />
                <span className="text-sm font-medium">4.9/5 Customer Rating</span>
              </div>
              <div className="flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full">
                <Zap className="w-4 h-4" />
                <span className="text-sm font-medium">Average 2min Response</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-20" ref={supportRef}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Choose Your Support Channel</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Multiple ways to get help, tailored to your needs and preferences
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {supportOptions.map((option, index) => {
              const IconComponent = option.icon;
              return (
                <div 
                  key={index}
                  className="support-card group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative">
                    <div className={`w-16 h-16 bg-${option.color}-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className={`w-8 h-8 text-${option.color}-600 floating`} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{option.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{option.description}</p>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-sm text-gray-500">{option.available}</span>
                      <div className={`w-3 h-3 bg-${option.color}-500 rounded-full`}></div>
                    </div>
                    <button className={`w-full bg-${option.color}-600 text-white py-3 rounded-lg font-semibold hover:bg-${option.color}-700 transition-colors duration-300 group-hover:shadow-lg`}>
                      {option.action}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white/50" ref={faqRef}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <HelpCircle className="w-16 h-16 text-blue-600 mx-auto mb-6 floating" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">
              Quick answers to common questions about HealthTrack
            </p>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed pl-8">{faq.answer}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">Didn't find what you're looking for?</p>
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
            >
              Contact Our Team
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Emergency Contact Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-orange-600" ref={contactRef}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white/10 backdrop-blur rounded-3xl p-12 border border-white/20">
            <Heart className="w-16 h-16 text-white mx-auto mb-8 floating" />
            <h2 className="text-4xl font-bold text-white mb-6">Emergency Support</h2>
            <p className="text-xl text-red-100 mb-8 leading-relaxed">
              For medical emergencies, don't wait. Get immediate assistance through our emergency channels.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a 
                href="tel:911" 
                className="group px-8 py-4 bg-white text-red-600 rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <span className="flex items-center justify-center">
                  📞 Call 911
                  <Phone className="ml-2 w-5 h-5 group-hover:animate-pulse" />
                </span>
              </a>
              <button className="group px-8 py-4 border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-red-600 transition-all duration-300 transform hover:scale-105">
                🚨 Emergency Chat
                <MessageCircle className="inline-block ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
