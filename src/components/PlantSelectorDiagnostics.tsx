import type React from 'react';

type PlantType = 'cabai' | 'tomat' | 'selada' | null;

interface PlantOption {
  id: PlantType;
  name: string;
  icon: string;
  color: string;
  selectedColor: string;
}

interface PlantSelectorProps {
  plants: PlantOption[];
  selectedPlant: PlantType | null;
  onSelectPlant: (plantId: PlantType) => void;
}

const PlantSelector: React.FC<PlantSelectorProps> = ({
  plants,
  selectedPlant,
  onSelectPlant,
}) => {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-bold text-gray-800 mb-4">
        Pilih Jenis Tanaman
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {plants.map((plant) => (
          <button
            key={plant.id}
            onClick={() => onSelectPlant(plant.id)}
            className={`p-4 sm:p-6 rounded-lg border-2 transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-50 cursor-pointer ${
              selectedPlant === plant.id
                ? `${plant.selectedColor} ring-2 ring-offset-2 ring-current`
                : `${plant.color} border-gray-200 hover:border-gray-400`
            }`}
          >
            <div className="text-3xl sm:text-4xl mb-2 mx-auto w-fit">
              {plant.icon}
            </div>
            <div className="font-medium text-sm sm:text-base">{plant.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PlantSelector;
