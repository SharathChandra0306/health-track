import { useForm } from 'react-hook-form';
import { Button, Card, Input } from '../components/ui';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    // Mock login - in real app, this would connect to backend
    const userData = {
      name: values.email.split('@')[0],
      email: values.email,
      id: Math.random().toString(36).substr(2, 9)
    };
    
    login(userData);
    navigate('/search');
  };

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Card className="p-6">
        <h1 className="text-xl font-semibold text-gray-900">Welcome Back</h1>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Input label="Email" type="email" placeholder="Enter your email"
            error={errors.email?.message}
            {...register('email', { required: 'Email is required' })}
          />
          <Input label="Password" type="password" placeholder="Enter your password"
            error={errors.password?.message}
            {...register('password', { required: 'Password is required' })}
          />
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        <div className="mt-4 text-sm text-gray-600">
          Don't have an account? <Link to="/signup" className="text-primary">Sign Up</Link>
        </div>
      </Card>
    </div>
  );
}


