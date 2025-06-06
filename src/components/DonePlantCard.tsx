import React from 'react';
import { FaCheckSquare } from 'react-icons/fa';
import { type ActivePlant } from '../utils/plantings';

interface DonePlantCardProps {
  plant: ActivePlant;
  onToggleChecklistItem: (
    plantId: string,
    checklistItemId: string,
    section: 'growing' | 'done'
  ) => void;
  onMarkAsNotDone: (plant: ActivePlant) => void;
}

const DonePlantCard: React.FC<DonePlantCardProps> = ({
  plant,
  onToggleChecklistItem,
  onMarkAsNotDone,
}) => {
  return (
    <div
      key={plant.id}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
    >
      <div className="relative mb-4">
        <img
          src={plant.image}
          alt={plant.name}
          className="w-full h-48 object-cover rounded-md"
        />
        <div className="absolute top-2 right-2 bg-green-500 p-2 rounded-full">
          <img src="/icons/check.png" alt="Selesai" className="w-4 h-4" />
        </div>
      </div>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xl font-bold text-[#323232]">{plant.name}</h3>
        <button
          onClick={() => onMarkAsNotDone(plant)}
          className="bg-[#F05D23] text-white text-sm font-semibold py-2 px-3 rounded-md transition-transform hover:scale-105"
        >
          Tandai Belum
        </button>
      </div>
      <h4 className="text-md font-semibold text-[#323232] mb-2">
        Checklist Perawatan:
      </h4>
      <ul className="space-y-2 text-sm text-[#323232]">
        {plant.checklist.map((item) => (
          <li
            key={item.id}
            className="flex items-center cursor-pointer"
            onClick={() => onToggleChecklistItem(plant.id, item.id, 'done')}
          >
            <FaCheckSquare className="mr-2 text-[#295F4E] text-lg" />
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DonePlantCard;
