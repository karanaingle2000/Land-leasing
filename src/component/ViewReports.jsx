import React, { useState } from 'react';
import { FaChartBar, FaDownload, FaCalendarAlt, FaFilter, FaRupeeSign, FaMapMarkerAlt, FaUsers, FaClock } from 'react-icons/fa';

const ViewReports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedReport, setSelectedReport] = useState('income');

  // Mock data for reports
  const incomeData = [
    { month: 'Jan 2024', income: 85000, lands: 12, newLeases: 3 },
    { month: 'Feb 2024', income: 92000, lands: 13, newLeases: 2 },
    { month: 'Mar 2024', income: 78000, lands: 11, newLeases: 1 },
    { month: 'Apr 2024', income: 105000, lands: 15, newLeases: 4 },
    { month: 'May 2024', income: 98000, lands: 14, newLeases: 2 },
    { month: 'Jun 2024', income: 112000, lands: 16, newLeases: 3 },
  ];

  const landUsageData = [
    { type: 'Agricultural', count: 8, percentage: 50, income: 45000 },
    { type: 'Commercial', count: 5, percentage: 31.25, income: 52000 },
    { type: 'Residential', count: 2, percentage: 12.5, income: 28000 },
    { type: 'Parking', count: 1, percentage: 6.25, income: 8000 },
  ];

  const locationData = [
    { city: 'Pune', lands: 6, income: 48000, avgPrice: 8000 },
    { city: 'Mumbai', lands: 4, income: 65000, avgPrice: 16250 },
    { city: 'Nashik', lands: 3, income: 32000, avgPrice: 10667 },
    { city: 'Aurangabad', lands: 2, income: 22000, avgPrice: 11000 },
    { city: 'Kolhapur', lands: 1, income: 15000, avgPrice: 15000 },
  ];

  const paymentData = [
    { status: 'Paid', count: 14, amount: 125000, percentage: 87.5 },
    { status: 'Pending', count: 2, amount: 18000, percentage: 12.5 },
    { status: 'Overdue', count: 0, amount: 0, percentage: 0 },
  ];

  const handleDownloadReport = (reportType) => {
    // Mock download functionality
    alert(`Downloading ${reportType} report...`);
  };

  const renderIncomeReport = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FaRupeeSign className="text-green-600" />
          Income Trends
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <p className="text-2xl font-bold text-green-600">₹5,70,000</p>
            <p className="text-sm text-gray-600">Total Income (6 months)</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <p className="text-2xl font-bold text-blue-600">₹95,000</p>
            <p className="text-sm text-gray-600">Average Monthly</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <p className="text-2xl font-bold text-purple-600">+18%</p>
            <p className="text-sm text-gray-600">Growth Rate</p>
          </div>
        </div>
        <div className="space-y-3">
          {incomeData.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">{item.month}</span>
              <div className="flex items-center gap-4">
                <span className="text-green-600 font-bold">₹{item.income.toLocaleString()}</span>
                <span className="text-sm text-gray-500">{item.lands} lands</span>
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                  +{item.newLeases} new
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderLandUsageReport = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FaMapMarkerAlt className="text-green-600" />
          Land Usage Distribution
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {landUsageData.map((item, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-700">{item.type}</span>
                  <span className="text-sm text-gray-500">{item.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full" 
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{item.count} lands</span>
                  <span>₹{item.income.toLocaleString()}/month</span>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-700 mb-3">Usage Summary</h4>
            <div className="space-y-2 text-sm">
              <p>• Agricultural lands generate the highest volume</p>
              <p>• Commercial lands have the highest per-unit income</p>
              <p>• Residential development shows growth potential</p>
              <p>• Parking spaces offer steady, low-maintenance income</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLocationReport = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FaMapMarkerAlt className="text-green-600" />
          Location-wise Performance
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">City</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Lands</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Monthly Income</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Avg Price</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Performance</th>
              </tr>
            </thead>
            <tbody>
              {locationData.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-800">{item.city}</td>
                  <td className="py-3 px-4 text-gray-600">{item.lands}</td>
                  <td className="py-3 px-4 text-green-600 font-semibold">₹{item.income.toLocaleString()}</td>
                  <td className="py-3 px-4 text-gray-600">₹{item.avgPrice.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      item.income > 50000 ? 'bg-green-100 text-green-600' :
                      item.income > 30000 ? 'bg-yellow-100 text-yellow-600' :
                      'bg-red-100 text-red-600'
                    }`}>
                      {item.income > 50000 ? 'Excellent' : item.income > 30000 ? 'Good' : 'Average'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderPaymentReport = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FaClock className="text-green-600" />
          Payment Status Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {paymentData.map((item, index) => (
            <div key={index} className={`p-4 rounded-lg ${
              item.status === 'Paid' ? 'bg-green-50 border-green-200' :
              item.status === 'Pending' ? 'bg-yellow-50 border-yellow-200' :
              'bg-red-50 border-red-200'
            } border`}>
              <div className="text-center">
                <p className={`text-2xl font-bold ${
                  item.status === 'Paid' ? 'text-green-600' :
                  item.status === 'Pending' ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {item.count}
                </p>
                <p className="text-sm text-gray-600 mb-2">{item.status} Payments</p>
                <p className="text-lg font-semibold text-gray-800">₹{item.amount.toLocaleString()}</p>
                <p className="text-xs text-gray-500">{item.percentage}% of total</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-700 mb-2">Payment Insights</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 87.5% payment collection rate - Excellent performance</li>
            <li>• 2 pending payments worth ₹18,000 - Follow up required</li>
            <li>• No overdue payments - Good tenant relationships</li>
            <li>• Average payment time: 3 days from due date</li>
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-blue-800 mb-2">Reports & Analytics</h1>
          <p className="text-gray-600">Comprehensive insights into your land lease business</p>
        </div>

        {/* Report Controls */}
        <div className="bg-white p-6 rounded-xl shadow-sm border mb-8">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <FaFilter className="text-gray-500" />
                <select 
                  value={selectedReport} 
                  onChange={(e) => setSelectedReport(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="income">Income Report</option>
                  <option value="usage">Land Usage Report</option>
                  <option value="location">Location Report</option>
                  <option value="payment">Payment Report</option>
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-gray-500" />
                <select 
                  value={selectedPeriod} 
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => handleDownloadReport('PDF')}
                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                <FaDownload /> PDF
              </button>
              <button 
                onClick={() => handleDownloadReport('Excel')}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <FaDownload /> Excel
              </button>
            </div>
          </div>
        </div>

        {/* Report Content */}
        <div className="space-y-8">
          {selectedReport === 'income' && renderIncomeReport()}
          {selectedReport === 'usage' && renderLandUsageReport()}
          {selectedReport === 'location' && renderLocationReport()}
          {selectedReport === 'payment' && renderPaymentReport()}
        </div>

        {/* Quick Stats Summary */}
        <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FaChartBar className="text-blue-600" />
            Quick Summary
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">16</p>
              <p className="text-sm text-gray-600">Total Active Lands</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">₹1,12,000</p>
              <p className="text-sm text-gray-600">Monthly Revenue</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <p className="text-2xl font-bold text-yellow-600">94%</p>
              <p className="text-sm text-gray-600">Occupancy Rate</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">5</p>
              <p className="text-sm text-gray-600">Cities Covered</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewReports;