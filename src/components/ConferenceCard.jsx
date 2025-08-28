import { useState } from "react";
import ConferenceDetail from "./ConferenceDetail";

const ConferenceCard = ({ conference }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {conference.title || conference.name || "Conférence"}
          </h3>
          <p className="text-gray-600 text-sm mb-3">
            {conference.description || "Aucune description disponible"}
          </p>
        </div>

        <div className="space-y-2">
          {conference.date && (
            <div className="flex items-center text-sm text-gray-500">
              📅 {new Date(conference.date).toLocaleDateString("fr-FR")}
            </div>
          )}
          {conference.location && (
            <div className="flex items-center text-sm text-gray-500">
              📍 {conference.location}
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              conference.status === "active"
                ? "bg-green-100 text-green-800"
                : conference.status === "upcoming"
                ? "bg-blue-100 text-blue-800"
                : conference.status === "completed"
                ? "bg-gray-100 text-gray-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {conference.status || "En cours"}
          </span>

          <button
            onClick={() => setOpen(true)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
          >
            Voir détails
          </button>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <ConferenceDetail
          conference={conference}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default ConferenceCard;