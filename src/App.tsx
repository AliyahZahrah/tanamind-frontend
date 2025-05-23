import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import ForgetPassword from './pages/auth/ForgetPassword';
import NewPassword from './pages/auth/NewPassword';
import Dashboard from './pages/home/Dashboard';
import GuidancePage from './pages/guidance/GuidancePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/guidance" element={<GuidancePage />} />

        {/* Auth Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/new-password" element={<NewPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
