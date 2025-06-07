
import React from 'react';
import {
  FaRegSquare,
  FaCheckSquare,
  FaSyringe,
  FaHistory,
} from 'react-icons/fa';
import type { ActivePlant } from '../utils/plantings';
import { Link } from 'react-router-dom';

interface GrowingPlantCardProps {
  plant: ActivePlant;
  onToggleChecklistItem: (
    plantId: string,
    checklistItemId: string,
    section: 'growing' | 'done'
  ) => void;
  onMarkAsDone: (plant: ActivePlant) => void;
  onDetectDisease: (plantId: string, plantType: string) => void;
  onViewDiagnosisHistory: (plantId: string) => void;
}

const GrowingPlantCard: React.FC<GrowingPlantCardProps> = ({
  plant,
  onToggleChecklistItem,
  onMarkAsDone,
  onDetectDisease,
  onViewDiagnosisHistory,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col gap-4">
      <div className="w-full mb-4">
        <img
          src={plant.imageUrl}
          alt={plant.localName}
          className="w-full h-48 object-cover rounded-md"
        />
      </div>
      <div className="w-full">
        <div className="flex flex-row justify-between items-center mb-3">
          <h3 className="text-xl font-bold text-[#323232] flex-grow text-left">
            {plant.localName}
          </h3>
          <button
            onClick={() => onMarkAsDone(plant)}
            className="bg-[#295F4E] text-white text-sm font-semibold py-1.5 px-3 rounded-md transition-transform hover:scale-105 whitespace-nowrap"
          >
            Tandai Selesai
          </button>
        </div>
        <h4 className="text-md font-semibold text-[#323232] mb-2 text-left">
          Checklist Perawatan:
        </h4>
        <ul className="space-y-2 text-sm text-[#323232] text-left">
          {plant.checklist.length > 0 ? (
            plant.checklist.map((item) => (
              <li
                key={item.id}
                className="flex items-center cursor-pointer"
                onClick={() =>
                  onToggleChecklistItem(plant.id, item.id, 'growing')
                }
              >
                {item.checked ? (
                  <FaCheckSquare className="mr-2 text-[#295F4E] text-lg" />
                ) : (
                  <FaRegSquare className="mr-2 text-gray-400 text-lg" />
                )}
                <span className={item.checked ? 'line-through text-gray-500' : ''}>
                  {item.text}
                </span>
              </li>
            ))
          ) : (
            <li>Tidak ada checklist perawatan</li>
          )}
        </ul>

        <div className="mt-4 flex flex-col gap-2">
          <Link
            to={`/diagnostics?plantingId=${plant.id}&plantType=${plant.tanaman}`}
            className="w-full bg-blue-600 text-white py-2 px-3 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center text-sm font-semibold"
            onClick={() => onDetectDisease(plant.id, plant.tanaman)}
          >
            <FaSyringe className="mr-2" /> Deteksi Penyakit
          </Link>
          {plant.diagnosisCount > 0 && (
            <button
              onClick={() => onViewDiagnosisHistory(plant.id)}
              className="w-full bg-gray-200 text-gray-700 py-2 px-3 rounded-md hover:bg-gray-300 transition-colors flex items-center justify-center text-sm font-semibold"
            >
              <FaHistory className="mr-2" /> Lihat Riwayat Diagnosa (
              {plant.diagnosisCount})
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GrowingPlantCard;
