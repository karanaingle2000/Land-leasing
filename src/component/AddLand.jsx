import React, { useState } from 'react';
import { FaSeedling, FaMapMarkerAlt, FaUser, FaMoneyBillWave } from 'react-icons/fa';

const AddLand = () => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    area: '',
    size: '',
    usage: '',
    price: '',
    leaseLength: '',
    paymentSchedule: '',
    improvements: '',
    holderName: '',
    contact: '',
    mapLink: '',
    image: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to a backend API
    alert('Land listing added successfully!');
    
    // Reset form after submission
    setFormData({
      title: '',
      location: '',
      area: '',
      size: '',
      usage: '',
      price: '',
      leaseLength: '',
      paymentSchedule: '',
      improvements: '',
      holderName: '',
      contact: '',
      mapLink: '',
      image: '',
    });
  };

  return (
    <div className='max-w-5xl mx-auto mt-10 p-10 bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-2xl'>
      <h2 className='text-4xl font-extrabold text-green-700 mb-6 flex items-center gap-2'>
        <FaSeedling className='text-green-400'/> Add New Land Listing
      </h2>

      <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        <div className='space-y-4'>
          <div>
            <label className='block font-semibold mb-2 text-gray-700'>
              <FaMapMarkerAlt className='inline mr-2 text-green-600'/>
              Land Title
            </label>
            <input 
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all' 
              name='title' 
              value={formData.title}
              onChange={handleChange} 
              placeholder="Enter land title"
              required 
            />
          </div>

          <div>
            <label className='block font-semibold mb-2 text-gray-700'>Location</label>
            <input 
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all' 
              name='location' 
              value={formData.location}
              onChange={handleChange} 
              placeholder="Enter city/location"
              required 
            />
          </div>

          <div>
            <label className='block font-semibold mb-2 text-gray-700'>Area</label>
            <input 
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all' 
              name='area' 
              value={formData.area}
              onChange={handleChange} 
              placeholder="Enter specific area/district"
              required 
            />
          </div>

          <div>
            <label className='block font-semibold mb-2 text-gray-700'>Land Size</label>
            <input 
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all' 
              name='size' 
              value={formData.size}
              onChange={handleChange} 
              placeholder="e.g., 5 Acres, 2000 sq ft"
              required 
            />
          </div>

          <div>
            <label className='block font-semibold mb-2 text-gray-700'>Usage Type</label>
            <select 
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all' 
              onChange={handleChange} 
              name="usage" 
              value={formData.usage}
              required
            >
              <option value="">Select Usage</option>
              <option value="Agriculture">Agriculture</option>
              <option value="Commercial">Commercial</option>
              <option value="Residential">Residential</option>
              <option value="Parking">Parking</option>
            </select>
          </div>
        </div>

        <div className='space-y-4'>
          <div>
            <label className='block font-semibold mb-2 text-gray-700'>
              <FaMoneyBillWave className='inline mr-2 text-green-600'/>
              Rental Price
            </label>
            <input 
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all' 
              name='price' 
              value={formData.price}
              onChange={handleChange} 
              placeholder="e.g., ₹25,000/month"
              required 
            />
          </div>

          <div>
            <label className='block font-semibold mb-2 text-gray-700'>Lease Length</label>
            <input 
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all' 
              name='leaseLength' 
              value={formData.leaseLength}
              onChange={handleChange} 
              placeholder="e.g., 12 months, 2 years"
              required 
            />
          </div>

          <div>
            <label className='block font-semibold mb-2 text-gray-700'>Payment Schedule</label>
            <select 
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all' 
              onChange={handleChange} 
              name="paymentSchedule" 
              value={formData.paymentSchedule}
              required
            >
              <option value="">Select Payment Schedule</option>
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly (3 Monthly)</option>
              <option value="Semi-Annual">Semi-Annual (6 Monthly)</option>
              <option value="Yearly">Yearly</option>
            </select>
          </div>

          <div>
            <label className='block font-semibold mb-2 text-gray-700'>
              <FaUser className='inline mr-2 text-green-600'/>
              Landholder Full Name
            </label>
            <input 
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all' 
              name='holderName' 
              value={formData.holderName}
              onChange={handleChange} 
              placeholder="Enter full name"
              required 
            />
          </div>

          <div>
            <label className='block font-semibold mb-2 text-gray-700'>Contact</label>
            <input 
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all' 
              name='contact' 
              value={formData.contact}
              onChange={handleChange} 
              placeholder="Email or phone number"
              required 
            />
          </div>
        </div>

        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold mb-2 text-gray-700">Land Image URL</label>
            <input 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all" 
              name="image" 
              value={formData.image}
              onChange={handleChange} 
              placeholder="https://example.com/image.jpg"
              required 
            />
          </div>
          <div>
            <label className="block font-semibold mb-2 text-gray-700">Google Maps Link</label>
            <input 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all" 
              name="mapLink" 
              value={formData.mapLink}
              onChange={handleChange} 
              placeholder="Google Maps URL (optional)"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block font-semibold mb-2 text-gray-700">Development Plans or Improvements (optional)</label>
          <textarea 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all" 
            name="improvements" 
            rows="4" 
            value={formData.improvements}
            onChange={handleChange} 
            placeholder="Describe any improvements, facilities, or development plans..."
          />
        </div>

        <div className="md:col-span-2 flex justify-center mt-6">
          <button 
            type="submit" 
            className="bg-green-600 hover:bg-green-700 text-white px-12 py-4 text-lg font-semibold rounded-full shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            <FaSeedling /> Add Land Listing
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddLand;