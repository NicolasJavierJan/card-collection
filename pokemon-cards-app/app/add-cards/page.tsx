"use client";

import { useEffect, useState } from "react";
import { useFilterOptions } from "@/context/filterOptionsProvider";
import { getCardImage } from "@/lib/cardImage";
import { getCardRecommendation } from "@/lib/apiAddCardLocationRecommendation";
import AddCardModal from "@/components/AddCardModal";

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
  const [newCard, setNewCard] = useState<any | null>(null);
  const [recommendation, setRecommendation] = useState<string>("");

  const [errors, setErrors] = useState<string[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

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
        cardTypeName: filterOptions!.cardTypes.find(t => t.id === cardTypeId)?.name,
        pokemonSpeciesId,
        pokemonSpeciesName: filterOptions!.pokemonSpecies.find(s => s.id === pokemonSpeciesId)?.name,
        variantTypeId,
        variantTypeName: filterOptions!.variantTypes.find(v => v.id === variantTypeId)?.name,
        trainerSubtypeId,
        trainerSubtypeName: filterOptions!.trainerSubtypes.find(t => t.id === trainerSubtypeId)?.name,
        energySubtypeId,
        energySubtypeName: filterOptions!.energySubtypes.find(e => e.id === energySubtypeId)?.name,
        pokemonTrainerId,
        pokemonTrainerName: filterOptions!.pokemonTrainers.find(t => t.id === pokemonTrainerId)?.name,
        cardSetId,
        cardSetName: filterOptions!.sets.find(s => s.id === cardSetId)?.name,
        cardNumber,
        firstEdition: firstEditionId === 1,
        languageId,
        languageName: filterOptions!.cardLanguages.find(l => l.id === languageId)?.name,
        locationId,
        locationName: filterOptions!.locations.find(l => l.id === locationId)?.name,
        imagePath,
      };

      console.log(newCard);

      const recommendation = await getCardRecommendation(newCard);
      
      setNewCard(newCard);
      setRecommendation(recommendation);
      setIsModalOpen(true);

    } catch (err) {
      console.error(err);
      setErrors(["Failed to fetch card image."]);
    }
  };


  if (!filterOptions) {
    return <p>Loading species...</p>;
  }

  const fieldStyle = {
      marginBottom: "1.3rem",
      display: "flex",
      flexDirection: "column" as const,
  };

  const labelStyle = {
    fontWeight: "600",
    marginBottom: "0.4rem",
    color: "#0050b8",
  };

  const inputStyle = {
    padding: "0.65rem",
    border: "1px solid #c6d4e0",
    background: "white",
    borderRadius: "6px",
    fontSize: "1rem",
  };

  const disabledStyle = {
    ...inputStyle,
    background: "#f0f0f0",
    color: "#888",
    cursor: "not-allowed",
  };

  return (
    <form onSubmit={handleSubmit}
      style={{
        margin: "0 auto",
        padding: "2rem",
      }}
    >

      <h1 style={{ fontSize: "1.8rem", marginBottom: "1.5rem"}}>
        Add Cards
      </h1>

      <div style={fieldStyle}>
        <label htmlFor="cardName" style={labelStyle}>
          Card Name
        </label>
        <input
          id="cardName"
          type="text"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          placeholder="Dragonite EX"
          style={inputStyle}
        />
      </div>

      <div style={fieldStyle}>
        <label htmlFor="cardType" style={labelStyle}>
          Card Type
        </label>
        <select 
          id="cardType"
          value={cardTypeId ?? ""}
          onChange={(e) => setCardTypeId(e.target.value ? Number(e.target.value) : null)}
          style={inputStyle}
        >
          <option value="">Select a Card Type</option>
            {filterOptions.cardTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
      </div>

      <div style={fieldStyle}>
        <label htmlFor="pokemonSpecies" style={labelStyle}>
          Pokemon Species
        </label>
        <select 
          id="pokemonSpecies"
          disabled={cardTypeId !== 1}
          value={pokemonSpeciesId ?? ""}
          onChange={(e) => setPokemonSpeciesId(e.target.value ? Number(e.target.value) : null )}
          style={cardTypeId == 1 ? inputStyle : disabledStyle} 
        >
          <option value="">Select a Pokemon Species</option>
          {filterOptions.pokemonSpecies.map((species) => (
            <option key={species.id} value={species.id}>
              {species.name}
            </option>
          ))}
        </select>
      </div>

      <div style={fieldStyle}>
        <label htmlFor="variantType" style={labelStyle}>
          Variant Type
        </label>
        <select
          id="variantType"
          disabled={cardTypeId !== 1}
          value={variantTypeId ?? ""}
          onChange={(e) => setVariantTypeId(e.target.value ? Number(e.target.value) : null )}
          style={cardTypeId == 1 ? inputStyle : disabledStyle }
        >
          <option value="">Select a Variant Type</option>
          {filterOptions.variantTypes.map((variants) => (
            <option key={variants.id} value={variants.id}>
              {variants.name}
            </option>
          ))}
        </select>
      </div>

      <div style={fieldStyle}>
        <label htmlFor="trainerSubtype" style={labelStyle}>
          Trainer Subtype
        </label>
        <select 
          id="trainerSubtype"
          disabled={cardTypeId !== 2}
          value={trainerSubtypeId ?? ""}
          onChange={(e) => setTrainerSubtypeId(e.target.value ? Number(e.target.value) : null)}
          style={cardTypeId == 2 ? inputStyle : disabledStyle}
        >
          <option value="">Select a Trainer Subtype</option>
          {filterOptions.trainerSubtypes.map((subtype) => (
            <option key={subtype.id} value={subtype.id}>
              {subtype.name}
            </option>
          ))}
        </select>
      </div>

      <div style={fieldStyle}>
        <label htmlFor="energySubtype" style={labelStyle}>Energy Subtype</label>
        <select
            id="energySubtype"
            disabled={cardTypeId !== 3}
            value={energySubtypeId ?? ""}
            onChange={(e) => setEnergySubtypeId(e.target.value ? Number(e.target.value) : null)}
            style={cardTypeId == 3 ? inputStyle : disabledStyle}
        >
            <option value="">Select an Energy Subtype</option>
            {filterOptions.energySubtypes.map((subtype) => (
                <option key={subtype.id} value={subtype.id}>
                    {subtype.name}
                </option>
            ))}
        </select>
      </div>

      <div style={fieldStyle}>
        <label htmlFor="pokemonTrainer" style={labelStyle}>Pokemon Trainer</label>
        <select
            id="pokemonTrainer"
            disabled={cardTypeId !== 1}
            value={pokemonTrainerId ?? ""}
            onChange={(e) => setPokemonTrainerId(e.target.value ? Number(e.target.value) : null)}
            style={cardTypeId == 1 ? inputStyle : disabledStyle}
        >
            <option value="">Select a Pokemon Trainer</option>
            {filterOptions.pokemonTrainers.map((trainer) => (
                <option key={trainer.id} value={trainer.id}>
                    {trainer.name}
                </option>
            ))}
        </select>
      </div>

      <div style={fieldStyle}>
        <label htmlFor="cardSet" style={labelStyle}>Card Set</label>
        <select
            id="cardSet"
            value={cardSetId ?? ""}
            onChange={(e) => setCardSetId(e.target.value ? Number(e.target.value) : null)}
            style={inputStyle}
        >
            <option value="">Select a Card Set</option>
            {filterOptions.sets.map((set) => (
                <option key={set.id} value={set.id}>
                    {set.name}
                </option>
            ))}
        </select>
      </div>

      <div style={fieldStyle}>
        <label htmlFor="cardNumber" style={labelStyle}>Card Number</label>
        <input
          id="cardName"
          type="number"
          placeholder="147"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          style={inputStyle}
        />
      </div>

      <div style={fieldStyle}>
        <label htmlFor="firstEdition" style={labelStyle}>First Edition?</label>
        <select
            id="firstEdition"
            value={firstEditionId ?? ""}
            onChange={(e) => setFirstEditionId(e.target.value ? Number(e.target.value) : null)}
            style={inputStyle}
        >
            <option value="0">False</option>
            <option value="1">True</option>
        </select>
      </div>

      <div style={fieldStyle}>
        <label htmlFor="language" style={labelStyle}>Language:</label>
        <select
            id="language"
            value={languageId ?? ""}
            onChange={(e) => setLanguageId(e.target.value ? Number(e.target.value) : null)}
            style={inputStyle}
        >
            <option value="">Select a Language</option>
            {filterOptions.cardLanguages.map((language) => (
                <option key={language.id} value={language.id}>
                    {language.name}
                </option>
            ))}
        </select>
      </div>

      <div style={fieldStyle}>
        <label htmlFor="location" style={labelStyle}>Location:</label>
        <select
            id="location"
            value={locationId ?? ""}
            onChange={(e) => setLocationId(e.target.value ? Number(e.target.value) : null)}
            style={inputStyle}
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
            marginTop: "1.5rem",
            padding: "0.8rem 1.6rem",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "#0070f3",
            color: "#fff",
            fontSize: "1rem",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </div>

      {isModalOpen && newCard && (
        <AddCardModal
          card={newCard}
          recommendation={recommendation}
          locations={filterOptions.locations}
          locationId={locationId}
          onLocationChange={setLocationId}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </form>
  );
}
