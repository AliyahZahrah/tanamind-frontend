import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '../../components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { weatherApi, type DailyForecast } from '../../lib/api/weather';

const Dashboard = () => {
  const [weatherForecast, setWeatherForecast] = useState<
    DailyForecast[] | null
  >(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState(true);
  const [errorWeather, setErrorWeather] = useState<string | null>(null);
  const [locationName, setLocationName] = useState<string>('Lokasi Anda');

  useEffect(() => {
    const fetchWeather = async () => {
      setIsLoadingWeather(true);
      setErrorWeather(null);

      if (!navigator.geolocation) {
        setErrorWeather('Geolocation tidak didukung oleh browser Anda.');
        setIsLoadingWeather(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const data = await weatherApi.getWeatherForecastByCoords(
              latitude,
              longitude
            );
            setWeatherForecast(data);
          } catch (err: any) {
            setErrorWeather(
              err.message ||
                'Gagal mengambil data cuaca. Pastikan izin lokasi diberikan.'
            );
          } finally {
            setIsLoadingWeather(false);
          }
        },
        (geoError) => {
          setIsLoadingWeather(false);
          switch (geoError.code) {
            case geoError.PERMISSION_DENIED:
              setErrorWeather(
                'Izin lokasi ditolak. Harap izinkan akses lokasi untuk melihat cuaca.'
              );
              break;
            case geoError.POSITION_UNAVAILABLE:
              setErrorWeather('Informasi lokasi tidak tersedia.');
              break;
            case geoError.TIMEOUT:
              setErrorWeather('Permintaan lokasi habis waktu.');
              break;
            default:
              setErrorWeather('Terjadi kesalahan saat mendapatkan lokasi.');
              break;
          }
        }
      );
    };

    fetchWeather();
  }, []);

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return '/icons/sunny.png';
      case 'clouds':
        return '/icons/cloudy.png';
      case 'rain':
      case 'drizzle':
      case 'thunderstorm':
        return '/icons/rain.png';
      case 'snow':
        return '/icons/snow.png';
      case 'mist':
      case 'smoke':
      case 'haze':
      case 'dust':
      case 'fog':
      case 'sand':
      case 'ash':
      case 'squall':
      case 'tornado':
        return '/icons/cloudy.png';
      default:
        return '/icons/weather.png';
    }
  };

  const getDayLabel = (index: number) => {
    if (index === 0) return 'Sekarang';
    if (index === 1) return 'Besok';
    if (index === 2) return 'Lusa';
    return `${index} Hari Lagi`;
  };

  return (
    <>
      <main className="flex flex-col md:flex-row md:items-stretch bg-[#E9F3ED] p-4 md:p-8 gap-6 md:gap-8">
        <section className="flex-1 flex flex-col gap-6 md:gap-8">
          <div className="bg-[#F7F7F2] p-6 rounded-2xl shadow-lg flex flex-col md:flex-row md:items-stretch gap-6 flex-1">
            <div className="md:order-1 flex flex-col justify-center flex-1">
              <div className="w-full max-w-md flex flex-col mx-auto md:mx-0">
                <h2 className="text-2xl md:text-3xl font-bold text-[#323232] mb-3">
                  Mau tanam apa hari ini?
                </h2>
                <p className="text-gray-600 text-sm md:text-base">
                  Dapatkan panduan lengkap untuk menanam selada, tomat, atau
                  cabai hidroponik Anda. Pelajari cara merawat dan mengatasi
                  penyakit umum.
                </p>
                <Button
                  asChild
                  className="bg-[#295F4E] text-white px-6 py-6 rounded-lg font-semibold flex items-center hover:bg-[#234536] transition duration-300 text-sm md:text-base self-center mt-10"
                >
                  <Link to="/guidance">
                    Lihat Paduan Tanaman
                    <img
                      src="/icons/right-arrow.png"
                      alt="Right Arrow"
                      className="w-8 h-8 ml-2"
                    />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="w-full md:w-2/5 md:order-2">
              <img
                src="/img/planting.png"
                alt="Planting"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>

          <div className="bg-[#F7F7F2] p-6 rounded-2xl shadow-lg flex flex-col md:flex-row md:items-stretch gap-6 flex-1">
            <div className="md:order-1 flex flex-col justify-center flex-1">
              <div className="w-full max-w-md flex flex-col mx-auto md:mx-0">
                <h2 className="text-2xl md:text-3xl font-bold text-[#323232] mb-3">
                  Diagnosa Cepat!
                </h2>
                <p className="text-gray-600 text-sm md:text-base">
                  Unggah foto tanaman Anda untuk deteksi penyakit.
                </p>
                <Button
                  asChild
                  className="bg-[#295F4E] text-white px-6 py-6 rounded-lg font-semibold flex items-center hover:bg-[#234536] transition duration-300 text-sm md:text-base self-center mt-10"
                >
                  <Link to="/diagnostics">
                    Mulai Diagnosa
                    <img
                      src="/icons/detection.png"
                      alt="Detection"
                      className="w-8 h-8 ml-2"
                    />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="w-full md:w-2/5 md:order-2">
              <img
                src="/img/plant-detection.png"
                alt="Plant Detection"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </section>

        <aside className="w-full md:w-1/3 lg:w-1/4 bg-[#E9F3ED]">
          <div className="bg-[#F7F7F2] p-4 md:p-6 rounded-2xl shadow-lg">
            <h2 className="text-lg md:text-xl font-bold text-[#323232] mb-1 flex items-center">
              Prediksi Cuaca
              <img
                src="/icons/weather.png"
                alt="Weather icon"
                className="ml-2 w-5 h-5 md:w-6 md:h-6"
              />
            </h2>
            <p className="text-xs md:text-sm text-gray-500 mb-4">
              Cuaca saat ini di {locationName}
            </p>

            {isLoadingWeather ? (
              <div className="text-center text-gray-600">
                Memuat data cuaca...
              </div>
            ) : errorWeather ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{errorWeather}</AlertDescription>
              </Alert>
            ) : weatherForecast && weatherForecast.length > 0 ? (
              <div className="space-y-3">
                {weatherForecast.map((day, index) => (
                  <div
                    key={day.date}
                    className="bg-[#F4E5C2]/50 p-3 md:p-4 rounded-xl flex items-center shadow-sm gap-3"
                  >
                    <img
                      src={getWeatherIcon(day.weather)}
                      alt={day.weather}
                      className="w-10 h-10 md:w-12 md:h-12"
                    />
                    <div className="flex-1">
                      <p className="text-2xl md:text-3xl font-bold text-[#323232]">
                        {Math.round(day.temp)}°C
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm md:text-base font-semibold text-[#323232] capitalize">
                        {day.weather}
                      </p>
                      <p className="text-xs text-gray-500">
                        {getDayLabel(index)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-600">
                Tidak dapat memuat data cuaca.
              </div>
            )}
          </div>
        </aside>
      </main>
    </>
  );
};

export default Dashboard;
