// lib/api.ts

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchAllCards = async (offset: number, limit: number) => {
  const res = await fetch(`${API_BASE}/api/cards?offset=${offset}&limit=${limit}`);

  if (!res.ok) {
    throw new Error("Failed to fetch Pokémon cards");
  }
  return await res.json();
};
