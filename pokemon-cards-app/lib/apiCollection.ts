// lib/api.ts

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchAllCards = async (
  offset: number, 
  limit: number,
  setId?: number,
  cardTypeId?: number,
  locationId?: number,
  pokemonSpeciesId?: number,
  variantTypeId?: number,
  trainerSubtypeId?: number,
  energySubtypeId?: number,
  pokemonTrainerId?: number,
  cardLanguageId?: number
  ) => {
  
  const params = new URLSearchParams({
    offset: offset.toString(),
    limit: limit.toString(),
  });
  if (setId) params.append("setId", setId.toString());
  if (cardTypeId) params.append("cardTypeId", cardTypeId.toString());
  if (locationId) params.append("locationId", locationId.toString());
  if (pokemonSpeciesId) params.append("pokemonSpeciesId", pokemonSpeciesId.toString());
  if (variantTypeId) params.append("variantTypeId", variantTypeId.toString());
  if (trainerSubtypeId) params.append("trainerSubtypeId", trainerSubtypeId.toString());
  if (energySubtypeId) params.append("energySubtypeId", energySubtypeId.toString());
  if (pokemonTrainerId) params.append("pokemonTrainerId", pokemonTrainerId.toString());
  if (cardLanguageId) params.append("cardLanguageId", cardLanguageId.toString());

  const res = await fetch(`${API_BASE}/api/collection?${params.toString()}`);

  if (!res.ok) {
    throw new Error("Failed to fetch Pokémon cards");
  }
  return await res.json();
};
