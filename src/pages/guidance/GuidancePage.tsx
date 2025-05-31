import React, { useState, useEffect } from 'react';

import { Book, Info, ShieldCheck, AlertCircle } from 'lucide-react';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '../../components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../../components/ui/dialog';

import { PlantDiseasePreview } from '../../components/PlantDiseaseCard';
import { PlantTipsCard } from '../../components/PlantTipsCard'; // Pastikan ini adalah nama yang benar

import { diseaseApi } from '../../lib/api/disease';
import { plantInfo, tips, type PlantTab } from '../../utils/plantData';

interface Disease {
  id: string;
  label: string;
  name: string;
  penyebab: string;
  deskripsi: string;
  pencegahan: string[];
  pengendalian: string[];
  tanaman: 'TOMAT' | 'SELADA' | 'CABAI';
}

const GuidancePage: React.FC = () => {
  const [allDiseases, setAllDiseases] = useState<Disease[]>([]);
  const [isLoadingDiseases, setIsLoadingDiseases] = useState(true);
  const [errorDiseases, setErrorDiseases] = useState<string | null>(null);

  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedDiseaseDetail, setSelectedDiseaseDetail] =
    useState<Disease | null>(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [errorDetail, setErrorDetail] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiseasesData = async () => {
      try {
        setIsLoadingDiseases(true);
        const data = await diseaseApi.getDiseases();
        setAllDiseases(data);
      } catch (err: any) {
        setErrorDiseases(
          err.response?.data?.message ||
            err.message ||
            'Gagal memuat data penyakit'
        );
      } finally {
        setIsLoadingDiseases(false);
      }
    };
    fetchDiseasesData();
  }, []);

  const handleOpenDetailDialog = async (diseaseId: string) => {
    setIsDetailDialogOpen(true);
    setIsLoadingDetail(true);
    setErrorDetail(null);
    setSelectedDiseaseDetail(null);

    try {
      const data = await diseaseApi.getDiseaseById(diseaseId);
      setSelectedDiseaseDetail(data);
    } catch (err: any) {
      setErrorDetail(
        err.response?.data?.message ||
          err.message ||
          'Gagal memuat detail penyakit.'
      );
    } finally {
      setIsLoadingDetail(false);
    }
  };

  const getDiseasesForPlant = (plantName: PlantTab) => {
    return allDiseases.filter(
      (disease) => disease.tanaman.toLowerCase() === plantName.toLowerCase()
    );
  };

  const getDiseaseImage = (diseaseLabel: string) => {
    const formattedLabel = diseaseLabel.toLowerCase().replace(/_/g, '-');
    return `/images/diseases/${formattedLabel}.png`;
  };

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

            <Tabs defaultValue="selada" className="w-full">
              <TabsList
                className="grid w-full grid-cols-3 p-1 rounded-full border border-gray-200"
                style={{ backgroundColor: '#F7F7F2' }}
              >
                <TabsTrigger
                  value="cabai"
                  className="rounded-full data-[state=active]:bg-[#FF6B35] data-[state=active]:text-white data-[state=active]:shadow-sm data-[state=active]:font-semibold text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Cabai
                </TabsTrigger>
                <TabsTrigger
                  value="selada"
                  className="rounded-full data-[state=active]:bg-[#FF6B35] data-[state=active]:text-white data-[state=active]:shadow-sm data-[state=active]:font-semibold text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Selada
                </TabsTrigger>
                <TabsTrigger
                  value="tomat"
                  className="rounded-full data-[state=active]:bg-[#FF6B35] data-[state=active]:text-white data-[state=active]:shadow-sm data-[state=active]:font-semibold text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Tomat
                </TabsTrigger>
              </TabsList>

              <TabsContent value="cabai" className="space-y-6 pt-4">
                <div className="flex flex-col md:flex-row gap-6 mb-10">
                  <div className="md:w-1/3">
                    <img
                      src={plantInfo.cabai.image}
                      alt={plantInfo.cabai.name}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                  <div className="md:w-2/3">
                    <h2 className="text-2xl font-bold mb-4">
                      {plantInfo.cabai.name}
                    </h2>
                    <p className="text-gray-700 mb-4">
                      {plantInfo.cabai.description}
                    </p>
                  </div>
                </div>

                <h2 className="text-xl font-bold text-center mb-6">
                  Jenis-Jenis Penyakit Tanaman {plantInfo.cabai.name}
                </h2>
                {isLoadingDiseases ? (
                  <div className="text-center text-gray-600">
                    Memuat penyakit...
                  </div>
                ) : errorDiseases ? (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{errorDiseases}</AlertDescription>
                  </Alert>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {getDiseasesForPlant('cabai').length > 0 ? (
                      getDiseasesForPlant('cabai').map((disease) => (
                        <PlantDiseasePreview
                          key={disease.id}
                          id={disease.id}
                          name={disease.name}
                          scientificName={disease.penyebab}
                          symptoms={disease.deskripsi
                            .split(/[.!?]\s*/)
                            .filter((s) => s.trim() !== '')
                            .slice(0, 2)}
                          image={getDiseaseImage(disease.label)}
                          onDetailClick={handleOpenDetailDialog}
                        />
                      ))
                    ) : (
                      <div className="text-center text-gray-600 col-span-full">
                        Tidak ada data penyakit untuk {plantInfo.cabai.name}.
                      </div>
                    )}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="selada" className="space-y-6 pt-4">
                <div className="flex flex-col md:flex-row gap-6 mb-10">
                  <div className="md:w-1/3">
                    <img
                      src={plantInfo.selada.image}
                      alt={plantInfo.selada.name}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                  <div className="md:w-2/3">
                    <h2 className="text-2xl font-bold mb-4">
                      {plantInfo.selada.name}
                    </h2>
                    <p className="text-gray-700 mb-4">
                      {plantInfo.selada.description}
                    </p>
                  </div>
                </div>

                <h2 className="text-xl font-bold text-center mb-6">
                  Jenis-Jenis Penyakit Tanaman {plantInfo.selada.name}
                </h2>
                {isLoadingDiseases ? (
                  <div className="text-center text-gray-600">
                    Memuat penyakit...
                  </div>
                ) : errorDiseases ? (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{errorDiseases}</AlertDescription>
                  </Alert>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {getDiseasesForPlant('selada').length > 0 ? (
                      getDiseasesForPlant('selada').map((disease) => (
                        <PlantDiseasePreview
                          key={disease.id}
                          id={disease.id}
                          name={disease.name}
                          scientificName={disease.penyebab}
                          symptoms={disease.deskripsi
                            .split(/[.!?]\s*/)
                            .filter((s) => s.trim() !== '')
                            .slice(0, 2)}
                          image={getDiseaseImage(disease.label)}
                          onDetailClick={handleOpenDetailDialog}
                        />
                      ))
                    ) : (
                      <div className="text-center text-gray-600 col-span-full">
                        Tidak ada data penyakit untuk {plantInfo.selada.name}.
                      </div>
                    )}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="tomat" className="space-y-6 pt-4">
                <div className="flex flex-col md:flex-row gap-6 mb-10">
                  <div className="md:w-1/3">
                    <img
                      src={plantInfo.tomat.image}
                      alt={plantInfo.tomat.name}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                  <div className="md:w-2/3">
                    <h2 className="text-2xl font-bold mb-4">
                      {plantInfo.tomat.name}
                    </h2>
                    <p className="text-gray-700 mb-4">
                      {plantInfo.tomat.description}
                    </p>
                  </div>
                </div>

                <h2 className="text-xl font-bold text-center mb-6">
                  Jenis-Jenis Penyakit Tanaman {plantInfo.tomat.name}
                </h2>
                {isLoadingDiseases ? (
                  <div className="text-center text-gray-600">
                    Memuat penyakit...
                  </div>
                ) : errorDiseases ? (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{errorDiseases}</AlertDescription>
                  </Alert>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {getDiseasesForPlant('tomat').length > 0 ? (
                      getDiseasesForPlant('tomat').map((disease) => (
                        <PlantDiseasePreview
                          key={disease.id}
                          id={disease.id}
                          name={disease.name}
                          scientificName={disease.penyebab}
                          symptoms={disease.deskripsi
                            .split(/[.!?]\s*/)
                            .filter((s) => s.trim() !== '')
                            .slice(0, 2)}
                          image={getDiseaseImage(disease.label)}
                          onDetailClick={handleOpenDetailDialog}
                        />
                      ))
                    ) : (
                      <div className="text-center text-gray-600 col-span-full">
                        Tidak ada data penyakit untuk {plantInfo.tomat.name}.
                      </div>
                    )}
                  </div>
                )}
              </TabsContent>
            </Tabs>

            <div className="py-12">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
                Tips Pencegahan Umum
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mx-auto">
                {tips.map((tip) => (
                  <PlantTipsCard
                    key={tip.id}
                    icon={tip.icon}
                    title={tip.title}
                    description={tip.description}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isLoadingDetail
                ? 'Memuat...'
                : selectedDiseaseDetail?.name || 'Detail Penyakit'}
            </DialogTitle>
            <DialogDescription>
              {isLoadingDetail
                ? 'Memuat informasi detail...'
                : selectedDiseaseDetail?.penyebab ||
                  'Data detail tidak tersedia.'}
            </DialogDescription>
          </DialogHeader>
          {isLoadingDetail ? (
            <div className="flex justify-center items-center h-48">
              <p>Memuat detail...</p>
            </div>
          ) : errorDetail ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errorDetail}</AlertDescription>
            </Alert>
          ) : selectedDiseaseDetail ? (
            <div className="space-y-4 py-4">
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Book className="h-5 w-5 text-blue-500" /> Deskripsi
                </h3>
                <p className="text-gray-700">
                  {selectedDiseaseDetail.deskripsi}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2 mt-4">
                  <Info className="h-5 w-5 text-purple-500" /> Penyebab
                </h3>
                <p className="text-gray-700">
                  {selectedDiseaseDetail.penyebab}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2 mt-4">
                  <ShieldCheck className="h-5 w-5 text-green-500" /> Pencegahan
                </h3>
                <ul className="list-disc list-inside text-gray-700">
                  {selectedDiseaseDetail.pencegahan?.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2 mt-4">
                  <ShieldCheck className="h-5 w-5 text-red-500" /> Pengendalian
                </h3>
                <ul className="list-disc list-inside text-gray-700">
                  {selectedDiseaseDetail.pengendalian?.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center h-48">
              <p>Tidak ada detail penyakit yang dipilih.</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GuidancePage;
