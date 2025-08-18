"use client";

import { useEffect, useState } from "react";
import { useFilterOptions } from "@/context/filterOptionsProvider";
import { getCardImage } from "@/lib/cardImage";

export default function AddCardPage() {
  const { filterOptions } = useFilterOptions();
  const [cardName, setCardName] = useState("");
  const [cardTypeId, setCardTypeId] = useState<number | null>(null);
  const [pokemonSpeciesId, setPokemonSpeciesId] = useState<number | null>(null);
  const [variantTypeId, setVariantTypeId] = useState<number | null>(null);
  const [trainerSubtypeId, setTrainerSubtypeId] = useState<number | null>(null);
  const [energySubtypeId, setEnergySubtypeId] = useState<number | null>(null);
  const [pokemonTrainerId, setPokemonTrainerId] = useState<number | null>(null);
  const [cardSetId, setCardSetId] = useState<number | null>(null);
  const [cardNumber, setCardNumber] = useState("");
  const [firstEditionId, setFirstEditionId] = useState<number | null>(0);
  const [languageId, setLanguageId] = useState<number | null>(null);
  const [locationId, setLocationId] = useState<number | null>(null);

  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (cardTypeId === 1) { 
      // Pokemon
      setTrainerSubtypeId(null);
      setEnergySubtypeId(null);
    } else if (cardTypeId === 2) {
      // Trainer
      setPokemonSpeciesId(null);
      setVariantTypeId(null);
      setPokemonTrainerId(null);
      setEnergySubtypeId(null);
      setPokemonTrainerId(null);
    } else if (cardTypeId === 3) {
      // Energy
      setPokemonSpeciesId(null);
      setVariantTypeId(null);
      setTrainerSubtypeId(null);
      setPokemonTrainerId(null);
    }
  }, [cardTypeId]);

  const validateForm = () => {
    const newErrors: string[] = [];

    if (!cardName) newErrors.push("Card Name is required.");
    if (!cardTypeId) newErrors.push("Card Type is required.");
    if (!cardSetId) newErrors.push("Card Set is required.");
    if (!cardNumber) newErrors.push("Card Number is required.");
    if (!locationId) newErrors.push("Location is required.");
    if (!languageId) newErrors.push("Language is required.");

    if (cardTypeId === 1 && !pokemonSpeciesId) {
      newErrors.push("Pokémon Species is required for Pokémon cards.");
    }
    if (cardTypeId === 2 && !trainerSubtypeId) {
      newErrors.push("Trainer Subtype is required for Trainer cards.");
    }
    if (cardTypeId === 3 && !energySubtypeId) {
      newErrors.push("Energy Subtype is required for Energy cards.");
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      
      const selectedLanguage = filterOptions!.cardLanguages.find(l => l.id === languageId);
      const selectedSet = filterOptions!.sets.find(s => s.id === cardSetId);

      const imagePath = await getCardImage(
        selectedLanguage?.code.toLowerCase() ?? "",
        selectedSet?.code.toLowerCase() ?? "",
        cardNumber
      );

      const newCard = {
        cardName,
        cardTypeId,
        pokemonSpeciesId,
        variantTypeId,
        trainerSubtypeId,
        energySubtypeId,
        pokemonTrainerId,
        cardSetId,
        cardNumber,
        firstEdition: firstEditionId === 1,
        languageId,
        locationId,
        imagePath, 
      };

      console.log("Submitting card:", newCard);

    } catch (err) {
      console.error(err);
      setErrors(["Failed to fetch card image."]);
    }
  };


  if (!filterOptions) {
    return <p>Loading species...</p>;
  }


  return (
    <form onSubmit={handleSubmit}>
      <h1 style={{ fontSize: "1.5rem" }}>Add Cards</h1>

      <div style={{ marginTop: "1rem" }}>
        <label htmlFor="cardName">Card Name:</label>
        <br></br>
        <input
          id="cardName"
          type="text"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          placeholder="Dragonite EX"
          style={{ padding: "0.5rem", marginTop: "0.25rem" }}
        />
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
        <label htmlFor="pokemonSpecies">Pokemon Species:</label>
        <br></br>
        <select
          id="pokemonSpecies"
          disabled={cardTypeId !== 1}
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
            disabled={cardTypeId !== 1}
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
        <label htmlFor="trainerSubtype">Trainer Subtype:</label>
        <br></br>
        <select
            id="trainerSubtype"
            disabled={cardTypeId !== 2}
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
            disabled={cardTypeId !== 3}
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
            disabled={cardTypeId !== 1}
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
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
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
        <label htmlFor="language">Language:</label>
        <br></br>
        <select
            id="language"
            value={languageId ?? ""}
            onChange={(e) => setLanguageId(e.target.value ? Number(e.target.value) : null)}
            style={{ padding: "0.5rem", marginTop: "0.25rem" }}
        >
            <option value="">Select a Language</option>
            {filterOptions.cardLanguages.map((language) => (
                <option key={language.id} value={language.id}>
                    {language.name}
                </option>
            ))}
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

      {errors.length > 0 && (
        <div
          style={{
            marginTop: "1rem",
            padding: "1rem",
            border: "1px solid red",
            backgroundColor: "#ffe5e5",
            borderRadius: "4px",
            color: "darkred",
          }}
        >
          <strong>Please fix the following:</strong>
          <ul>
            {errors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ marginTop: "1rem" }}>
        <button
          type="submit"
          style={{
            padding: "0.75rem 1.5rem",
            borderRadius: "4px",
            border: "none",
            backgroundColor: "#4caf50",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
