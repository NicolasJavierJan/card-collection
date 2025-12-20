// models/PokemonCardCollection.ts
export type PokemonCardCollection = {
  id: string;

  cardName: string;
  cardNumber: number;

  setName: string;
  languageName: string;

  locationName?: string;
  imagePath?: string;

  firstEdition: boolean;
};

// USED IN CARD COLLECTION