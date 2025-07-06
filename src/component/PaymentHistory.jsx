import React, { useState } from 'react';
import { FaHistory, FaDownload, FaEye, FaFilter, FaCalendarAlt } from 'react-icons/fa';

const PaymentHistory = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPeriod, setFilterPeriod] = useState('all');

  const [paymentHistory] = useState([
    {
      id: 'TXN001',
      date: '2024-06-28',
      landTitle: 'Green Valley Farm',
      amount: 25000,
      status: 'Completed',
      method: 'Credit Card',
      stripeId: 'pi_1234567890',
      tenant: 'Sneha Patil'
    },
    {
      id: 'TXN002',
      date: '2024-06-25',
      landTitle: 'Commercial Plot Highway',
      amount: 50000,
      status: 'Completed',
      method: 'Bank Transfer',
      stripeId: 'pi_0987654321',
      tenant: 'Rajesh Kumar'
    },
    {
      id: 'TXN003',
      date: '2024-06-20',
      landTitle: 'Residential Development',
      amount: 35000,
      status: 'Failed',
      method: 'Credit Card',
      stripeId: 'pi_1122334455',
      tenant: 'Priya Sharma'
    },
    {
      id: 'TXN004',
      date: '2024-06-15',
      landTitle: 'Agricultural Land Pune',
      amount: 20000,
      status: 'Pending',
      method: 'UPI',
      stripeId: 'pi_5566778899',
      tenant: 'Amit Desai'
    }
  ]);

  const filteredHistory = paymentHistory.filter(payment => {
    const matchesStatus = filterStatus === 'all' || payment.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesPeriod = filterPeriod === 'all' || 
      (filterPeriod === 'week' && new Date(payment.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) ||
      (filterPeriod === 'month' && new Date(payment.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));
    return matchesStatus && matchesPeriod;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-600';
      case 'Pending': return 'bg-yellow-100 text-yellow-600';
      case 'Failed': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const downloadReceipt = (payment) => {
    // Mock receipt download
    alert(`Downloading receipt for transaction ${payment.id}`);
  };

  const viewDetails = (payment) => {
    alert(`Transaction Details:\nID: ${payment.id}\nAmount: ₹${payment.amount}\nStatus: ${payment.status}\nStripe ID: ${payment.stripeId}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FaHistory className="text-blue-600" />
          Payment History
        </h2>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <FaDownload /> Export All
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2">
          <FaFilter className="text-gray-500" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>
        
        <div className="flex items-center gap-2">
          <FaCalendarAlt className="text-gray-500" />
          <select
            value={filterPeriod}
            onChange={(e) => setFilterPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Time</option>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
          </select>
        </div>
      </div>

      {/* Payment History Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Transaction</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Land & Tenant</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Method</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredHistory.map((payment) => (
              <tr key={payment.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div>
                    <p className="font-semibold text-gray-800">{payment.id}</p>
                    <p className="text-sm text-gray-600">{payment.date}</p>
                    <p className="text-xs text-gray-500">{payment.stripeId}</p>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div>
                    <p className="font-medium text-gray-800">{payment.landTitle}</p>
                    <p className="text-sm text-gray-600">{payment.tenant}</p>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <p className="font-semibold text-green-600">₹{payment.amount.toLocaleString()}</p>
                </td>
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(payment.status)}`}>
                    {payment.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <p className="text-gray-600">{payment.method}</p>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => viewDetails(payment)}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                    >
                      <FaEye />
                    </button>
                    {payment.status === 'Completed' && (
                      <button
                        onClick={() => downloadReceipt(payment)}
                        className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                      >
                        <FaDownload />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredHistory.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No payment history found for the selected filters.</p>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;