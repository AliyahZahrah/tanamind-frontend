import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import { useState } from 'react';

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { name: 'Dashboard', href: '/' },
    { name: 'Guidance', href: '/guidance' },
    { name: 'Diagnostics', href: '/diagnostics' },
    { name: 'Plantings', href: '/plantings' },
  ];

  const renderMenu = () => (
    <div className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-4 md:space-y-0">
      {menuItems.map((item) => {
        const isActive = location.pathname === item.href;
        return (
          <Link
            key={item.name}
            to={item.href}
            onClick={() => setIsMobileMenuOpen(false)}
            className={`px-4 py-2 rounded-md transition-colors text-center ${
              isActive
                ? 'bg-[#345e4e] text-white'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {item.name}
          </Link>
        );
      })}
    </div>
  );

  return (
    <nav className="bg-[#F7F7F2] px-6 py-3 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/">
          <img
            src="/img/logo-tanamind.png"
            alt="Tanamind Logo"
            className="w-32 pl-6"
          />
        </Link>

        <div className="hidden md:flex text-sm md:text-medium justify-center items-center space-x-6">
          {renderMenu()}
        </div>

        <Button
          asChild
          className="hidden md:flex bg-[#345e4e] hover:bg-[#2c4f40] text-white font-medium text-sm px-4 py-1.5 rounded-md"
        >
          <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
            Login
          </Link>
        </Button>

        <div className="md:hidden transition-all duration-700">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-700 focus:outline-none cursor-pointer "
          >
            {isMobileMenuOpen ? (
              <HiOutlineX size={24} />
            ) : (
              <HiOutlineMenu size={24} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="flex flex-col">
          <div className="md:hidden mt-4 space-y-2 cursor-pointer">
            {renderMenu()}
          </div>
          <Button
            asChild
            className="bg-[#345e4e] hover:bg-[#2c4f40] text-white mx-auto font-medium text-sm px-4 py-1.5 rounded-md"
          >
            <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
              Login
            </Link>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
