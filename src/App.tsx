import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import ForgetPassword from './pages/auth/ForgetPassword';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
