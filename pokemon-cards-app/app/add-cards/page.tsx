"use client";

import { useState } from "react";
import { useFilterOptions } from "@/context/filterOptionsProvider";

export default function AddCardPage() {
  const { filterOptions } = useFilterOptions();
  const [pokemonSpeciesId, setPokemonSpeciesId] = useState<number | null>(null);
  const [variantTypeId, setVariantTypeId] = useState<number | null>(null);
  const [cardTypeId, setCardTypeId] = useState<number | null>(null);
  const [cardSetId, setCardSetId] = useState<number | null>(null);
  const [firstEditionId, setFirstEditionId] = useState<number | null>(null);
  const [locationId, setLocationId] = useState<number | null>(null);
  const [trainerSubtypeId, setTrainerSubtypeId] = useState<number | null>(null);
  const [energySubtypeId, setEnergySubtypeId] = useState<number | null>(null);
  const [pokemonTrainerId, setPokemonTrainerId] = useState<number | null>(null);
  const [cardFile, setCardFile] = useState<File | null>(null);

  if (!filterOptions) {
    return <p>Loading species...</p>;
  }

  return (
    <div>
      <h1 style={{ fontSize: "1.5rem" }}>Add Cards</h1>

      <div style={{ marginTop: "1rem" }}>
        <label htmlFor="cardName">Card Name:</label>
        <br></br>
        <input
          id="cardName"
          type="text"
          placeholder="Dragonite EX"
          style={{ padding: "0.5rem", marginTop: "0.25rem" }}
        />
      </div>

      <div style={{ marginTop: "1rem" }}>
        <label htmlFor="pokemonSpecies">Pokemon Species:</label>
        <br></br>
        <select
          id="pokemonSpecies"
          value={pokemonSpeciesId ?? ""}
          onChange={(e) => setPokemonSpeciesId(e.target.value ? Number(e.target.value) : null)}
          style={{ padding: "0.5rem", marginTop: "0.25rem" }}
        >
          <option value="">Select a Pokemon Species</option>
          {filterOptions.pokemonSpecies.map((species) => (
            <option key={species.id} value={species.id}>
              {species.name}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <label htmlFor="variantType">Variant Type:</label>
        <br></br>
        <select
            id="variantType"
            value={variantTypeId ?? ""}
            onChange={(e) => setVariantTypeId(e.target.value ? Number(e.target.value) : null)}
            style={{ padding: "0.5rem", marginTop: "0.25rem" }}
        >
            <option value="">Select a Variant Type</option>
            {filterOptions.variantTypes.map((variant) => (
                <option key={variant.id} value={variant.id}>
                    {variant.name}
                </option>
            ))}
        </select>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <label htmlFor="cardType">Card Type:</label>
        <br></br>
        <select
            id="cardType"
            value={cardTypeId ?? ""}
            onChange={(e) => setCardTypeId(e.target.value ? Number(e.target.value) : null)}
            style={{ padding: "0.5rem", marginTop: "0.25rem" }}
        >
            <option value="">Select a Card Type</option>
            {filterOptions.cardTypes.map((type) => (
                <option key={type.id} value={type.id}>
                    {type.name}
                </option>
            ))}
        </select>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <label htmlFor="cardSet">Card Set:</label>
        <br></br>
        <select
            id="cardSet"
            value={cardSetId ?? ""}
            onChange={(e) => setCardSetId(e.target.value ? Number(e.target.value) : null)}
            style={{ padding: "0.5rem", marginTop: "0.25rem" }}
        >
            <option value="">Select a Card Set</option>
            {filterOptions.sets.map((set) => (
                <option key={set.id} value={set.id}>
                    {set.name}
                </option>
            ))}
        </select>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <label htmlFor="cardNumber">Card Number:</label>
        <br></br>
        <input
          id="cardName"
          type="number"
          placeholder="147"
          style={{ padding: "0.5rem", marginTop: "0.25rem" }}
        />
      </div>

      <div style={{ marginTop: "1rem" }}>
        <label htmlFor="firstEdition">First Edition?</label>
        <br></br>
        <select
            id="firstEdition"
            value={firstEditionId ?? ""}
            onChange={(e) => setFirstEditionId(e.target.value ? Number(e.target.value) : null)}
            style={{ padding: "0.5rem", marginTop: "0.25rem" }}
        >
            <option value="0">False</option>
            <option value="1">True</option>
        </select>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <label htmlFor="location">Location:</label>
        <br></br>
        <select
            id="location"
            value={locationId ?? ""}
            onChange={(e) => setLocationId(e.target.value ? Number(e.target.value) : null)}
            style={{ padding: "0.5rem", marginTop: "0.25rem" }}
        >
            <option value="">Select a Location</option>
            {filterOptions.locations.map((location) => (
                <option key={location.id} value={location.id}>
                    {location.name}
                </option>
            ))}
        </select>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <label htmlFor="trainerSubtype">Trainer Subtype:</label>
        <br></br>
        <select
            id="trainerSubtype"
            value={trainerSubtypeId ?? ""}
            onChange={(e) => setTrainerSubtypeId(e.target.value ? Number(e.target.value) : null)}
            style={{ padding: "0.5rem", marginTop: "0.25rem" }}
        >
            <option value="">Select a Trainer Subtype</option>
            {filterOptions.trainerSubtypes.map((subtype) => (
                <option key={subtype.id} value={subtype.id}>
                    {subtype.name}
                </option>
            ))}
        </select>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <label htmlFor="energySubtype">Energy Subtype:</label>
        <br></br>
        <select
            id="energySubtype"
            value={energySubtypeId ?? ""}
            onChange={(e) => setEnergySubtypeId(e.target.value ? Number(e.target.value) : null)}
            style={{ padding: "0.5rem", marginTop: "0.25rem" }}
        >
            <option value="">Select an Energy Subtype</option>
            {filterOptions.energySubtypes.map((subtype) => (
                <option key={subtype.id} value={subtype.id}>
                    {subtype.name}
                </option>
            ))}
        </select>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <label htmlFor="pokemonTrainer">Pokemon Trainer:</label>
        <br></br>
        <select
            id="pokemonTrainer"
            value={pokemonTrainerId ?? ""}
            onChange={(e) => setPokemonTrainerId(e.target.value ? Number(e.target.value) : null)}
            style={{ padding: "0.5rem", marginTop: "0.25rem" }}
        >
            <option value="">Select a Pokemon Trainer</option>
            {filterOptions.pokemonTrainers.map((trainer) => (
                <option key={trainer.id} value={trainer.id}>
                    {trainer.name}
                </option>
            ))}
        </select>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <label htmlFor="cardFiles">Upload Card Image:</label>
        <br></br>
        <input
            id="cardFile"
            type="file"
            onChange={(e) => {
            const file = e.target.files?.[0] ?? null;
            setCardFile(file);
            }}
            style={{ padding: "0.5rem", marginTop: "0.25rem" }}
        />
      </div>
    </div>
  );
}
