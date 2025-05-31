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
import { FaExclamationCircle } from 'react-icons/fa';
import type { PredictionData } from '../lib/api/diagnosis';

interface PredictionResultDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  predictionResult: PredictionData | null;
  uploadedImage: string | null;
  isPredicting: boolean; // Pass this if you want a loading state *inside* the dialog when it's already open but fetching new data
  predictionError: string | null;
  onNavigateToFullResult: () => void;
}

const PredictionResultDialog: React.FC<PredictionResultDialogProps> = ({
  isOpen,
  onOpenChange,
  predictionResult,
  uploadedImage,
  isPredicting,
  predictionError,
  onNavigateToFullResult,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto p-6">
        {predictionResult ? (
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
                  Deskripsi Penyakit:
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {predictionResult.disease.deskripsi}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-1">
                  Kemungkinan Penyebab:
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {predictionResult.disease.penyebab}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">
                    Pencegahan:
                  </h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-0.5">
                    {predictionResult.disease.pencegahan.map((item, index) => (
                      <li key={`prev-${index}`}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">
                    Pengendalian:
                  </h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-0.5">
                    {predictionResult.disease.pengendalian.map(
                      (item, index) => (
                        <li key={`ctrl-${index}`}>{item}</li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>

            <DialogFooter className="mt-6 flex flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="w-full sm:w-auto cursor-pointer"
              >
                Tutup
              </Button>
              <Button
                onClick={onNavigateToFullResult}
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 cursor-pointer"
              >
                Lihat Detail & Solusi Lengkap
              </Button>
            </DialogFooter>
          </>
        ) : isPredicting ? (
          <div className="flex flex-col items-center justify-center h-48">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
            <p className="text-gray-600">Menganalisis gambar...</p>
          </div>
        ) : predictionError ? (
          <Alert variant="destructive">
            <FaExclamationCircle className="h-4 w-4" />
            <AlertTitle>Gagal Mendapatkan Hasil</AlertTitle>
            <AlertDescription>{predictionError}</AlertDescription>
          </Alert>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default PredictionResultDialog;
