import { useForm } from 'react-hook-form';
import { Button, Card, Input } from '../components/ui';

export default function Contact() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async () => {
    // TODO: Replace with backend POST /api/contact
    await new Promise((r) => setTimeout(r, 600));
    alert('Submitted (mock)');
  };

  return (
    <div className="w-full px-0 min-h-screen bg-gray-50">
      <section className="max-w-4xl mx-auto py-16 px-4">
        <div className="flex items-center gap-3 mb-8">
          <img src={require('../images/logo.svg').default} alt="HealthTrack Logo" className="w-10 h-10" />
          <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Get in Touch</h2>
          <form className="flex flex-col gap-4">
            <input type="text" placeholder="Your Name" className="border rounded-lg px-4 py-2" required />
            <input type="email" placeholder="Your Email" className="border rounded-lg px-4 py-2" required />
            <textarea placeholder="Your Message" className="border rounded-lg px-4 py-2" rows={4} required />
            <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition">Send Message</button>
          </form>
        </div>
      </section>
    </div>
  );
}


