import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Facebook, Twitter, Instagram, Linkedin, Mail, Phone, 
  MapPin, Heart, Shield, Users, Star, ArrowUp,
  Github, Youtube, MessageCircle
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Footer slide up animation
      gsap.fromTo(".footer-section", 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%"
          }
        }
      );

      // Logo pulse animation
      gsap.to(".footer-logo", {
        scale: 1.05,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });

      // Social icons hover effect
      gsap.set(".social-icon", { scale: 1 });
    });

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    product: [
      { name: "Features", href: "/features" },
      { name: "About Us", href: "/about" },
      { name: "Search Hospitals", href: "/search" },
      { name: "Book Appointment", href: "/book-bed" }
    ],
    support: [
      { name: "Help Center", href: "/support" },
      { name: "Contact Us", href: "/contact" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" }
    ],
    resources: [
      { name: "Health Blog", href: "/blog" },
      { name: "Medical Records", href: "/medical-records" },
      { name: "Emergency Contacts", href: "/emergency-contacts" },
      { name: "API Documentation", href: "/api-docs" }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com/healthtrack", color: "blue" },
    { icon: Twitter, href: "https://twitter.com/healthtrack", color: "sky" },
    { icon: Instagram, href: "https://instagram.com/healthtrack", color: "pink" },
    { icon: Linkedin, href: "https://linkedin.com/company/healthtrack", color: "blue" },
    { icon: Github, href: "https://github.com/healthtrack", color: "gray" },
    { icon: Youtube, href: "https://youtube.com/healthtrack", color: "red" }
  ];

  const contactInfo = [
    { icon: Phone, text: "+91 1800-HEALTH", href: "tel:+91-1800-432584" },
    { icon: Mail, text: "hello@healthtrack.com", href: "mailto:hello@healthtrack.com" },
    { icon: MapPin, text: "Bengaluru, Karnataka, India", href: "#" }
  ];

  const stats = [
    { icon: Users, number: "50K+", label: "Active Users" },
    { icon: Shield, number: "500+", label: "Partner Hospitals" },
    { icon: Heart, number: "1M+", label: "Lives Improved" },
    { icon: Star, number: "4.9", label: "User Rating" }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden" ref={footerRef}>
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500"></div>
      
      {/* Stats Section */}
      <div className="relative border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="footer-section text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-white/10 backdrop-blur rounded-full flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-blue-400" />
                    </div>
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="footer-section lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img 
                src={require('../images/logo.svg').default} 
                alt="HealthTrack Logo" 
                className="w-10 h-10 footer-logo" 
              />
              <span className="font-bold text-2xl bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                HealthTrack
              </span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Empowering your healthcare journey with intelligent solutions, 
              connecting you to the right care at the right time.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-8">
              {contactInfo.map((contact, index) => {
                const IconComponent = contact.icon;
                return (
                  <a 
                    key={index}
                    href={contact.href}
                    className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="text-sm">{contact.text}</span>
                  </a>
                );
              })}
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon w-10 h-10 bg-white/10 backdrop-blur rounded-full flex items-center justify-center hover:bg-blue-500 transition-all duration-300 transform hover:scale-110"
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Footer Links */}
          <div className="footer-section lg:col-span-3">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold text-lg text-white mb-6">Product</h3>
                <ul className="space-y-3">
                  {footerLinks.product.map((link, index) => (
                    <li key={index}>
                      <Link 
                        to={link.href} 
                        className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-white mb-6">Support</h3>
                <ul className="space-y-3">
                  {footerLinks.support.map((link, index) => (
                    <li key={index}>
                      <Link 
                        to={link.href} 
                        className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-white mb-6">Resources</h3>
                <ul className="space-y-3">
                  {footerLinks.resources.map((link, index) => (
                    <li key={index}>
                      <Link 
                        to={link.href} 
                        className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="footer-section flex items-center gap-6">
              <p className="text-gray-400 text-sm">
                © 2025 HealthTrack. All rights reserved.
              </p>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Heart className="w-4 h-4 text-red-500" />
                <span>Made with care for better health</span>
              </div>
            </div>
            
            <button
              onClick={scrollToTop}
              className="footer-section flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-full hover:bg-blue-500 transition-all duration-300 transform hover:scale-105"
            >
              <ArrowUp className="w-4 h-4" />
              <span className="text-sm">Back to Top</span>
            </button>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="absolute bottom-0 right-0 p-6">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-4 max-w-sm">
          <div className="flex items-center gap-3 mb-3">
            <MessageCircle className="w-6 h-6 text-white" />
            <span className="text-white font-semibold">Stay Updated</span>
          </div>
          <p className="text-blue-100 text-sm mb-4">
            Get health tips and updates delivered to your inbox
          </p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Enter email"
              className="flex-1 px-3 py-2 rounded-lg bg-white/20 backdrop-blur text-white placeholder-blue-200 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white text-sm"
            />
            <button className="px-4 py-2 bg-white text-blue-600 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}


