import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NavigationBot from './components/NavigationBot';
import Home from './pages/Home';
import About from './pages/About';
import Search from './pages/Search';
import HospitalDetails from './pages/HospitalDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Contact from './pages/Contact';
import ProfileSettings from './pages/ProfileSettings';
import Dashboard from './pages/Dashboard';
import EMS from './pages/EMS';
import BookBed from './pages/BookBed';
import MedicalRecords from './pages/MedicalRecords';
import EmergencyContacts from './pages/EmergencyContacts';
import Product from './pages/Product';
import Features from './pages/Features';
import Support from './pages/Support';
import Privacy from './pages/Privacy';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/search" element={<Search />} />
              <Route path="/hospitals/:id" element={<HospitalDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/profile" element={<ProfileSettings />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/ems" element={<EMS />} />
              <Route path="/book-bed" element={<BookBed />} />
              <Route path="/medical-records" element={<MedicalRecords />} />
              <Route path="/emergency-contacts" element={<EmergencyContacts />} />
              <Route path="/product" element={<Product />} />
              <Route path="/features" element={<Features />} />
              <Route path="/support" element={<Support />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
          <NavigationBot />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
