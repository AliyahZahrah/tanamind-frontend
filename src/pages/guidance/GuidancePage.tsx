'use client';

import { useState } from 'react';
import {
  FaRegCheckCircle,
  FaExclamationTriangle,
  FaSeedling,
  FaLeaf,
  FaTint,
  FaWind,
  FaBroom,
  FaSync,
} from 'react-icons/fa';
import {
  MdDashboard,
  MdExplore,
  MdGridView,
  MdSettings,
  MdPerson,
} from 'react-icons/md';
import PlantTabButtonGroup from '../../components/PlantTabButton';

type PlantTab = 'cabai' | 'selada' | 'tomat';

type Disease = {
  id: string;
  name: string;
  scientificName: string;
  symptoms: string[];
  management: string[];
};

const GuidancePage = () => {
  const [activeTab, setActiveTab] = useState<'cabai' | 'selada' | 'tomat'>(
    'cabai'
  );

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

  const tips = [
    {
      id: 1,
      icon: <FaSeedling className="text-green-600 text-2xl" />,
      title: 'Pemilihan Bibit',
      description:
        'Gunakan bibit berkualitas dan bersertifikat untuk memastikan tanaman yang sehat dan produktif.',
    },
    {
      id: 2,
      icon: <FaLeaf className="text-green-600 text-2xl" />,
      title: 'Lingkungan Optimal',
      description:
        'Jaga sirkulasi udara dan kelembaban yang sesuai untuk pertumbuhan tanaman.',
    },
    {
      id: 3,
      icon: <FaTint className="text-blue-600 text-2xl" />,
      title: 'Penyiraman Tepat',
      description:
        'Siram tanaman di pagi atau sore hari untuk membantu akar dan daun menyerap air dengan optimal.',
    },
    {
      id: 4,
      icon: <FaWind className="text-gray-600 text-2xl" />,
      title: 'Sirkulasi Udara',
      description:
        'Pastikan jarak tanam cukup untuk sirkulasi udara yang baik antar tanaman.',
    },
    {
      id: 5,
      icon: <FaBroom className="text-orange-600 text-2xl" />,
      title: 'Pembersihan Rutin',
      description:
        'Bersihkan daun yang sakit atau tua untuk mencegah penyebaran penyakit.',
    },
    {
      id: 6,
      icon: <FaSync className="text-purple-600 text-2xl" />,
      title: 'Rotasi Tanaman',
      description:
        'Lakukan rotasi tanaman untuk memutus siklus hidup patogen dalam tanah.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-[#d8ede3] py-6">
        <div className="container mx-auto px-2">
          <div className="bg-[#F7F7F2] rounded-lg shadow-sm p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Panduan Penanaman Hidroponik
            </h1>
            <p className="text-gray-600 mb-6">
              Klik tanaman yang ingin Anda ketahui untuk melihat panduan lengkap
              hidroponik, penyakit umum, dan cara penanganannya.
            </p>

            {/* Plant Tabs */}
            <div className="p-6">
              <PlantTabButtonGroup
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />
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
            <div className="py-8">
              <div className=" mx-auto">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
                  Tips Pencegahan Umum
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mx-auto">
                  {tips.map((tip) => (
                    <div
                      key={tip.id}
                      className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 mt-1">{tip.icon}</div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-800 mb-2">
                            {tip.title}
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {tip.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GuidancePage;
