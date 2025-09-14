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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <Card className="p-6">
          <h1 className="text-xl font-semibold text-gray-900">Contact Us</h1>
          <form className="mt-6 grid gap-4" onSubmit={handleSubmit(onSubmit)}>
            <Input label="Name" placeholder="Your name" error={errors.name?.message} {...register('name', { required: 'Required' })} />
            <Input label="Email Address" type="email" placeholder="Your email" error={errors.email?.message} {...register('email', { required: 'Required' })} />
            <Input label="Subject" placeholder="General inquiry" {...register('subject')} />
            <label className="block">
              <span className="block text-sm font-medium text-gray-700 mb-1">Message</span>
              <textarea className="w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary px-3 py-2 text-sm" rows="4" {...register('message')} />
            </label>
            <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit'}</Button>
          </form>
        </Card>
      </div>
      <div className="space-y-4">
        <Card className="p-4">support@healthtrack.com</Card>
        <Card className="p-4">+1 555 123 4567</Card>
      </div>
    </div>
  );
}


