import React, { useState } from 'react';
import { FaUsers, FaUserPlus, FaEdit, FaTrash, FaEye, FaSearch, FaFilter, FaBan, FaCheck } from 'react-icons/fa';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddUser, setShowAddUser] = useState(false);

  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Ramesh Pawar',
      email: 'ramesh@example.com',
      phone: '+91 9876543210',
      role: 'Landowner',
      status: 'Active',
      joinDate: '2024-01-15',
      landsOwned: 3,
      totalIncome: 75000,
      lastLogin: '2024-06-20'
    },
    {
      id: 2,
      name: 'Sneha Patil',
      email: 'sneha@example.com',
      phone: '+91 9876543211',
      role: 'Tenant',
      status: 'Active',
      joinDate: '2024-02-10',
      landsRented: 1,
      totalPaid: 50000,
      lastLogin: '2024-06-19'
    },
    {
      id: 3,
      name: 'Rajesh Kumar',
      email: 'rajesh@example.com',
      phone: '+91 9876543212',
      role: 'Landowner',
      status: 'Inactive',
      joinDate: '2024-03-05',
      landsOwned: 2,
      totalIncome: 35000,
      lastLogin: '2024-06-10'
    },
    {
      id: 4,
      name: 'Priya Sharma',
      email: 'priya@example.com',
      phone: '+91 9876543213',
      role: 'Tenant',
      status: 'Pending',
      joinDate: '2024-06-15',
      landsRented: 0,
      totalPaid: 0,
      lastLogin: 'Never'
    }
  ]);

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Tenant',
    status: 'Active'
  });

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || user.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const handleAddUser = () => {
    if (newUser.name && newUser.email && newUser.phone) {
      const user = {
        ...newUser,
        id: users.length + 1,
        joinDate: new Date().toISOString().split('T')[0],
        landsOwned: newUser.role === 'Landowner' ? 0 : undefined,
        landsRented: newUser.role === 'Tenant' ? 0 : undefined,
        totalIncome: newUser.role === 'Landowner' ? 0 : undefined,
        totalPaid: newUser.role === 'Tenant' ? 0 : undefined,
        lastLogin: 'Never'
      };
      setUsers([...users, user]);
      setNewUser({ name: '', email: '', phone: '', role: 'Tenant', status: 'Active' });
      setShowAddUser(false);
      alert('User added successfully!');
    }
  };

  const handleStatusChange = (userId, newStatus) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
    alert(`User status updated to ${newStatus}`);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
      alert('User deleted successfully!');
    }
  };

  const getUserStats = () => {
    const total = users.length;
    const active = users.filter(u => u.status === 'Active').length;
    const inactive = users.filter(u => u.status === 'Inactive').length;
    const pending = users.filter(u => u.status === 'Pending').length;
    const landowners = users.filter(u => u.role === 'Landowner').length;
    const tenants = users.filter(u => u.role === 'Tenant').length;

    return { total, active, inactive, pending, landowners, tenants };
  };

  const stats = getUserStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-blue-800 mb-2">User Management</h1>
          <p className="text-gray-600">Manage landowners, tenants, and system users</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl shadow-sm border text-center">
            <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
            <p className="text-sm text-gray-600">Total Users</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border text-center">
            <p className="text-2xl font-bold text-green-600">{stats.active}</p>
            <p className="text-sm text-gray-600">Active</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border text-center">
            <p className="text-2xl font-bold text-red-600">{stats.inactive}</p>
            <p className="text-sm text-gray-600">Inactive</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border text-center">
            <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            <p className="text-sm text-gray-600">Pending</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border text-center">
            <p className="text-2xl font-bold text-purple-600">{stats.landowners}</p>
            <p className="text-sm text-gray-600">Landowners</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border text-center">
            <p className="text-2xl font-bold text-indigo-600">{stats.tenants}</p>
            <p className="text-sm text-gray-600">Tenants</p>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white p-6 rounded-xl shadow-sm border mb-8">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <FaFilter className="text-gray-500" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => setShowAddUser(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FaUserPlus /> Add User
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">User</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Role</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Activity</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Performance</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-semibold text-gray-800">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <p className="text-sm text-gray-500">{user.phone}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.role === 'Landowner' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.status === 'Active' ? 'bg-green-100 text-green-600' :
                        user.status === 'Inactive' ? 'bg-red-100 text-red-600' :
                        'bg-yellow-100 text-yellow-600'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm">
                        <p className="text-gray-800">Joined: {user.joinDate}</p>
                        <p className="text-gray-600">Last Login: {user.lastLogin}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm">
                        {user.role === 'Landowner' ? (
                          <>
                            <p className="text-gray-800">{user.landsOwned} lands owned</p>
                            <p className="text-green-600 font-semibold">₹{user.totalIncome?.toLocaleString()} earned</p>
                          </>
                        ) : (
                          <>
                            <p className="text-gray-800">{user.landsRented} lands rented</p>
                            <p className="text-blue-600 font-semibold">₹{user.totalPaid?.toLocaleString()} paid</p>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                          <FaEye />
                        </button>
                        <button className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors">
                          <FaEdit />
                        </button>
                        {user.status === 'Active' ? (
                          <button 
                            onClick={() => handleStatusChange(user.id, 'Inactive')}
                            className="p-2 text-yellow-600 hover:bg-yellow-100 rounded-lg transition-colors"
                          >
                            <FaBan />
                          </button>
                        ) : (
                          <button 
                            onClick={() => handleStatusChange(user.id, 'Active')}
                            className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                          >
                            <FaCheck />
                          </button>
                        )}
                        <button 
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add User Modal */}
        {showAddUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full mx-4">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Add New User</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={newUser.name}
                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={newUser.phone}
                    onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Tenant">Tenant</option>
                    <option value="Landowner">Landowner</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={newUser.status}
                    onChange={(e) => setNewUser({...newUser, status: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleAddUser}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add User
                </button>
                <button
                  onClick={() => setShowAddUser(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;