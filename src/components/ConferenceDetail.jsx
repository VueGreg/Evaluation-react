const ConferenceDetail = ({ conference, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-11/12 md:w-2/3 lg:w-1/2 max-h-[90vh] overflow-hidden">
        {/* Header avec dégradé */}
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="flex justify-between items-center p-6">
            <h2 className="text-2xl font-bold text-white">{conference.title}</h2>
            <button
              onClick={onClose}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all duration-200 hover:scale-110"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Image avec overlay */}
          {conference.img && (
            <div className="relative">
              <img
                src="https://placehold.co/1600x400?text=Conference" // {conference.img}
                alt={conference.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          )}
        </div>

        {/* Contenu scrollable */}
        <div className="overflow-y-auto max-h-[60vh]">
          <div className="p-6 space-y-6">
            {/* Description */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-gray-700 leading-relaxed">{conference.content}</p>
            </div>

            {/* Informations principales */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Date */}
              <div className="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-500">
                <div className="flex items-center space-x-2 mb-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <h3 className="font-semibold text-blue-800">Date</h3>
                </div>
                <p className="text-blue-700 font-medium">{new Date(conference.date).toLocaleString("fr-FR")}</p>
              </div>

              {/* Lieu */}
              {conference.osMap && (
                <div className="bg-green-50 p-4 rounded-xl border-l-4 border-green-500">
                  <div className="flex items-center space-x-2 mb-2">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <h3 className="font-semibold text-green-800">Lieu</h3>
                  </div>
                  <p className="text-green-700 font-medium">
                    {conference.osMap.addressl1}, {conference.osMap.city} {conference.osMap.postalCode}
                  </p>
                </div>
              )}
            </div>

            {/* Intervenants */}
            {conference.speakers?.length > 0 && (
              <div className="bg-purple-50 p-4 rounded-xl border-l-4 border-purple-500">
                <div className="flex items-center space-x-2 mb-3">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <h3 className="font-semibold text-purple-800">Intervenants</h3>
                </div>
                <ul className="space-y-2">
                  {conference.speakers.map((s, i) => (
                    <li key={i} className="bg-white p-2 rounded-lg shadow-sm border border-purple-100">
                      <span className="text-purple-700 font-medium">{s.firstname} {s.lastname}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Partenaires */}
            {conference.stakeholders?.length > 0 && (
              <div className="bg-orange-50 p-4 rounded-xl border-l-4 border-orange-500">
                <div className="flex items-center space-x-2 mb-4">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <h3 className="font-semibold text-orange-800">Partenaires</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {conference.stakeholders.map((st, i) => (
                    <div
                      key={i}
                      className="flex items-center space-x-3 bg-white p-3 rounded-lg shadow-sm border border-orange-100 hover:shadow-md transition-shadow duration-200"
                    >
                      {st.img && (
                        <img
                          src={st.img}
                          alt={st.firstname}
                          className="w-12 h-12 rounded-full object-cover border-2 border-orange-200"
                        />
                      )}
                      <div>
                        <p className="font-medium text-gray-800">
                          {st.firstname} {st.lastname}
                        </p>
                        <p className="text-sm text-orange-600 font-medium">{st.job}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConferenceDetail;