import React, { useState } from 'react';
import { FaMapMarkerAlt, FaUserTie, FaRupeeSign, FaLeaf, FaClock, FaTools, FaSearch, FaCreditCard } from 'react-icons/fa';
import PaymentModal from './PaymentModal';

const mockLandData = [
  {
    id: 1,
    title: 'Green Valley Farm',
    location: 'Pune',
    area: 'Hadapsar',
    size: '5 Acres',
    usage: 'Agricultural',
    price: '₹25,000/month',
    priceAmount: 25000,
    leaseLength: '12 Months',
    paymentSchedule: 'Monthly',
    improvements: 'Fencing and irrigation setup included.',
    holderName: 'Ramesh Pawar',
    contact: 'ramesh@example.com',
    mapLink: 'https://www.google.com/maps?q=Hadapsar+Pune',
    image: 'https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 2,
    title: 'Commercial Plot Highway Side',
    location: 'Mumbai',
    area: 'Andheri',
    size: '3 Acres',
    usage: 'Commercial',
    price: '₹50,000/month',
    priceAmount: 50000,
    leaseLength: '24 Months',
    paymentSchedule: 'Quarterly',
    improvements: 'Road access and electricity connection available.',
    holderName: 'Sneha Patil',
    contact: 'sneha@example.com',
    mapLink: 'https://www.google.com/maps?q=Andheri+Mumbai',
    image: 'https://images.pexels.com/photos/1595108/pexels-photo-1595108.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 3,
    title: 'Residential Development Land',
    location: 'Nashik',
    area: 'Panchavati',
    size: '2 Acres',
    usage: 'Residential',
    price: '₹35,000/month',
    priceAmount: 35000,
    leaseLength: '18 Months',
    paymentSchedule: 'Monthly',
    improvements: 'Boundary wall and water connection ready.',
    holderName: 'Rajesh Kumar',
    contact: 'rajesh@example.com',
    mapLink: 'https://www.google.com/maps?q=Panchavati+Nashik',
    image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
  }
];

const LandDetail = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [filteredLands, setFilteredLands] = useState(mockLandData);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedLand, setSelectedLand] = useState(null);

  const handleSearch = () => {
    setSearchPerformed(true);
    if (searchLocation.trim() === '') {
      setFilteredLands(mockLandData);
    } else {
      const filtered = mockLandData.filter(land => 
        land.location.toLowerCase().includes(searchLocation.toLowerCase()) ||
        land.area.toLowerCase().includes(searchLocation.toLowerCase())
      );
      setFilteredLands(filtered);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handlePayNow = (land) => {
    setSelectedLand({
      amount: land.priceAmount,
      landTitle: land.title,
      landId: land.id
    });
    setShowPaymentModal(true);
  };

  return (
    <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-green-50 to-green-100">
      <div className="max-w-4xl mx-auto mb-10">
        <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">Browse Available Land</h1>
        <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-lg">
          <input
            type="text"
            placeholder="Search by location (e.g., Pune, Mumbai, Nashik)"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
          />
          <button
            onClick={handleSearch}
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-300 font-semibold"
          >
            <FaSearch /> Search
          </button>
        </div>
      </div>

      {searchPerformed && filteredLands.length === 0 ? (
        <div className="text-center bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No land found</h3>
          <p className="text-gray-500">Try searching with a different location like "Pune", "Mumbai", or "Nashik"</p>
        </div>
      ) : (
        <div className="grid gap-8 max-w-7xl mx-auto">
          {filteredLands.map((land) => (
            <div key={land.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative overflow-hidden">
                  <img 
                    src={land.image} 
                    alt={land.title} 
                    className="w-full h-80 md:h-full object-cover hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {land.usage}
                  </div>
                </div>

                <div className="p-8 flex flex-col justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-green-700 mb-3">{land.title}</h2>
                    <p className="text-gray-600 mb-6 flex items-center text-lg">
                      <FaMapMarkerAlt className="mr-2 text-green-600" /> 
                      {land.location}, {land.area}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div className="bg-green-50 p-4 rounded-lg flex items-center">
                        <FaLeaf className="text-green-600 mr-3 text-xl" />
                        <div>
                          <p className="text-sm text-gray-600">Usage</p>
                          <p className="font-semibold text-gray-800">{land.usage}</p>
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 p-4 rounded-lg flex items-center">
                        <span className="text-blue-600 mr-3 text-xl">📐</span>
                        <div>
                          <p className="text-sm text-gray-600">Size</p>
                          <p className="font-semibold text-gray-800">{land.size}</p>
                        </div>
                      </div>
                      
                      <div className="bg-yellow-50 p-4 rounded-lg flex items-center">
                        <FaRupeeSign className="text-yellow-600 mr-3 text-xl" />
                        <div>
                          <p className="text-sm text-gray-600">Price</p>
                          <p className="font-semibold text-gray-800">{land.price}</p>
                        </div>
                      </div>
                      
                      <div className="bg-purple-50 p-4 rounded-lg flex items-center">
                        <FaClock className="text-purple-600 mr-3 text-xl" />
                        <div>
                          <p className="text-sm text-gray-600">Lease Term</p>
                          <p className="font-semibold text-gray-800">{land.leaseLength}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <div className="flex items-center mb-2">
                        <FaUserTie className="text-gray-600 mr-2" />
                        <span className="font-semibold text-gray-800">Owner: {land.holderName}</span>
                      </div>
                      <p className="text-gray-600 text-sm">📧 {land.contact}</p>
                      <p className="text-gray-600 text-sm">💳 Payment: {land.paymentSchedule}</p>
                    </div>

                    {land.improvements && (
                      <div className="bg-green-50 p-4 rounded-lg mb-4">
                        <p className="text-gray-800 flex items-start">
                          <FaTools className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                          <span>
                            <strong>Improvements:</strong> {land.improvements}
                          </span>
                        </p>
                      </div>
                    )}

                    {land.mapLink && (
                      <a
                        href={land.mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 hover:underline font-medium"
                      >
                        🌍 View on Google Maps
                      </a>
                    )}
                  </div>

                  <div className="mt-6 flex gap-3">
                    <button 
                      onClick={() => handlePayNow(land)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <FaCreditCard />
                      Pay Now - {land.price}
                    </button>
                    <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-full transition-all duration-300">
                      💬 Contact Owner
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        paymentData={selectedLand}
      />
    </div>
  );
};

export default LandDetail;