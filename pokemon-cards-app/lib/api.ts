// lib/api.ts

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchAllCards = async () => {
  const res = await fetch(`${API_BASE}/api/cards`);

  if (!res.ok) {
    throw new Error("Failed to fetch Pokémon cards");
  }
  return await res.json();
};
