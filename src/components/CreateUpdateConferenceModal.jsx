import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { createConference, updateConference } from "../services/conferenceService";

const CreateConferenceModal = ({ isOpen, onClose, onCreated, initialData }) => {
  const [formData, setFormData] = useState(
    initialData || {
      id: uuidv4(),
      title: "",
      date: "",
      description: "",
      img: "https://placehold.co/600x400",
      content: "À compléter",
      duration: "non défini",
      osMap: {
        addressl1: "",
        addressl2: "",
        postalCode: "",
        city: "",
        coordinates: [],
      },
      speakers: [{ firstname: "John", lastname: "Doe" }],
      stakeholders: [
        { firstname: "Jane", lastname: "Doe", job: "Invité", img: "" },
      ],
      design: {
        mainColor: "#276891",
        secondColor: "#ffffff",
      },
    }
  );

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (section, key, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: value },
    }));
  };

  const handleArrayChange = (section, index, key, value) => {
    const updated = [...formData[section]];
    updated[index][key] = value;
    setFormData((prev) => ({ ...prev, [section]: updated }));
  };

  const addArrayItem = (section, itemTemplate) => {
    setFormData((prev) => ({
      ...prev,
      [section]: [...prev[section], itemTemplate],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (initialData !== null) {
        const updated = await updateConference(formData.id, formData);
        if (onCreated) onCreated(updated);
        onClose();
        setFormData({
          id: uuidv4(),
          title: "",
          date: "",
          description: "",
          img: "https://placehold.co/600x400",
          content: "À compléter",
          duration: "non défini",
          osMap: {
            addressl1: "",
            addressl2: "",
            postalCode: "",
            city: "",
            coordinates: [],
          },
          speakers: [{ firstname: "John", lastname: "Doe" }],
          stakeholders: [{ firstname: "Jane", lastname: "Doe", job: "Invité", img: "" }],
          design: { mainColor: "#276891", secondColor: "#ffffff" },
        });
        return
      } else {
        const created = await createConference(formData);
        if (onCreated) onCreated(created);
        onClose();
      }
    } catch (err) {
      console.error("Erreur création/modification conférence:", err);
    }
  };

  const formatDateForInput = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const month = `${d.getMonth() + 1}`.padStart(2, "0");
    const day = `${d.getDate()}`.padStart(2, "0");
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6">
        <h2 className="text-2xl font-bold mb-4">
          {initialData ? "Modifier la conférence" : "Créer une conférence"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Champs basiques */}
          <input
            type="text"
            name="title"
            placeholder="Titre"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2"
          />
          <input
            type="date"
            name="date"
            value={formatDateForInput(formData.date)}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2"
          />
          <input
            type="text"
            name="img"
            placeholder="URL image"
            value={formData.img}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
          <textarea
            name="content"
            placeholder="Contenu détaillé"
            value={formData.content}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />

          {/* Speakers */}
          <h3 className="text-lg font-semibold">Intervenants</h3>
          {formData.speakers.map((s, i) => (
            <div key={i} className="flex gap-2">
              <input
                type="text"
                placeholder="Prénom"
                value={s.firstname}
                onChange={(e) =>
                  handleArrayChange("speakers", i, "firstname", e.target.value)
                }
                className="w-1/2 border rounded-lg p-2"
              />
              <input
                type="text"
                placeholder="Nom"
                value={s.lastname}
                onChange={(e) =>
                  handleArrayChange("speakers", i, "lastname", e.target.value)
                }
                className="w-1/2 border rounded-lg p-2"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              addArrayItem("speakers", { firstname: "", lastname: "" })
            }
            className="text-blue-600 text-sm"
          >
            + Ajouter un intervenant
          </button>

          {/* Stakeholders */}
          <h3 className="text-lg font-semibold">Parties prenantes</h3>
          {formData.stakeholders.map((s, i) => (
            <div key={i} className="grid grid-cols-4 gap-2">
              <input
                type="text"
                placeholder="Prénom"
                value={s.firstname}
                onChange={(e) =>
                  handleArrayChange("stakeholders", i, "firstname", e.target.value)
                }
                className="border rounded-lg p-2"
              />
              <input
                type="text"
                placeholder="Nom"
                value={s.lastname}
                onChange={(e) =>
                  handleArrayChange("stakeholders", i, "lastname", e.target.value)
                }
                className="border rounded-lg p-2"
              />
              <input
                type="text"
                placeholder="Poste"
                value={s.job}
                onChange={(e) =>
                  handleArrayChange("stakeholders", i, "job", e.target.value)
                }
                className="border rounded-lg p-2"
              />
              <input
                type="text"
                placeholder="URL image"
                value={s.img}
                onChange={(e) =>
                  handleArrayChange("stakeholders", i, "img", e.target.value)
                }
                className="border rounded-lg p-2"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              addArrayItem("stakeholders", {
                firstname: "",
                lastname: "",
                job: "",
                img: "",
              })
            }
            className="text-blue-600 text-sm"
          >
            + Ajouter une partie prenante
          </button>

          {/* Design */}
          <h3 className="text-lg font-semibold">Design</h3>
          <div className="flex gap-4">
            <div>
              <label className="block text-sm">Couleur principale</label>
              <input
                type="color"
                value={formData.design.mainColor}
                onChange={(e) =>
                  handleNestedChange("design", "mainColor", e.target.value)
                }
              />
            </div>
            <div>
              <label className="block text-sm">Couleur secondaire</label>
              <input
                type="color"
                value={formData.design.secondColor}
                onChange={(e) =>
                  handleNestedChange("design", "secondColor", e.target.value)
                }
              />
            </div>
          </div>

          {/* Boutons */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              {initialData ? "Modifier" : "Créer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateConferenceModal;