'use client';

import { FaSearch, FaFilter, FaEye } from 'react-icons/fa';

interface DiagnosisHistoryItem {
  id: string;
  diseaseName: string;
  icon: string;
  iconColor: string;
  date: string;
  time: string;
  status: 'disease' | 'healthy';
}

interface DiagnosisHistoryProps {
  onViewDetail?: (id: string) => void;
  onFilter?: () => void;
}

const DiagnosisHistory = ({
  onViewDetail,
  onFilter,
}: DiagnosisHistoryProps) => {
  const historyData: DiagnosisHistoryItem[] = [
    {
      id: '1',
      diseaseName: 'Leaf Mold',
      icon: '🍄',
      iconColor: 'text-orange-500',
      date: '14 Mei 2025',
      time: '08:17',
      status: 'disease',
    },
    {
      id: '2',
      diseaseName: 'Early Blight',
      icon: '🌿',
      iconColor: 'text-green-500',
      date: '10 Mei 2025',
      time: '14:05',
      status: 'disease',
    },
    {
      id: '3',
      diseaseName: 'Healthy',
      icon: '✅',
      iconColor: 'text-blue-500',
      date: '5 Mei 2025',
      time: '09:30',
      status: 'healthy',
    },
  ];

  const handleViewDetail = (id: string) => {
    if (onViewDetail) {
      onViewDetail(id);
    } else {
      // Default behavior
      console.log(`Viewing details for diagnosis: ${id}`);
      alert(`Menampilkan detail diagnosa ${id}`);
    }
  };

  const handleFilter = () => {
    if (onFilter) {
      onFilter();
    } else {
      // Default behavior
      console.log('Opening filter options');
      alert('Filter options akan ditampilkan di sini');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FaSearch className="text-green-600 text-xl" />
          <h2 className="text-xl font-bold text-gray-800">
            History Output Hasil Diagnosa Tanaman
          </h2>
        </div>
        <button
          onClick={handleFilter}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          <FaFilter className="text-gray-500 text-sm" />
          <span className="text-gray-700 text-sm">Filter</span>
        </button>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-3 gap-4 pb-3 border-b border-gray-200 mb-4">
        <div className="text-sm font-medium text-gray-600">Nama Penyakit</div>
        <div className="text-sm font-medium text-gray-600 text-center">
          Tanggal & Jam
        </div>
        <div></div> {/* Empty column for action button */}
      </div>

      {/* History Items */}
      <div className="space-y-4">
        {historyData.length > 0 ? (
          historyData.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-3 gap-4 items-center py-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              {/* Disease Name with Icon */}
              <div className="flex items-center gap-3">
                <span className={`text-xl ${item.iconColor}`}>{item.icon}</span>
                <span className="font-medium text-gray-800">
                  {item.diseaseName}
                </span>
              </div>

              {/* Date & Time */}
              <div className="text-gray-600 text-center">
                <span className="text-sm">
                  {item.date}, {item.time}
                </span>
              </div>

              {/* Action Button */}
              <div className="flex justify-end">
                <button
                  onClick={() => handleViewDetail(item.id)}
                  className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800 transition-colors text-sm"
                >
                  <FaEye className="text-xs" />
                  View Detail
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <FaSearch className="text-4xl text-gray-300 mx-auto mb-3" />
            <p>Belum ada riwayat diagnosa</p>
            <p className="text-sm">
              Mulai diagnosa pertama Anda untuk melihat riwayat di sini
            </p>
          </div>
        )}
      </div>

      {/* Show More Button (if needed) */}
      {historyData.length > 0 && (
        <div className="text-center mt-6">
          <button className="text-green-600 hover:text-green-700 text-sm font-medium">
            Lihat Semua Riwayat
          </button>
        </div>
      )}
    </div>
  );
};

export default DiagnosisHistory;
