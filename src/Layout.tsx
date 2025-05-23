import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();
  const noNavbarRoutes = [
    '/login',
    '/register',
    '/forgot-password',
    '/new-password',
  ];

  return (
    <>
      {!noNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Outlet />
      {!noNavbarRoutes.includes(location.pathname) && <Footer />}
    </>
  );
};

export default Layout;
