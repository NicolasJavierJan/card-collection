const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchRecommendations = async () => {
    const res = await fetch(`${API_BASE}/api/cardDex/recommendations`);

    if (!res.ok) {
        throw new Error("Failed to fetch Card Dex cards!");
    }

    return await res.json();
}

export const blacklistCard = async (cardId: string) : Promise<void> => {
    const res = await fetch(`${API_BASE}/api/cardDex/recommendations/blacklist?cardId=${cardId}`, {
        method: "POST",
    })

    if (!res.ok) {
        throw new Error("Failed to blacklist card!");
    }
}

