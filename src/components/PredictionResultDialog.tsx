import type React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { FaExclamationCircle, FaInfoCircle, FaSave } from 'react-icons/fa';
import type { PredictionData } from '../lib/api/diagnosis';

interface PredictionResultDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  predictionResult: PredictionData | null;
  apiMessage: string | null;
  uploadedImage: string | null;
  isPredicting: boolean;
  predictionError: string | null;
  onNavigateToFullResult: () => void;
  onSaveDiagnosis: () => void;
  isSaving: boolean;
  showCloseButton?: boolean;
  isViewMode?: boolean;
}

const PredictionResultDialog: React.FC<PredictionResultDialogProps> = ({
  isOpen,
  onOpenChange,
  predictionResult,
  apiMessage,
  uploadedImage,
  isPredicting,
  predictionError,
  onSaveDiagnosis,
  isSaving,
  isViewMode = false,
}) => {
  const renderContent = () => {
    if (isPredicting && !predictionResult && !predictionError) {
      return (
        <div className="flex flex-col items-center justify-center h-48">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
          <p className="text-gray-600">Menganalisis gambar...</p>
        </div>
      );
    }

    if (predictionError && !predictionResult) {
      return (
        <Alert variant="destructive" className="mt-4">
          <FaExclamationCircle className="h-4 w-4" />
          <AlertTitle>Gagal Melakukan Diagnosa</AlertTitle>
          <AlertDescription>{predictionError}</AlertDescription>
          <DialogFooter className="mt-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="w-full cursor-pointer"
            >
              Tutup
            </Button>
          </DialogFooter>
        </Alert>
      );
    }

    if (predictionResult) {
      if (predictionResult.disease) {
        const hasPencegahan =
          predictionResult.disease.pencegahan &&
          predictionResult.disease.pencegahan.length > 0 &&
          predictionResult.disease.pencegahan[0] !==
            'Data pencegahan tidak tersedia di riwayat ini';
        const hasPengendalian =
          predictionResult.disease.pengendalian &&
          predictionResult.disease.pengendalian.length > 0 &&
          predictionResult.disease.pengendalian[0] !==
            'Data pengendalian tidak tersedia di riwayat ini';
        const hasDeskripsi =
          predictionResult.disease.deskripsi &&
          predictionResult.disease.deskripsi !==
            'Data deskripsi tidak tersedia di riwayat ini';
        const hasPenyebab =
          predictionResult.disease.penyebab &&
          predictionResult.disease.penyebab !==
            'Data penyebab tidak tersedia di riwayat ini';

        return (
          <>
            <DialogHeader className="mb-4">
              <DialogTitle className="text-2xl font-bold text-gray-800">
                Hasil Diagnosa: {predictionResult.disease.name}
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-500">
                Tanaman:{' '}
                <span className="font-semibold capitalize">
                  {predictionResult.tanaman}
                </span>{' '}
                | Akurasi:{' '}
                <span className="font-semibold">
                  {(predictionResult.confidence * 100).toFixed(1)}%
                </span>
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {uploadedImage && (
                <img
                  src={uploadedImage}
                  alt="Tanaman yang didiagnosa"
                  className="w-full h-auto max-h-60 object-contain rounded-lg border border-gray-200 shadow-sm"
                />
              )}
              <div>
                <h4 className="font-semibold text-gray-700 mb-1">
                  {hasDeskripsi ? 'Deskripsi Penyakit:' : 'Deskripsi Tanaman:'}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {predictionResult.disease.deskripsi ||
                    'Tidak ada deskripsi spesifik tersedia.'}
                </p>
              </div>

              {hasPenyebab && (
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">
                    Kemungkinan Penyebab:
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {predictionResult.disease.penyebab}
                  </p>
                </div>
              )}

              {(hasPencegahan || hasPengendalian) && (
                <div
                  className={`grid gap-4 text-sm ${
                    hasPencegahan && hasPengendalian
                      ? 'grid-cols-1 md:grid-cols-2'
                      : 'grid-cols-1'
                  }`}
                >
                  {hasPencegahan && (
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-1">
                        Pencegahan:
                      </h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-0.5">
                        {predictionResult.disease.pencegahan.map(
                          (item, index) => (
                            <li key={`prev-${index}`}>{item}</li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                  {hasPengendalian && (
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-1">
                        {hasPencegahan ? 'Pengendalian:' : 'Perawatan:'}
                      </h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-0.5">
                        {predictionResult.disease.pengendalian.map(
                          (item, index) => (
                            <li key={`ctrl-${index}`}>{item}</li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            <DialogFooter className="mt-6 flex flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="w-full sm:w-auto cursor-pointer"
              >
                Tutup
              </Button>
              {!isViewMode && predictionResult.disease.name !== 'Healthy' && (
                <Button
                  onClick={onSaveDiagnosis}
                  className="w-full sm:w-auto bg-green-700 hover:bg-green-800 cursor-pointer"
                  disabled={isSaving}
                >
                  <FaSave className="mr-2" />
                  {isSaving ? 'Menyimpan...' : 'Simpan Diagnosa'}
                </Button>
              )}
            </DialogFooter>
          </>
        );
      } else {
        const isConfidenceLow = predictionResult.confidence < 0.9;
        return (
          <>
            <DialogHeader className="mb-4 text-center">
              <FaInfoCircle className="text-blue-500 text-5xl mx-auto mb-3" />
              <DialogTitle className="text-2xl font-bold text-gray-800">
                Informasi Diagnosa
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-500">
                Tanaman:{' '}
                <span className="font-semibold capitalize">
                  {predictionResult.tanaman}
                </span>{' '}
                | Kemiripan:{' '}
                <span className="font-semibold">
                  {(predictionResult.confidence * 100).toFixed(1)}%
                </span>
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 py-4 text-center">
              {uploadedImage && (
                <img
                  src={uploadedImage}
                  alt="Tanaman yang didiagnosa"
                  className="w-full h-auto max-h-60 object-contain rounded-lg border border-gray-200 shadow-sm mb-4"
                />
              )}
              <p className="text-2xl font-bold text-gray-700">
                {isConfidenceLow
                  ? 'Penyakit tidak ditemukan'
                  : apiMessage || 'Tidak ada penyakit yang terdeteksi.'}
              </p>
              <p className="text-sm text-gray-500">
                Pastikan gambar yang diunggah jelas, fokus pada bagian tanaman
                yang diduga sakit, dan kondisi pencahayaan cukup.
              </p>
            </div>
            <DialogFooter className="mt-6">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="w-full cursor-pointer"
              >
                Tutup
              </Button>
              {!isViewMode && !isConfidenceLow && (
                <Button
                  onClick={onSaveDiagnosis}
                  className="w-full sm:w-auto bg-green-700 hover:bg-green-800"
                  disabled={isSaving}
                >
                  <FaSave className="mr-2" />
                  {isSaving ? 'Menyimpan...' : 'Simpan Diagnosa'}
                </Button>
              )}
            </DialogFooter>
          </>
        );
      }
    }
    return null;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto p-6">
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
};

export default PredictionResultDialog;
