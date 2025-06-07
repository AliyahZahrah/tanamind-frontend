import React from "react";

const NotFoundPage = () => {
  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white overflow-hidden w-[1272px] h-[667px]">
        <div className="w-[1273px] h-[667px] bg-[#6db1934c]">
          <div className="relative w-[424px] h-[524px] top-[71px] left-[427px]">
            <div className="relative w-[418px] h-[524px] bg-white rounded-2xl shadow-[0px_0px_0px_transparent,0px_0px_0px_transparent,0px_0px_0px_transparent,0px_0px_0px_transparent,0px_8px_24px_#0000001a]">
              <div className="absolute top-[82px] left-[89px] [font-family:'Poppins-Bold',Helvetica] font-bold text-[#295f4e] text-[120px] text-center tracking-[0] leading-[120px] whitespace-nowrap">
                404
              </div>

              <div className="absolute top-[237px] left-[139px] [font-family:'Poppins-Bold',Helvetica] font-bold text-black text-lg text-center tracking-[0] leading-[27px] whitespace-nowrap">
                Page Not Found
              </div>

              <p className="absolute w-[338px] top-72 left-[41px] [font-family:'Poppins-Regular',Helvetica] font-normal text-[#666666] text-base text-center tracking-[0] leading-6">
                Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
                Silakan periksa URL atau kembali ke Dashboard.
              </p>

              <div className="absolute w-[352px] h-12 top-[395px] left-[35px]">
                <div className="relative w-[350px] h-12 bg-[#295f4e] rounded-lg">
                  <div className="absolute top-3 left-[83px] [font-family:'Poppins-Bold',Helvetica] font-bold text-white text-base text-center tracking-[0] leading-6 whitespace-nowrap">
                    Kembali ke Dashboard
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
