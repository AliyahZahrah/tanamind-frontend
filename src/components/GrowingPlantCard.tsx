import React from 'react';
import { FaRegSquare, FaCheckSquare } from 'react-icons/fa';
import { type ActivePlant } from '../utils/plantings';

interface GrowingPlantCardProps {
  plant: ActivePlant;
  onToggleChecklistItem: (
    plantId: string,
    checklistItemId: string,
    section: 'growing' | 'done'
  ) => void;
  onMarkAsDone: (plant: ActivePlant) => void;
}

const GrowingPlantCard: React.FC<GrowingPlantCardProps> = ({
  plant,
  onToggleChecklistItem,
  onMarkAsDone,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 flex flex-col sm:flex-row gap-4 items-center">
      <div className="w-full sm:w-1/3 flex-shrink-0">
        <img
          src={plant.image}
          alt={plant.name}
          className="w-full h-32 object-cover rounded-md"
        />
      </div>
      <div className="flex-1 w-full sm:w-2/3">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
          <h3 className="text-xl font-bold text-[#323232] flex-grow text-left">
            {plant.name}
          </h3>
          <button
            onClick={() => onMarkAsDone(plant)}
            className="bg-[#295F4E] text-white text-sm font-semibold py-1.5 px-3 rounded-md transition-transform hover:scale-105 whitespace-nowrap mt-2 sm:mt-0"
          >
            Tandai Selesai
          </button>
        </div>
        <h4 className="text-md font-semibold text-[#323232] mb-2 text-left">
          Checklist Perawatan:
        </h4>
        <ul className="space-y-2 text-sm text-[#323232] text-left">
          {plant.checklist.map((item) => (
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
              {item.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GrowingPlantCard;
