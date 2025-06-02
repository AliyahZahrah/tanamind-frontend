import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button'; // Sesuaikan path jika perlu
import { FaSignInAlt, FaExclamationTriangle } from 'react-icons/fa';

const AuthRequiredPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-100 p-4 text-center">
      <div className="bg-white p-8 md:p-12 rounded-xl shadow-2xl max-w-lg w-full">
        <FaExclamationTriangle className="text-yellow-500 text-6xl mx-auto mb-6" />
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Akses Terbatas
        </h1>
        <p className="text-gray-600 text-md md:text-lg mb-8">
          Anda harus login terlebih dahulu untuk mengakses halaman ini. Silakan
          login untuk melanjutkan.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="w-full sm:w-auto cursor-pointer"
          >
            Kembali
          </Button>
          <Button
            asChild
            className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white"
          >
            <Link to="/login">
              <FaSignInAlt className="mr-2" />
              Login Sekarang
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthRequiredPage;
