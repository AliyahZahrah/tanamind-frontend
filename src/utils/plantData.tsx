import {
  FaSeedling,
  FaLeaf,
  FaTint,
  FaWind,
  FaBroom,
  FaSync,
} from 'react-icons/fa';

export type PlantTab = 'cabai' | 'selada' | 'tomat';

export interface PlantInfo {
  name: string;
  scientificName: string;
  description: string;
  image: string;
}

export const plantInfo: Record<PlantTab, PlantInfo> = {
  cabai: {
    name: 'Cabai',
    scientificName: 'Capsicum annuum L.',
    description:
      'Cabai (Capsicum annuum L.) adalah sejenis tumbuhan yang termasuk dalam genus Capsicum. Cabai dapat tumbuh dan berkembang dengan baik di daerah tropis. Karakteristik tanaman cabai memiliki batang berkayu, bercabang, dan tingginya dapat mencapai 2 meter. Cabai memiliki rasa pedas yang disebabkan oleh senyawa capsaicin. Selain sebagai bumbu masak, cabai juga memiliki banyak manfaat untuk kesehatan. Kaya Vitamin C, Vitamin A, serta sejumlah mineral seperti magnesium, zat besi, dan kalium. Cabai sangat baik untuk meningkatkan masa metabolisme tubuh.',
    image: '/img/cabai.png',
  },
  selada: {
    name: 'Selada',
    scientificName: 'Lactuca sativa',
    description:
      'Selada (Lactuca sativa) adalah sayuran hijau yang umum ditanam sebagai tanaman pangan. Selada kaya nutrisi, termasuk dalam kategori sumber serat makanan yang baik, vitamin A, vitamin K, kalsium, magnesium, dan potasium. Selada memiliki berbagai jenis, seperti selada romaine, selada iceberg, dan selada butterhead. Selada sangat populer dalam salad, sandwich, dan hidangan lainnya.',
    image: '/img/selada.png',
  },
  tomat: {
    name: 'Tomat',
    scientificName: 'Solanum lycopersicum',
    description:
      'Tomat (Solanum lycopersicum) adalah tumbuhan dari keluarga Solanaceae, buahnya adalah salah satu sayuran yang paling populer di dunia. Buah tomat memiliki berbagai bentuk, ukuran, dan warna, umumnya merah saat matang. Tomat kaya akan vitamin C, vitamin K, folat, dan potasium. Likopen, antioksidan kuat, juga banyak ditemukan pada tomat. Tomat digunakan dalam berbagai hidangan, dari salad segar hingga saus dan sup.',
    image: '/img/tomat.png',
  },
};

export const tips = [
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
