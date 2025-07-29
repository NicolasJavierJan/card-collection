import { CardSet } from "../models/CardSet"; // your types for CardSet

export const fetchCardSets = async (): Promise<CardSet[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/card-sets`);
  if (!res.ok) {
    throw new Error("Failed to load card sets");
  }
  const data = await res.json();
  return data;
};
