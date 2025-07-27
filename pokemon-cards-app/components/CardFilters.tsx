"use client";

import { useState, useEffect } from "react";
import { FilterOptions } from "@/lib/apiFilters";
import { fetchFilterOptions } from "@/lib/apiFilters";

type Props = {
    onFilterChange: (filters: { setId: number | null; cardTypeId: number | null, locationId: number | null,
      pokemonSpeciesId: number | null, variantTypeId: number | null, trainerSubtypeId: number | null, energySubtypeId: number | null,
      pokemonTrainerId: number | null, cardLanguageId: number | null
     }) => void;
};

export default function CardFilters({ onFilterChange } : Props){
    const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null);
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
        fetchFilterOptions()
            .then(setFilterOptions)
            .catch((err) => console.error("Failed to fetch filters: ", err));
    }, []);

    useEffect(() => {
        onFilterChange( { 
            setId: selectedSetId,
            cardTypeId: selectedCardTypeId,
            locationId: selectedLocationId,
            pokemonSpeciesId: selectedPokemonSpeciesId,
            variantTypeId: selectedVariantTypeId,
            trainerSubtypeId: selectedTrainerSubtypeId,
            energySubtypeId: selectedEnergySubtypeId,
            pokemonTrainerId: selectedPokemonTrainerId,
            cardLanguageId: selectedCardLanguageId });
    }, [selectedSetId, selectedCardTypeId, selectedLocationId, selectedPokemonSpeciesId, selectedVariantTypeId,
        selectedTrainerSubtypeId, selectedEnergySubtypeId, selectedPokemonTrainerId, selectedCardLanguageId
     ]);

   return (
    <div style={{ padding: 20 }}>
      {filterOptions?.sets && (
        <select
          value={selectedSetId ?? ""}
          onChange={(e) =>
            setSelectedSetId(e.target.value === "" ? null : Number(e.target.value))
          }
          style={{ marginBottom: "1rem", padding: "0.5rem", marginRight: "1rem" }}
        >
          <option value="">All Card Sets</option>
          {filterOptions.sets.map((set) => (
            <option key={set.id} value={set.id}>
              {set.name}
            </option>
          ))}
        </select>
      )}

      {filterOptions?.cardTypes && (
        <select
          value={selectedCardTypeId ?? ""}
          onChange={(e) =>
            setSelectedCardTypeId(e.target.value === "" ? null : Number(e.target.value))
          }
          style={{ padding: "0.5rem" }}
        >
          <option value="">All Card Types</option>
          {filterOptions.cardTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
      )}

      {filterOptions?.locations &&(
        <select 
          value={selectedLocationId ?? ""}
          onChange={(e) => 
            setSelectedLocationId(e.target.value === "" ? null : Number(e.target.value))
          }
          style={{padding: "0.5rem" }}
        >
          <option value="">All Locations</option>
          {filterOptions.locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>
      )}

      {filterOptions?.locations &&(
        <select 
          value={selectedPokemonSpeciesId ?? ""}
          onChange={(e) => 
            setSelectedPokemonSpeciesId(e.target.value === "" ? null : Number(e.target.value))
          }
          style={{padding: "0.5rem" }}
        >
          <option value="">All Pokemon</option>
          {filterOptions.pokemonSpecies.map((species) => (
            <option key={species.id} value={species.id}>
              {species.name}
            </option>
          ))}
        </select>
      )}

      {filterOptions?.variantTypes &&(
        <select 
          value={selectedVariantTypeId ?? ""}
          onChange={(e) => 
            setSelectedVariantTypeId(e.target.value === "" ? null : Number(e.target.value))
          }
          style={{padding: "0.5rem" }}
        >
          <option value="">All Variants</option>
          {filterOptions.variantTypes.map((variants) => (
            <option key={variants.id} value={variants.id}>
              {variants.name}
            </option>
          ))}
        </select>
      )}

      {filterOptions?.trainerSubtypes &&(
        <select 
          value={selectedTrainerSubtypeId ?? ""}
          onChange={(e) => 
            setSelectedTrainerSubtypeId(e.target.value === "" ? null : Number(e.target.value))
          }
          style={{padding: "0.5rem" }}
        >
          <option value="">Trainer Subtypes</option>
          {filterOptions.trainerSubtypes.map((trainerSubtype) => (
            <option key={trainerSubtype.id} value={trainerSubtype.id}>
              {trainerSubtype.name}
            </option>
          ))}
        </select>
      )}

      {filterOptions?.energySubtypes &&(
        <select 
          value={selectedEnergySubtypeId ?? ""}
          onChange={(e) => 
            setSelectedEnergySubtypeId(e.target.value === "" ? null : Number(e.target.value))
          }
          style={{padding: "0.5rem" }}
        >
          <option value="">Energy Subtypes</option>
          {filterOptions.energySubtypes.map((energySubtype) => (
            <option key={energySubtype.id} value={energySubtype.id}>
              {energySubtype.name}
            </option>
          ))}
        </select>
      )}

      {filterOptions?.pokemonTrainers &&(
        <select 
          value={selectedPokemonTrainerId ?? ""}
          onChange={(e) => 
            setSelectedPokemonTrainerId(e.target.value === "" ? null : Number(e.target.value))
          }
          style={{padding: "0.5rem" }}
        >
          <option value="">Pokemon Trainers</option>
          {filterOptions.pokemonTrainers.map((trainer) => (
            <option key={trainer.id} value={trainer.id}>
              {trainer.name}
            </option>
          ))}
        </select>
      )}

      {filterOptions?.cardLanguages &&(
        <select 
          value={selectedCardLanguageId ?? ""}
          onChange={(e) => 
            setSelectedCardLanguageId(e.target.value === "" ? null : Number(e.target.value))
          }
          style={{padding: "0.5rem" }}
        >
          <option value="">Languages</option>
          {filterOptions.cardLanguages.map((language) => (
            <option key={language.id} value={language.id}>
              {language.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
