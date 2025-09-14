import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white w-full">
      <div className="w-full px-0 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 px-4">
          <div className="flex items-center gap-3">
            <img src={require('../images/logo.svg').default} alt="HealthTrack Logo" className="w-8 h-8" />
            <span className="font-semibold text-xl text-gray-900">HealthTrack</span>
          </div>
          <div className="flex gap-10 flex-wrap justify-center">
            <div>
              <div className="font-medium text-gray-900 mb-2">Product</div>
              <ul className="space-y-1">
                <li><Link to="/features" className="hover:text-blue-600 transition">Features</Link></li>
                <li><Link to="/about" className="hover:text-blue-600 transition">About</Link></li>
              </ul>
            </div>
            <div>
              <div className="font-medium text-gray-900 mb-2">Support</div>
              <ul className="space-y-1">
                <li><Link to="/contact" className="hover:text-blue-600 transition">Contact</Link></li>
                <li><Link to="/privacy" className="hover:text-blue-600 transition">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="text-gray-500 text-sm md:text-right">© 2025 HealthTrack. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}


