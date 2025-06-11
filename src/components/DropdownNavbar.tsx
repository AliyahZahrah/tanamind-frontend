'use client';

import { useState, useRef, useEffect } from 'react';
import { FaUser, FaSignOutAlt, FaChevronDown } from 'react-icons/fa';
import { useAuth } from '../hooks/use-auth';

interface UserDropdownProps {
  user: {
    email: string;
    name: string;
  };
  onClose?: () => void;
  emailVisibilityClass?: string;
}

const UserDropdown = ({
  user,
  onClose,
  emailVisibilityClass,
}: UserDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { logout, isLoading } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false);
      onClose?.();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center space-x-2 text-gray-600 font-medium cursor-pointer"
        disabled={isLoading}
      >
        <FaUser size={20} />
        <span
          className={`hidden ${
            emailVisibilityClass || 'lg:inline'
          } max-w-fit truncate`}
        >
          {user.email}
        </span>
        <FaChevronDown
          size={12}
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-64 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50 sm:right-0 left-1/2 transform -translate-x-1/2">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
            <p className="text-sm text-gray-500 truncate">{user.email}</p>
          </div>

          <div className="py-1">
            <button
              onClick={handleLogout}
              disabled={isLoading}
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50 cursor-pointer"
            >
              <FaSignOutAlt className="mr-3 text-red-500" size={14} />
              {isLoading ? 'Signing out...' : 'Sign Out'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
