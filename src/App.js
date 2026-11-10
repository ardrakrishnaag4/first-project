import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './pages/Register/Register';
import ConsumerDashboard from './pages/ConsumerDashboard/ConsumerDashboard';
import ProviderDashboard from './pages/ProviderDashboard/ProviderDashboard';
import Login from './pages/Login/Login';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/providerdashboard" element={<ProviderDashboard />} />
        <Route path="/consumerdashboard" element={<ConsumerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
