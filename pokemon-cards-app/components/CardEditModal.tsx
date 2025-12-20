"use client";

import { FilterOptions } from "@/lib/apiFilters";
import { getCardImage } from "@/lib/cardImage";
import React, { useEffect, useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  cardId: string | null;
  filterOptions: FilterOptions;
};

const baseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

type EditableCardDto = {
  id: string;
  cardName: string;
  pokemonSpeciesId: number | null;
  variantTypeId: number | null;
  cardTypeId: number | null;
  cardSetId: number | null;
  cardNumber: number;
  firstEdition: boolean;
  locationId: number | null;
  trainerSubtypeId: number | null;
  energySubtypeId: number | null;
  pokemonTrainerId: number | null;
  cardLanguageId: number | null;
  imagePath: string | null;
};

export default function CardEditModal({
  isOpen,
  onClose,
  cardId,
  filterOptions,
}: Props) {
  const [cardData, setCardData] = useState<EditableCardDto | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formState, setFormState] = useState<EditableCardDto | null>(null);
  const [imageChanged, setImageChanged] = useState(false);
  const [displayImage, setDisplayImage] = useState(formState?.imagePath || "/placeholder.png");

  useEffect(() => {
    if (formState) setDisplayImage(formState.imagePath || "/placeholder.png");
  }, [formState]);

  useEffect(() => {
    if (cardData) {
      setFormState(cardData); // populate form when data loads
    }
  }, [cardData]);

  useEffect(() => {
    if (!isOpen || !cardId) return;

    const fetchCard = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${apiUrl}/api/cards/${cardId}`);
        if (!res.ok) throw new Error("Failed to fetch card data");

        const data: EditableCardDto = await res.json();
        setCardData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, [isOpen, cardId]);

  if (!isOpen) return null;

  const handleChange = (field: string, value: any) => {
    setFormState((prev) =>
      prev ? { ...prev, [field]: value } : prev
    );

    if (
      field === "cardSetId" ||
      field === "cardNumber" ||
      field === "cardLanguageId"
    ) {
      setImageChanged(true);
    }
  };

  const handleSave = () => {
    console.log("Saving card:", formState);
    // TODO: implement API save
  };

  const handleFetchImage = async () => {
    if (!formState) return;

    const languageCode = filterOptions.cardLanguages.find(
      (l) => l.id == formState.cardLanguageId
    )?.code;

    const setCode = filterOptions.sets.find(
      (s) => s.id == formState.cardSetId
    )?.code;

    const newImage = await getCardImage(
      languageCode || "",
      setCode || "",
      formState.cardNumber.toString()
    );

    if (newImage) setDisplayImage(newImage);
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-[700px] max-h-[90vh] overflow-y-auto p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-6 text-blue-800">Edit Card</h2>

        {formState ? (
          <form className="space-y-6">
            <div className="flex gap-6">
              {/* IMAGE */}
              <div className="flex-shrink-0">
                <img
                  src={displayImage ? `${baseUrl}${displayImage}` : "/placeholder.png"}
                  alt={formState?.cardName}
                  className="w-[260px] rounded-xl shadow-md"
                />
                <button
                  type="button"
                  onClick={handleFetchImage}
                  disabled={!imageChanged}
                  className={`mt-2 w-full py-2 rounded-lg font-semibold text-white ${
                    imageChanged
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  Fetch Image
                </button>
              </div>

              {/* INPUTS */}
              <div className="flex-1 grid grid-cols-2 gap-4">
                {/* Name */}
                <div className="col-span-2">
                  <label className="block text-sm font-semibold mb-1 text-blue-800">
                    Card Name
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded-xl px-2 py-1"
                    value={formState.cardName}
                    onChange={(e) => handleChange("cardName", e.target.value)}
                  />
                </div>

                {/* Card Number */}
                <div>
                  <label className="block text-sm font-semibold mb-1 text-blue-800">
                    Card Number
                  </label>
                  <input
                    type="number"
                    className="w-full border rounded-xl px-2 py-1"
                    value={formState.cardNumber}
                    onChange={(e) => handleChange("cardNumber", e.target.value)}
                  />
                </div>

                {/* First Edition */}
                <div className="flex items-center mt-6">
                  <input
                    type="checkbox"
                    checked={formState.firstEdition}
                    onChange={(e) => handleChange("firstEdition", e.target.checked)}
                    className="mr-2"
                  />
                  <label className="text-sm font-semibold text-blue-800">First Edition</label>
                </div>

                {/* Set */}
                <div>
                  <label className="block text-sm font-semibold mb-1 text-blue-800">Set</label>
                  <select
                    className="w-full border rounded-xl px-2 py-1"
                    value={formState.cardSetId || ""}
                    onChange={(e) => handleChange("cardSetId", e.target.value)}
                  >
                    <option value="">Select set</option>
                    {filterOptions.sets.map((s) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>

                {/* Card Type */}
                <div>
                  <label className="block text-sm font-semibold mb-1 text-blue-800">Card Type</label>
                  <select
                    className="w-full border rounded-xl px-2 py-1"
                    value={formState.cardTypeId || ""}
                    onChange={(e) => handleChange("cardTypeId", e.target.value)}
                  >
                    <option value="">Select type</option>
                    {filterOptions.cardTypes.map((ct) => (
                      <option key={ct.id} value={ct.id}>{ct.name}</option>
                    ))}
                  </select>
                </div>

                {/* Variant Type */}
                <div>
                  <label className="block text-sm font-semibold mb-1 text-blue-800">Variant Type</label>
                  <select
                    className="w-full border rounded-xl px-2 py-1"
                    value={formState.variantTypeId || ""}
                    onChange={(e) => handleChange("variantTypeId", e.target.value)}
                  >
                    <option value="">Select variant</option>
                    {filterOptions.variantTypes.map((v) => (
                      <option key={v.id} value={v.id}>{v.name}</option>
                    ))}
                  </select>
                </div>

                {/* Trainer Subtype */}
                <div>
                  <label className="block text-sm font-semibold mb-1 text-blue-800">Trainer Subtype</label>
                  <select
                    className="w-full border rounded-xl px-2 py-1"
                    value={formState.trainerSubtypeId || ""}
                    onChange={(e) => handleChange("trainerSubtypeId", e.target.value)}
                  >
                    <option value="">Select trainer subtype</option>
                    {filterOptions.trainerSubtypes.map((t) => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>

                {/* Energy Subtype */}
                <div>
                  <label className="block text-sm font-semibold mb-1 text-blue-800">Energy Subtype</label>
                  <select
                    className="w-full border rounded-xl px-2 py-1"
                    value={formState.energySubtypeId || ""}
                    onChange={(e) => handleChange("energySubtypeId", e.target.value)}
                  >
                    <option value="">Select energy subtype</option>
                    {filterOptions.energySubtypes.map((e) => (
                      <option key={e.id} value={e.id}>{e.name}</option>
                    ))}
                  </select>
                </div>

                {/* Pokémon Species */}
                <div>
                  <label className="block text-sm font-semibold mb-1 text-blue-800">Pokémon Species</label>
                  <select
                    className="w-full border rounded-xl px-2 py-1"
                    value={formState.pokemonSpeciesId || ""}
                    onChange={(e) => handleChange("pokemonSpeciesId", e.target.value)}
                  >
                    <option value="">Select species</option>
                    {filterOptions.pokemonSpecies.map((p) => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>

                {/* Pokémon Trainer */}
                <div>
                  <label className="block text-sm font-semibold mb-1 text-blue-800">Pokémon Trainer</label>
                  <select
                    className="w-full border rounded-xl px-2 py-1"
                    value={formState.pokemonTrainerId || ""}
                    onChange={(e) => handleChange("pokemonTrainerId", e.target.value)}
                  >
                    <option value="">Select trainer</option>
                    {filterOptions.pokemonTrainers.map((p) => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>

                {/* Language */}
                <div>
                  <label className="block text-sm font-semibold mb-1 text-blue-800">Language</label>
                  <select
                    className="w-full border rounded-xl px-2 py-1"
                    value={formState.cardLanguageId || ""}
                    onChange={(e) => handleChange("cardLanguageId", e.target.value)}
                  >
                    <option value="">Select language</option>
                    {filterOptions.cardLanguages.map((l) => (
                      <option key={l.id} value={l.id}>{l.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Save / Cancel */}
            <div className="flex justify-end gap-4 mt-4">
              <button
                type="button"
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </form>
        ) : (
          <p>Loading card data...</p>
        )}
      </div>
    </div>
  );
}
