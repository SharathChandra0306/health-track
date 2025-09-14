import React from 'react';
import { Link } from 'react-router-dom';

export default function Features() {
  return (
    <div className="w-full px-0 min-h-screen bg-gray-50">
      <section className="max-w-4xl mx-auto py-16 px-4">
        <div className="flex items-center gap-3 mb-8">
          <img src={require('../images/logo.svg').default} alt="HealthTrack Logo" className="w-10 h-10" />
          <h1 className="text-3xl font-bold text-gray-900">Features</h1>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-blue-700">Hospital Search</h2>
            <p className="text-gray-700">Find hospitals and facilities near you with location-based search and real-time updates.</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-blue-700">Bed Availability</h2>
            <p className="text-gray-700">Check available beds instantly and book as needed for yourself or loved ones.</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-blue-700">Emergency Services</h2>
            <p className="text-gray-700">Request emergency medical help and access quick contacts for urgent care.</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-blue-700">Medical Records</h2>
            <p className="text-gray-700">Manage your health records securely and access them anytime, anywhere.</p>
          </div>
        </div>
        <div className="mt-12 text-center">
          <Link to="/product" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition">Back to Product</Link>
        </div>
      </section>
    </div>
  );
}
