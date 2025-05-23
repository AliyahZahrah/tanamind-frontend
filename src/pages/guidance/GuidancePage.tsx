'use client';

import { useState } from 'react';
import { FaRegCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import {
  MdDashboard,
  MdExplore,
  MdGridView,
  MdSettings,
  MdPerson,
} from 'react-icons/md';

type PlantTab = 'cabai' | 'selada' | 'tomat';

type Disease = {
  id: string;
  name: string;
  scientificName: string;
  symptoms: string[];
  management: string[];
};

const GuidancePage = () => {
  const [activeTab, setActiveTab] = useState<PlantTab>('cabai');

  const diseases: Record<string, Disease[]> = {
    cabai: [
      {
        id: 'bercak-daun',
        name: 'Bercak daun',
        scientificName: 'Cercospora capsici',
        symptoms: [
          'Bercak berbentuk bulat/tidak teratur',
          'Daun berbintik dan mudah gugur',
        ],
        management: [
          'Pemangkasan daun terinfeksi',
          'Semprot fungisida',
          'Hindari penyiraman dari atas',
        ],
      },
      {
        id: 'early-blight',
        name: 'Early Blight',
        scientificName: 'Alternaria solani',
        symptoms: [
          'Bercak coklat dengan lingkaran target',
          'Muncul di daun bagian bawah',
        ],
        management: [
          'Rotasi tanaman',
          'Aplikasikan fungisida',
          'Hindari siram berlebihan',
        ],
      },
      {
        id: 'late-blight',
        name: 'Late Blight',
        scientificName: 'Phytophthora infestans',
        symptoms: ['Bercak gelap dengan', 'Serangan cepat saat lembab'],
        management: [
          'Aplikasi fungisida preventif',
          'Drainase memadai',
          'Kurangi kelembaban',
        ],
      },
      {
        id: 'leaf-mold',
        name: 'Leaf Mold',
        scientificName: 'Fulvia fulva',
        symptoms: ['Bercak kuning di atas daun', 'Lapisan jamur di bawah daun'],
        management: [
          'Tingkatkan sirkulasi udara',
          'Hindari penyiraman dari atas',
          'Aplikasi fungisida',
        ],
      },
      {
        id: 'bacterial-leaf-spot',
        name: 'Bacterial Leaf Spot',
        scientificName: 'Xanthomonas campestris',
        symptoms: ['Bercak kecil bertepi kuning', 'Daun menguning dan rontok'],
        management: [
          'Rotasi tanaman',
          'Aplikasikan bakterisida',
          'Hindari penyiraman dari atas',
        ],
      },
      {
        id: 'target-spot',
        name: 'Target Spot',
        scientificName: 'Corynespora cassiicola',
        symptoms: [
          'Bercak bulat dengan pola target',
          'Muncul di daun dan batang',
        ],
        management: [
          'Rotasi tanaman',
          'Hindari kelembaban tinggi',
          'Aplikasi fungisida',
        ],
      },
    ],
    selada: [],
    tomat: [],
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center">
            <nav className="flex items-center space-x-6">
              <a
                href="#"
                className="flex items-center gap-1 text-gray-600 hover:text-green-700"
              >
                <MdDashboard className="text-lg" />
                <span>Dashboard</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-1 bg-green-700 text-white px-3 py-1 rounded-md"
              >
                <MdExplore className="text-lg" />
                <span>Discover</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-1 text-gray-600 hover:text-green-700"
              >
                <MdGridView className="text-lg" />
                <span>Organizer</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-1 text-gray-600 hover:text-green-700"
              >
                <MdSettings className="text-lg" />
                <span>Settings</span>
              </a>
              <div className="flex items-center gap-2 text-gray-700">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <MdPerson className="text-lg" />
                </div>
                <span>User</span>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 bg-[#d8ede3] py-6">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Panduan Penanaman Hidroponik
            </h1>
            <p className="text-gray-600 mb-6">
              Klik tanaman yang ingin Anda ketahui untuk melihat panduan lengkap
              hidroponik, penyakit umum, dan cara penanganannya.
            </p>

            {/* Plant Tabs */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <button
                onClick={() => setActiveTab('cabai')}
                className={`py-3 rounded-md font-medium transition-colors ${
                  activeTab === 'cabai'
                    ? 'bg-orange-500 text-white'
                    : 'bg-orange-100 text-orange-800 hover:bg-orange-200'
                }`}
              >
                Cabai
              </button>
              <button
                onClick={() => setActiveTab('selada')}
                className={`py-3 rounded-md font-medium transition-colors ${
                  activeTab === 'selada'
                    ? 'bg-green-500 text-white'
                    : 'bg-green-100 text-green-800 hover:bg-green-200'
                }`}
              >
                Selada
              </button>
              <button
                onClick={() => setActiveTab('tomat')}
                className={`py-3 rounded-md font-medium transition-colors ${
                  activeTab === 'tomat'
                    ? 'bg-red-500 text-white'
                    : 'bg-red-100 text-red-800 hover:bg-red-200'
                }`}
              >
                Tomat
              </button>
            </div>

            {/* Plant Info */}
            <div className="flex flex-col md:flex-row gap-6 mb-10">
              <div className="md:w-1/3">
                <img
                  src="/placeholder.svg?height=300&width=400"
                  alt="Cabai"
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              <div className="md:w-2/3">
                <h2 className="text-2xl font-bold mb-4">Cabai</h2>
                <p className="text-gray-700 mb-4">
                  Cabai (Capsicum annuum L.) adalah sejenis tumbuhan yang
                  termasuk dalam genus Capsicum. Cabai dapat tumbuh dan
                  berkembang dengan baik di daerah tropis. Karakteristik tanaman
                  cabai memiliki batang berkayu, bercabang, dan tingginya dapat
                  mencapai 2 meter. Cabai memiliki rasa pedas yang disebabkan
                  oleh senyawa capsaicin. Selain sebagai bumbu masak, cabai juga
                  memiliki banyak manfaat untuk kesehatan. Kaya Vitamin C,
                  Vitamin A, serta sejumlah mineral seperti magnesium, zat besi,
                  dan kalium. Cabai sangat baik untuk meningkatkan masa
                  metabolisme tubuh.
                </p>
              </div>
            </div>

            {/* Disease Section */}
            <h2 className="text-xl font-bold text-center mb-6">
              Jenis-Jenis Penyakit Tanaman Cabai
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {diseases[activeTab].map((disease) => (
                <div
                  key={disease.id}
                  className="border rounded-lg overflow-hidden bg-white shadow-sm"
                >
                  <img
                    src={`/placeholder.svg?height=200&width=300&text=${disease.name}`}
                    alt={disease.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1">{disease.name}</h3>
                    <p className="text-sm text-gray-500 mb-3">
                      {disease.scientificName}
                    </p>

                    <div className="mb-3">
                      <p className="font-medium text-sm mb-1">Gejala:</p>
                      <ul className="space-y-1">
                        {disease.symptoms.map((symptom, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-sm"
                          >
                            <FaExclamationTriangle className="text-amber-500 mt-1 flex-shrink-0" />
                            <span>{symptom}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="font-medium text-sm mb-1">
                        Cara Penanganan:
                      </p>
                      <ul className="space-y-1">
                        {disease.management.map((step, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-sm"
                          >
                            <FaRegCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
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

export default GuidancePage;
