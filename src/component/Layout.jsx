import { Link, Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="min-h-screen bg-green-100">
      {/* Navigation Bar */}
      <nav className="bg-green-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">🌿 Land Lease</h1>
            <div className="flex space-x-4">
              <Link 
                to="/" 
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-green-600 transition-colors"
              >
                Home
              </Link>
               
              <Link 
                to="/dashboard" 
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-green-600 transition-colors"
              >
                Dashboard
              </Link>
              <Link 
                to="/addland" 
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-green-600 transition-colors"
              >
                Add Land
              </Link>

              <Link 
                to="/land-detail" 
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-green-600 transition-colors"
              >
                Land Detail
              </Link>

              
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-4 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Land Lease Management System</p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
