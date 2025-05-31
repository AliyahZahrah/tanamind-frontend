import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();
  const noNavbarFooterRoutes = [
    '/login',
    '/register',
    '/forgot-password',
    '/new-password',
    '/callback-google',
  ];

  const showNavbarFooter = !noNavbarFooterRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {showNavbarFooter && <Navbar />}
      <main className="flex-grow">
        <Outlet />
      </main>
      {showNavbarFooter && <Footer />}
    </div>
  );
};

export default Layout;
