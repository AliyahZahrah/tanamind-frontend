import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="bg-white flex flex-col justify-center items-center w-full min-h-screen p-4">
      <div className="bg-white overflow-hidden w-full max-w-lg md:max-w-xl">
        <div className="w-full bg-[#6db1934c] rounded-2xl p-6 md:p-10">
          <div className="relative w-full bg-white rounded-2xl shadow-xl p-6 md:p-8 text-center">
            <div className="font-['Poppins-Bold',Helvetica] font-bold text-[#295f4e] text-7xl md:text-9xl leading-none">
              404
            </div>

            <div className="mt-4 md:mt-6 font-['Poppins-Bold',Helvetica] font-bold text-black text-xl md:text-2xl leading-tight">
              Page Not Found
            </div>

            <p className="mt-4 md:mt-6 w-full max-w-sm mx-auto font-['Poppins-Regular',Helvetica] font-normal text-[#666666] text-base md:text-lg leading-relaxed">
              Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
              Silakan periksa URL atau kembali ke Dashboard.
            </p>

            <div className="mt-8 md:mt-10 w-full max-w-xs mx-auto">
              <Link
                to="/"
                className="block w-full py-3 px-4 bg-[#295f4e] rounded-lg text-white font-['Poppins-Bold',Helvetica] font-bold text-base md:text-lg leading-6 no-underline hover:bg-[#234536] transition-colors"
              >
                Kembali ke Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
