import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaMapMarkerAlt, FaUserTie, FaRupeeSign, FaLeaf, FaClock, FaTools, FaSearch } from 'react-icons/fa';

const mockLandData = {
  id: 1,
  title: 'Green Valley Farm',
  location: 'Pune',
  area: 'Hadapsar',
  size: '5 Acres',
  usage: 'Agricultural',
  price: '₹25,000/month',
  leaseLength: '12 Months',
  paymentSchedule: 'Monthly',
  improvements: 'Fencing and irrigation setup included.',
  holderName: 'Ramesh Pawar',
  contact: 'ramesh@example.com',
  mapLink: 'https://www.google.com/maps?q=Hadapsar+Pune',
  image: 'https://source.unsplash.com/800x500/?farmland',
};

const LandDetail = () => {
  const { name } = useParams();
  const [searchLocation, setSearchLocation] = useState('');
  const [land, setLand] = useState(null);

  const handleSearch = () => {
    if (searchLocation === mockLandData.location) {
      setLand(mockLandData);
    } else {
      setLand(null);
    }
  };

  return (
    <div className="min-h-screen px-4 py-10 bg-green-100 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto mb-10">
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search land by Location"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="w-full px-4 py-2 border border-green-500 rounded-lg dark:bg-gray-800 dark:text-white"
          />
          <button
            onClick={handleSearch}
            className="flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
          >
            <FaSearch /> Search
          </button>
        </div>
      </div>

      {land ? (
        <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8">
            <img src={land.image} alt="Land" className="w-full h-full object-cover" />

            <div className="p-8 flex flex-col justify-between">
              <div>
                <h2 className="text-4xl font-bold text-green-700 mb-2">{land.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4 flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-green-600" /> {land.location}, {land.area}
                </p>

                <ul className="grid grid-cols-2 gap-4 text-sm">
                  <li className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md flex items-center">
                    <FaLeaf className="text-green-500 mr-2" /> <strong>Usage:</strong>&nbsp; {land.usage}
                  </li>
                  <li className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md flex items-center">
                    📐 <strong>Size:</strong>&nbsp; {land.size}
                  </li>
                  <li className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md flex items-center">
                    <FaRupeeSign className="text-green-500 mr-2" /> <strong>Price:</strong>&nbsp; {land.price}
                  </li>
                  <li className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md flex items-center">
                    <FaClock className="text-green-500 mr-2" /> <strong>Lease:</strong>&nbsp; {land.leaseLength}
                  </li>
                  <li className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md flex items-center">
                    💳 <strong>Payment:</strong>&nbsp; {land.paymentSchedule}
                  </li>
                  <li className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md flex items-center">
                    <FaUserTie className="text-green-500 mr-2" /> <strong>Owner:</strong>&nbsp; {land.holderName}
                  </li>
                </ul>

                <div className="mt-6 bg-green-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-800 dark:text-gray-300 flex items-start">
                    <FaTools className="text-green-500 mr-2 mt-1" />
                    <span>
                      <strong>Improvements:</strong> {land.improvements}
                    </span>
                  </p>
                </div>

                <a
                  href={land.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-4 text-blue-600 hover:underline"
                >
                  🌍 View on Google Maps
                </a>
              </div>

              <div className="mt-8">
                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-full transition-all duration-300">
                  📩 Request Lease Now
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-red-600 font-medium mt-10">No land found with that ID.</div>
      )}
    </div>
  );
};

export default LandDetail;
