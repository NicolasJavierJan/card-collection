// models/PokemonCard.ts

export type PokemonCard = {
  id: string;
  cardName: string;
  cardTypeName: string;
  setName: string;
  cardNumber: number;
  firstEdition?: boolean;
  imagePath?: string;
  locationName?: string;
};
