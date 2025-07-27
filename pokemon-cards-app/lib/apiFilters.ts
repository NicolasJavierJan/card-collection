import { CardSet } from "@/models/CardSet"; 
import { CardType } from "@/models/CardType";
import { EnergySubtype } from "@/models/EnergySubtype";
import { Location } from "@/models/Location";
import { PokemonSpecies } from "@/models/PokemonSpecies";
import { PokemonTrainer } from "@/models/PokemonTrainer";
import { TrainerSubtype } from "@/models/TrainerSubtype";
import { VariantType } from "@/models/VariantType";
import { CardLanguage } from "@/models/CardLanguage";

export interface FilterOptions {
  sets: CardSet[]; 
  cardTypes: CardType[];
  locations: Location[];
  pokemonSpecies: PokemonSpecies[];
  variantTypes: VariantType[];
  trainerSubtypes: TrainerSubtype[];
  energySubtypes: EnergySubtype[];
  pokemonTrainers: PokemonTrainer[];
  cardLanguages: CardLanguage[];
}

export const fetchFilterOptions = async (): Promise<FilterOptions> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cards/filters`);
  if (!res.ok) {
    throw new Error("Failed to load filter options");
  }
  const data = await res.json();
  return {
    sets: data.sets,
    cardTypes: data.cardTypes,
    locations: data.locations,
    pokemonSpecies: data.pokemonSpecies,
    variantTypes: data.variantTypes,
    trainerSubtypes: data.trainerSubtypes,
    energySubtypes: data.energySubtypes,
    pokemonTrainers: data.pokemonTrainers,
    cardLanguages: data.cardLanguages
  }
};
