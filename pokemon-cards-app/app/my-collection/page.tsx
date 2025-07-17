"use client";

import { useEffect, useState } from "react";
import { fetchAllCards } from "../../lib/api";
import Card from "../../components/Card";
import { PokemonCard } from "../../models/PokemonCard";

export default function MyCollectionPage() {
  const [cards, setCards] = useState<PokemonCard[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAllCards()
      .then(setCards)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>My Collection</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "0.75rem",
          justifyContent: "center",
        }}
      >
        {cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}
