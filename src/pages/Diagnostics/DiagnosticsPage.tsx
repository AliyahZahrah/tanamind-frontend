
import type React from 'react';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaSearch, FaExclamationCircle } from 'react-icons/fa';

import DiagnosisHistory from '../../components/DiagnosisHistory';
import PlantSelector from '../../components/PlantSelectorDiagnostics';
import ImageUploader from '../../components/ImageUploader';
import PredictionResultDialog from '../../components/PredictionResultDialog';

import {
  diagnosisApi,
  type PredictionData,
  type ApiError,
  type SavedDiagnosisData,
} from '../../lib/api/diagnosis';
import { Alert, AlertDescription, AlertTitle } from '../../components/ui/alert';
import { useUser } from '../../hooks/use-user';
import { toast } from 'sonner';

type PlantType = 'cabai' | 'tomat' | 'selada' | null;

const DiagnosticsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useUser();

  const [selectedPlant, setSelectedPlant] = useState<PlantType>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isResultDialogOpen, setIsResultDialogOpen] = useState(false);
  const [predictionResult, setPredictionResult] =
    useState<PredictionData | null>(null);
  const [isPredicting, setIsPredicting] = useState(false);
  const [predictionError, setPredictionError] = useState<string | null>(null);
  const [apiMessage, setApiMessage] = useState<string | null>(null);
  const [isSavingDiagnosis, setIsSavingDiagnosis] = useState(false);

  const [diagnosisHistory, setDiagnosisHistory] = useState<
    SavedDiagnosisData[]
  >([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [errorHistory, setErrorHistory] = useState<string | null>(null);

  const plants = [
    {
      id: 'cabai' as const,
      name: 'Cabai',
      icon: '🌶️',
      color: 'bg-red-100 hover:bg-red-200 border-red-300',
      selectedColor: 'bg-red-500 text-white',
    },
    {
      id: 'tomat' as const,
      name: 'Tomat',
      icon: '🍅',
      color: 'bg-red-100 hover:bg-red-200 border-red-300',
      selectedColor: 'bg-red-500 text-white',
    },
    {
      id: 'selada' as const,
      name: 'Selada',
      icon: '🥬',
      color: 'bg-green-100 hover:bg-green-200 border-green-300',
      selectedColor: 'bg-green-500 text-white',
    },
  ];

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const plantType = queryParams.get('plantType');

    if (plantType && plants.some((p) => p.id === plantType.toLowerCase())) {
      setSelectedPlant(plantType.toLowerCase() as PlantType);
    }
  }, [location.search, plants]);

  const fetchDiagnosisHistory = useCallback(async () => {
    if (!isAuthenticated || !user?.id) {
      setIsLoadingHistory(false);
      return;
    }
    setIsLoadingHistory(true);
    setErrorHistory(null);
    try {
      const history = await diagnosisApi.getDiagnosisHistoryByUser(user.id);
      setDiagnosisHistory(history);
    } catch (err: any) {
      setErrorHistory(err.message || 'Gagal memuat riwayat diagnosa.');
    } finally {
      setIsLoadingHistory(false);
    }
  }, [isAuthenticated, user?.id]);

  useEffect(() => {
    fetchDiagnosisHistory();
  }, [fetchDiagnosisHistory]);

  const resetForm = () => {
    setSelectedPlant(null);
    setUploadedImage(null);
    setUploadedFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setPredictionResult(null);
    setPredictionError(null);
    setApiMessage(null);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Ukuran file maksimal adalah 5MB');
        return;
      }
      setIsUploading(true);
      setUploadedFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        setIsUploading(false);
      };
      reader.onerror = () => {
        setIsUploading(false);
        toast.error('Gagal membaca file gambar.');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleTakePhoto = () => {
    setIsUploading(true);
    setUploadedFileName('camera_capture.jpg');
    setTimeout(() => {
      setUploadedImage('/img/placeholder-plant.jpg');
      setIsUploading(false);
    }, 1500);
  };

  const handleEditImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setUploadedImage(null);
    setUploadedFileName('');
    setIsUploading(false);
  };

  const handleStartDiagnosis = async () => {
    if (!selectedPlant || !fileInputRef.current?.files?.[0]) {
      toast.error('Pilih tanaman dan unggah foto terlebih dahulu');
      return;
    }
    if (!isAuthenticated || !user?.id) {
      toast.error('Anda harus login untuk melakukan diagnosa.');
      return;
    }

    setIsPredicting(true);
    setPredictionError(null);
    setPredictionResult(null);
    setApiMessage(null);

    try {
      const file = fileInputRef.current.files[0];
      const response = await diagnosisApi.predict(selectedPlant, file);

      if (response.status === 200 && response.data) {
        setPredictionResult(response.data);
        setApiMessage(response.message);
        setIsResultDialogOpen(true);
      } else {
        setPredictionError(
          response.message || 'Gagal mendapatkan hasil diagnosa.'
        );
        setPredictionResult(null);
      }
    } catch (error: any) {
      const apiErr = error as ApiError;
      console.error('Prediction error:', apiErr);
      setPredictionError(
        apiErr.message || 'Gagal melakukan diagnosa. Silakan coba lagi.'
      );
      setPredictionResult(null);
    } finally {
      setIsPredicting(false);
    }
  };

  const handleSaveDiagnosis = async () => {
    if (!predictionResult || !user?.id || !fileInputRef.current?.files?.[0]) {
      toast.error('Tidak ada hasil diagnosa atau informasi user.');
      return;
    }

    setIsSavingDiagnosis(true);
    try {
      const file = fileInputRef.current.files[0];
      await diagnosisApi.saveDiagnosisResult(
        user.id,
        predictionResult.tanaman as 'TOMAT' | 'CABAI' | 'SELADA',
        predictionResult.disease?.name || 'Healthy',
        predictionResult.confidence,
        file
      );
      toast.success('Diagnosa berhasil disimpan!');
      setIsResultDialogOpen(false);
      resetForm();
      fetchDiagnosisHistory();
    } catch (err: any) Gagal menyimpan diagnosa.`);
    } finally {
      setIsSavingDiagnosis(false);
    }
  };

  const handleNavigateToFullResult = () => {
    if (predictionResult && predictionResult.disease && uploadedImage) {
      const queryParams = new URLSearchParams();
      queryParams.append('diseaseId', predictionResult.disease.id);
      queryParams.append('plantType', predictionResult.tanaman);
      queryParams.append('confidence', predictionResult.confidence.toString());
      queryParams.append('image', encodeURIComponent(uploadedImage));

      navigate(`/diagnostics-result?${queryParams.toString()}`);
      setIsResultDialogOpen(false);
    }
  };

  const handleDialogOnOpenChange = (isOpen: boolean) => {
    setIsResultDialogOpen(isOpen);
    if (!isOpen) {
      resetForm();
    }
  };

  const handleViewDetailHistory = (diagnosisId: string) => {
    console.log('Viewing diagnosis detail from history:', diagnosisId);
    toast.info(`Menampilkan detail diagnosa ${diagnosisId} dari history`);
  };

  const canStartDiagnosis =
    selectedPlant && uploadedImage && !isUploading && !isPredicting;

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-[#6db1934c] p-4 md:p-8">
        <div className="container mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8 mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-2xl font-bold text-gray-800">
                Diagnosa Penyakit Tanaman
              </h1>
              <img src="/icons/detection.png" alt="Detection Icon" data-ai-hint="detection disease" className="w-6 h-6" />
            </div>

            <p className="text-gray-600 mb-8">
              Unggah foto tanaman Anda yang sakit untuk mendapatkan diagnosa
              awal dan saran penanganan.
            </p>

            <PlantSelector
              plants={plants}
              selectedPlant={selectedPlant}
              onSelectPlant={setSelectedPlant}
            />

            <ImageUploader
              uploadedImage={uploadedImage}
              isUploading={isUploading}
              uploadedFileName={uploadedFileName}
              fileInputRef={fileInputRef}
              onFileUpload={handleFileUpload}
              onUploadClick={handleUploadClick}
              onTakePhoto={handleTakePhoto}
              onEditImage={handleEditImage}
            />

            {predictionError &&
              !isResultDialogOpen &&
              (!predictionResult || predictionResult?.disease !== null) && (
                <Alert variant="destructive" className="mb-6">
                  <FaExclamationCircle className="h-4 w-4" />
                  <AlertTitle>Error Diagnosa</AlertTitle>
                  <AlertDescription>{predictionError}</AlertDescription>
                </Alert>
              )}

            <div className="text-center">
              <button
                onClick={handleStartDiagnosis}
                disabled={!canStartDiagnosis || isPredicting}
                className={`py-3 px-8 rounded-md font-semibold text-base transition-all duration-200 flex items-center justify-center gap-2 mx-auto cursor-pointer ${
                  canStartDiagnosis && !isPredicting
                    ? 'bg-green-700 text-white hover:bg-green-800 hover:scale-105 shadow-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <FaSearch />
                {isPredicting
                  ? 'Mendiagnosa...'
                  : isUploading
                  ? 'Menunggu Upload...'
                  : 'Mulai Diagnosa'}
              </button>

              {!selectedPlant && !isPredicting && (
                <p className="text-sm text-red-500 mt-2">
                  Pilih jenis tanaman terlebih dahulu.
                </p>
              )}
              {selectedPlant &&
                !uploadedImage &&
                !isUploading &&
                !isPredicting && (
                  <p className="text-sm text-red-500 mt-2">
                    Unggah foto tanaman untuk memulai diagnosa.
                  </p>
                )}
            </div>
          </div>

          <div className="mt-10">
            <DiagnosisHistory
              historyData={diagnosisHistory}
              isLoading={isLoadingHistory}
              error={errorHistory}
              onViewDetail={handleViewDetailHistory}
            />
          </div>
        </div>
      </main>

      <PredictionResultDialog
        isOpen={isResultDialogOpen}
        onOpenChange={handleDialogOnOpenChange}
        predictionResult={predictionResult}
        apiMessage={apiMessage}
        uploadedImage={uploadedImage}
        isPredicting={isPredicting}
        predictionError={predictionError}
        onNavigateToFullResult={handleNavigateToFullResult}
        onSaveDiagnosis={handleSaveDiagnosis}
        isSaving={isSavingDiagnosis}
      />
    </div>
  );
};

export default DiagnosticsPage;
