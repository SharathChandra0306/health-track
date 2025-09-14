import React from 'react';
import { Link } from 'react-router-dom';

export default function Support() {
  return (
    <div className="w-full px-0 min-h-screen bg-gray-50">
      <section className="max-w-4xl mx-auto py-16 px-4">
        <div className="flex items-center gap-3 mb-8">
          <img src={require('../images/logo.svg').default} alt="HealthTrack Logo" className="w-10 h-10" />
          <h1 className="text-3xl font-bold text-gray-900">Support</h1>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Need Help?</h2>
          <p className="text-gray-700 mb-4">Our support team is here to assist you with any questions or issues. Reach out to us for technical help, account queries, or feedback.</p>
          <ul className="list-disc pl-5 text-gray-700 mb-4">
            <li>Email: support@healthtrack.com</li>
            <li>Phone: +91 12345 67890</li>
          </ul>
          <Link to="/contact" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition">Contact Us</Link>
        </div>
      </section>
    </div>
  );
}
