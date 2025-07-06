import React from 'react';
import { Link } from 'react-router-dom';
import { FaChartLine, FaClock, FaRupeeSign, FaUsers, FaEye, FaMapMarkerAlt, FaPlus, FaSearch, FaFileAlt, FaCog } from 'react-icons/fa';

const Dashboard = () => {
  const stats = [
    { 
      label: 'Total Lands Listed', 
      value: 16, 
      icon: <FaMapMarkerAlt className="text-green-600" />,
      color: 'bg-green-50 border-green-200',
      change: '+2 this month'
    },
    { 
      label: 'Pending Payments', 
      value: 3, 
      icon: <FaClock className="text-yellow-600" />,
      color: 'bg-yellow-50 border-yellow-200',
      change: '2 overdue'
    },
    { 
      label: 'Monthly Revenue', 
      value: '₹1,12,000', 
      icon: <FaRupeeSign className="text-blue-600" />,
      color: 'bg-blue-50 border-blue-200',
      change: '+18% from last month'
    },
    { 
      label: 'Active Users', 
      value: 28, 
      icon: <FaUsers className="text-purple-600" />,
      color: 'bg-purple-50 border-purple-200',
      change: '4 new this week'
    },
  ];

  const recentLands = [
    {
      id: 1,
      image: 'https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?auto=compress&cs=tinysrgb&w=400',
      landTitle: 'Green Field Plot',
      location: 'Pune',
      area: 'Hadapsar',
      size: '5 Acres',
      price: '₹25,000/month',
      mapLink: 'https://www.google.com/maps/place/Hadapsar,+Pune',
      holder: {
        name: 'Ramesh Pawar',
        contact: 'ramesh@example.com'
      },
      use: 'Agricultural',
      status: 'Active'
    },
    {
      id: 2,
      image: 'https://images.pexels.com/photos/1595108/pexels-photo-1595108.jpeg?auto=compress&cs=tinysrgb&w=400',
      landTitle: 'Commercial Land Near Highway',
      location: 'Nashik',
      area: 'Panchavati',
      size: '3 Acres',
      price: '₹50,000/month',
      mapLink: 'https://www.google.com/maps?q=Nashik',
      holder: {
        name: 'Sneha Patil',
        contact: 'sneha@example.com'
      },
      use: 'Commercial',
      status: 'Pending'
    },
    {
      id: 3,
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400',
      landTitle: 'Residential Development Plot',
      location: 'Mumbai',
      area: 'Andheri',
      size: '2 Acres',
      price: '₹75,000/month',
      mapLink: 'https://www.google.com/maps?q=Andheri+Mumbai',
      holder: {
        name: 'Rajesh Kumar',
        contact: 'rajesh@example.com'
      },
      use: 'Residential',
      status: 'Active'
    },
  ];

  const recentActivity = [
    { icon: '✅', text: 'Payment received from Sneha Patil (₹50,000)', time: '2 hours ago', type: 'payment' },
    { icon: '🏞️', text: 'New land listing: Agricultural Plot in Kolhapur', time: '4 hours ago', type: 'listing' },
    { icon: '👤', text: 'New user registration: Amit Desai', time: '6 hours ago', type: 'user' },
    { icon: '📝', text: 'Lease agreement signed for Green Valley Farm', time: '1 day ago', type: 'contract' },
    { icon: '🔔', text: 'Payment reminder sent to 3 tenants', time: '2 days ago', type: 'reminder' },
  ];

  const upcomingTasks = [
    { task: 'Follow up on overdue payments', priority: 'high', due: 'Today' },
    { task: 'Review new land applications', priority: 'medium', due: 'Tomorrow' },
    { task: 'Generate monthly report', priority: 'low', due: 'This week' },
    { task: 'Update land pricing', priority: 'medium', due: 'Next week' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-green-800 mb-2">Land Lease Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your land lease business.</p>
        </div>

        {/* Stats Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((item, index) => (
            <div
              key={index}
              className={`${item.color} border p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="text-3xl">{item.icon}</div>
                <FaChartLine className="text-gray-400" />
              </div>
              <p className="text-sm text-gray-600 mb-1">{item.label}</p>
              <p className="text-2xl font-bold text-gray-800 mb-2">{item.value}</p>
              <p className="text-xs text-gray-500">{item.change}</p>
            </div>
          ))}
        </section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              <FaClock className="text-green-600" />
              Recent Activity
            </h2>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <span className="text-lg flex-shrink-0">{activity.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-800 break-words">{activity.text}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Upcoming Tasks</h2>
            <div className="space-y-3">
              {upcomingTasks.map((task, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-sm text-gray-800 flex-1">{task.task}</p>
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ml-2 ${
                      task.priority === 'high' ? 'bg-red-100 text-red-600' :
                      task.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">Due: {task.due}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Lands */}
        <section className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-green-700">Recently Added Lands</h2>
            <Link 
              to="/land-detail" 
              className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors"
            >
              <FaEye /> View All
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentLands.map((land) => (
              <div key={land.id} className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="relative">
                  <img src={land.image} alt={land.landTitle} className="w-full h-48 object-cover" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      {land.use}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      land.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {land.status}
                    </span>
                  </div>
                </div>
                
                <div className="p-5">
                  <h3 className="text-lg font-bold text-green-700 mb-2">{land.landTitle}</h3>
                  <p className="text-sm text-gray-600 mb-3 flex items-center">
                    <FaMapMarkerAlt className="mr-1 text-green-500" />
                    {land.location}, {land.area} • {land.size}
                  </p>
                  
                  <div className="bg-gray-50 p-3 rounded-lg mb-3">
                    <p className="text-sm font-medium text-gray-800 mb-1">👤 {land.holder.name}</p>
                    <p className="text-xs text-gray-600">✉️ {land.holder.contact}</p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-green-600">{land.price}</span>
                    <a 
                      href={land.mapLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-500 hover:text-blue-700 text-sm font-medium transition-colors"
                    >
                      📍 View Map
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link 
              to="/addland" 
              className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors group"
            >
              <FaPlus className="text-green-600 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-green-700">Add New Land</span>
            </Link>
            
            <Link 
              to="/land-detail" 
              className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors group"
            >
              <FaSearch className="text-blue-600 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-blue-700">Browse Lands</span>
            </Link>
            
            <Link 
              to="/reports" 
              className="flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg hover:bg-yellow-100 transition-colors group"
            >
              <FaFileAlt className="text-yellow-600 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-yellow-700">View Reports</span>
            </Link>
            
            <Link 
              to="/settings" 
              className="flex items-center gap-3 p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors group"
            >
              <FaCog className="text-purple-600 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-purple-700">Settings</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;