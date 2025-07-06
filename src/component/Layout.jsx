import { Link, Outlet } from 'react-router-dom';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/addland', label: 'Add Land' },
    { path: '/land-detail', label: 'Browse Lands' },
    { path: '/users', label: 'Users' },
    { path: '/payments', label: 'Payments' },
    { path: '/reports', label: 'Reports' },
    { path: '/settings', label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-green-100">
      {/* Navigation Bar */}
      <nav className="bg-green-700 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-xl font-bold flex items-center gap-2">
              🌿 Land Lease Pro
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex space-x-1">
              {navItems.map((item) => (
                <Link 
                  key={item.path}
                  to={item.path} 
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-green-600 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-md hover:bg-green-600 transition-colors"
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-green-600">
              <div className="flex flex-col space-y-2 mt-4">
                {navItems.map((item) => (
                  <Link 
                    key={item.path}
                    to={item.path} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-green-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="min-h-screen">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">🌿 Land Lease Pro</h3>
              <p className="text-green-200 text-sm">
                Simplifying land lease management for landowners and tenants across India.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Quick Links</h4>
              <div className="space-y-1 text-sm">
                <Link to="/dashboard" className="block text-green-200 hover:text-white transition-colors">Dashboard</Link>
                <Link to="/land-detail" className="block text-green-200 hover:text-white transition-colors">Browse Lands</Link>
                <Link to="/addland" className="block text-green-200 hover:text-white transition-colors">List Your Land</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Contact</h4>
              <div className="text-sm text-green-200 space-y-1">
                <p>📧 support@landleasepro.com</p>
                <p>📞 +91 9876543210</p>
                <p>📍 Mumbai, Maharashtra</p>
              </div>
            </div>
          </div>
          <div className="border-t border-green-700 mt-6 pt-4 text-center text-sm text-green-200">
            <p>© {new Date().getFullYear()} Land Lease Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;