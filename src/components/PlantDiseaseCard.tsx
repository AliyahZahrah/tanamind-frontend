import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { FaExclamationTriangle } from 'react-icons/fa';
import { Button } from './ui/button';

interface DiseasePreviewProps {
  id: string;
  name: string;
  scientificName: string;
  symptoms: string[];
  image: string;
  onDetailClick: (diseaseId: string) => void;
}

export function PlantDiseasePreview({
  id,
  name,
  scientificName,
  symptoms,
  image,
  onDetailClick,
}: DiseasePreviewProps) {
  const previewSymptoms = symptoms.slice(0, 3);

  return (
    <Card className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{name}</CardTitle>
        <CardDescription className="text-sm text-gray-500">
          {scientificName}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between">
        <div className="mb-3">
          <p className="font-medium text-sm mb-1">Gejala Awal:</p>
          <ul className="space-y-1 text-sm">
            {previewSymptoms.map((symptom, index) => (
              <li key={index} className="flex items-start gap-2">
                <FaExclamationTriangle className="text-amber-500 mt-1 flex-shrink-0" />
                <span>{symptom}</span>
              </li>
            ))}
            {symptoms.length > 3 && (
              <li className="text-gray-500 text-xs mt-1">
                ...dan banyak lagi.
              </li>
            )}
          </ul>
        </div>
        <Button
          variant="outline"
          className="w-full mt-4"
          onClick={() => onDetailClick(id)}
        >
          Lihat Detail
        </Button>
      </CardContent>
    </Card>
  );
}
