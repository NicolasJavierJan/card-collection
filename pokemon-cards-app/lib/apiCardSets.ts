import { CardSet } from "../models/CardSet";

export const fetchCardSets = async (): Promise<CardSet[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/card-sets`);
  if (!res.ok) {
    throw new Error("Failed to load card sets");
  }
  const data = await res.json();
  return data;
};

export interface CreateCardSetRequest {
  name: string;
  code: string;
  totalCards: number;
  binderLocationId?: number;
  boxLocationId?: number;
}

export const createCardSet = async (data: CreateCardSetRequest): Promise<CardSet> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/card-sets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to create card set: ${text}`);
  }

  return res.json();
};
