import React, { useState } from 'react';
import { FaRupeeSign, FaCalendarAlt, FaDownload, FaEye, FaCheck, FaClock, FaExclamationTriangle } from 'react-icons/fa';

const PaymentTracking = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('current');
  const [filterStatus, setFilterStatus] = useState('all');

  const [payments, setPayments] = useState([
    {
      id: 1,
      landTitle: 'Green Valley Farm',
      tenant: 'Sneha Patil',
      amount: 25000,
      dueDate: '2024-06-30',
      paidDate: '2024-06-28',
      status: 'Paid',
      method: 'Bank Transfer',
      transactionId: 'TXN123456789',
      lateFee: 0
    },
    {
      id: 2,
      landTitle: 'Commercial Plot Highway',
      tenant: 'Rajesh Kumar',
      amount: 50000,
      dueDate: '2024-07-01',
      paidDate: null,
      status: 'Pending',
      method: null,
      transactionId: null,
      lateFee: 0
    },
    {
      id: 3,
      landTitle: 'Residential Development',
      tenant: 'Priya Sharma',
      amount: 35000,
      dueDate: '2024-06-25',
      paidDate: null,
      status: 'Overdue',
      method: null,
      transactionId: null,
      lateFee: 1750
    },
    {
      id: 4,
      landTitle: 'Agricultural Land Pune',
      tenant: 'Amit Desai',
      amount: 20000,
      dueDate: '2024-07-05',
      paidDate: '2024-07-03',
      status: 'Paid',
      method: 'UPI',
      transactionId: 'UPI987654321',
      lateFee: 0
    },
    {
      id: 5,
      landTitle: 'Parking Space Mumbai',
      tenant: 'Kavita Singh',
      amount: 8000,
      dueDate: '2024-07-10',
      paidDate: null,
      status: 'Pending',
      method: null,
      transactionId: null,
      lateFee: 0
    }
  ]);

  const filteredPayments = payments.filter(payment => {
    const matchesStatus = filterStatus === 'all' || payment.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesStatus;
  });

  const getPaymentStats = () => {
    const total = payments.reduce((sum, p) => sum + p.amount, 0);
    const paid = payments.filter(p => p.status === 'Paid').reduce((sum, p) => sum + p.amount, 0);
    const pending = payments.filter(p => p.status === 'Pending').reduce((sum, p) => sum + p.amount, 0);
    const overdue = payments.filter(p => p.status === 'Overdue').reduce((sum, p) => sum + p.amount + p.lateFee, 0);
    const lateFees = payments.reduce((sum, p) => sum + p.lateFee, 0);

    return { total, paid, pending, overdue, lateFees };
  };

  const stats = getPaymentStats();

  const markAsPaid = (paymentId) => {
    setPayments(payments.map(payment => 
      payment.id === paymentId 
        ? { 
            ...payment, 
            status: 'Paid', 
            paidDate: new Date().toISOString().split('T')[0],
            method: 'Manual Entry',
            transactionId: `MAN${Date.now()}`
          }
        : payment
    ));
    alert('Payment marked as paid successfully!');
  };

  const sendReminder = (paymentId) => {
    const payment = payments.find(p => p.id === paymentId);
    alert(`Reminder sent to ${payment.tenant} for ${payment.landTitle}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-600';
      case 'Pending': return 'bg-yellow-100 text-yellow-600';
      case 'Overdue': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Paid': return <FaCheck className="text-green-600" />;
      case 'Pending': return <FaClock className="text-yellow-600" />;
      case 'Overdue': return <FaExclamationTriangle className="text-red-600" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-green-800 mb-2">Payment Tracking</h1>
          <p className="text-gray-600">Monitor and manage all lease payments</p>
        </div>

        {/* Payment Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border text-center">
            <FaRupeeSign className="text-3xl text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-blue-600">₹{stats.total.toLocaleString()}</p>
            <p className="text-sm text-gray-600">Total Expected</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border text-center">
            <FaCheck className="text-3xl text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-600">₹{stats.paid.toLocaleString()}</p>
            <p className="text-sm text-gray-600">Collected</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border text-center">
            <FaClock className="text-3xl text-yellow-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-yellow-600">₹{stats.pending.toLocaleString()}</p>
            <p className="text-sm text-gray-600">Pending</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border text-center">
            <FaExclamationTriangle className="text-3xl text-red-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-red-600">₹{stats.overdue.toLocaleString()}</p>
            <p className="text-sm text-gray-600">Overdue</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border text-center">
            <FaRupeeSign className="text-3xl text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-purple-600">₹{stats.lateFees.toLocaleString()}</p>
            <p className="text-sm text-gray-600">Late Fees</p>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white p-6 rounded-xl shadow-sm border mb-8">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-gray-500" />
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  <option value="current">Current Month</option>
                  <option value="last">Last Month</option>
                  <option value="quarter">This Quarter</option>
                  <option value="year">This Year</option>
                </select>
              </div>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                <option value="all">All Payments</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>

            <div className="flex gap-2">
              <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                <FaDownload /> Export
              </button>
              <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <FaRupeeSign /> Generate Invoice
              </button>
            </div>
          </div>
        </div>

        {/* Payments Table */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Land & Tenant</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Amount</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Due Date</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Payment Details</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-semibold text-gray-800">{payment.landTitle}</p>
                        <p className="text-sm text-gray-600">{payment.tenant}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-semibold text-gray-800">₹{payment.amount.toLocaleString()}</p>
                        {payment.lateFee > 0 && (
                          <p className="text-sm text-red-600">+₹{payment.lateFee} late fee</p>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-gray-800">{payment.dueDate}</p>
                      {payment.status === 'Overdue' && (
                        <p className="text-sm text-red-600">
                          {Math.ceil((new Date() - new Date(payment.dueDate)) / (1000 * 60 * 60 * 24))} days overdue
                        </p>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(payment.status)}
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(payment.status)}`}>
                          {payment.status}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {payment.status === 'Paid' ? (
                        <div className="text-sm">
                          <p className="text-gray-800">Paid: {payment.paidDate}</p>
                          <p className="text-gray-600">{payment.method}</p>
                          <p className="text-gray-500 text-xs">{payment.transactionId}</p>
                        </div>
                      ) : (
                        <p className="text-gray-500 text-sm">Not paid yet</p>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                          <FaEye />
                        </button>
                        {payment.status !== 'Paid' && (
                          <>
                            <button 
                              onClick={() => markAsPaid(payment.id)}
                              className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                            >
                              <FaCheck />
                            </button>
                            <button 
                              onClick={() => sendReminder(payment.id)}
                              className="p-2 text-yellow-600 hover:bg-yellow-100 rounded-lg transition-colors"
                            >
                              <FaClock />
                            </button>
                          </>
                        )}
                        <button className="p-2 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors">
                          <FaDownload />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Collection Rate</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Collection Rate</span>
                <span className="font-semibold text-green-600">
                  {((stats.paid / stats.total) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-green-600 h-3 rounded-full" 
                  style={{ width: `${(stats.paid / stats.total) * 100}%` }}
                ></div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center text-sm">
                <div>
                  <p className="text-green-600 font-semibold">₹{stats.paid.toLocaleString()}</p>
                  <p className="text-gray-500">Collected</p>
                </div>
                <div>
                  <p className="text-yellow-600 font-semibold">₹{stats.pending.toLocaleString()}</p>
                  <p className="text-gray-500">Pending</p>
                </div>
                <div>
                  <p className="text-red-600 font-semibold">₹{stats.overdue.toLocaleString()}</p>
                  <p className="text-gray-500">Overdue</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
                <FaRupeeSign className="text-green-600" />
                <span className="text-green-700 font-medium">Send Payment Reminders</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
                <FaDownload className="text-blue-600" />
                <span className="text-blue-700 font-medium">Generate Monthly Report</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors">
                <FaCalendarAlt className="text-purple-600" />
                <span className="text-purple-700 font-medium">Schedule Auto-Reminders</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentTracking;