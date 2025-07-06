import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './component/Dashboard';  
import Layout from './component/Layout'; 
import './App.css';
import AddLand from './component/AddLand';
import LandDetail from './component/LandDetail';
import Home from './component/Home';
import ViewReports from './component/ViewReports';
import Settings from './component/Settings';
import UserManagement from './component/UserManagement';
import PaymentTracking from './component/PaymentTracking';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="addland" element={<AddLand />} />
          <Route path="land-detail" element={<LandDetail />} />
          <Route path="reports" element={<ViewReports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="payments" element={<PaymentTracking />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;