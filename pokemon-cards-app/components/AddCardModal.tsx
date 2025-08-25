import React from "react";

const baseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

type Location = {
  id: number;
  name: string;
};

interface AddCardModalProps {
  card: any;
  recommendation: string;
  locations: Location[];
  locationId: number | null;
  onLocationChange: (id: number) => void;
  onClose: () => void;
}

const AddCardModal: React.FC<AddCardModalProps> = ({
  card,
  recommendation,
  locations,
  locationId,
  onLocationChange,
  onClose,
}) => {
  if (!card) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-[500px] max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Card Preview</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            ✕
          </button>
        </div>
        <div className="mb-4">
          <img
            src={`${baseUrl}${card.imagePath}`}
            alt={card.cardName}
            className="w-full rounded-lg shadow-md mb-2"
          />
            <p><strong>Name:</strong> {card.cardName}</p>
            <p><strong>Card Number:</strong> {card.cardNumber}</p>
            <p><strong>First Edition:</strong> {card.firstEdition ? "Yes" : "No"}</p>

            <p><strong>Set:</strong> {card.cardSetName}</p>
            <p><strong>Language:</strong> {card.languageName}</p>

            <p><strong>Type:</strong> {card.cardTypeName}</p>
            <p><strong>Species:</strong> {card.pokemonSpeciesName}</p>
            <p><strong>Variant:</strong> {card.variantTypeName}</p>

            <p><strong>Trainer Subtype:</strong> {card.trainerSubtypeName}</p>
            <p><strong>Energy Subtype:</strong> {card.energySubtypeName}</p>
            <p><strong>Trainer:</strong> {card.pokemonTrainerName}</p>

            <p><strong>Location:</strong> 
                {card.locationName ? card.locationName : "Not selected"}
            </p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold">Recommendation:</h3>
          <p>{recommendation}</p>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Choose Location:</label>
          <select
            value={locationId ?? ""}
            onChange={(e) => onLocationChange(Number(e.target.value))}
            className="w-full border rounded p-2"
          >
            <option value="">-- Select a location --</option>
            {locations.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCardModal;
