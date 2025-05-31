'use client';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaSave,
  FaArrowLeft,
  FaLeaf,
  FaThermometerHalf,
  FaTint,
  FaSun,
} from 'react-icons/fa';
import Navbar from '../../components/Navbar';

interface DiagnosisResult {
  id: string;
  plantType: string;
  diseaseName: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high';
  status: 'healthy' | 'diseased';
  image: string;
  diagnosisDate: string;
  symptoms: string[];
  causes: string[];
  treatments: string[];
  prevention: string[];
  environmentalFactors: {
    temperature: string;
    humidity: string;
    lighting: string;
    watering: string;
  };
}

const DiagnosisResultsPage = () => {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);

  // Mock diagnosis result data - in real app, this would come from props/state/API
  const diagnosisResult: DiagnosisResult = {
    id: 'diag_001',
    plantType: 'Cabai',
    diseaseName: 'Early Blight',
    confidence: 87,
    severity: 'medium',
    status: 'diseased',
    image: '/placeholder.svg?height=300&width=400&text=Cabai+Early+Blight',
    diagnosisDate: '15 Mei 2025, 10:30',
    symptoms: [
      'Bercak coklat dengan lingkaran target pada daun',
      'Daun menguning dan layu',
      'Bercak mulai dari daun bagian bawah',
      'Pertumbuhan tanaman terhambat',
    ],
    causes: [
      'Kelembaban tinggi (>80%)',
      'Sirkulasi udara yang buruk',
      'Penyiraman berlebihan pada daun',
      'Suhu hangat (24-29°C)',
    ],
    treatments: [
      'Aplikasikan fungisida berbahan aktif chlorothalonil',
      'Pangkas daun yang terinfeksi dan buang',
      'Tingkatkan sirkulasi udara di sekitar tanaman',
      'Kurangi kelembaban dengan pengaturan ventilasi',
      'Siram pada pagi hari dan hindari membasahi daun',
    ],
    prevention: [
      'Jaga jarak tanam yang cukup (30-40 cm)',
      'Rotasi tanaman setiap musim',
      'Gunakan mulsa untuk mencegah percikan air tanah',
      'Monitor kelembaban secara rutin',
      'Aplikasi fungisida preventif setiap 2 minggu',
    ],
    environmentalFactors: {
      temperature: '25-27°C (Optimal)',
      humidity: '60-70% (Recommended)',
      lighting: '6-8 jam sinar matahari langsung',
      watering: 'Pagi hari, hindari daun basah',
    },
  };

  const handleSaveResults = async () => {
    setIsSaving(true);

    try {
      // Simulate API call to save diagnosis results
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // In real app, you would:
      // 1. Save to database
      // 2. Add to user's plant collection
      // 3. Create treatment schedule

      console.log('Saving diagnosis results:', diagnosisResult);

      // Redirect to plantings page
      navigate('/plantings');
    } catch (error) {
      console.error('Error saving results:', error);
      alert('Gagal menyimpan hasil diagnosa. Silakan coba lagi.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleBackToDiagnosis = () => {
    navigate('/diagnostics');
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'text-green-600 bg-green-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'high':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    return status === 'healthy' ? (
      <FaCheckCircle className="text-green-500" />
    ) : (
      <FaExclamationTriangle className="text-red-500" />
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 bg-[#d8ede3] py-6">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-8 max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={handleBackToDiagnosis}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <FaArrowLeft />
                <span>Kembali ke Diagnosa</span>
              </button>

              <div className="text-sm text-gray-500">
                {diagnosisResult.diagnosisDate}
              </div>
            </div>

            {/* Main Results */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Image and Basic Info */}
              <div>
                <img
                  src={diagnosisResult.image || '/placeholder.svg'}
                  alt={`${diagnosisResult.plantType} diagnosis`}
                  className="w-full h-64 object-cover rounded-lg shadow-md mb-4"
                />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Jenis Tanaman:</span>
                    <span className="font-medium">
                      {diagnosisResult.plantType}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Status:</span>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(diagnosisResult.status)}
                      <span className="font-medium capitalize">
                        {diagnosisResult.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Tingkat Keyakinan:</span>
                    <span className="font-medium">
                      {diagnosisResult.confidence}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Diagnosis Details */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <h1 className="text-2xl font-bold text-gray-800">
                    {diagnosisResult.diseaseName}
                  </h1>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(
                      diagnosisResult.severity
                    )}`}
                  >
                    {diagnosisResult.severity.toUpperCase()}
                  </span>
                </div>

                {/* Environmental Factors */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="font-bold text-gray-800 mb-3">
                    Kondisi Lingkungan Optimal
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <FaThermometerHalf className="text-red-500" />
                      <span>
                        {diagnosisResult.environmentalFactors.temperature}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaTint className="text-blue-500" />
                      <span>
                        {diagnosisResult.environmentalFactors.humidity}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaSun className="text-yellow-500" />
                      <span>
                        {diagnosisResult.environmentalFactors.lighting}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaLeaf className="text-green-500" />
                      <span>
                        {diagnosisResult.environmentalFactors.watering}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Confidence Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Tingkat Keyakinan Diagnosa</span>
                    <span>{diagnosisResult.confidence}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${diagnosisResult.confidence}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Information Tabs */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Symptoms */}
              <div className="bg-red-50 rounded-lg p-4">
                <h3 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                  <FaExclamationTriangle className="text-red-600" />
                  Gejala
                </h3>
                <ul className="space-y-2 text-sm">
                  {diagnosisResult.symptoms.map((symptom, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span>{symptom}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Causes */}
              <div className="bg-orange-50 rounded-lg p-4">
                <h3 className="font-bold text-orange-800 mb-3">Penyebab</h3>
                <ul className="space-y-2 text-sm">
                  {diagnosisResult.causes.map((cause, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span>{cause}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Treatments */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-bold text-blue-800 mb-3">Penanganan</h3>
                <ul className="space-y-2 text-sm">
                  {diagnosisResult.treatments.map((treatment, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>{treatment}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prevention */}
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-bold text-green-800 mb-3">Pencegahan</h3>
                <ul className="space-y-2 text-sm">
                  {diagnosisResult.prevention.map((prevention, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span>{prevention}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleBackToDiagnosis}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Diagnosa Ulang
              </button>

              <button
                onClick={handleSaveResults}
                disabled={isSaving}
                className={`px-8 py-3 rounded-md font-medium transition-all duration-200 flex items-center gap-2 ${
                  isSaving
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    : 'bg-green-700 text-white hover:bg-green-800 hover:scale-105 shadow-lg'
                }`}
              >
                <FaSave />
                {isSaving ? 'Menyimpan...' : 'Simpan ke Koleksi Tanaman'}
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white py-4 text-center text-gray-600 text-sm">
        Kelompok CC25-CF338 @ Capstone Project Coding Camp 2025
      </footer>
    </div>
  );
};

export default DiagnosisResultsPage;
