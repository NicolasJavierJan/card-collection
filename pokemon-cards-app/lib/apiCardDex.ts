const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchCardDex = async (
  offset: number, 
  limit: number
  ) => {
  
  const params = new URLSearchParams({
    offset: offset.toString(),
    limit: limit.toString(),
  });

  const res = await fetch(`${API_BASE}/api/cardDex?${params.toString()}`);

  if (!res.ok) {
    throw new Error("Failed to fetch Card Dex cards!");
  }
  return await res.json();
};