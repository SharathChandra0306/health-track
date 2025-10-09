import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Mail, Phone, MapPin, Clock, Send, CheckCircle, 
  MessageCircle, HeadphonesIcon, Globe, ArrowRight,
  Users, Heart, Star
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const heroRef = useRef(null);
  const formRef = useRef(null);
  const contactRef = useRef(null);
  
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animation
      gsap.fromTo(heroRef.current.children, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
      );

      // Form Animation
      gsap.fromTo(formRef.current, 
        { opacity: 0, x: -30 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%"
          }
        }
      );

      // Contact Cards Animation
      gsap.fromTo(".contact-card", 
        { opacity: 0, y: 30, rotation: -2 },
        { 
          opacity: 1, 
          y: 0, 
          rotation: 0,
          duration: 0.6, 
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: contactRef.current,
            start: "top 75%"
          }
        }
      );

      // Floating Animation
      gsap.to(".floating", {
        y: "-12px",
        duration: 2.5,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.4
      });
    });

    return () => ctx.revert();
  }, []);

  const onSubmit = async (data) => {
    // TODO: Replace with backend POST /api/contact
    await new Promise((r) => setTimeout(r, 1500));
    console.log('Form data:', data);
    setIsSubmitted(true);
    reset();
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone Support",
      details: ["+91 1800-HEALTH", "+91 1800-432584"],
      description: "24/7 Emergency • 9 AM - 9 PM General",
      color: "green"
    },
    {
      icon: Mail,
      title: "Email Support",
      details: ["hello@healthtrack.com", "support@healthtrack.com"],
      description: "Response within 2-4 hours",
      color: "blue"
    },
    {
      icon: MapPin,
      title: "Office Location",
      details: ["HealthTrack HQ", "Bengaluru, Karnataka"],
      description: "Visits by appointment only",
      color: "purple"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon-Fri: 9 AM - 9 PM", "Sat-Sun: 10 AM - 6 PM"],
      description: "Emergency support 24/7",
      color: "orange"
    }
  ];

  const reasons = [
    { icon: HeadphonesIcon, text: "Technical Support" },
    { icon: Users, text: "Partnership Inquiries" },
    { icon: Heart, text: "Healthcare Provider Onboarding" },
    { icon: Star, text: "Feedback & Suggestions" },
    { icon: Globe, text: "Media & Press" },
    { icon: MessageCircle, text: "General Questions" }
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
                <MessageCircle className="w-24 h-24 text-blue-600 floating" />
                <div className="absolute -inset-6 bg-blue-500/20 rounded-full blur-2xl"></div>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent mb-6">
              Get In Touch
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-4xl mx-auto leading-relaxed">
              Have questions about HealthTrack? We're here to help you navigate your healthcare journey.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {reasons.map((reason, index) => {
                const IconComponent = reason.icon;
                return (
                  <div key={index} className="flex items-center gap-2 bg-white/70 backdrop-blur px-4 py-2 rounded-full shadow-lg border border-gray-200">
                    <IconComponent className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">{reason.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div ref={formRef}>
              <div className="bg-white/80 backdrop-blur rounded-3xl p-8 shadow-2xl border border-gray-200">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a message</h2>
                <p className="text-gray-600 mb-8">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
                
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-green-600 mb-4">Message Sent!</h3>
                    <p className="text-gray-600">
                      Thank you for reaching out. We'll get back to you within 2-4 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          First Name *
                        </label>
                        <input
                          {...register("firstName", { required: "First name is required" })}
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          placeholder="John"
                        />
                        {errors.firstName && (
                          <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Last Name *
                        </label>
                        <input
                          {...register("lastName", { required: "Last name is required" })}
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          placeholder="Doe"
                        />
                        {errors.lastName && (
                          <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        {...register("email", { 
                          required: "Email is required",
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Please enter a valid email address"
                          }
                        })}
                        type="email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="john@example.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Subject *
                      </label>
                      <select
                        {...register("subject", { required: "Please select a subject" })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      >
                        <option value="">Select a subject</option>
                        <option value="technical">Technical Support</option>
                        <option value="partnership">Partnership Inquiry</option>
                        <option value="provider">Healthcare Provider Onboarding</option>
                        <option value="feedback">Feedback & Suggestions</option>
                        <option value="media">Media & Press</option>
                        <option value="general">General Question</option>
                      </select>
                      {errors.subject && (
                        <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        {...register("message", { required: "Message is required" })}
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                        placeholder="Tell us how we can help you..."
                      />
                      {errors.message && (
                        <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                      )}
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div ref={contactRef}>
              <div className="space-y-6">
                <div className="text-center lg:text-left mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Information</h2>
                  <p className="text-gray-600 text-lg">
                    Multiple ways to reach us for different types of support
                  </p>
                </div>
                
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <div key={index} className="contact-card group">
                      <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 border border-gray-200">
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 bg-${info.color}-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                            <IconComponent className={`w-6 h-6 text-${info.color}-600`} />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{info.title}</h3>
                            <div className="space-y-1 mb-2">
                              {info.details.map((detail, detailIndex) => (
                                <p key={detailIndex} className="text-gray-800 font-medium">
                                  {detail}
                                </p>
                              ))}
                            </div>
                            <p className="text-sm text-gray-600">{info.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join thousands of users who trust HealthTrack for their healthcare needs
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="/signup" 
              className="group px-8 py-4 bg-white text-blue-600 rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <span className="flex items-center justify-center">
                Create Account
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
            <a 
              href="/support" 
              className="group px-8 py-4 border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              Visit Support Center
              <HeadphonesIcon className="inline-block ml-2 w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}


