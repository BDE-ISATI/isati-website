import { useEffect, useState } from 'react';
import PocketBase, { type RecordModel } from 'pocketbase';

// Utilisation de la variable d'environnement comme dans l'exemple fourni
const POCKETBASE_URL = import.meta.env.VITE_PB_URL;
const pb = new PocketBase(POCKETBASE_URL);

interface Room extends RecordModel {
  id: string;
  name: string;
  is_available: boolean;
  next_change: string;
}

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const records = await pb.collection('rooms').getFullList<Room>({
          sort: '+name',
          requestKey: null, 
    });
        setRooms(records);
      } catch (err) {
        setError('Erreur lors du chargement.' + err);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();

    pb.collection('rooms').subscribe<Room>('*', (e) => {
      setRooms((prevRooms) => {
        if (e.action === 'create') {
          return [...prevRooms, e.record].sort((a, b) => a.name.localeCompare(b.name));
        }
        if (e.action === 'update') {
          return prevRooms.map((room) => (room.id === e.record.id ? e.record : room));
        }
        if (e.action === 'delete') {
          return prevRooms.filter((room) => room.id !== e.record.id);
        }
        return prevRooms;
      });
    });

    return () => {
      pb.collection('rooms').unsubscribe('*');
    };
  }, []);

  const formatTime = (dateString: string) => {
    if (!dateString) return 'Inconnu';
    const date = new Date(dateString);
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // États de chargement et d'erreur modélisés sur l'exemple
  if (loading) return <div className="text-center text-brand-200 font-bold py-10">Chargement...</div>;
  if (error) return <div className="text-center text-red-500 font-bold py-10">{error}</div>;

  const availableCount = rooms.filter(r => r.is_available).length;

  const handleManualSync = async () => {
  setIsSyncing(true);
  try {
    await pb.send('/api/sync-rooms', { method: 'POST' });
  } catch (err) {
    console.error("Échec de la synchronisation", err);
  } finally {
    setIsSyncing(false);
  }
};

  return (
    <section className="bg-red-200 lg:px-6 text-red-300 lg:py-24 ">
      <div className="mx-auto lg:px-20">       

        <div className="flex justify-center mt-6">
        <button 
            onClick={handleManualSync} 
            disabled={isSyncing}
            className="bg-brand-200 text-accent-second px-4 py-2 rounded-sm font-bold uppercase disabled:opacity-50 transition-opacity"
        >
            {isSyncing ? 'Synchronisation...' : 'Forcer la mise à jour'}
        </button>
        </div>
        
        {/* Utilisation de CSS Grid au lieu des colonnes CSS pour éviter de couper les cartes */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full p-4">
  {rooms.map((room) => (
    <div
      key={room.id}
      style={{ backgroundColor:room.is_available ? "#12c912b0" : "#ff00009a"  }}
    >
      {/* En-tête de la carte (Nom de la salle) */}
      <div className="bg-black/30 p-4 border-b border-white/5 backdrop-blur-md">
        <h3 className="text-2xl font-extrabold text-white uppercase tracking-wider text-center truncate">
          {room.name}
        </h3>
      </div>

      {/* Corps de la carte (Données) */}
      <div className="flex flex-col items-center justify-center p-6 flex-grow space-y-5">
        

        {/* Bloc Heure avec typographie distincte */}
        <div className="flex flex-col items-center text-center">
          <span className="text-white/60 text-xs font-medium uppercase tracking-wider mb-1">
            {room.is_available ? "Disponible jusqu'à" : "Se libère à"}
          </span>
          <span className="text-white font-mono text-3xl font-light">
            {formatTime(room.next_change)}
          </span>
        </div>

      </div>
    </div>
  ))}
</div>
      </div>
    </section>
  );
}