"use client";

import { useState, useEffect } from "react";
import { FilterOptions } from "@/lib/apiFilters";

type Props = {
  filterOptions: FilterOptions;
  onFilterChange: (filters: {
    setId: number | null;
    cardTypeId: number | null;
    locationId: number | null;
    pokemonSpeciesId: number | null;
    variantTypeId: number | null;
    trainerSubtypeId: number | null;
    energySubtypeId: number | null;
    pokemonTrainerId: number | null;
    cardLanguageId: number | null;
  }) => void;
};

export default function CardFilters({ filterOptions, onFilterChange }: Props) {
  const [selectedSetId, setSelectedSetId] = useState<number | null>(null);
  const [selectedCardTypeId, setSelectedCardTypeId] = useState<number | null>(null);
  const [selectedLocationId, setSelectedLocationId] = useState<number | null>(null);
  const [selectedPokemonSpeciesId, setSelectedPokemonSpeciesId] = useState<number | null>(null);
  const [selectedVariantTypeId, setSelectedVariantTypeId] = useState<number | null>(null);
  const [selectedTrainerSubtypeId, setSelectedTrainerSubtypeId] = useState<number | null>(null);
  const [selectedEnergySubtypeId, setSelectedEnergySubtypeId] = useState<number | null>(null);
  const [selectedPokemonTrainerId, setSelectedPokemonTrainerId] = useState<number | null>(null);
  const [selectedCardLanguageId, setSelectedCardLanguageId] = useState<number | null>(null);

  useEffect(() => {
    onFilterChange({
      setId: selectedSetId,
      cardTypeId: selectedCardTypeId,
      locationId: selectedLocationId,
      pokemonSpeciesId: selectedPokemonSpeciesId,
      variantTypeId: selectedVariantTypeId,
      trainerSubtypeId: selectedTrainerSubtypeId,
      energySubtypeId: selectedEnergySubtypeId,
      pokemonTrainerId: selectedPokemonTrainerId,
      cardLanguageId: selectedCardLanguageId,
    });
  }, [
    selectedSetId,
    selectedCardTypeId,
    selectedLocationId,
    selectedPokemonSpeciesId,
    selectedVariantTypeId,
    selectedTrainerSubtypeId,
    selectedEnergySubtypeId,
    selectedPokemonTrainerId,
    selectedCardLanguageId,
  ]);

  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-6 border border-gray-200">
      <h2 className="text-lg font-semibold text-blue-700 mb-4">Filters</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Helper reusable select style */}
        {filterOptions.sets && (
          <FilterSelect
            label="Set"
            value={selectedSetId}
            onChange={setSelectedSetId}
            defaultLabel="All Card Sets"
            options={filterOptions.sets}
          />
        )}

        {filterOptions.cardTypes && (
          <FilterSelect
            label="Card Type"
            value={selectedCardTypeId}
            onChange={setSelectedCardTypeId}
            defaultLabel="All Card Types"
            options={filterOptions.cardTypes}
          />
        )}

        {filterOptions.locations && (
          <FilterSelect
            label="Location"
            value={selectedLocationId}
            onChange={setSelectedLocationId}
            defaultLabel="All Locations"
            options={filterOptions.locations}
          />
        )}

        {filterOptions.pokemonSpecies && (
          <FilterSelect
            label="Pokémon"
            value={selectedPokemonSpeciesId}
            onChange={setSelectedPokemonSpeciesId}
            defaultLabel="All Pokémon"
            options={filterOptions.pokemonSpecies}
          />
        )}

        {filterOptions.variantTypes && (
          <FilterSelect
            label="Variant"
            value={selectedVariantTypeId}
            onChange={setSelectedVariantTypeId}
            defaultLabel="All Variants"
            options={filterOptions.variantTypes}
          />
        )}

        {filterOptions.trainerSubtypes && (
          <FilterSelect
            label="Trainer Subtype"
            value={selectedTrainerSubtypeId}
            onChange={setSelectedTrainerSubtypeId}
            defaultLabel="Trainer Subtypes"
            options={filterOptions.trainerSubtypes}
          />
        )}

        {filterOptions.energySubtypes && (
          <FilterSelect
            label="Energy Subtype"
            value={selectedEnergySubtypeId}
            onChange={setSelectedEnergySubtypeId}
            defaultLabel="Energy Subtypes"
            options={filterOptions.energySubtypes}
          />
        )}

        {filterOptions.pokemonTrainers && (
          <FilterSelect
            label="Pokémon Trainer"
            value={selectedPokemonTrainerId}
            onChange={setSelectedPokemonTrainerId}
            defaultLabel="Pokémon Trainers"
            options={filterOptions.pokemonTrainers}
          />
        )}

        {filterOptions.cardLanguages && (
          <FilterSelect
            label="Language"
            value={selectedCardLanguageId}
            onChange={setSelectedCardLanguageId}
            defaultLabel="Languages"
            options={filterOptions.cardLanguages}
          />
        )}
      </div>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  defaultLabel,
  options,
}: {
  label: string;
  value: number | null;
  onChange: (v: number | null) => void;
  defaultLabel: string;
  options: { id: number; name: string }[];
}) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-semibold text-blue-700 mb-1">{label}</label>

      <select
        value={value ?? ""}
        onChange={(e) =>
          onChange(e.target.value === "" ? null : Number(e.target.value))
        }
        className="
          w-full
          border border-gray-300
          rounded-lg
          px-3 py-2
          text-sm
          bg-white
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
        "
      >
        <option value="">{defaultLabel}</option>
        {options.map((o) => (
          <option key={o.id} value={o.id}>
            {o.name}
          </option>
        ))}
      </select>
    </div>
  );
}
