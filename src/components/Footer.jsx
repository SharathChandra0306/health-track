import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-6 md:grid-cols-3 text-sm text-gray-600">
          <div>
            <div className="font-semibold text-gray-900 mb-2">HealthTrack</div>
            <p>Find care faster with real-time availability.</p>
          </div>
          <div className="flex gap-6">
            <div>
              <div className="font-medium text-gray-900 mb-2">Product</div>
              <ul className="space-y-1">
                <li><Link to="/features" className="hover:text-gray-900">Features</Link></li>
                <li><Link to="/about" className="hover:text-gray-900">About</Link></li>
              </ul>
            </div>
            <div>
              <div className="font-medium text-gray-900 mb-2">Support</div>
              <ul className="space-y-1">
                <li><Link to="/contact" className="hover:text-gray-900">Contact</Link></li>
                <li><Link to="/privacy" className="hover:text-gray-900">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="md:text-right">© 2025 HealthTrack. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}


