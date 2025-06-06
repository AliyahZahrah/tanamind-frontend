export interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
}

export interface PlantDetails {
  id: string;
  name: string;
  image: string;
  harvestTime: string;
  idealTemp: string;
  waterNeeds: string;
  buttonColor: string;
  checklist: ChecklistItem[];
}

export interface PlantingDataFromAPI {
  id: string;
  userId: string;
  tanaman: 'TOMAT' | 'CABAI' | 'SELADA';
  isDone: boolean;
  createdAt: string;
  updatedAt: string;
  diagnosisCount: number;
  lastDiagnosisDate: string | null;
}

export interface ActivePlant extends PlantingDataFromAPI {
  localName: string;
  imageUrl: string;
  harvestTime: string;
  idealTemp: string;
  waterNeeds: string;
  checklist: ChecklistItem[];
}
