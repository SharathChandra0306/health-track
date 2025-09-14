import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Card } from '../components/ui';
import { useTracker } from '../hooks/useTracker';

export default function HospitalDetails() {
  const { id } = useParams();
  const { getHospitalById } = useTracker();
  const [hospital, setHospital] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getHospitalById(id);
      setHospital(res);
    })();
  }, [id, getHospitalById]);

  if (!hospital) return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">Loading...</div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <h1 className="text-2xl font-semibold text-gray-900">{hospital.name}</h1>
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="h-48 md:col-span-2" />
        <Card className="h-48" />
      </div>
      <Card className="p-4">
        <div className="font-medium">Bed Availability</div>
        <div className="mt-3 grid sm:grid-cols-3 gap-3 text-sm">
          {hospital.beds.map(b => (
            <div key={b.type} className="flex items-center justify-between rounded-md border p-3">
              <span className="text-gray-700">{b.type}</span>
              <span className="font-semibold">{b.available}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}


