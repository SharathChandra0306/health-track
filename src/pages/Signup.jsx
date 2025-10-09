import { useForm } from 'react-hook-form';
import { Button, Card, Input } from '../components/ui';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();
  const { signup } = useAuth();
  const navigate = useNavigate();
  const password = watch('password');

  const onSubmit = async (values) => {
    // TODO: Connect this form to backend endpoint POST /api/signup
    const ok = await signup(values.email, values.password, values.name);
    if (ok) navigate('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Card className="p-6">
        <h1 className="text-xl font-semibold text-gray-900">Sign up for HealthTrack</h1>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Input label="Full Name" placeholder="Enter your full name"
            error={errors.name?.message}
            {...register('name', { required: 'Name is required' })}
          />
          <Input label="Email Address" type="email" placeholder="Enter your email"
            error={errors.email?.message}
            {...register('email', { required: 'Email is required' })}
          />
          <Input label="Password" type="password" placeholder="Enter your password"
            error={errors.password?.message}
            {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Min 6 characters' } })}
          />
          <Input label="Confirm Password" type="password" placeholder="Confirm your password"
            error={errors.confirm?.message}
            {...register('confirm', { validate: (v) => v === password || 'Passwords do not match' })}
          />
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Creating account...' : 'Sign Up'}
          </Button>
        </form>
        <div className="mt-4 text-sm text-gray-600">
          Already have an account? <Link to="/login" className="text-primary">Login</Link>
        </div>
      </Card>
    </div>
  );
}


