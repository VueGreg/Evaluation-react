import { useState, useEffect } from 'react';
import { getConferences } from '../services/conferenceService';
import ConferenceCard from '../components/ConferenceCard';
import { SliderComponent } from '../components'

const HomePage = () => {
  const [conferences, setConferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConferences = async () => {
      try {
        setLoading(true);
        const data = await getConferences();
        setConferences(data);
      } catch (error) {
        console.error('Erreur lors du chargement des conférences:', error);
        setError('Impossible de charger les conférences');
      } finally {
        setLoading(false);
      }
    };

    fetchConferences();
  }, []);

  if (loading) {
    return (
      <main className="flex w-full min-h-screen">
        <div className="flex-1 p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Mes Conférences</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-gray-200 rounded-lg h-64 animate-pulse"></div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex w-full min-h-screen">
        <div className="flex-1 p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Mes Conférences</h1>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-800">{error}</p>
            </div>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              Réessayer
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex w-full min-h-screen bg-gray-50">

      <SliderComponent />

      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Conférences que vous pouvez rejoindre</h1>
            <p className="text-gray-600">
              {conferences.length} conférence{conferences.length > 1 ? 's' : ''} trouvée{conferences.length > 1 ? 's' : ''}
            </p>
          </div>

          {conferences.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Aucune conférence</h3>
              <p className="text-gray-500 mb-6">Vous n'avez pas encore créé de conférence.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {conferences.map((conference) => (
                <ConferenceCard key={conference.id || conference._id} conference={conference} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default HomePage;