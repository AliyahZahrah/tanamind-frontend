import { Link, useLocation } from 'react-router-dom';
import logo from './assets/logo-tanamind.png';
import guestIcon from './assets/guest-icon.png';

const Navbar = () => {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Guidance', href: '/guidance' },
    { name: 'Diagnostics', href: '/diagnostics' },
    { name: 'Plantings', href: '/plantings' },
  ];

  return (
    <nav className="bg-[#e5e3dc] px-6 py-3 flex items-center justify-between shadow-sm">
      {/* Logo Tanamind */}
      <div className="flex items-center space-x-2">
        <img src={logo} alt="Tanamind Logo" className="w-9 h-9" />
        <span className="text-xl font-semibold text-gray-800">tanamind</span>
      </div>

      {/* Navigation Menu */}
      <div className="flex space-x-6">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`px-4 py-1 rounded-md transition-colors ${
                isActive
                  ? 'bg-[#345e4e] text-white font-bold'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </div>

      {/* Akun Guest */}
      <div className="flex items-center space-x-2">
        <img src={guestIcon} alt="Guest Icon" className="w-8 h-8" />
        <span className="text-gray-800 font-semibold">Guest</span>
      </div>
    </nav>
  );
};

export default Navbar;