import { useState, useEffect, useCallback } from 'react';
import { useUser } from '../../hooks/use-user';
import { plantingApi } from '../../lib/api/planting';
import type { ActivePlant, PlantingDataFromAPI } from '../../utils/plantings';
import { plantInfo } from '../../utils/plantData';
import GrowingPlantCard from '../../components/GrowingPlantCard';
import DonePlantCard from '../../components/DonePlantCard';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';

const PlantingsPage = () => {
  const { user, isAuthenticated, isLoading: isLoadingUser } = useUser();
  const navigate = useNavigate();

  const [growingPlants, setGrowingPlants] = useState<ActivePlant[]>([]);
  const [donePlants, setDonePlants] = useState<ActivePlant[]>([]);
  const [isLoadingPlantings, setIsLoadingPlantings] = useState(true);
  const [errorPlantings, setErrorPlantings] = useState<string | null>(null);

  const fetchUserPlantings = useCallback(async () => {
    if (!isAuthenticated || !user?.id) {
      setIsLoadingPlantings(false);
      return;
    }

    setIsLoadingPlantings(true);
    setErrorPlantings(null);
    try {
      const fetchedPlantings: PlantingDataFromAPI[] =
        await plantingApi.getUserPlantings(user.id);

      const transformedPlantings: ActivePlant[] = fetchedPlantings.map((p) => {
        const localPlantData =
          plantInfo[p.tanaman.toLowerCase() as keyof typeof plantInfo];
        return {
          ...p,
          localName: localPlantData.name,
          imageUrl: localPlantData.image,
          harvestTime: 'N/A',
          idealTemp: 'N/A',
          waterNeeds: 'N/A',
          checklist: [
            {
              id: '1',
              text: `Periksa nutrisi (${p.tanaman.toLowerCase()})`,
              checked: false,
            },
            {
              id: '2',
              text: `Cek pH air (${p.tanaman.toLowerCase()})`,
              checked: false,
            },
            {
              id: '3',
              text: `Pangkas daun tua (${p.tanaman.toLowerCase()})`,
              checked: false,
            },
          ],
        };
      });

      setGrowingPlants(transformedPlantings.filter((p) => !p.isDone));
      setDonePlants(transformedPlantings.filter((p) => p.isDone));
    } catch (err: any) {
      setErrorPlantings(err.message || 'Gagal memuat daftar penanaman.');
    } finally {
      setIsLoadingPlantings(false);
    }
  }, [isAuthenticated, user?.id]);

  useEffect(() => {
    fetchUserPlantings();
  }, [fetchUserPlantings]);

  const handleToggleChecklistItem = (
    plantId: string,
    checklistItemId: string,
    section: 'growing' | 'done'
  ) => {
    const updatePlantChecklist = (prevPlants: ActivePlant[]) =>
      prevPlants.map((p) => {
        if (p.id === plantId) {
          return {
            ...p,
            checklist: p.checklist.map((item) =>
              item.id === checklistItemId
                ? { ...item, checked: !item.checked }
                : item
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

  const handleMarkAsDone = async (plant: ActivePlant) => {
    try {
      const loadingToast = toast.loading(
        `Menandai ${plant.localName} selesai...`
      );
      await plantingApi.completePlanting(plant.id);
      toast.dismiss(loadingToast);
      toast.success(`${plant.localName} berhasil ditandai selesai!`);
      fetchUserPlantings();
    } catch (err: any) {
      toast.error(err.message || `Gagal menandai ${plant.localName} selesai.`);
    }
  };

  const handleMarkAsNotDone = async (plant: ActivePlant) => {
    toast.info(
      `Fitur 'Tandai Belum Selesai' untuk ${plant.localName} belum diimplementasikan di backend.`
    );
  };

  const handleDetectDisease = (plantingId: string, plantType: string) => {
    navigate(`/diagnostics?plantingId=${plantingId}&plantType=${plantType}`);
  };

  const handleViewDiagnosisHistory = (plantingId: string) => {
    navigate(`/diagnostics/history/${plantingId}`);
    toast.info(
      `Mengarahkan ke riwayat diagnosa untuk penanaman ID: ${plantingId}`
    );
  };

  if (isLoadingUser || isLoadingPlantings) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600"></div>
        <p className="ml-4 text-lg text-gray-700">Memuat penanaman Anda...</p>
      </div>
    );
  }

  if (errorPlantings) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700">{errorPlantings}</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Akses Dibutuhkan
          </h2>
          <p className="text-gray-600 mb-6">
            Anda harus login untuk melihat daftar penanaman.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
          >
            Login Sekarang
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E9F3ED] py-8 px-4 md:px-8">
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-[#323232] mb-6">
          Sedang Ditanam
        </h2>
        {growingPlants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {growingPlants.map((plant) => (
              <GrowingPlantCard
                key={plant.id}
                plant={plant}
                onToggleChecklistItem={handleToggleChecklistItem}
                onMarkAsDone={handleMarkAsDone}
                onDetectDisease={handleDetectDisease}
                onViewDiagnosisHistory={handleViewDiagnosisHistory}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-600">
            <p className="text-lg font-semibold">
              Tidak ada tanaman yang sedang ditanam.
            </p>
            <p className="text-sm mt-2">
              Mulai menanam di halaman{' '}
              <Link to="/guidance" className="text-green-700 underline">
                Panduan
              </Link>
              !
            </p>
          </div>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-bold text-[#323232] mb-6">
          Selesai Ditanam
        </h2>
        {donePlants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {donePlants.map((plant) => (
              <DonePlantCard
                key={plant.id}
                plant={plant}
                onToggleChecklistItem={handleToggleChecklistItem}
                onMarkAsNotDone={handleMarkAsNotDone}
                onViewDiagnosisHistory={handleViewDiagnosisHistory}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-600">
            <p className="text-lg font-semibold">
              Tidak ada tanaman yang sudah selesai ditanam.
            </p>
            <p className="text-sm mt-2">
              Selesaikan penanaman Anda untuk melihatnya di sini.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default PlantingsPage;
