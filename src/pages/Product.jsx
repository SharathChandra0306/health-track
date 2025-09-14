import React from 'react';
import { Link } from 'react-router-dom';

export default function Product() {
  return (
    <div className="w-full px-0 min-h-screen bg-gray-50">
      <section className="max-w-4xl mx-auto py-16 px-4">
        <div className="flex items-center gap-3 mb-8">
          <img src={require('../images/logo.svg').default} alt="HealthTrack Logo" className="w-10 h-10" />
          <h1 className="text-3xl font-bold text-gray-900">Product</h1>
        </div>
        <p className="text-lg text-gray-700 mb-8">
          HealthTrack is a modern healthcare platform designed to help users find hospital beds, emergency services, and medical records in real time. Our product focuses on accessibility, speed, and security for all users.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-blue-700">Key Features</h2>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Location-based hospital search</li>
              <li>Real-time bed availability</li>
              <li>Emergency medical services</li>
              <li>Secure user profiles</li>
              <li>Medical records management</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-blue-700">Why Choose Us?</h2>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Modern, intuitive design</li>
              <li>Fast and reliable platform</li>
              <li>Privacy-focused and secure</li>
              <li>Comprehensive support</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 text-center">
          <Link to="/features" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition">Explore Features</Link>
        </div>
      </section>
    </div>
  );
}
