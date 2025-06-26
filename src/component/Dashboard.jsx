import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const stats = [
    { label: 'Total Lands Listed', value: 12 },
    { label: 'Pending Approvals', value: 3 },
    { label: 'Total Lease Income', value: '₹85,000' },
    { label: 'Registered Users', value: 24 },
  ];

  const recentLands = [
    {
      id: 1,
      image: 'https://source.unsplash.com/400x300/?farm,field',
      landTitle: 'Green Field Plot',
      location: 'Pune',
      size: '5 Acres',
      mapLink: 'https://www.google.com/maps/place/20%C2%B00741.8%22N+75%C2%B04415.6%22E/@20.128268,75.7350971,818m/data=!3m2!1e3!4b1!4m4!3m3!8m2!3d20.128268!4d75.737672?authuser=0&entry=ttu&g_ep=EgoyMDI1MDYyMi.4wIKXMDSoASAFQAw%3D%3D',
      holder: {
        name: 'Ramesh Pawar',
        contact: 'ramesh@example.com'
      },
      use: 'Agricultural'
    },
    {
      id: 2,
      image: 'https://source.unsplash.com/400x300/?landscape,property',
      landTitle: 'Commercial Land Near Highway',
      location: 'Nashik',
      size: '3 Acres',
      mapLink: 'https://www.google.com/maps?q=Nashik',
      holder: {
        name: 'Sneha Patil',
        contact: 'sneha@example.com'
      },
      use: 'Commercial'
    },
  ];

  return (
    <div className="p-6 bg-green-200">
      <h1 className="text-2xl font-bold mb-6">Land Lease Dashboard</h1>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded shadow hover:shadow-lg transition-all"
          >
            <p className="text-sm text-gray-500">{item.label}</p>
            <p className="text-xl font-semibold text-green-700">{item.value}</p>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-5 rounded shadow">
          <h2 className="text-lg font-bold mb-3">Recent Lease Activity</h2>
          <ul className="space-y-2 text-sm">
            <li>✅ Lease approved for 10-acre land in Pune</li>
            <li>🕒 Pending approval for 5-acre land in Nashik</li>
            <li>💰 Payment received from Sneha Patil (₹12,000)</li>
          </ul>
        </div>

        <div className="bg-white p-5 rounded shadow">
          <h2 className="text-lg font-bold mb-3">Notifications</h2>
          <ul className="space-y-2 text-sm">
            <li>📬 2 new lease requests waiting</li>
            <li>🚧 1 land listing requires update</li>
            <li>🛠️ Scheduled maintenance on July 10</li>
          </ul>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4 text-green-700">Recently Added Lands</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentLands.map((land) => (
            <div key={land.id} className="bg-white rounded shadow overflow-hidden">
              <img src={land.image} alt="Land" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-bold text-green-700">{land.landTitle}</h3>
                <p className="text-sm">📍 {land.location} • {land.size} • {land.use}</p>
                <p className="text-sm mt-2 font-medium">👤 Holder: {land.holder.name}</p>
                <p className="text-sm text-gray-500">✉️ {land.holder.contact}</p>
                <a href={land.mapLink} target="_blank" rel="noopener noreferrer" className="block mt-3 text-blue-500 hover:underline text-sm">
                  📍 View on Google Maps
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
