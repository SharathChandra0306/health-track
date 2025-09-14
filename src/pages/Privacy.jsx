import React from 'react';

export default function Privacy() {
  return (
    <div className="w-full px-0 min-h-screen bg-gray-50">
      <section className="max-w-4xl mx-auto py-16 px-4">
        <div className="flex items-center gap-3 mb-8">
          <img src={require('../images/logo.svg').default} alt="HealthTrack Logo" className="w-10 h-10" />
          <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Your Privacy Matters</h2>
          <p className="text-gray-700 mb-4">We are committed to protecting your personal information and ensuring transparency in how we use your data. Read our policy to understand your rights and our practices.</p>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Information We Collect</h3>
          <ul className="list-disc pl-5 text-gray-700 mb-4">
            <li>Personal details (name, email, phone)</li>
            <li>Health records and emergency contacts</li>
            <li>Usage data and device information</li>
          </ul>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">How We Use Your Data</h3>
          <ul className="list-disc pl-5 text-gray-700 mb-4">
            <li>To provide and improve our services</li>
            <li>To ensure security and privacy</li>
            <li>To communicate important updates</li>
          </ul>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Rights</h3>
          <ul className="list-disc pl-5 text-gray-700 mb-4">
            <li>Access, update, or delete your data</li>
            <li>Request data portability</li>
            <li>Withdraw consent at any time</li>
          </ul>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact Us</h3>
          <p className="text-gray-700 mb-4">For privacy-related questions, email <a href="mailto:privacy@healthtrack.com" className="text-blue-600 underline">privacy@healthtrack.com</a>.</p>
        </div>
      </section>
    </div>
  );
}
