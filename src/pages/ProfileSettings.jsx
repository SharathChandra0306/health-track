import { useForm } from 'react-hook-form';
import { Button, Card, Checkbox, Input, Select } from '../components/ui';
import { useUser } from '../hooks/useUser';

export default function ProfileSettings() {
  const { getUser, updateUser } = useUser();
  const user = getUser();
  const { register, handleSubmit } = useForm({ defaultValues: user });

  const onSubmit = async (values) => {
    // TODO: Replace mock with real PUT /api/user
    await updateUser(values);
    alert('Saved (mock)');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      <h1 className="text-2xl font-semibold">Profile Settings</h1>
      <Card className="p-6 space-y-6">
        <section>
          <h2 className="font-semibold text-gray-900">Personal Information</h2>
          <div className="mt-4 grid sm:grid-cols-2 gap-4">
            <Input label="Full Name" {...register('name')} />
            <Input label="Email Address" type="email" {...register('email')} />
            <Input label="Contact Number" {...register('phone')} />
          </div>
        </section>
        <section>
          <h2 className="font-semibold text-gray-900">Password Management</h2>
          <div className="mt-4 grid sm:grid-cols-2 gap-4">
            <Input label="Current Password" type="password" />
            <Input label="New Password" type="password" />
            <Input label="Confirm New Password" type="password" />
          </div>
        </section>
        <section>
          <h2 className="font-semibold text-gray-900">Notification Preferences</h2>
          <div className="mt-3 grid gap-2">
            <Checkbox label="Receive email notifications for bed availability updates" />
            <Checkbox label="Receive in-app notifications for alerts" />
            <Checkbox label="Subscribe to our newsletter for updates" />
          </div>
        </section>
        <section>
          <h2 className="font-semibold text-gray-900">Preferred Hospitals/Locations</h2>
          <div className="mt-3 grid gap-2">
            <Input placeholder="Add preferred hospitals/locations" />
          </div>
        </section>
        <div className="flex justify-end">
          <Button onClick={handleSubmit(onSubmit)}>Save Changes</Button>
        </div>
      </Card>
    </div>
  );
}


