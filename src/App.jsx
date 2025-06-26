import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './component/Dashboard';  
import Layout from './component/Layout'; 
import './App.css';
import AddLand from './component/AddLand';
import LandDetail from './component/LandDetail';
import Home from './component/Home';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
 
          <Route path="dashboard" element={<Dashboard />} />
          <Route path ="addland" element={ <AddLand /> } />
          <Route path='land-detail' element={<LandDetail/ >} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;