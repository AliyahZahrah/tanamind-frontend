
'use client';

import React, { useState } from 'react';
import { FaClock, FaThermometerHalf, FaTint, FaRegSquare, FaCheckSquare, FaCheck } from 'react-icons/fa';

// Define interfaces for plant data
interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
}

interface Plant {
  id: string;
  name: string;
  image: string;
  harvestTime: string;
  idealTemp: string;
  waterNeeds: string;
  buttonColor: string;
  checklist: ChecklistItem[];
}

interface ActivePlant extends Plant {
  status: 'growing' | 'done';
}

// Initial data based on the provided image
const initialSelectablePlants: Plant[] = [
  {
    id: 'cabai',
    name: 'Cabai',
    image: '/img/cabai-plantings.png',
    harvestTime: '3-4 bulan',
    idealTemp: '25-30°C',
    waterNeeds: 'Sedang',
    buttonColor: 'bg-[#F05D23]',
    checklist: [
      { id: 'c1', text: 'Siapkan media tanam', checked: false },
      { id: 'c2', text: 'Semai benih', checked: false },
      { id: 'c3', text: 'Siram 2x sehari', checked: false },
      { id: 'c4', text: 'Pemupukan minggu ke-2', checked: false },
      { id: 'c5', text: 'Pengendalian hama', checked: false },
    ],
  },
  {
    id: 'selada',
    name: 'Selada',
    image: '/img/selada-plantings.png',
    harvestTime: '1-2 bulan',
    idealTemp: '15-20°C',
    waterNeeds: 'Tinggi',
    buttonColor: 'bg-[#295F4E]',
    checklist: [
      { id: 's1', text: 'Siapkan media tanam', checked: false },
      { id: 's2', text: 'Semai benih', checked: false },
      { id: 's3', text: 'Siram 1x sehari', checked: false },
      { id: 's4', text: 'Panen setelah 30 hari', checked: false },
    ],
  },
  {
    id: 'tomat',
    name: 'Tomat',
    image: '/img/tomat-plantings.png',
    harvestTime: '2-3 bulan',
    idealTemp: '20-25°C',
    waterNeeds: 'Sedang',
    buttonColor: 'bg-[#F05D23]',
    checklist: [
      { id: 't1', text: 'Siapkan media tanam', checked: false },
      { id: 't2', text: 'Semai benih', checked: false },
      { id: 't3', text: 'Siram 2x sehari', checked: false },
      { id: 't4', text: 'Pemupukan minggu ke-2', checked: false },
    ],
  },
];

const initialGrowingPlants: ActivePlant[] = [
  {
    ...initialSelectablePlants[0], // Cabai
    status: 'growing',
    // Keep original checklist, state will manage checked status
  },
  {
    ...initialSelectablePlants[1], // Selada
    status: 'growing',
     checklist: [ // Example: Selada's specific checklist from image
      { id: 's1g', text: 'Siapkan media tanam', checked: false },
      { id: 's2g', text: 'Semai benih', checked: false },
      { id: 's3g', text: 'Siram 1x sehari', checked: false },
      { id: 's4g', text: 'Panen setelah 30 hari', checked: false },
    ],
  },
];

const initialDonePlants: ActivePlant[] = [
  {
    ...initialSelectablePlants[2], // Tomat
    status: 'done',
    checklist: initialSelectablePlants[2].checklist.map(item => ({ ...item, checked: true })),
  },
];


const PlantingsPage = () => {
  const [selectablePlants, setSelectablePlants] = useState<Plant[]>(initialSelectablePlants);
  const [growingPlants, setGrowingPlants] = useState<ActivePlant[]>(initialGrowingPlants.map(p => ({
    ...p,
    checklist: p.checklist.map(c => ({...c})) // Deep copy checklist
  })));
  const [donePlants, setDonePlants] = useState<ActivePlant[]>(initialDonePlants.map(p => ({
    ...p,
    checklist: p.checklist.map(c => ({...c})) // Deep copy checklist
  })));

  const handleSelectPlant = (plant: Plant) => {
    alert(`Anda memilih ${plant.name}! Tanaman ini akan ditambahkan ke "Sedang Ditanam".`);
    // Basic logic: move plant to growing (more complex state management needed for full feature)
    // For demo, we just show an alert.
  };

  const handleToggleChecklistItem = (plantId: string, checklistItemId: string, section: 'growing' | 'done') => {
    const updatePlantChecklist = (prevPlants: ActivePlant[]) => 
      prevPlants.map(p => {
        if (p.id === plantId) {
          return {
            ...p,
            checklist: p.checklist.map(item =>
              item.id === checklistItemId ? { ...item, checked: !item.checked } : item
            ),
          };
        }
        return p;
      });

    if (section === 'growing') {
      setGrowingPlants(updatePlantChecklist);
    } else {
      setDonePlants(updatePlantChecklist);
    }
  };
  
  const handleMarkAsDone = (plant: ActivePlant) => {
    alert(`${plant.name} ditandai selesai!`);
    // Basic logic: move plant to done
  };

  const handleMarkAsNotDone = (plant: ActivePlant) => {
    alert(`${plant.name} ditandai belum selesai!`);
    // Basic logic: move plant to growing
  };


  return (
    <div className="min-h-screen bg-[#E9F3ED] py-8 px-4 md:px-8">
      {/* Section 1: Pilih Tanaman */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-[#323232] mb-2">Pilih Tanaman Yang Ingin Anda Tanam</h2>
        <p className="text-[#323232] mb-6">Mulai perjalanan berkebun Anda dengan memilih tanaman yang ingin ditanam</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectablePlants.map((plant) => (
            <div key={plant.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col">
              <img src={plant.image} alt={plant.name} data-ai-hint="vegetable plant" className="w-full h-48 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-bold text-[#323232] mb-3">{plant.name}</h3>
              <ul className="text-sm text-[#323232] space-y-2 mb-4 flex-grow">
                <li className="flex items-center"><FaClock className="mr-2 text-[#323232]" /> Waktu panen: {plant.harvestTime}</li>
                <li className="flex items-center"><FaThermometerHalf className="mr-2 text-[#323232]" /> Suhu ideal: {plant.idealTemp}</li>
                <li className="flex items-center"><FaTint className="mr-2 text-[#323232]" /> Kebutuhan Air: {plant.waterNeeds}</li>
              </ul>
              <button
                onClick={() => handleSelectPlant(plant)}
                className={`${plant.buttonColor} text-white font-semibold py-2 px-4 rounded-md w-full transition-transform hover:scale-105`}
              >
                Pilih {plant.name}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Sedang Ditanam */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-[#323232] mb-6">Sedang Ditanam</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {growingPlants.map((plant) => (
            <div key={plant.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
              <img src={plant.image} alt={plant.name} data-ai-hint="growing plant" className="w-full h-48 object-cover rounded-md mb-4" />
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-bold text-[#323232]">{plant.name}</h3>
                <button 
                  onClick={() => handleMarkAsDone(plant)}
                  className="bg-[#295F4E] text-white text-sm font-semibold py-2 px-3 rounded-md transition-transform hover:scale-105"
                >
                  Tandai Selesai
                </button>
              </div>
              <h4 className="text-md font-semibold text-[#323232] mb-2">Checklist Perawatan:</h4>
              <ul className="space-y-2 text-sm text-[#323232]">
                {plant.checklist.map((item) => (
                  <li key={item.id} className="flex items-center cursor-pointer" onClick={() => handleToggleChecklistItem(plant.id, item.id, 'growing')}>
                    {item.checked ? <FaCheckSquare className="mr-2 text-[#295F4E] text-lg" /> : <FaRegSquare className="mr-2 text-gray-400 text-lg" />}
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Selesai Ditanam */}
      <section>
        <h2 className="text-2xl font-bold text-[#323232] mb-6">Selesai Ditanam</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {donePlants.map((plant) => (
            <div key={plant.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
              <div className="relative mb-4">
                <img src={plant.image} alt={plant.name} data-ai-hint="harvested plant" className="w-full h-48 object-cover rounded-md" />
                <div className="absolute top-2 right-2 bg-green-500 p-2 rounded-full">
                  <img src="/icons/check.png" alt="Selesai" data-ai-hint="checkmark icon" className="w-4 h-4" />
                </div>
              </div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-bold text-[#323232]">{plant.name}</h3>
                <button 
                  onClick={() => handleMarkAsNotDone(plant)}
                  className="bg-[#F05D23] text-white text-sm font-semibold py-2 px-3 rounded-md transition-transform hover:scale-105"
                >
                  Tandai Belum
                </button>
              </div>
              <h4 className="text-md font-semibold text-[#323232] mb-2">Checklist Perawatan:</h4>
              <ul className="space-y-2 text-sm text-[#323232]">
                {plant.checklist.map((item) => (
                  <li key={item.id} className="flex items-center cursor-pointer" onClick={() => handleToggleChecklistItem(plant.id, item.id, 'done')}>
                     <FaCheckSquare className="mr-2 text-[#295F4E] text-lg" /> {/* Always checked for done plants based on initial state */}
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PlantingsPage;

    