import { useState, useEffect, useCallback } from 'react';
import CreateConferenceModal from '../components/CreateUpdateConferenceModal';
import { getConferences, deleteConference } from '../services/conferenceService';

const ConferencePage = () => {
  const [conferences, setConferences] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentConference, setCurrentConference] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchConferences = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getConferences();
      setConferences(data);
    } catch (err) {
      console.error('Erreur lors du chargement des conférences:', err);
      setError('Impossible de charger les conférences');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchConferences();
  }, [fetchConferences]);

  const handleCreateOrUpdate = async () => {
    await fetchConferences();
    setIsModalOpen(false);
    setCurrentConference(null);
  };

  const handleDeleteConference = async (id) => {
    try {
      await deleteConference(id);
      setConferences((prev) => prev.filter(conf => conf.id !== id));
    } catch (err) {
      console.error("Erreur lors de la suppression de la conférence :", err);
    }
  };

  const handleEditConference = (conf) => {
    setCurrentConference(conf);
    setIsModalOpen(true);
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <main className="flex flex-col p-8">
      <h1 className="text-3xl font-bold mb-6">Page des conférences</h1>

      {conferences.length > 0 && (
        <ul className="mb-6 space-y-4">
          {conferences.map((conf) => (
            <li
              key={conf._id}
              className="p-4 border rounded-lg bg-white shadow flex flex-col md:flex-row justify-between items-start md:items-center"
            >
              <div className="mb-4 md:mb-0">
                <h3 className="font-semibold text-lg">{conf.title}</h3>
                <p className="text-gray-600">{conf.description}</p>
                <span className="text-sm text-gray-400">ID: {conf._id}</span>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditConference(conf)}
                  className="bg-yellow-400 text-white px-4 py-2 rounded-lg hover:bg-yellow-500 transition-colors"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDeleteConference(conf.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Supprimer
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={() => { setCurrentConference(null); setIsModalOpen(true); }}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Créer une conférence
      </button>

      <CreateConferenceModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setCurrentConference(null); }}
        onCreated={handleCreateOrUpdate}
        initialData={currentConference}
      />
    </main>
  );
};

export default ConferencePage;