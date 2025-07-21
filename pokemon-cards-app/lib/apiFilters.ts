import { CardSet } from "@/models/CardSet"; 
import { CardType } from "@/models/CardType";

export interface FilterOptions {
  sets: CardSet[]; 
  cardTypes: CardType[];
  locations: Location[];
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
    locations: data.locations
  }
};
