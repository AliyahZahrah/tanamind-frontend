import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import ForgetPassword from './pages/auth/ForgetPassword';
import NewPassword from './pages/auth/NewPassword';
import Dashboard from './pages/home/Dashboard';
import GuidancePage from './pages/guidance/GuidancePage';
import Layout from './Layout';
import AuthLayout from './pages/auth/AuthLayout';
import DiagnosticsPage from './pages/Diagnostics/DiagnosticsPage';
import { Toaster } from 'sonner';
import AuthCallback from './pages/auth/AuthCallbackGoogle';
import PlantingsPage from './pages/plantings/PlantingsPage';
import ProtectedRoute from './components/ProtectedRoutes';
import NotFoundPage from './pages/Notfoundpage'; // Import the NotFoundPage

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />

      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/guidance" element={<GuidancePage />} />
          <Route
            path="/diagnostics"
            element={
              <ProtectedRoute>
                <DiagnosticsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/plantings"
            element={
              <ProtectedRoute>
                <PlantingsPage />
              </ProtectedRoute>
            }
          />{' '}
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/new-password" element={<NewPassword />} />
          <Route path="/callback-google" element={<AuthCallback />} />
        </Route>

        {/* Catch-all route for 404 Not Found page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
