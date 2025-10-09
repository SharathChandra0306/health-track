import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import EmergencyChatbot from './EmergencyChatbot';
import { 
  Menu, 
  X, 
  User, 
  Search, 
  Ambulance, 
  Bed, 
  FileText, 
  Phone,
  Settings,
  LogOut,
  AlertTriangle
} from 'lucide-react';

const NavItem = ({ to, children, icon: Icon }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
      }`}
  >
    {Icon && <Icon className="w-4 h-4" />}
    {children}
  </NavLink>
);

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isEmergencyChatbotOpen, setIsEmergencyChatbotOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
  <div className="w-full px-0">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="text-xl font-bold text-gray-900 flex items-center gap-2 pl-4">
            <img src={require('../images/logo.svg').default} alt="HealthTrack Logo" className="w-8 h-8" />
            HealthTrack
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/product">Product</NavItem>
            <NavItem to="/features">Features</NavItem>
            <NavItem to="/about">About</NavItem>
            <NavItem to="/support">Support</NavItem>
            <NavItem to="/search" icon={Search}>Search</NavItem>
            {isAuthenticated && (
              <>
                <NavItem to="/ems" icon={Ambulance}>EMS</NavItem>
                <NavItem to="/book-bed" icon={Bed}>Book Bed</NavItem>
                <NavItem to="/medical-records" icon={FileText}>Records</NavItem>
                <NavItem to="/emergency-contacts" icon={Phone}>Contacts</NavItem>
              </>
            )}
            <NavItem to="/contact">Contact</NavItem>
            <NavItem to="/privacy">Privacy Policy</NavItem>
          </nav>

          {/* Emergency Button */}
          <button
            onClick={() => setIsEmergencyChatbotOpen(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm font-medium transition-colors mr-4"
          >
            <AlertTriangle className="w-4 h-4" />
            <span className="hidden sm:inline">Emergency</span>
          </button>

          {/* User Menu */}
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">{user?.name || 'Profile'}</span>
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link to="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <Settings className="w-4 h-4" />
                      Profile Settings
                    </Link>
                    <Link to="/dashboard" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <User className="w-4 h-4" />
                      Dashboard
                    </Link>
                    <button
                      onClick={logout}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="hidden sm:inline-flex px-4 py-2 rounded-md border text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="inline-flex px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <nav className="space-y-1">
              {/* Mobile Emergency Button */}
              <button
                onClick={() => {
                  setIsEmergencyChatbotOpen(true);
                  setIsMenuOpen(false);
                }}
                className="w-full bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md flex items-center gap-2 text-sm font-medium mb-4"
              >
                <AlertTriangle className="w-4 h-4" />
                Emergency Assistance
              </button>
              
              <NavItem to="/">Home</NavItem>
              <NavItem to="/product">Product</NavItem>
              <NavItem to="/features">Features</NavItem>
              <NavItem to="/about">About</NavItem>
              <NavItem to="/support">Support</NavItem>
              <NavItem to="/search" icon={Search}>Search</NavItem>
              {isAuthenticated && (
                <>
                  <NavItem to="/ems" icon={Ambulance}>EMS</NavItem>
                  <NavItem to="/book-bed" icon={Bed}>Book Bed</NavItem>
                  <NavItem to="/medical-records" icon={FileText}>Medical Records</NavItem>
                  <NavItem to="/emergency-contacts" icon={Phone}>Emergency Contacts</NavItem>
                  <NavItem to="/profile" icon={Settings}>Profile Settings</NavItem>
                  <NavItem to="/dashboard" icon={User}>Dashboard</NavItem>
                </>
              )}
              <NavItem to="/contact">Contact</NavItem>
              <NavItem to="/privacy">Privacy Policy</NavItem>
              {!isAuthenticated && (
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <Link 
                    to="/login" 
                    className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/signup" 
                    className="block px-3 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>

      {/* Emergency Chatbot */}
      <EmergencyChatbot 
        isOpen={isEmergencyChatbotOpen} 
        onClose={() => setIsEmergencyChatbotOpen(false)} 
      />
    </header>
  );
}


