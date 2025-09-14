import { Card } from '../components/ui';

export default function About() {
  return (
    <div className="w-full px-0 min-h-screen bg-gray-50">
      <section className="max-w-4xl mx-auto py-16 px-4">
        <div className="flex items-center gap-3 mb-8">
          <img src={require('../images/logo.svg').default} alt="HealthTrack Logo" className="w-10 h-10" />
          <h1 className="text-3xl font-bold text-gray-900">About Us</h1>
        </div>
        <p className="text-lg text-gray-700 mb-8">
          HealthTrack is dedicated to transforming healthcare access in India. Our mission is to empower patients and providers with real-time information, seamless booking, and secure data management.
        </p>
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Our Vision</h2>
          <p className="text-gray-700 mb-4">To make healthcare more accessible, transparent, and efficient for everyone.</p>
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Our Team</h2>
          <p className="text-gray-700">We are a passionate group of healthcare professionals, engineers, and designers working together to build a better future.</p>
        </div>
      </section>
    </div>
  );
}


