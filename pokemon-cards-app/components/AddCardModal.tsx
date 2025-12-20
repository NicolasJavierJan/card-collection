"use client";
import React, { useState } from "react";

const baseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

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
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!card) return null;

  // ---------------------------------------------------------
  // CLOSE BY CLICKING OUTSIDE
  // ---------------------------------------------------------
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // ---------------------------------------------------------
  // SUBMIT HANDLER
  // ---------------------------------------------------------
  const handleSubmit = async () => {
    if (!locationId) {
      setError("Please select a location before submitting.");
      return;
    }

    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const newCard = {
        cardName: card.cardName,
        pokemonSpeciesId: card.pokemonSpeciesId,
        variantTypeId: card.variantTypeId,
        cardTypeId: card.cardTypeId,
        cardSetId: card.cardSetId,
        cardNumber: Number(card.cardNumber),
        firstEdition: card.firstEdition,
        locationId: locationId,
        trainerSubtypeId: card.trainerSubtypeId,
        energySubtypeId: card.energySubtypeId,
        pokemonTrainerId: card.pokemonTrainerId,
        cardLanguageId: card.languageId,
        imagePath: card.imagePath,
      };

      const res = await fetch(`${apiUrl}/api/cards`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCard),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to save card.");
      }

      setMessage(
        `Card "${card.cardName}" - ${card.cardSetName} - ${
          locations.find((loc) => loc.id === locationId)?.name ?? "Unknown"
        } was saved successfully!`
      );

      setTimeout(() => onClose(), 2000);
    } catch (err: any) {
      setError(`There was an error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // RENDER MODAL
  // =========================================================
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-[750px] max-h-[85vh] overflow-y-auto p-6 relative"
      >
        {/* Close button (top-right) */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-4 text-blue-800">Card Preview</h2>

        {/* IMAGE + INFO side-by-side */}
        <div className="flex gap-6 mb-6">
          {/* IMAGE */}
          <div className="flex-shrink-0">
            <img
              src={`${baseUrl}${card.imagePath}`}
              alt={card.cardName}
              className="w-[260px] rounded-xl shadow-md"
            />
          </div>

          {/* INFO */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm ml-4">
            <Info label="Name" value={card.cardName} />
            <Info label="Card Number" value={card.cardNumber} />
            <Info label="First Edition" value={card.firstEdition ? "Yes" : "No"} />
            <Info label="Set" value={card.cardSetName} />
            <Info label="Language" value={card.languageName} />
            <Info label="Type" value={card.cardTypeName} />
            <Info label="Species" value={card.pokemonSpeciesName} />
            <Info label="Variant" value={card.variantTypeName} />
            <Info label="Trainer Subtype" value={card.trainerSubtypeName} />
            <Info label="Energy Subtype" value={card.energySubtypeName} />
            <Info label="Trainer" value={card.pokemonTrainerName} />
            <Info
              label="Location"
              value={card.locationName ? card.locationName : "Not selected"}
            />
          </div>
        </div>

        {/* Recommendation */}
        <div className="mb-4 bg-blue-50 p-3 rounded-lg border border-blue-100">
          <h3 className="font-semibold text-blue-800 mb-1">Recommendation:</h3>
          <p>{recommendation}</p>
        </div>

        {/* LOCATION SELECT */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold text-blue-800">
            Choose Location:
          </label>
          <select
            value={locationId ?? ""}
            onChange={(e) => onLocationChange(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg p-2"
          >
            <option value="">-- Select a location --</option>
            {locations.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        {error && <div className="text-red-600 mb-2">{error}</div>}
        {message && <div className="text-green-600 mb-2">{message}</div>}

        {/* BUTTONS */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Close
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

// Info field component
function Info({ label, value }: { label: string; value: any }) {
  return (
    <div>
      <p className="font-semibold mb-[0.4rem] text-[#0050b8]">{label}:</p>
      <p className="font-semibold">{value || "—"}</p>
    </div>
  );
}

export default AddCardModal;
