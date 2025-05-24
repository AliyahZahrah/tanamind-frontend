'use client';

import type React from 'react';

import { useState, useRef } from 'react';
import { FaStethoscope, FaUpload, FaCamera, FaSearch } from 'react-icons/fa';
import { MdImage } from 'react-icons/md';
import DiagnosisHistory from '../../components/DiagnosisHistory';

type PlantType = 'cabai' | 'tomat' | 'selada' | null;

const DiagnosticsPage = () => {
  const [selectedPlant, setSelectedPlant] = useState<PlantType>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      setIsUploading(true);
      setUploadedFileName(file.name);

      // Simulate upload process
      setTimeout(() => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setUploadedImage(e.target?.result as string);
          setIsUploading(false);
        };
        reader.readAsDataURL(file);
      }, 1000); // Simulate 1 second upload time
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleTakePhoto = () => {
    // Simulate camera capture
    setIsUploading(true);
    setUploadedFileName('camera_capture.jpg');

    // Simulate camera process
    setTimeout(() => {
      // For demo purposes, use a placeholder image
      setUploadedImage(
        '/placeholder.svg?height=300&width=400&text=Camera+Photo'
      );
      setIsUploading(false);
    }, 1500); // Simulate 1.5 second camera capture time
  };

  const handleEditImage = () => {
    // Reset the file input and show options to re-upload or take new photo
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setUploadedImage(null);
    setUploadedFileName('');
    setIsUploading(false);
  };

  const handleStartDiagnosis = () => {
    if (!selectedPlant) {
      alert('Silakan pilih jenis tanaman terlebih dahulu');
      return;
    }
    if (!uploadedImage) {
      alert('Silakan unggah foto tanaman terlebih dahulu');
      return;
    }

    // TODO: Implement actual diagnosis logic
    // This would typically send the image to an AI service for analysis
    console.log(
      'Starting diagnosis for:',
      selectedPlant,
      'with image:',
      uploadedImage
    );
    alert(`Memulai diagnosa untuk tanaman ${selectedPlant}...`);

    // Navigate to results page or show loading state
    // Example: navigate('/diagnosis-results', { state: { plant: selectedPlant, image: uploadedImage } })
  };

  const handleViewDetail = (diagnosisId: string) => {
    // Navigate to diagnosis detail page
    console.log('Viewing diagnosis detail:', diagnosisId);
    alert(`Menampilkan detail diagnosa ${diagnosisId}`);
    // Example: navigate(`/diagnosis-detail/${diagnosisId}`)
  };

  const handleFilter = () => {
    // Open filter modal or dropdown
    console.log('Opening filter options');
    alert('Filter options: Tanggal, Jenis Penyakit, Status');
  };

  // Check if diagnosis can start
  const canStartDiagnosis = selectedPlant && uploadedImage && !isUploading;

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-[#d8ede3] py-6">
        <div className="container mx-auto px-2">
          <div className="bg-white rounded-lg shadow-sm p-8  mx-auto">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-2xl font-bold text-gray-800">
                Diagnosa Penyakit Tanaman
              </h1>
              <FaStethoscope className="text-green-600 text-2xl" />
            </div>

            <p className="text-gray-600 mb-8">
              Unggah foto tanaman Anda yang sakit untuk mendapatkan diagnosa
              awal dan saran penanganan.
            </p>

            {/* Plant Selection */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                Pilih Jenis Tanaman
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {plants.map((plant) => (
                  <button
                    key={plant.id}
                    onClick={() => setSelectedPlant(plant.id)}
                    className={`p-6 rounded-lg border-2 transition-all ${
                      selectedPlant === plant.id
                        ? plant.selectedColor
                        : `${plant.color} border-gray-200`
                    }`}
                  >
                    <div className="text-4xl mb-2">{plant.icon}</div>
                    <div className="font-medium">{plant.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Image Upload */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                Unggah Foto Tanaman
              </h2>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
                {isUploading ? (
                  <div className="space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                    <p className="text-gray-600">
                      Mengunggah {uploadedFileName}...
                    </p>
                  </div>
                ) : uploadedImage ? (
                  <div className="space-y-4">
                    <img
                      src={uploadedImage || '/placeholder.svg'}
                      alt="Uploaded plant"
                      className="max-w-full max-h-64 mx-auto rounded-lg shadow-md"
                    />
                    <div className="space-y-2">
                      <p className="text-sm text-green-600 font-medium">
                        ✓ Gambar berhasil diunggah
                      </p>
                      <p className="text-xs text-gray-500">
                        {uploadedFileName}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <MdImage className="text-6xl text-gray-400 mx-auto" />
                    <div>
                      <p className="text-gray-600 mb-2">
                        Tempel atau seret gambar di sini
                      </p>
                      <p className="text-sm text-gray-500">
                        PNG, JPG, atau JPEG (MAX. 5MB)
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Upload/Edit Buttons */}
              <div className="flex gap-4 mt-6 max-w-2xl mx-auto">
                {uploadedImage && !isUploading ? (
                  // Show Edit button when image is uploaded
                  <button
                    onClick={handleEditImage}
                    className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <FaUpload />
                    Edit Gambar
                  </button>
                ) : (
                  // Show Upload and Camera buttons when no image
                  <>
                    <button
                      onClick={handleUploadClick}
                      disabled={isUploading}
                      className={`flex-1 py-3 px-6 rounded-md transition-colors flex items-center justify-center gap-2 ${
                        isUploading
                          ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                          : 'bg-green-700 text-white hover:bg-green-800'
                      }`}
                    >
                      <FaUpload />
                      {isUploading ? 'Mengunggah...' : 'Unggah Gambar'}
                    </button>
                    <button
                      onClick={handleTakePhoto}
                      disabled={isUploading}
                      className={`flex-1 py-3 px-6 rounded-md transition-colors flex items-center justify-center gap-2 ${
                        isUploading
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-300'
                          : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <FaCamera />
                      {isUploading ? 'Mengambil...' : 'Ambil Gambar'}
                    </button>
                  </>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            {/* Start Diagnosis Button */}
            <div className="text-center">
              <button
                onClick={handleStartDiagnosis}
                disabled={!canStartDiagnosis}
                className={`py-3 px-8 rounded-md font-medium transition-all duration-200 flex items-center justify-center gap-2 mx-auto ${
                  canStartDiagnosis
                    ? 'bg-green-700 text-white hover:bg-green-800 hover:scale-105 shadow-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <FaSearch />
                {isUploading ? 'Menunggu Upload...' : 'Mulai Diagnosa'}
              </button>

              {!selectedPlant && (
                <p className="text-sm text-red-500 mt-2">
                  Pilih jenis tanaman terlebih dahulu
                </p>
              )}
              {selectedPlant && !uploadedImage && !isUploading && (
                <p className="text-sm text-red-500 mt-2">
                  Unggah foto tanaman untuk memulai diagnosa
                </p>
              )}
              {canStartDiagnosis && (
                <p className="text-sm text-green-600 mt-2">
                  Siap untuk memulai diagnosa!
                </p>
              )}
            </div>
          </div>

          <div className="mt-10">
            <DiagnosisHistory
              onViewDetail={handleViewDetail}
              onFilter={handleFilter}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DiagnosticsPage;
