import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Heart, Users, Target, Award, Zap, Shield, 
  Globe, ArrowRight, Star
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const heroRef = useRef(null);
  const valuesRef = useRef(null);
  const teamRef = useRef(null);
  const achievementsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animation
      gsap.fromTo(heroRef.current.children, 
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.2, stagger: 0.3, ease: "power3.out" }
      );

      // Values Cards Animation
      gsap.fromTo(".value-card", 
        { opacity: 0, y: 40, rotationY: -15 },
        { 
          opacity: 1, 
          y: 0, 
          rotationY: 0,
          duration: 0.8, 
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: valuesRef.current,
            start: "top 75%",
            end: "bottom 25%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Team Animation
      gsap.fromTo(".team-member", 
        { opacity: 0, scale: 0.8, rotation: -5 },
        { 
          opacity: 1, 
          scale: 1, 
          rotation: 0,
          duration: 0.6, 
          stagger: 0.15,
          ease: "elastic.out(1, 0.8)",
          scrollTrigger: {
            trigger: teamRef.current,
            start: "top 80%"
          }
        }
      );

      // Achievement Numbers Animation
      gsap.fromTo(".achievement-number", 
        { innerText: 0, scale: 0.5 },
        { 
          innerText: (i, el) => el.dataset.value,
          scale: 1,
          duration: 2,
          ease: "power2.out",
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: achievementsRef.current,
            start: "top 80%"
          },
          onUpdate: function() {
            this.targets().forEach(el => {
              el.innerText = Math.ceil(el.innerText).toLocaleString();
            });
          }
        }
      );

      // Floating Animation
      gsap.to(".floating", {
        y: "-15px",
        duration: 2.5,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.4
      });
    });

    return () => ctx.revert();
  }, []);

  const values = [
    {
      icon: Heart,
      title: "Patient-Centric",
      description: "Every decision we make prioritizes patient safety, comfort, and accessibility",
      color: "red"
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      description: "Military-grade encryption and HIPAA compliance ensure your data stays protected",
      color: "blue"
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Cutting-edge technology to revolutionize healthcare delivery and access",
      color: "yellow"
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Building bridges between patients, providers, and healthcare systems",
      color: "green"
    },
    {
      icon: Target,
      title: "Precision",
      description: "Accurate, real-time data to help you make informed healthcare decisions",
      color: "purple"
    },
    {
      icon: Globe,
      title: "Accessibility",
      description: "Making quality healthcare accessible to everyone, everywhere in India",
      color: "indigo"
    }
  ];

  const team = [
    {
      name: "Dr. Sarah Patel",
      role: "Chief Medical Officer",
      image: "👩‍⚕️",
      bio: "15+ years in emergency medicine"
    },
    {
      name: "Rajesh Kumar",
      role: "CTO & Co-founder",
      image: "👨‍💻",
      bio: "Former Google engineer, healthcare tech expert"
    },
    {
      name: "Priya Sharma",
      role: "Head of Operations",
      image: "👩‍💼",
      bio: "Healthcare administration specialist"
    },
    {
      name: "Dr. Amit Singh",
      role: "Medical Director",
      image: "👨‍⚕️",
      bio: "Critical care physician, 20+ years experience"
    }
  ];

  const achievements = [
    { number: 500, label: "Partner Hospitals", suffix: "+" },
    { number: 50000, label: "Lives Impacted", suffix: "+" },
    { number: 99.9, label: "Platform Uptime", suffix: "%" },
    { number: 24, label: "Hours Support", suffix: "/7" }
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
                <img 
                  src={require('../images/logo.svg').default} 
                  alt="HealthTrack Logo" 
                  className="w-32 h-32 floating" 
                />
                <div className="absolute -inset-8 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent mb-8">
              About HealthTrack
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
              We're revolutionizing healthcare access in India by connecting patients with the right care at the right time through intelligent technology
            </p>
            <div className="bg-white/80 backdrop-blur rounded-2xl p-8 max-w-4xl mx-auto border border-gray-200 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                To democratize healthcare access by providing real-time hospital information, seamless booking experiences, 
                and secure health record management - making quality healthcare accessible to every Indian citizen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white/50" ref={valuesRef}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do and every decision we make
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div 
                  key={index}
                  className="value-card group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative">
                    <div className={`w-20 h-20 bg-${value.color}-100 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 floating`}>
                      <IconComponent className={`w-10 h-10 text-${value.color}-600`} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                    <div className={`absolute top-8 right-8 w-12 h-12 bg-${value.color}-500 rounded-full opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-blue-900" ref={teamRef}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Meet Our Team</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Healthcare professionals, technologists, and innovators working together to transform healthcare
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="team-member group text-center">
                <div className="relative mb-6">
                  <div className="w-32 h-32 mx-auto bg-white/10 backdrop-blur rounded-full flex items-center justify-center text-6xl border-4 border-white/20 group-hover:border-white/40 transition-all duration-300">
                    {member.image}
                  </div>
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                <p className="text-blue-300 font-medium mb-3">{member.role}</p>
                <p className="text-blue-100 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600" ref={achievementsRef}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Impact</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Numbers that reflect our commitment to transforming healthcare in India
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-4">
                  <div className="achievement-number text-5xl md:text-6xl font-bold text-white" data-value={achievement.number}>
                    0
                  </div>
                  <span className="text-5xl md:text-6xl font-bold text-white">{achievement.suffix}</span>
                  <div className="absolute -inset-4 bg-white/10 rounded-full blur-2xl"></div>
                </div>
                <p className="text-xl text-blue-100">{achievement.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-12 border border-gray-200">
            <Award className="w-16 h-16 text-blue-600 mx-auto mb-8 floating" />
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Vision for the Future</h2>
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              To create a world where every person has instant access to quality healthcare information, 
              where geographic barriers don't determine health outcomes, and where technology serves humanity's most fundamental need - health.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                to="/features" 
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
              >
                <span className="flex items-center justify-center">
                  Explore Our Platform
                  <Star className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                </span>
              </Link>
              <Link 
                to="/contact" 
                className="group px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-full font-bold text-lg hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105"
              >
                Join Our Mission
                <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


