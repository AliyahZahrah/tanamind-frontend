import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <main className="flex flex-col md:flex-row min-h-[80vh] bg-gray-100 py-8 px-4 md:px-8">
        {/* Main Content */}
        <section className="flex-1 md:pr-6">
          {/* Planting Guidance Section */}
          <div className="bg-white p-8 rounded-xl mb-8 shadow-md flex flex-col md:flex-row items-center">
            <img
              src="/img/planting.png"
              alt="Planting"
              className="w-32 h-32 md:mr-6 mb-4 md:mb-0"
            />
            <div>
              <h2 className="text-3xl font-semibold mb-4">
                Mau tanam apa hari ini?
              </h2>
              <p className="text-gray-700 text-lg mb-6">
                Dapatkan panduan lengkap untuk menanam selada, tomat, atau cabai
                hidroponik Anda. Pelajari cara merawat dan mengatasi penyakit umum.
              </p>
              <button className="bg-green-500 text-white px-6 py-3 rounded-full text-lg font-semibold flex items-center hover:bg-green-600 transition duration-300">
                Lihat Panduan Tanaman
                <img
                  src="/icons/right-arrow.png"
                  alt="Right Arrow"
                  className="w-8 h-8 ml-3"
                />
              </button>
            </div>
          </div>

          {/* Quick Diagnosis Section */}
          <div className="bg-white p-8 rounded-xl shadow-md flex flex-col md:flex-row items-center">
            <img
              src="/img/plant-detection.png"
              alt="Plant Detection"
              className="w-32 h-32 md:mr-6 mb-4 md:mb-0"
            />
            <div>
              <h2 className="text-3xl font-semibold mb-4">Diagnosa Cepat!</h2>
              <p className="text-gray-700 text-lg mb-6">
                Unggah foto tanaman Anda untuk deteksi penyakit.
              </p>
              <button className="bg-blue-500 text-white px-6 py-3 rounded-full text-lg font-semibold flex items-center hover:bg-blue-600 transition duration-300">
                Mulai Diagnosa
                <img
                  src="/icons/detection.png"
                  alt="Detection"
                  className="w-8 h-8 ml-3"
                />
              </button>
            </div>
          </div>
        </section>

        {/* Weather Aside */}
        <aside className="w-full md:w-1/3 mt-8 md:mt-0 bg-green-200 p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            Prediksi Cuaca
            <img
              src="/icons/weather.png"
              alt="Weather icon"
              className="ml-2 w-6 h-6"
            />
          </h2>
          <p className="text-gray-700 text-lg mb-4">
            Cuaca saat ini di Lokasi Anda
          </p>

          {/* Current Weather */}
          <div className="bg-white p-4 rounded-lg flex flex-col items-center shadow mb-4">
            <img src="/icons/sunny.png" alt="Sunny" className="w-12 h-12 mb-2" />
            <p className="text-2xl font-bold text-yellow-600">30°C</p>
            <p className="text-gray-600">Sunny</p>
            <p className="text-gray-500 text-sm">Sekarang</p>
          </div>

          {/* Forecasts */}
          <div className="space-y-3">
            {/* Partly Cloudy */}
            <div className="bg-white p-4 rounded-lg flex items-center shadow">
              <img
                src="/icons/partly-cloudy.png"
                alt="Partly Cloudy"
                className="w-8 h-8 mr-3"
              />
              <div>
                <p className="text-lg font-bold text-orange-500">28°C</p>
                <p className="text-gray-600 text-sm">Partly Cloudy</p>
                <p className="text-gray-500 text-xs">Besok</p>
              </div>
            </div>

            {/* Sunny */}
            <div className="bg-white p-4 rounded-lg flex items-center shadow">
              <img
                src="/icons/sunny.png"
                alt="Sunny"
                className="w-8 h-8 mr-3"
              />
              <div>
                <p className="text-lg font-bold text-yellow-600">29°C</p>
                <p className="text-gray-600 text-sm">Sunny</p>
                <p className="text-gray-500 text-xs">Lusa</p>
              </div>
            </div>

            {/* Cloudy */}
            <div className="bg-white p-4 rounded-lg flex items-center shadow">
              <img
                src="/icons/cloudy.png"
                alt="Cloudy"
                className="w-8 h-8 mr-3"
              />
              <div>
                <p className="text-lg font-bold text-gray-700">23°C</p>
                <p className="text-gray-600 text-sm">Cloudy</p>
                <p className="text-gray-500 text-xs">3 Hari Lagi</p>
              </div>
            </div>

            {/* Rain */}
            <div className="bg-white p-4 rounded-lg flex items-center shadow">
              <img
                src="/icons/rain.png"
                alt="Rain"
                className="w-8 h-8 mr-3"
              />
              <div>
                <p className="text-lg font-bold text-blue-500">16°C</p>
                <p className="text-gray-600 text-sm">Rain</p>
                <p className="text-gray-500 text-xs">4 Hari Lagi</p>
              </div>
            </div>
          </div>
        </aside>
      </main>
      <Footer />
    </>
  );
};

export default Dashboard;
