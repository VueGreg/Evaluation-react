const ConferenceDetail = ({ conference, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-11/12 md:w-2/3 lg:w-1/2 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">{conference.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            ✕
          </button>
        </div>

        {/* Image */}
        {conference.img && (
          <img
            src="https://placehold.co/1600x400?text=Conference"//{conference.img}
            alt={conference.title}
            className="w-full h-64 object-cover"
          />
        )}

        <div className="p-4 space-y-4">
          <p className="text-gray-700">{conference.content}</p>

          <div>
            <h3 className="font-semibold">Date</h3>
            <p>{new Date(conference.date).toLocaleString("fr-FR")}</p>
          </div>

          {conference.osMap && (
            <div>
              <h3 className="font-semibold">Lieu</h3>
              <p>
                {conference.osMap.addressl1}, {conference.osMap.city}{" "}
                {conference.osMap.postalCode}
              </p>
            </div>
          )}

          {conference.speakers?.length > 0 && (
            <div>
              <h3 className="font-semibold">Intervenants</h3>
              <ul className="list-disc list-inside">
                {conference.speakers.map((s, i) => (
                  <li key={i}>
                    {s.firstname} {s.lastname}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {conference.stakeholders?.length > 0 && (
            <div>
              <h3 className="font-semibold">Partenaires</h3>
              <div className="grid grid-cols-2 gap-4">
                {conference.stakeholders.map((st, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-3 bg-gray-50 p-2 rounded-md"
                  >
                    {st.img && (
                      <img
                        src={st.img}
                        alt={st.firstname}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <p className="font-medium">
                        {st.firstname} {st.lastname}
                      </p>
                      <p className="text-xs text-gray-500">{st.job}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConferenceDetail;