"use client";

import { useState, useEffect } from "react";
import { FilterOptions } from "@/lib/apiFilters";
import { fetchFilterOptions } from "@/lib/apiFilters";

type Props = {
    onFilterChange: (filters: { setId: number | null; cardTypeId: number | null, locationId: number | null,
      pokemonSpeciesId: number | null, variantTypeId: number | null,
     }) => void;
};

export default function CardFilters({ onFilterChange } : Props){
    const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null);
    const [selectedSetId, setSelectedSetId] = useState<number | null>(null);
    const [selectedCardTypeId, setSelectedCardTypeId] = useState<number | null>(null);
    const [selectedLocationId, setSelectedLocationId] = useState<number | null>(null);
    const [selectedPokemonSpeciesId, setSelectedPokemonSpeciesId] = useState<number | null>(null);
    const [selectedVariantTypeId, setSelectedVariantTypeId] = useState<number | null>(null);

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
            variantTypeId: selectedVariantTypeId });
    }, [selectedSetId, selectedCardTypeId, selectedLocationId, selectedPokemonSpeciesId, selectedVariantTypeId ]);

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
    </div>
  );
}
