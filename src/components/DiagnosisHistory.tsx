
import React, { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { MdHistory } from 'react-icons/md';
import type { SavedDiagnosisData } from '../lib/api/diagnosis';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import PredictionResultDialog from './PredictionResultDialog';
import { Button } from './ui/button';

interface DiagnosisHistoryItemProps {
  data: SavedDiagnosisData;
  onViewDetail: (data: SavedDiagnosisData) => void;
}

const DiagnosisHistoryItem: React.FC<DiagnosisHistoryItemProps> = ({
  data,
  onViewDetail,
}) => {
  const diagnosisDate = new Date(data.createdAt);
  const formattedDate = format(diagnosisDate, 'd MMMM yyyy', { locale: id });
  const formattedTime = format(diagnosisDate, 'HH:mm');

  return (
    <div
      key={data.id}
      className="grid grid-cols-[1fr_1.5fr_1fr_0.8fr] gap-4 items-center py-3 hover:bg-gray-50 rounded-lg transition-colors"
    >
      <div className="flex items-center gap-3">
        <span className="font-medium text-gray-800 capitalize">
          {data.tanaman.toLowerCase()}
        </span>
      </div>

      <div className="text-gray-800">
        <span className="font-medium">{data.disease?.name || 'Healthy'}</span>
      </div>

      <div className="text-gray-600 text-center">
        <span className="text-sm">
          {formattedDate}, {formattedTime}
        </span>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={() => onViewDetail(data)}
          className="flex items-center gap-2 bg-green-700 text-white px-3 py-1.5 rounded-md hover:bg-green-800 transition-colors text-sm cursor-pointer"
        >
          <FaEye className="text-xs" />
          Detail
        </Button>
      </div>
    </div>
  );
};

interface DiagnosisHistoryProps {
  historyData: SavedDiagnosisData[];
  isLoading: boolean;
  error: string | null;
  onViewDetail?: (id: string) => void;
}

const DiagnosisHistory: React.FC<DiagnosisHistoryProps> = ({
  historyData,
  isLoading,
  error,
  onViewDetail,
}) => {
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedHistoryItem, setSelectedHistoryItem] =
    useState<SavedDiagnosisData | null>(null);

  const handleViewDetailClick = (data: SavedDiagnosisData) => {
    setSelectedHistoryItem(data);
    setIsDetailDialogOpen(true);
  };

  const handleDialogOnOpenChange = (isOpen: boolean) => {
    setIsDetailDialogOpen(isOpen);
    if (!isOpen) {
      setSelectedHistoryItem(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3" style={{ gap: '12px' }}> {/* Added to synchronize spacing with DiagnosticsPage */}
          <h2 className="text-xl font-bold text-gray-800 mr-2"> {/* Adjusted margin for spacing */}
            History Output Hasil Diagnosa Tanaman
          </h2>
          <img src="/icons/history.png" alt="History Icon" data-ai-hint="history icon" className="w-6 h-6" /> {/* Removed ml-2 */}
        </div>
      </div>

      <div className="grid grid-cols-[1fr_1.5fr_1fr_0.8fr] gap-4 pb-3 border-b border-gray-200 mb-4">
        <div className="text-sm font-medium text-gray-600">Jenis Tanaman</div>
        <div className="text-sm font-medium text-gray-600">Nama Penyakit</div>
        <div className="text-sm font-medium text-gray-600 text-center">
          Tanggal & Jam
        </div>
        <div></div>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-8 text-gray-500">
            Memuat riwayat diagnosa...
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">Error: {error}</div>
        ) : historyData.length > 0 ? (
          historyData.map((item) => (
            <DiagnosisHistoryItem
              key={item.id}
              data={item}
              onViewDetail={handleViewDetailClick}
            />
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <MdHistory className="text-5xl sm:text-6xl text-gray-400 mx-auto mb-3" />
            <p>Belum ada riwayat diagnosa</p>
            <p className="text-sm">
              Mulai diagnosa pertama Anda untuk melihat riwayat di sini
            </p>
          </div>
        )}
      </div>

      {historyData.length > 5 && (
        <div className="text-center mt-6">
          <button className="text-green-600 hover:text-green-700 text-sm font-medium">
            Lihat Semua Riwayat
          </button>
        </div>
      )}

      {selectedHistoryItem && (
        <PredictionResultDialog
          isOpen={isDetailDialogOpen}
          onOpenChange={handleDialogOnOpenChange}
          predictionResult={{
            tanaman: selectedHistoryItem.tanaman,
            confidence: selectedHistoryItem.confidence,
            disease: selectedHistoryItem.disease
              ? {
                  id: selectedHistoryItem.diseaseId,
                  label: selectedHistoryItem.disease.label,
                  name: selectedHistoryItem.disease.name,
                  image: selectedHistoryItem.imageUrl || '',
                  penyebab:
                    selectedHistoryItem.disease.penyebab ||
                    'Data penyebab tidak tersedia di riwayat ini',
                  deskripsi:
                    selectedHistoryItem.disease.deskripsi ||
                    'Data deskripsi tidak tersedia di riwayat ini',
                  pencegahan:
                    selectedHistoryItem.disease.pencegahan?.length > 0
                      ? selectedHistoryItem.disease.pencegahan
                      : ['Data pencegahan tidak tersedia di riwayat ini'],
                  pengendalian:
                    selectedHistoryItem.disease.pengendalian?.length > 0
                      ? selectedHistoryItem.disease.pengendalian
                      : ['Data pengendalian tidak tersedia di riwayat ini'],
                  tanaman: selectedHistoryItem.tanaman,
                }
              : null,
          }}
          apiMessage="Hasil diagnosa dari riwayat."
          uploadedImage={selectedHistoryItem.imageUrl}
          isPredicting={false}
          predictionError={null}
          onNavigateToFullResult={() =>
            onViewDetail && onViewDetail(selectedHistoryItem.id)
          }
          onSaveDiagnosis={() => {}}
          isSaving={false}
          showCloseButton={true}
          isViewMode={true}
        />
      )}
    </div>
  );
};

export default DiagnosisHistory;
