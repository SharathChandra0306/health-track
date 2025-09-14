import { Card } from '../components/ui';

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="prose max-w-none">
        <h1>About HealthTrack</h1>
        <p>
          HealthTrack is a real-time hospital bed and facility availability tracker designed to help patients and healthcare providers quickly find care.
        </p>
      </div>

      <h2 className="text-xl font-semibold mt-8">Key Features</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
        {[1,2,3,4].map((i) => (
          <Card key={i} className="p-5">
            <div className="font-medium text-gray-900">Feature {i}</div>
            <p className="mt-2 text-sm text-gray-600">Description placeholder.</p>
          </Card>
        ))}
      </div>
    </div>
  );
}


